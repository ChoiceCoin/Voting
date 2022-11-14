# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License

from flask import render_template, redirect, url_for, flash
from flask import current_app as app
from .forms import ProjectForm, VoterForm, VoteForm, EndForm
from .models import Project, Vote, Voter
from . import db
from .vote import hashing
from .utils import create_new_account, send_choice, return_choice


hashed_key = "c3966079f4ee242c64c86dff2d8c6dc8acfaa71c106f36989f264fb9c8617393df8145c0e6058ecaf281875265ac8904f615453fbb20053c3766319126bc0f06"


@app.route("/")
def start():
    """Start page"""
    return render_template("index.html")


@app.route("/create", methods=["POST", "GET"])
def create():
    form = ProjectForm()
    if form.validate_on_submit():
        key = hashing(form.admin_key.data)
        if key == hashed_key:
            project = Project(
                name=form.name.data,
                category=form.category.data,
                target=form.target.data,
            )
            db.session.add(project)
            db.session.commit()
            return redirect(url_for("create"))
        else:
            flash("Wrong Admin Key", "error")
    return render_template("create_project.html", form=form)


@app.route("/add_voter", methods=["POST", "GET"])
def add_voter():
    form = VoterForm()
    if form.validate_on_submit():
        key = hashing(form.admin_key.data)
        sn = hashing(form.social_number.data)
        if key == hashed_key:
            if Voter.query.filter_by(social_number=sn).first():
                flash("Candidate Already Exists", "error")
                return render_template("create_voter.html", form=form)

            res = create_new_account()
            address = res["Address"]
            phrase = res["Phrase"]
            voter = Voter(
                social_number=hashing(form.social_number.data),
                license_id=hashing(form.license_id.data),
                address=address,
                phrase=phrase,
            )
            db.session.add(voter)
            db.session.commit()
            flash("Voter created successfully", "success")
            flash(address, "warning")
            flash(phrase, "info")
            return redirect(url_for("add_voter"))
    return render_template("create_voter.html", form=form)


@app.route("/projects")
def projects():
    projs = Project.query.all()
    return render_template("projects.html", projs=projs)


@app.route("/vote/<int:project_id>", methods=["POST", "GET"])
def vote(project_id):
    proj = Project.query.filter_by(id=project_id).first()
    form = VoteForm()
    if form.validate_on_submit():
        address = form.address.data
        voter = Voter.query.filter_by(address=address).first()
        is_voted = proj.votes.filter_by(address=address).first()
        if not voter:
            flash("Voter doesn't exist", "error")
            return redirect(url_for("vote", project_id=proj.id))
        if proj.votes.count() < proj.target:
            if is_voted:
                flash("You have already voted", "error")
                return redirect(url_for("vote", project_id=project_id))
            send_choice(voter.address, voter.phrase)
            res = Vote(address=address, project_id=proj.id)
            db.session.add(res)
            db.session.commit()

    return render_template("vote.html", form=form)


@app.route("/end", methods=["POST", "GET"])
def end():
    form = EndForm()
    votes = Vote.query.filter_by(project_id=form.project_id.data).all()
    for vote in votes:
        address = vote.address
        return_choice(address)
        flash("all done", "success")
    return render_template("end.html", form=form)


@app.route("/about/")
def about():
    """about"""
    return render_template("about.html")
