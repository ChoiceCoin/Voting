from . import db

class User(db.Model):
    # User

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    social_security = db.Column(db.String(50), nullable=False)
    drivers_license = db.Column(db.String(50), nullable=False)