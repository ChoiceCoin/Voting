# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License
   
from flask import Flask, request, render_template, redirect, url_for
from algosdk import account, encoding, mnemonic
from vote import election_voting,hashing,corporate_voting,count_votes,count_corporate_votes
from vote import reset_votes, reset_corporate_votes
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
from utils import hashing, check_secret_authentication
from queries import create_query, vote_select_query, vote_delete_query
from decouple import config
from db import cursor, conn
import locale
import rsa
import hashlib
import sqlite3 as sl

#Use the system default's default encoding to prevent issues
config.encoding = locale.getpreferredencoding(False)
SECRET_KEY = config('SECRET_KEY')
MYSQL_DB = config('VOTERS_DB')

#Added new sqlite functionality for local devices
# conn = sl.connect(MYSQL_DB, check_same_thread = False)
# cursor = conn.cursor()
app = Flask(__name__)

finished = False
corporate_finished = False
validated = False


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
		if check_secret_authentication(request.form.get('Key')):
			message = reset_votes()
			finished = False
		else:
			error = "Incorrect admin key"
	return render_template("start.html", message = message, error = error)

@app.route('/create', methods = ['POST','GET'])
def create():
	if request.method == 'POST':
		social = hashing(str(request.form.get('Social')))
		drivers = hashing(str(request.form.get('Drivers')))
		if check_secret_authentication(request.form.get('Key')):
			cursor.execute(create_query, ((drivers, social)))
			conn.commit()
	return render_template('create.html')

@app.route('/end', methods = ['POST','GET'])
def end():
	error = ''
	message = ''
	global finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == SECRET_KEY:
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
		social = hashing(str(request.form.get('Social')))
		drivers = hashing(str(request.form.get('Drivers')))
		cursor.execute(vote_select_query, (social, drivers))
		account = cursor.fetchone()
		if account:
			cursor.execute(vote_delete_query,(social,drivers))
			conn.commit()
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
