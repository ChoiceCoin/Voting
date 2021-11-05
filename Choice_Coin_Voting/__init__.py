from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import environ, path
from dotenv import load_dotenv


basedir = path.dirname(path.abspath(__file__))
load_dotenv(path.join(basedir, ".env"), verbose=True)



db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{basedir}/voting.db"

    db.init_app(app)

    with app.app_context():
        
        from . import models, routes
        return app