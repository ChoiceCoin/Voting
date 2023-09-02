# Copyright Fortior Blockchain, LLLP 2021
# Open Source under Apache License

from flask import Flask, request, render_template, redirect, url_for
from flask_sock import Sock
from algosdk import account, encoding, mnemonic
from vote import election_voting, hashing, count_votes
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
adminLogin = False
corporate_finished = False
validated = False
my_key = hashing("tee")

@app.route("/")
def start():
    """ Start page """
    return render_template('index.html')


@app.route('/start', methods=['POST', 'GET'])
def start_voting():
    error = ''
    message = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        if key == my_key:
            # message = reset_votes()
            finished = False
            message = 'Petition Started'
        else:
            error = "Incorrect admin key"
    return render_template("startprocess.html", message=message, error=error)


@app.route('/overview', methods=['POST', 'GET'])
def create():
    return render_template('overview.html')

@app.route('/admin', methods=['POST', 'GET'])
def verify():
    if request.method == 'POST':
        Social = hashing(str(request.form.get('Social')))
        Drivers = hashing(str(request.form.get('Drivers')))
        Key = hashing(str(request.form.get('Key')))
        if str(Key) == my_key:
            return render_template('overview.html')
    return render_template('adminLogin.html')


@app.route('/end', methods=['POST', 'GET'])
def end():
    error = ''
    message = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        if key == my_key:
            message = count_votes()
            finished = True
        else:
            error = "Incorrect admin key"
    return render_template("endprocess.html", message=message, error=error)

@app.route('/view', methods=['POST', 'GET'])
def view():
    count_votes()
    return render_template("viewprogress.html")


@app.route('/vote', methods=['POST', 'GET'])
def vote():
    message = ''
    if request.method == 'POST':
        
        message = election_voting()
        count_votes() 
    return render_template('vote.html', message=message)


@app.route('/about/')
def about():
    """about"""
    return render_template('about.html')


if __name__ == "__main__":
    app.run(host='127.0.0.1', debug=True)

