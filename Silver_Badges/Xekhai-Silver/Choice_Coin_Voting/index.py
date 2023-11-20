# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License

from flask import Flask, request, render_template, redirect, url_for
from flask_mail import Mail,Message
from flask_sock import Sock
from algosdk import account, encoding, mnemonic
from vote import election_voting, hashing, corporate_voting, count_votes, count_corporate_votes
from vote import reset_votes, reset_corporate_votes
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import rsa
import hashlib
import sqlite3 as sl


# Added new sqlite functionality for local devices
con = sl.connect('voters.db', check_same_thread=False)
cur = con.cursor()
app = Flask(__name__)
sock = Sock(app)

finished = False
corporate_finished = False
validated = False
my_key = hashing("mee")

#only update MAIL_USERNAME and MAIL_PASSWORD if gmail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail=Mail(app)

@app.route("/")
def start():
    """ Start page """
    return render_template('index.html')


@app.route('/start', methods=['POST', 'GET'])
def start_voting():
    error = ''
    messe = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        if key == my_key:
            msg = 'Hi, Voting Has Begun, You can now vote'
            subject = 'Choice Coin Voting'
            
            messe = 'Votes Started'
            finished = False
            test = cur.execute("SELECT email FROM USER")
            rows = cur.fetchall()
            mails=[]

            for row in rows:
                mails.append(row[0])
            message = Message(subject, sender='Choice Coin Voting', recipients=mails)
            message.body = msg
            mail.send(message)
            print (mails)
        else:
            error = "Incorrect admin key"
    return render_template("start.html", message=messe, error=error)


@app.route('/create', methods=['POST', 'GET'])
def create():

    if request.method == 'POST':
        Social = hashing(str(request.form.get('ssn')))
        Drivers = hashing(str(request.form.get('dl')))
        Mail = str(request.form.get('mail'))
        Key = hashing(str(request.form.get('Key')))
        if str(Key) == my_key:
            cur.execute("INSERT INTO USER (DL, SS, email) VALUES(?,?,?)", ((Drivers, Social, Mail)))
            con.commit()
            msg = 'Hi, Your account for the choice coin voting system has been created'
            subject = 'Choice Coin Voting'
            email = Mail
            message = Message(subject, sender='Choice Coin Voting', recipients=[email])
            message.body = msg
            mail.send(message)

    return render_template('create.html')


@app.route('/end', methods=['POST', 'GET'])
def end():
    error = ''
    messe = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        if key == my_key:
            messe = count_votes()
            finished = True
            test = cur.execute("SELECT email FROM USER")
            rows = cur.fetchall()
            mails=[]
            subject = 'Choice Coin Voting'

            for row in rows:
                mails.append(row[0])
            message = Message(subject, sender='Choice Coin Voting', recipients=mails)
            message.body = messe
            mail.send(message)
            print (mails)
       
        else:
            error = "Incorrect admin key"
    return render_template("end.html", message=messe, error=error)


@app.route('/vote', methods=['POST', 'GET'])
def vote():
    error = ''
    message = ''
    global validated
    validated = False
    if request.method == 'POST':
        Social = hashing(str(request.form.get('Social')))
        Drivers = hashing(str(request.form.get('Drivers')))
        cur.execute("SELECT * FROM USER WHERE SS = ? AND DL = ?", (Social, Drivers))
        account = cur.fetchone()
        if account:
            # cur.execute("DELETE FROM USER WHERE SS = ? and DL = ?", (Social, Drivers))
            # con.commit()
            validated = True
            return redirect(url_for('submit'))
        else:
            error = 'Your info is incorrect'
    elif finished == True:
        message = count_votes()
        return render_template("end.html", message=message, error=error)
    return render_template('vote.html', message=message, error=error)


@app.route('/submit', methods=['POST', 'GET'])
def submit():
    error = ''
    message = ''
    subject = 'Choice Coin Voting'
    global validated
    if not validated:
        return redirect(url_for('vote'))
    else:
        if request.method == 'POST':
            vote = request.values.get("options")
            if vote == 'option1':
                vote = "YES"
                message = election_voting(vote)
                msg = 'Hi, Your vote has been logged.Your Transaction reference is ' + message
                message = Message(subject, sender='Choice Coin Voting', recipients=[request.form.get('mail')])
                message.body = msg
                mail.send(message)
                message = 'Thanks for voting'
            
            elif vote == 'option2':
                vote = "NO"
                message = election_voting(vote)
                msg = 'Hi, Your vote has been logged.Your Transaction reference is ' + message
                message = Message(subject, sender='Choice Coin Voting', recipients=[request.form.get('mail')])
                message.body = msg
                mail.send(message)
                message = 'Thanks for voting'
        
            else:
                error = "You did not enter a vote"
    return render_template('submit.html', message=message, error=error)


@app.route('/about/')
def about():
    """about"""
    return render_template('about.html')


if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True)

