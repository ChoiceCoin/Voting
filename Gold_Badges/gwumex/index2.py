# Open Source under Apache License
#To add additional decisions/candiates, add an additional boolean at line 128.
from flask import Flask, request, render_template, redirect, url_for
# from algorand_demo import algo_trade,choice_trade,create_optin,main_exchange
from algosdk import account, encoding, mnemonic
from vote import election_voting,hashing,corporate_voting,count_votes,count_corporate_votes
from vote import reset_votes, reset_corporate_votes
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import rsa
from flaskext.mysql import MySQL
import hashlib

app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'voting'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cur = conn.cursor()

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
		if key == 'cddf00a1c7f751001b66464db59740526f9fc80b650228e7d5022e04abae195d208d0d5efa501b33e57d192a95378ebb81a705b7a3b80597ccaf497506f715f1':
			message = reset_votes()
			finished = False
		else:
			error = "Incorrect admin key"
	return render_template("start.html", message = message, error = error)

@app.route('/corporatestart', methods = ['POST', 'GET'])
def start_corporate():
	error = ''
	message = ''
	global corporate_finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == 'cddf00a1c7f751001b66464db59740526f9fc80b650228e7d5022e04abae195d208d0d5efa501b33e57d192a95378ebb81a705b7a3b80597ccaf497506f715f1':
			message = reset_corporate_votes()
			corporate_finished = False
		else:
			error = "Incorrect admin key"
	return render_template("start.html", message = message, error = error)

@app.route('/end', methods = ['POST','GET'])
def end():
	error = ''
	message = ''
	global finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == 'cddf00a1c7f751001b66464db59740526f9fc80b650228e7d5022e04abae195d208d0d5efa501b33e57d192a95378ebb81a705b7a3b80597ccaf497506f715f1':
			message = count_votes()
			finished = True
		else:
			error = "Incorrect admin key"
	return render_template("end.html", message = message, error = error)

@app.route('/endcorporate', methods = ['POST', 'GET'])
def corporate_end():
	error = ''
	message = ''
	global corporate_finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == 'cddf00a1c7f751001b66464db59740526f9fc80b650228e7d5022e04abae195d208d0d5efa501b33e57d192a95378ebb81a705b7a3b80597ccaf497506f715f1':
			message = count_corporate_votes()
			corporate_finished = True
		else:
			error = "Incorrect admin key"
	return render_template('corporateend.html', message = message, error = error)

@app.route('/vote', methods = ['POST','GET'])
def vote():
	error = ''
	message = ''
	global validated
	validated = False
	if request.method == 'POST':
		Social = hashing(str(request.form.get('Social')))
		Drivers = hashing(str(request.form.get('Drivers')))
		cur.execute("SELECT * FROM accounts WHERE SS = %s AND DL = %s",(Social,Drivers))
		account = cur.fetchone()
		if account:
			cur.execute("DELETE FROM accounts WHERE SS = %s and DL = %s",(Social,Drivers))
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

@app.route('/corporate', methods = ['POST','GET'])
def corporate():
	error = ''
	message = ''
	if request.method == 'POST':
		Key = hashing(str(request.form.get('Secret')))
		Percentage = request.form.get('Stake')
		vote = request.values.get("options")
		cur.execute("SELECT * FROM corporate WHERE Secret = %s and Stake = %s",(Key,Percentage))
		check = cur.fetchone()
		if check:
			if vote == 'option1':
				vote = "YES"
				message = corporate_voting(vote,Percentage)
				cur.execute("DELETE FROM corporate WHERE Secret = %s and Stake = %s",(Key,Percentage))
				conn.commit()
			elif vote == 'option2':
				vote = "NO"
				message = corporate_voting(vote,Percentage)
				cur.execute("DELETE FROM corporate WHERE Secret = %s and Stake = %s",(Key,Percentage))
				conn.commit()
			else:
				error = "You did not enter a vote"
		else:
			error = "Your information was incorrect"
	elif corporate_finished == True:
		message = count_corporate_votes()
		return render_template('end.html' ,message = message, error = error)
	return render_template('corporate.html', message = message, error = error)

@app.route('/create', methods = ['POST','GET'])
def create():
	if request.method == 'POST':
		Name = request.form.get('Name')
		Social = hashing(str(request.form.get('Social')))
		Drivers = hashing(str(request.form.get('Drivers')))
		Key = hashing(str(request.form.get('Key')))
		cur.execute("INSERT INTO accounts (name, DL, SS) VALUES(%s,%s,%s)",((Name,Drivers,Social)))
		conn.commit()
	return render_template('create.html')

@app.route('/corporate_creation',methods = ['POST','GET'])
def corporate_create():
	if request.method == 'POST':
		Name = request.form.get('Name')
		Key = hashing(str(request.form.get('Secret')))
		Percentage = request.form.get('Stake')
		Main = hashing(str(request.form.get('Main')))
		if Main == "":
			cur.execute("INSERT INTO corporate (name, Secret, Stake) VALUES(%s,%s,%s)",((Name,Key,Percentage)))
			conn.commit()
	return render_template('corporatecreate.html')

@app.route("/security/")
def security():
	"""security"""
	return render_template('security.html')   

    
@app.route("/deposit/")
def deposit():
	"""deposit"""
	return render_template('deposit.html')   


@app.route('/about/')
def about():
	"""about"""
	return render_template('about.html')
    
@app.route("/showResult/")
def showResult():
	"""showResult"""
	return render_template('showResult.html')
    
@app.route("/contactus/")
def contactus():
	"""contactus"""
	return render_template('contact.html')
    
@app.route("/promotions/")
def promotions():
	"""promotions"""
	return render_template('promotions.html')
    
@app.route("/community/")
def community():
	"""community"""
	return render_template('community.html')
    
@app.route("/projects/")
def projects():
	"""projects"""
	return render_template('index.html, #projects')
    
    
@app.route("/Faq/")
def Faq():
	"""Faq"""
	return render_template('Faq.html')
Faq

if __name__ == "__main__":
	app.run(host='127.0.0.1', debug=True)
