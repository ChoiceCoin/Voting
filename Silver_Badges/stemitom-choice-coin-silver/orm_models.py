from utils import hashing
from sqlalchemy import func
from enum import unique, Enum
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# This is what the orm modeling looks like
# app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = config('MYSQL_DB')
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config['SECRET_KEY'] = config("FLASK_KEY")
# db.init_app(app)

@unique
class VoterLevel(Enum):
    JUNIOR = 2
    MID_LEVEL = 5
    SENIOR = 10

class Voter(db.Model):
    __tablename__ = "voter"
 
    id = db.Column(db.Integer, primary_key=True)
    ssn = db.Column(db.String(30), nullable=False)
    license_id = db.Column(db.String(20), nullable=False)
    # level = db.Column(db.Enum(VoterCategory))
    level = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(1000), nullable=False, unique=True)
    phrase = db.Column(db.String(512), unique=True)
    has_voted = db.Column(db.String(10), default="no")
 
    votes = db.relationship("Vote", backref="leggo", lazy="dynamic")