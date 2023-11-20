# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License
   
from flask import Flask, request, render_template, redirect, url_for
from algosdk import account, encoding, mnemonic
from vote import election_voting,hashing,corporate_voting,count_votes,count_corporate_votes
from vote import reset_votes, reset_corporate_votes
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import rsa
import hashlib
import sqlite3 as sl

#Added new sqlite functionality for local devices
con = sl.connect('voters.db', check_same_thread = False)
cur = con.cursor()
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
		key = hashing(str(request.form.get('Key')))
		if key == '09a1d01b5b120d321de9529369640316ddb120870df1ec03b3f2c6dd39c1ff6ecf8de5e56eb32d79c9d06240eaf5de027f6e7b9df2e2e1a4cb38dd548460b757':
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
		if str(Key) == '09a1d01b5b120d321de9529369640316ddb120870df1ec03b3f2c6dd39c1ff6ecf8de5e56eb32d79c9d06240eaf5de027f6e7b9df2e2e1a4cb38dd548460b757':
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
		if key == '09a1d01b5b120d321de9529369640316ddb120870df1ec03b3f2c6dd39c1ff6ecf8de5e56eb32d79c9d06240eaf5de027f6e7b9df2e2e1a4cb38dd548460b757':
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
