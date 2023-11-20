from . import db


class Project(db.Model):
    __tablename__ = "project"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    category = db.Column(db.Text, nullable=False)
    target = db.Column(db.Integer, nullable=False)
    votes = db.relationship("Vote", backref="voter", lazy="dynamic")


class Vote(db.Model):
    __tablename__ = "vote"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("project.id"))
    address = db.Column(db.String(58), db.ForeignKey("voter.id"))


class Voter(db.Model):
    __tablename__ = "voter"

    id = db.Column(db.Integer, primary_key=True)
    social_number = db.Column(db.String(20), nullable=False, unique=True)
    license_id = db.Column(db.String(20), nullable=False, unique=True)
    address = db.Column(db.String(512), unique=True)
    phrase = db.Column(db.String(512), unique=True)
    votes = db.relationship("Vote", backref="leggo", lazy="dynamic")
