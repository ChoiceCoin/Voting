
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Developers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(50))
    discord = db.Column(db.String(50))
    github = db.Column(db.String(30))
    twitter = db.Column(db.String(30))
    wallet = db.Column(db.String(40))
    