# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License
   
from flask import Flask, request, render_template, redirect, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy 
from algosdk import account, encoding, mnemonic

from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import rsa
import hashlib
import sqlite3 as sl
from vote import hashing
from VoteClass import Elect












con = sl.connect('voters.db', check_same_thread = False)
cur = con.cursor()
app = Flask(__name__)
app.secret_key = 'Hello'
finished = False
corporate_finished = False
validated = False

#Sqlite db
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///Voting.db"


app.config['SECRET_KEY'] = 'Hello'

db = SQLAlchemy(app)


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    escrow_mnemonic = db.Column(db.String(200),nullable=False)
    escrow_address = db.Column(db.String(200),nullable=False)
    decision_one = db.Column(db.String(200),nullable=False)
    decision_two = db.Column(db.String(200),nullable=False)
    mnemonic_one = db.Column(db.String(1000),nullable=False)
    mnemonic_two = db.Column(db.String(1000),nullable=False)

    def __repr__(self):
        return "Address" + str(self.id)
    





hashed = 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db'



@app.route("/")
def start():
    """ Start page """
    return render_template('index.html')



@app.route('/address',methods =['POST','GET'])
def address():
    if request.method =='POST':


        escrow_mnemonic = request.form['escr_nm']
        escrow_address = request.form['escr_ad']
        decision_one = request.form['decision_one']
        decision_two = request.form['decision_two']
        mnemonic_one=request.form['mnemonic_one']
        mnemonic_two = request.form['mnemonic_two']
        save = Address(escrow_mnemonic= escrow_mnemonic,escrow_address=escrow_address,decision_one=decision_one,decision_two=decision_two,mnemonic_one=mnemonic_one, mnemonic_two=mnemonic_two)
        db.session.add(save)
        
        db.session.commit()

        
        return redirect('/address')
    return render_template('address.html')

@app.route('/start', methods = ['POST', 'GET'])
def start_voting():
    vote =Elect()
    addresses = Address.query.all()
    error = ''
    message = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        
        if key == hashed:
            message =  vote.reset_votes(addresses)
            finished = False
            return redirect('/create')
        else:
            error = "Incorrect admin key"
    return render_template("start.html", message = message, error = error)


@app.route('/create', methods = ['POST','GET'])
def create():
    if request.method == 'POST':
        Social = hashing(str(request.form.get('Social')))
        Drivers = hashing(str(request.form.get('Drivers')))
        Key = hashing(str(request.form.get('Key')))
        if str(Key) == hashed:
            cur.execute("INSERT INTO USER (DL, SS) VALUES(?,?)",((Drivers,Social)))
            flash('Voter added Succesfully')
            con.commit()
            
    return render_template('create.html')






@app.route('/end', methods = ['POST','GET'])
def end():
    address = Address.query.all()
    to_vote = Elect()

    error = ''
    message = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        if key == hashed:
            message = to_vote.count_votes(address)
            finished = True
        else:
            error = "Incorrect admin key"
    return render_template("end.html", message = message, error = error)







@app.route('/vote', methods = ['POST','GET'])
def vote():
    address=Address.query.all()
    to_vote = Elect()
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
        message = to_vote.count_votes(address)
        return render_template("end.html", message = message, error = error)
    return render_template('vote.html', message = message, error = error)


@app.route('/submit', methods = ['POST', 'GET'])
def submit():

    address= Address.query.all()

    to_vote = Elect()
    error = ''
    message = ''
    global validated
    if not validated:
        return redirect(url_for('vote'))
    else:
        if request.method == 'POST':
             vote = request.values.get("options")
             outspoken = request.values.get("option")
             if vote == 'option1':
                 vote = "YES"
                 message = to_vote.election_voting(vote,address)
             elif vote == 'option2':
                 vote = "NO"
                 message = to_vote.election_voting(vote,address)
            
             else:
                 error = "You did not enter a vote"
    return render_template('submit.html', message = message, error = error)


@app.route('/about/')
def about():
    """about"""
    return render_template('about.html')




if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True)
