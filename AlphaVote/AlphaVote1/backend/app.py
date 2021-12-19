import functools
import secrets

import sqlalchemy
from algosdk import constants, encoding
from algosdk.v2client import algod
from decouple import config
from marshmallow import Schema, fields
from marshmallow.decorators import post_dump
from marshmallow.exceptions import ValidationError
from slugify import slugify
from sqlalchemy import desc, func

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SECRET_KEY"] = config("SECRET_KEY", default="i-am-not-a-secret-hahaha")

###################################################################
db_uri = config("DATABASE_URL", default="sqlite:///voters.db")
if db_uri.startswith("postgres://"):
    db_uri = db_uri.replace("postgres://", "postgresql://", 1)
##################################################################

app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = config(
    "SQLALCHEMY_TRACK_MODIFICATIONS", default=False
)

db = SQLAlchemy(app)
cors = CORS(app)
migrate = Migrate(app, db)

algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "fi0QdbiBVl8hsVMCA2SUg6jnQdvAzxY48Zy2G6Yc"
headers = {"x-api-key": algod_token}
algod_client = algod.AlgodClient(algod_token, algod_address, headers)

CHOICE_ID = 21364625

###################################################################
# MODELS
###################################################################
class Wallet(db.Model):
    """This model represents a wallet."""

    __tablename__ = "wallets"

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(constants.ADDRESS_LEN), nullable=False)

    def __repr__(self) -> str:
        return "<Wallet {}>".format(self.address)

    @staticmethod
    def get_or_create(address):
        """Creates or gets a `Wallet` instance."""
        instance = Wallet.query.filter_by(address=address).first()
        if not instance:
            new_wallet = Wallet(address=address)
            db.session.add(new_wallet)
            db.session.commit()

            return new_wallet
        return instance


class Election(db.Model):
    """An election model represents the voting process."""

    __tablename__ = "elections"

    id = db.Column(db.Integer, primary_key=True)
    wallet_id = db.Column(db.Integer, db.ForeignKey("wallets.id"), nullable=False)
    wallet = db.relationship("Wallet", backref=db.backref("elections", lazy="dynamic"))

    title = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(150), index=True, nullable=False, unique=True)

    description = db.Column(db.Text, nullable=True)

    choice_per_vote = db.Column(db.Integer, nullable=False)

    process_image = db.Column(db.LargeBinary, nullable=True)

    is_working = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=func.now())

    is_started = db.Column(db.Boolean, default=False)
    is_finished = db.Column(db.Boolean, default=False)

    def __init__(self, wallet_id, title, description, process_image, choice_per_vote=10) -> None:
        self.title = title
        self.description = description
        self.slug = slugify(title) + "-" + secrets.token_hex(3)
        self.wallet_id = wallet_id
        self._votes = set()
        self.process_image = process_image
        self.choice_per_vote = choice_per_vote

    def __repr__(self) -> str:
        return "<Election wallet={} title={} choice_per_vote={}>".format(
            self.wallet,
            self.title,
            self.choice_per_vote,
        )


class Candidate(db.Model):
    """A candidate model represents the choices available for an election."""

    __tablename__ = "candidates"
    id = db.Column(db.Integer, primary_key=True)

    election_id = db.Column(db.Integer, db.ForeignKey("elections.id"), nullable=False)
    election = db.relationship("Election", backref=db.backref("candidates", lazy="dynamic"))

    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.LargeBinary, nullable=True)

    address = db.Column(db.String(constants.ADDRESS_LEN), nullable=False, unique=True)
    private_key = db.Column(db.Text, nullable=False, unique=True)

    def __init__(self, election_id, name, address, private_key, image=None) -> None:
        self.election_id = election_id
        self.name = name
        self.image = image
        self.address = address
        self.private_key = private_key


##################################################################################################
# SERIALIZERS
##################################################################################################
class WalletSchema(Schema):
    address = fields.Str(required=True)


class CandidateSchema(Schema):
    name = fields.Str(required=True)
    image = fields.Str()

    address = fields.Str(required=True)
    private_key = fields.Str(required=True, load_only=True)

    @post_dump(pass_original=True)
    def add_votes(self, data, original_data, **kwargs):
        if original_data.election.is_started:
            votes = count(algod_client, original_data.address) / (
                original_data.election.choice_per_vote * 100
            )
            data["votes"] = votes
            return data

        data["votes"] = 0
        return data

    @post_dump(pass_original=True)
    def decode_img(self, data, original_data, **kwargs):
        image = original_data.image
        if image:
            data["image"] = image.decode("utf-8")

        return data


class ElectionSchema(Schema):
    title = fields.Str(required=True)
    slug = fields.Str(dump_only=True)

    description = fields.Str(required=False)

    process_image = fields.Str(required=False)

    candidates = fields.List(fields.Nested(CandidateSchema))

    choice_per_vote = fields.Int(required=True)

    is_started = fields.Bool(dump_only=True)
    is_finished = fields.Bool(dump_only=True)

    created_at = fields.DateTime(dump_only=True)

    @post_dump(pass_original=True)
    def add_wallet(self, data, original_data, **kwargs):
        wallet = WalletSchema().dump(original_data.wallet)
        data["wallet"] = wallet
        return data

    @post_dump(pass_original=True)
    def decode_img(self, data, original_data, **kwargs):
        image = original_data.process_image
        if image:
            data["process_image"] = image.decode("utf-8")

        return data


################################################################################################
# DECORATORS & UTILITY FUNCTIONS
################################################################################################
def wallet_required(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        address = request.headers.get("X-Wallet-Address", None)
        if not address:
            return (
                jsonify(status="error", message="An address is needed to authorize this request"),
                401,
            )
        if not encoding.is_valid_address(address):
            return (
                jsonify(status="error", message="Invalid address passed!"),
                400,
            )
        return f(*args, **kwargs)

    return wrapper


def is_election_owner(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        address = request.headers.get("X-Wallet-Address", None)

        election = Election.query.filter_by(slug=kwargs.get("slug")).first()
        if not election:
            return jsonify(status="error", message="Election does not exist!"), 404

        if election.wallet.address != address:
            return jsonify(status="error", message="You are not authorized for this action"), 403

        return f(*args, **kwargs)

    return wrapper


def election_exists(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        election = Election.query.filter_by(slug=kwargs.get("slug")).first()
        if not election:
            return jsonify(status="error", message="Election does not exist!"), 404

        return f(*args, **kwargs)

    return wrapper


def get_wallet_from_headers() -> str:
    """Returns the wallet from `request.headers`"""
    address = request.headers.get("X-Wallet-Address")

    return address


def database_is_empty():
    table_names = sqlalchemy.inspect(db.engine).get_table_names()
    is_empty = table_names == []
    return is_empty


def count(algod_client, address):
    account_info = algod_client.account_info(address)
    assets = account_info.get("assets")
    for asset in assets:
        if asset["asset-id"] == CHOICE_ID:
            amount = asset.get("amount")
            return amount


def count_votes(candidates, choice_per_vote):
    labels = []
    values = []
    for candidate in candidates:
        _ = count(candidate.address)
        labels.append(candidate.name)
        values.append(_ / choice_per_vote)
    print(labels, values)
    return labels, values


##################################################################################################
# VIEWS
#################################################################################################
@app.get("/")
def index():
    return (jsonify(status="success", message="Welcome to Choice API", data=None), 200)


@app.post("/elections/create")
@wallet_required
def create_election():
    """First endpoint in creating an election."""
    wallet_address = get_wallet_from_headers()

    request_data = request.get_json()
    if not request_data:
        return (
            jsonify(
                status="error",
                message="Set the mimetype header to application/json",
                data=None,
            ),
            400,
        )
    schema = ElectionSchema()
    try:
        wallet = Wallet.get_or_create(wallet_address)
        data = schema.load(request_data)

        new_election = Election(
            wallet_id=wallet.id,
            title=data["title"],
            description=data.get("description"),
            process_image=data.get("process_image", "").encode("utf-8"),
            choice_per_vote=data["choice_per_vote"],
        )
        db.session.add(new_election)
        db.session.flush()

        all_candidates = data["candidates"]

        for candidate in all_candidates:
            new_candidate = Candidate(
                election_id=new_election.id,
                name=candidate["name"],
                address=candidate["address"],
                image=candidate.get("image", "").encode("utf-8"),
                private_key=candidate["private_key"],
            )
            db.session.add(new_candidate)

        db.session.commit()

        response = schema.dump(new_election)
        return (
            jsonify(status="success", message="Election created successfully!", data=response),
            201,
        )
    except ValidationError as err:
        print(err)
        return jsonify(status="error", message="Validation Failed", data=err.messages), 400


@app.get("/elections/mine")
@wallet_required
def my_elections():
    schema = ElectionSchema(many=True)

    wallet_address = get_wallet_from_headers()
    wallet = Wallet.get_or_create(wallet_address)

    elections = (
        Election.query.filter_by(wallet_id=wallet.id).order_by(desc(Election.created_at)).all()
    )
    response = schema.dump(elections)

    return (
        jsonify(
            status="success",
            message="Personal elections returned successfully!",
            data=response,
        ),
        200,
    )


@app.get("/elections")
def all_elections():
    schema = ElectionSchema(many=True)

    elections = (
        Election.query.filter_by(is_started=True, is_finished=False)
        .order_by(desc(Election.created_at))
        .all()
    )
    response = schema.dump(elections)

    return (
        jsonify(
            status="success",
            message="All elections returned successfully!",
            data=response,
        ),
        200,
    )


@app.post("/elections/<slug>/start")
@wallet_required
@is_election_owner
def start_election(slug):
    election = Election.query.filter_by(slug=slug).first()

    election.is_started = True
    election.is_finished = False

    db.session.commit()

    return jsonify(status="success", message="Election started successfully!"), 200


@app.post("/elections/<slug>/end")
@wallet_required
@is_election_owner
def end_election(slug):
    election = Election.query.filter_by(slug=slug).first()

    election.is_started = False
    election.is_finished = True

    db.session.commit()

    return jsonify(status="success", message="Election started successfully!"), 200


@app.get("/elections/<slug>/results")
@election_exists
def view_result(slug):
    election = Election.query.filter_by(slug=slug).first()

    labels, values = count_votes(election.candidates.all(), election.choice_per_vote)

    return (
        jsonify(
            status="success",
            message="Result fetched successfully!",
            data={"labels": labels, "values": values},
        ),
        200,
    )
