# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License
import functools
import secrets

from algosdk import account, mnemonic
from algosdk.constants import address_len
from algosdk.encoding import is_valid_address
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from flask import (Flask, flash, redirect, render_template, request, session,
                   url_for)
from flask_sqlalchemy import SQLAlchemy
from slugify import slugify
from sqlalchemy import func

from vote import algod_client, choice_id, count_votes, election_voting, hashing

app = Flask(__name__)
app.config["SECRET_KEY"] = "hello-i-am-a-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///voters.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


#####################################
#               MODELS              #
####################################
class Administrator(db.Model):
    """An administrator model responsible for adding voters, starting and ending a voting process."""

    __tablename__ = "administrators"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    hashed_key = db.Column(db.String(150), nullable=False)

    created_at = db.Column(db.DateTime, default=func.now())

    def __init__(self, username, key) -> None:
        self.username = username
        self.hashed_key = hashing(key)


class Election(db.Model):
    """An election model represents the voting process."""

    __tablename__ = "elections"

    id = db.Column(db.Integer, primary_key=True)

    administrator_id = db.Column(db.Integer, db.ForeignKey("administrators.id"), nullable=False)
    administrator = db.relationship(
        "Administrator", backref=db.backref("elections", lazy="dynamic")
    )

    title = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(150), index=True, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=func.now())

    escrow_address = db.Column(db.String(address_len), nullable=False, unique=True)
    escrow_key = db.Column(db.String(200), nullable=False, unique=True)

    is_started = db.Column(db.Boolean, default=False)
    is_finished = db.Column(db.Boolean, default=False)

    def __init__(
        self,
        administrator_id,
        title,
        escrow_address,
        escrow_mnemonic,
    ) -> None:
        self.title = title
        self.slug = slugify(title) + "-" + secrets.token_hex(3)
        self.administrator_id = administrator_id

        self.escrow_key = mnemonic.to_private_key(escrow_mnemonic)
        self.escrow_address = escrow_address


class Candidate(db.Model):
    """A candidate model represents the choices available for an election."""

    __tablename__ = "candidates"
    id = db.Column(db.Integer, primary_key=True)

    election_id = db.Column(db.Integer, db.ForeignKey("elections.id"), nullable=False)
    election = db.relationship("Election", backref=db.backref("candidates", lazy="dynamic"))

    name = db.Column(db.String(100), nullable=False, unique=True)
    votes = db.Column(db.Integer, default=0)

    address = db.Column(db.String(address_len), nullable=False, unique=True)
    private_key = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, election_id, name, address, private_key) -> None:
        self.election_id = election_id
        self.name = name
        self.address = address
        self.private_key = private_key

    @staticmethod
    def generate_address():
        private_key, address = account.generate_account()
        return private_key, address

    def to_dict(self):
        return {"name": self.name, "votes": self.votes}


class Voter(db.Model):
    """A voter model represents a voter."""

    __tablename__ = "voters"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    ssn = db.Column(db.String(100), nullable=False, unique=True)
    driver_license = db.Column(db.String(100), nullable=False, unique=True)

    def __init__(self, name, ssn, driver_license) -> None:
        self.name = name
        self.ssn = hashing(ssn)
        self.driver_license = hashing(driver_license)


#########################
#  DECORATORS & uTILS  #
########################
def admin_required(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        admin = Administrator.query.filter_by(id=session.get("admin_id", "")).first()
        if not admin:
            flash("You need to be logged in to perform this action.", "danger")
            return redirect(url_for("admin_login"))
        return f(*args, **kwargs)

    return wrapper


def contains_choice_coin(address: str) -> bool:
    """Checks if the address is opt into Choice Coin."""
    account = algod_client.account_info(address)
    contains_choice = False

    for asset in account["assets"]:
        if asset["asset-id"] == choice_id:
            contains_choice = True
            break

    return contains_choice


def get_balance(address: str) -> int:
    """Gets the balance of a wallet."""
    account = algod_client.account_info(address)
    return account["amount"]


def send_initial_algorand(
    escrow_address: str,
    escrow_private_key: str,
    recipient_address: str,
) -> None:
    """Send algorand to candidate address."""

    AMOUNT = 210000
    suggested_params = algod_client.suggested_params()
    unsigned_transaction = PaymentTxn(
        escrow_address,
        suggested_params,
        recipient_address,
        AMOUNT,
        note="Initial Funding for Candidate Creation",
    )
    signed_transaction = unsigned_transaction.sign(escrow_private_key)

    try:
        transaction_id = algod_client.send_transaction(signed_transaction)
        wait_for_transaction_confirmation(transaction_id)
    except Exception as err:
        print(err)
        return True
    return False


def choice_coin_opt_in(address, private_key):
    """Opt into Choice Coin."""

    suggested_params = algod_client.suggested_params()
    if not contains_choice_coin(address):
        unsigned_transaction = AssetTransferTxn(address, suggested_params, address, 0, choice_id)
        signed_transaction = unsigned_transaction.sign(private_key)

        try:
            transaction_id = algod_client.send_transaction(signed_transaction)
            wait_for_transaction_confirmation(transaction_id)
        except Exception as err:
            print(err)


def wait_for_transaction_confirmation(transaction_id: str):
    """Wait until the transaction is confirmed or rejected, or until timeout snumber of rounds have passed."""

    TIMEOUT = 4
    start_round = algod_client.status()["last-round"] + 1
    current_round = start_round

    while current_round < start_round + TIMEOUT:
        try:
            pending_txn = algod_client.pending_transaction_info(transaction_id)
        except Exception:
            return
        if pending_txn.get("confirmed-round", 0) > 0:
            return pending_txn
        elif pending_txn["pool-error"]:
            raise Exception("pool error: {}".format(pending_txn["pool-error"]))

        algod_client.status_after_block(current_round)
        current_round += 1
    raise Exception("pending tx not found in TIMEOUT rounds, TIMEOUT value = : {}".format(TIMEOUT))


@app.before_first_request
def create_db():
    db.create_all()


@app.route("/")
def start():
    """ Start page """
    return render_template("index.html", title="Choice Coin")


@app.route("/administrator/signup", methods=["GET", "POST"])
def admin_signup():
    """Create an administrator."""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        admin = Administrator.query.filter_by(username=username).first()
        if admin:
            flash("Username is already taken.", "danger")
            return redirect(url_for("admin_signup"))

        new_admin = Administrator(username, password)
        db.session.add(new_admin)
        db.session.commit()

        flash("Administrator account created successfully", "success")
        return redirect(url_for("admin_login"))
    return render_template("admin_signup.html", title="Admin SignUp | Choice Coin")


@app.route("/administrator/login", methods=["GET", "POST"])
def admin_login():
    """Login an administrator"""
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        admin = Administrator.query.filter_by(username=username).first()
        if not admin or admin.hashed_key != hashing(password):
            flash("Invalid username and/or password", "danger")
            return redirect(url_for("admin_login"))

        session["admin_id"] = admin.id
        return redirect(url_for("start"))
    return render_template("admin_login.html", title="Admin Login | Choice Coin")


@app.get("/administrator/logout")
def admin_logout():
    session.pop("admin_id")
    flash("Logged out successfully", "success")
    return redirect(url_for("start"))


@app.route("/add_voter", methods=["GET", "POST"])
@admin_required
def add_voter():
    if request.method == "POST":
        name = request.form.get("name")
        ssn = request.form.get("ssn")
        dl = request.form.get("dl")

        is_form_error = False

        # check if voter with existing details exists in database
        name_exists = Voter.query.filter_by(name=name).first()
        if name_exists:
            flash("Name already exists in database", "danger")
            is_form_error = True

        ssn_exists = Voter.query.filter_by(ssn=hashing(ssn)).first()
        if ssn_exists:
            flash("SSN already used in database.", "danger")
            is_form_error = True

        dl_exists = Voter.query.filter_by(driver_license=hashing(dl)).first()
        if dl_exists:
            flash("Driver's License already present in database.", "danger")
            is_form_error = True

        if is_form_error:
            return redirect(url_for("add_voter"))

        new_voter = Voter(name, ssn, dl)
        db.session.add(new_voter)
        db.session.commit()

        flash("Voter added successfully!", "success")
        return redirect(url_for("add_voter"))
    return render_template("create.html", title="Add Voter | Choice Coin")


@app.route("/elections", methods=["GET", "POST"])
@admin_required
def elections():
    # This returns all elections created by this administrator
    elections = Administrator.query.get(session.get("admin_id")).elections.all()
    return render_template(
        "start.html", title="Start Voting Processs|Choice Coin", elections=elections
    )


@app.route("/elections/create", methods=["GET", "POST"])
@admin_required
def create_election():
    if request.method == "POST":
        title = request.form.get("title")
        candidates = [_.strip() for _ in request.form.get("candidates").split(",")]
        escrow_address = request.form.get("escrow_address")
        escrow_mnemonic = request.form.get("escrow_mnemonic")

        # check if the number of candidates are at least two.
        if len(candidates) < 2:
            flash("Candidates must be at least two.", "danger")
            return redirect(url_for("create_election"))

        # validate escrow address and mnemonics
        if not is_valid_address(escrow_address):
            flash("Invalid escrow address", "danger")
            return redirect(url_for("create_election"))
        if (
            account.address_from_private_key(mnemonic.to_private_key(escrow_mnemonic))
            != escrow_address
        ):
            flash("Invalid escrow mnemonic", "danger")
            return redirect(url_for("create_election"))

        # check if escrow address in db.
        election_exists = Election.query.filter_by(escrow_address=escrow_address).first()
        if election_exists:
            flash("Escrow Address already present in database.", "danger")
            return redirect(url_for("create_election"))

        # check if address is opt into Choice coin and has required minimum balance
        if not contains_choice_coin(escrow_address):
            flash("Escrow address not opt into Choice coin", "danger")
            return redirect(url_for("create_election"))
        if get_balance(escrow_address) < 1000:
            flash("Insufficient balance of Choice Coin", "danger")
            return redirect(url_for("create_election"))

        new_election = Election(session.get("admin_id"), title, escrow_address, escrow_mnemonic)
        db.session.add(new_election)
        db.session.flush()

        for candidate in candidates:
            private_key, address = account.generate_account()
            is_failed = send_initial_algorand(
                new_election.escrow_address, new_election.escrow_key, address
            )
            if is_failed:
                db.session.rollback()
                flash("An error occured while creating the election", "danger")
                return redirect(url_for("create_election"))

            choice_coin_opt_in(address, private_key)

            new_candidate = Candidate(new_election.id, candidate, address, private_key)
            db.session.add(new_candidate)

        db.session.commit()
        flash("Election created successfully!", "success")
        return redirect(url_for("elections"))

    return render_template("create_election.html", title="Create Election | Choice Coin")


@app.get("/elections/<slug>/start")
@admin_required
def start_election(slug):
    election = (
        Administrator.query.get(session.get("admin_id")).elections.filter_by(slug=slug).first()
    )
    if not election:
        flash("Election does not exist!", "danger")
        return redirect(url_for("elections"))

    election.is_finished = False
    election.is_started = True
    db.session.commit()

    flash("Election '{}' started successfully!".format(election.title), "success")
    return redirect(url_for("elections"))


@app.get("/elections/<slug>/end")
@admin_required
def end_election(slug):
    election = (
        Administrator.query.get(session.get("admin_id")).elections.filter_by(slug=slug).first()
    )
    if not election:
        flash("Election does not exist!", "danger")
        return redirect(url_for("elections"))

    election.is_finished = True
    election.is_started = False
    db.session.commit()

    flash("Election '{}' ended successfully!".format(election.title), "success")
    return redirect(url_for("elections"))


@app.get("/participate")
def participate():
    elections = Election.query.all()
    return render_template(
        "participate.html",
        elections=elections,
        title="Participate in Voting Process | Choice Coin",
    )


@app.route("/vote/<slug>", methods=["POST", "GET"])
def vote(slug):
    election = Election.query.filter_by(slug=slug).first()
    if not election:
        flash("Election does not exist!", "danger")
        return redirect(url_for("participate"))

    if election.is_finished:
        flash("Election voting has ended", "danger")
        return redirect(url_for("participate"))

    if not election.is_started:
        flash("Election voting has not started", "danger")
        return redirect(url_for("participate"))

    if request.method == "POST":
        ssn = hashing(request.form.get("ssn"))
        dl = hashing(request.form.get("dl"))

        voter = Voter.query.filter_by(ssn=ssn, driver_license=dl).first()
        if not voter:
            flash("Voter credentials invalid", "danger")
            return redirect(url_for("vote", slug=election.slug))

        session["is_validated"] = True
        session["election_id"] = election.id

        flash("Voter credentials verification successful!", "success")
        return redirect(url_for("submit", slug=election.slug))

    return render_template("vote.html", title="Vote | Choice Coin", election=election)


@app.route("/submit/<slug>", methods=["POST", "GET"])
def submit(slug):
    election = Election.query.filter_by(slug=slug).first()
    if not election:
        flash("Election does not exist!", "danger")
        return redirect(url_for("participate"))

    if election.is_finished:
        flash("Election voting has ended", "danger")
        return redirect(url_for("participate"))

    if not election.is_started:
        flash("Election voting has not started", "danger")
        return redirect(url_for("participate"))

    if session.get("election_id") != election.id or not session.get("is_validated"):
        flash("Please verify your voting credentials", "danger")
        return redirect(url_for("vote", slug=election.id))

    if request.method == "POST":
        selection = request.form.get("choice")
        candidate = election.candidates.filter_by(name=selection).first()

        message = election_voting(candidate)
        candidate.votes += 1

        db.session.commit()

        session.pop("is_validated", None)
        session.pop("election_id", None)

        flash(message, "success")
        return redirect(url_for("participate"))

    return render_template("submit.html", election=election, title="Submit Vote | Choice Coin")


@app.get("/result/<slug>")
def voting_result(slug):
    election = Election.query.filter_by(slug=slug).first()

    if not election:
        flash("Election does not exist!", "danger")
        return redirect(url_for("participate"))

    if not election.is_finished:
        flash("Election voting has not finished", "danger")
        return redirect(url_for("participate"))

    labels, values = count_votes(election.candidates.all())
    return render_template(
        "result.html",
        title=f"{election.title} Result | Choice Coin",
        labels=labels,
        values=values,
        election=election,
    )


@app.route("/about/")
def about():
    """about"""
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)
