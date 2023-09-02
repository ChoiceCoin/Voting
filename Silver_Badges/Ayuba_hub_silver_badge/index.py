# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License
   
from enum import unique
from flask import Flask, request, render_template, redirect, url_for
from algosdk import account, encoding, mnemonic
from vote import election_voting,hashing,corporate_voting,count_votes,count_corporate_votes
from vote import reset_votes, reset_corporate_votes
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import rsa
import hashlib
from flask_sqlalchemy import SQLAlchemy
from flask_user import login_required,UserManager,UserMixin,SQLAlchemyAdapter
import sqlite3 as sl

#Added new sqlite functionality for local devices
con = sl.connect('../voters.db', check_same_thread = False)
cur = con.cursor()

app = Flask(__name__)
finished = False
corporate_finished = False
validated = False

app.config['SECRET_KEY'] = 'ayuba'
#app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://{}:{}@{}/user".format('ayuba', 'jobbman08', 'localhost')
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:////home/ayuba-ezekiel/Desktop/Voting/Choice_Coin_Voting/My_SQL.db'
app.config["CSRF_ENABLED"] = True
app.config["USER_ENABLE_EMAIL"]=False
db = SQLAlchemy(app)



class User(db.Model, UserMixin):
	id = db.Column(db.Integer,primary_key=True)
	username = db.Column(db.String(50),nullable=False, unique=True)
	password = db.Column(db.String(20), server_default='', nullable=False)
	active = db.Column(db.Boolean(),nullable=False,server_default='0')

db_adapter = SQLAlchemyAdapter(db,User)
user_manager = UserManager(db_adapter,app)



@app.route("/")
def start():
	""" Start page """
	return render_template('index.html')

@app.route('/start', methods = ['POST', 'GET'])
def start_voting():
	error = ''
	message = ''
	global finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == 'd5185cae41ff2403553edf8574487f48edc472c3b7a974ac8d74ac77c3dca350c635c0444777b4f8bb78351d89a17f1dd1cc341cb5d86983abb0d54bebb88fc4':
			message = reset_votes()
			finished = False
		else:
			error = "Incorrect admin key"
	return render_template("start.html", message = message, error = error)

@app.route('/create', methods = ['POST','GET'])
def create():
	if request.method == 'POST':
		Social = hashing(str(request.form.get('Social')))
		Drivers = hashing(str(request.form.get('Drivers')))
		Key = hashing(str(request.form.get('Key')))
		if str(Key) == 'd5185cae41ff2403553edf8574487f48edc472c3b7a974ac8d74ac77c3dca350c635c0444777b4f8bb78351d89a17f1dd1cc341cb5d86983abb0d54bebb88fc4':
			cur.execute("INSERT INTO USER (DL, SS) VALUES(?,?)",((Drivers,Social)))
			con.commit()
	return render_template('create.html')

@app.route('/end', methods = ['POST','GET'])
def end():
	error = ''
	message = ''
	global finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == 'd5185cae41ff2403553edf8574487f48edc472c3b7a974ac8d74ac77c3dca350c635c0444777b4f8bb78351d89a17f1dd1cc341cb5d86983abb0d54bebb88fc4':
			message = count_votes()
			finished = True
		else:
			error = "Incorrect admin key"
	return render_template("end.html", message = message, error = error)

@app.route('/vote', methods = ['POST','GET'])
def vote():
	error = ''
	message = ''
	global validated
	validated = False
	if request.method == 'POST':
		Social = hashing(str(request.form.get('Social')))
		Drivers = hashing(str(request.form.get('Drivers')))
		cur.execute("SELECT * FROM USER WHERE SS = ? AND DL = ?",(Social,Drivers))
		account = cur.fetchone()
		if account:
			cur.execute("DELETE FROM USER WHERE SS = ? and DL = ?",(Social,Drivers))
			con.commit()
			validated = True
			return redirect(url_for('submit'))
		else:
			error = 'Your info is incorrect'
	elif finished == True:
		message = count_votes()
		return render_template("end.html", message = message, error = error)
	return render_template('vote.html', message = message, error = error)

@app.route('/submit', methods = ['POST', 'GET'])
def submit():
	error = ''
	message = ''
	global validated
	if not validated:
		return redirect(url_for('vote'))
	else:
		if request.method == 'POST':
			 vote = request.values.get("options")
			 if vote == 'option1':
				 vote = "YES"
				 message = election_voting(vote)
			 elif vote == 'option2':
				 vote = "NO"
				 message = election_voting(vote)
			 else:
				 error = "You did not enter a vote"
	return render_template('submit.html', message = message, error = error)

@app.route('/about/')
def about():
	"""about"""
	return render_template('about.html')

if __name__ == "__main__":
	app.run(host='127.0.0.1', debug=True)
