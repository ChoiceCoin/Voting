# Open Source under Apache License
#To add additional decisions/candiates, add an additional boolean at line 128.
from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from algosdk import account, encoding, mnemonic
from vote import *
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import rsa
from flaskext.mysql import MySQL
from utils import *
import hashlib

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/voting'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

admin_key = "536aecc94ecdd1d499e1496d658c790432f25199f3c810761dbe1d6605da9588cb0c32cd2677cf883e8af59b2d157146bd3b22e3554fd4e574abfa1a41efc41f"

#Model To create Position 
class Position(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(100), unique = True)

	def __init__(self, name) -> None:
		self.name = name

#Model To store candidates
class Candidate(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(100), unique = True)
	position_id = db.Column(db.Integer, db.ForeignKey("position.id"))
	position = db.relationship('Position',
        backref=db.backref('candidates', lazy=True)) 
	biography = db.Column(db.String(100))
	address = db.Column(db.String(512), unique = True)
	phrase = db.Column(db.String(512), unique = True)

	def __init__(self, name, biography, address, phrase, position):
		self.name = name
		self.biography = biography
		self.address = address
		self.phrase = phrase
		self.position_id = position

#Model To Store Voters in The database
class Voter(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(100), unique = True)
	dl = db.Column(db.String(512), unique = True)
	ssn = db.Column(db.String(512), unique = True)
    
	def __init__(self, name, dl, ssn):
		self.name = name
		self.dl = dl
		self.ssn = ssn

#Model To Store Voting Slot
class VotingSlot(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	voter_id = db.Column(db.Integer, db.ForeignKey("voter.id"))
	position_id = db.Column(db.Integer, db.ForeignKey("position.id"))
	voter = db.relationship('Voter',
        backref=db.backref('slots', lazy=True)) 
	position = db.relationship('Position',
        backref=db.backref('voting_slots', lazy=True)) 

	def __init__(self, voter, position):
		self.voter = voter
		self.position = position



#Model To Store Config for Voting
class VotingConfig(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	finished = db.Column(db.Boolean) #starts/ends a voting process
	escrow = db.Column(db.String(512), nullable=True)
	escrow_phrase = db.Column(db.String(512), nullable=True)
	

	def __init__(self, finished, escrow, phrase):
		self.finished = finished
		self.escrow = escrow
		self.escrow_phrase = phrase
	


finished = False
corporate_finished = False
validated = False

@app.route("/")
def start():
	""" Start page """
	return render_template('index.html')

@app.route("/config", methods = ["GET", "POST"])
def set_config():
	error = ""
	message = ""
	if request.method == 'POST':
		escrow = request.form.get('escrow')
		phrase = request.form.get('phrase')
		Key = hashing(str(request.form.get('Key')))
		if str(Key) == admin_key:
			#Verify escrow address and check if escrow as optin-choice
			if not validate_address(escrow):
				error = "Invalid Escrow Address"
				return render_template('config.html', error=error, message=message)
			if not validate_mnemonic(escrow, phrase):
				error = "Account Phrase is Incorrect."
				return render_template('config.html', error=error, message=message)

			if not holding_asset(algod_client, escrow, choice_id):
				error = "Escrow Address Does Not Have Choice in Assets."
				return render_template('confightml', error=error, message=message)
			
			balance = check_balance(escrow, algod_client)
			if balance < 1000:
				error = "Insufficent Balance in Escrow Address."
				return render_template('confightml', error=error, message=message)
			#fetches existing configurations.
			config = VotingConfig.query.filter_by(id=1).first()
			if config:
				config.escrow = escrow
				config.phrase = phrase
				db.session.commit()
				message = "Config Updated Successfully."
			else:
				config = VotingConfig(True, escrow, phrase)
				db.session.add(config)
				db.session.commit()
				message = "Config Created Successfully."
			
		else:
			print("Wrong Key", request.form.get("Key"))
			error = "Incorrect Admin Key"
	return render_template('config.html', error=error, message=message)

@app.route('/position/create', methods = ['POST','GET'])
def add_position():
	error = ""
	message = ""
	if request.method == 'POST':
		name = request.form.get('Name')
		Key = hashing(str(request.form.get('Key')))
		
		if str(Key) == admin_key:
			print("Key is correct")
			#checks if voter exists in db
			position = Position(name=name)
			db.session.add(position)
			db.session.commit()
			message = "Position Added Successfully"
		else:
			print("Wrong Key", request.form.get("Key"))
			error = "Incorrect Admin Key"
	return render_template('pos_create.html', error=error, message=message)

@app.route('/voter/create', methods = ['POST','GET'])
def add_voter():
	error = ""
	message = ""
	if request.method == 'POST':
		name = request.form.get('Name')
		ssn = hashing(str(request.form.get('Social')))
		dl = hashing(str(request.form.get('Drivers')))
		Key = hashing(str(request.form.get('Key')))
		
		if str(Key) == admin_key:
			print("Key is correct")
			#checks if voter exists in db
			if Voter.query.filter_by(ssn=ssn).first():
				error = "Voter Exists"
				return render_template('create.html', error=error, message=message)
			voter = Voter(name, ssn, dl)
			db.session.add(voter)
			db.session.commit()
			positions = db.session.query(Position).all()
			for pos in positions:
				#Create VotingSlots For All Positions
				slot = VotingSlot(voter=voter, position=pos)
				db.session.add(slot)
				db.session.commit()
			
			message = "Voter Added Successfully"
		else:
			print("Wrong Key", request.form.get("Key"))
			error = "Incorrect Admin Key"
	return render_template('create.html', error=error, message=message)

@app.route('/candidate/create', methods = ['POST','GET'])
def add_candidate():
	error = ""
	message = ""
	if request.method == 'POST':
		name = request.form.get('Name')
		position = request.form.get('pos')
		biography = request.form.get('bio')
		Key = hashing(str(request.form.get('Key')))
		if str(Key) == admin_key:
			if Candidate.query.filter_by(name=name).first():
				error = "Candidate Exists"
				return render_template('create_candidate.html', error=error, message=message)
			config = VotingConfig.query.filter_by(id=1).first()
			if not config:
				error = "Cannot Add Candidate Without setting Configurations."
				return render_template('create_candidate.html', error=error, message=message)
			#Generate Algorand Address and key_pair
			#Send 0.1Algo to the Address
			#Opt-in Choice
			address, phrase = generate_algorand_keypair()
			error = send_algo(algod_client, config.escrow, address, config.escrow_phrase, 205000)
			if error:
				error = "Error While Creating Candidate. Try Again"
				return render_template('create_candidate.html', error=error, message=message)
			asset_optin(algod_client, [{"addr": address, "key": mnemonic.to_private_key(phrase)}], choice_id)
			try:
				candidate = Candidate(name, biography, address, phrase, position=position)
				db.session.add(candidate)
				db.session.commit()
			except Exception as e:
				raise e
				#send algo back to escrow in case of failure
				balance = check_balance(address, algod_client)
				send_algo(algod_client, address, config.escrow, phrase, balance-1000)#subtracted 1000 to compensate for fees
				error = "Error While Creating Candidate. Try Again"
				return render_template('create_candidate.html', error=error, message=message)
			message = "Candidate Added Successfully"
		else:
			print("Wrong Key", request.form.get("Key"))
			error = "Incorrect Admin Key"
	positions = db.session.query(Position).all()
	return render_template('create_candidate.html', error=error, message=message, positions=positions)

@app.route('/start', methods = ['POST', 'GET'])
def start_voting():
	error = ''
	message = ''
	if request.method == 'POST':
		candidates = Candidate.query.all()
		key = hashing(str(request.form.get('Key')))
		if key == admin_key:
			config = VotingConfig.query.filter_by(id=1).first()
			if config:
				#An Ongoing Voting Process
				if config.finished == False:
					error = "A Voting Process Is Currently Ongoing. Kindly End to Start A new one."
					return render_template("start.html", message = message, error = error)
			else:
				error = "No Config Found. Please Set Up Config To start a voting process."
				return render_template("start.html", message = message, error = error)
			message = reset_votes(candidates, config)
			config.finished = False #Start A new Voting
			db.session.commit()
		else:
			error = "Incorrect admin key"
	return render_template("start.html", message = message, error = error)

@app.route('/end', methods = ['POST','GET'])
def end():
	error = ''
	message = ''
	result = None
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == admin_key:
			config = VotingConfig.query.filter_by(id=1).first()
			if not config:
				error = "No Voting Process Has Been Started"
			else:
				if config.finished == True:
					error = "No Ongoing Voting Process"
				else:
					#candidates = Candidate.query.all()
					positions = Position.query.all()
					message, result = count_votes(positions)
					print(result)
					config.finished = True
					db.session.commit()
		else:
			error = "Incorrect admin key"
	return render_template("end.html", message = message, error = error, result=result)

@app.route('/vote', methods = ['POST','GET'])
def vote():
	error = ''
	message = ''
	global validated
	global voter_id
	validated = False
	config = VotingConfig.query.filter_by(id=1).first()
	print(config)
	if config:
		finished = config.finished
		print(finished)
		if finished:
			print("Voting Has Finished")
			positions = Position.query.all()
			message, result = count_votes(positions)
			return render_template("end.html", message = message, error = error, result = result)
	else:
		print('No Config')
		error = "Voting Has Not Started"
		return render_template('vote.html', message = message, error = error)

	if request.method == 'POST':
		ssn = hashing(str(request.form.get('Social')))
		dl= hashing(str(request.form.get('Drivers')))
		voter = Voter.query.filter_by(dl=dl, ssn=ssn).first()
		if voter:
			slots = VotingSlot.query.filter_by(voter=voter).first()
			if not slots:
				error = "No More Voting Slots"
			else:
				validated = True
				voter_id = voter.id
				return redirect(url_for('submit'))
		else:
			error = 'Your info is incorrect'
	return render_template('vote.html', message = message, error = error)

@app.route('/faq', methods = ['GET'])
def faq():
	return render_template('faq.html')

@app.route('/submit', methods = ['POST', 'GET'])
def submit():
	error = ''
	message = ''
	global validated
	global voter_id
	positions = Position.query.all()
	candidates = Candidate.query.all()
	messages = []
	if not validated:
		return redirect(url_for('vote'))
	else:
		if request.method == 'POST':
			vote = request.values
			if vote:
				if "default" in vote.values():
					error = "One Or More Candidate Invalid."
				elif not validated:
					error = "Voting Slots Exhausted"
				else:
					for addr in vote.values():
						message = election_voting(addr)
						messages.append(message)
					validated = False
					slots = VotingSlot.query.filter_by(voter_id=voter_id)
					slots.delete()
					db.session.commit()
					voter_id = None
			else:
				error = "You did not enter a vote"
	return render_template('submit_copy.html', messages = messages, error = error, positions=positions, candidates=candidates)

@app.route('/about/')
def about():
	return render_template('about.html')

"""
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

@app.route('/corporatestart', methods = ['POST', 'GET'])
def start_corporate():
	error = ''
	message = ''
	global corporate_finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == admin_key:
			message = reset_corporate_votes()
			corporate_finished = False
		else:
			error = "Incorrect admin key"
	return render_template("start.html", message = message, error = error)

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

@app.route('/endcorporate', methods = ['POST', 'GET'])
def corporate_end():
	error = ''
	message = ''
	global corporate_finished
	if request.method == 'POST':
		key = hashing(str(request.form.get('Key')))
		if key == admin_key:
			message = count_corporate_votes()
			corporate_finished = True
		else:
			error = "Incorrect admin key"
	return render_template('corporateend.html', message = message, error = error)
"""

if __name__ == "__main__":
	app.run(host='127.0.0.1', debug=True)
