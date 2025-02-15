#!/usr/bin/env python3

import json
from functools import wraps

from flask import Flask, render_template, request, flash, url_for, redirect, session, jsonify
from flask_session import Session
from dotenv import load_dotenv
from algosdk import encoding, mnemonic

from config import Debug, Production
from util import getAccountInfo

_debug = True

load_dotenv()

app = Flask(__name__)
app.config.from_object(Debug if _debug else Production)
Session(app)

def account_required(func):
  @wraps(func)
  def wrap(*args, **kwargs):
    if 'account' in session:
      return func(*args, **kwargs)
    else:
      flash("You wallet has not been connected", 'success')
      return redirect(url_for('index'))
  return wrap



@app.route('/', methods=["GET", "POST"])
def index():
  if 'account' in session:
    return redirect(url_for('dashboard'))
  if request.method == "POST":
    try:
      data = request.json
      if encoding.is_valid_address(data.get('addr')):
        session['account'] = data
        print(data)
        flash('Added Wallet successfully', category='success')
        return redirect(url_for('dashboard'))
      else:
        print('Address is invalid')
        flash('The Address is invalid', category='danger')
    except Exception as e:
      flash('An error occured. Please try again.', category='danger')
      print(f'An error occured: {str(e)}')
  return render_template('index.html')


@app.route('/dashboard', methods=["GET", "POST"])
@account_required
def dashboard():
  account = session['account']
  accountInfo = getAccountInfo(account)
  return render_template("dashboard.html", accountInfo=accountInfo, account=account)

@app.route("/logout")
def logout():
  session.clear()
  flash("You have been logged out!", 'success')
  return redirect(url_for('index'))

if __name__ == '__main__':
  app.run()
