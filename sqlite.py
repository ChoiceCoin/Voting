from dotenv import load_dotenv
from Choice_Coin_Voting import create_app, db
import os

load_dotenv()
os.getenv('SQLALCHEMY_DATABASE_URI')
app = create_app()
app.app_context().push() 
db.create_all()