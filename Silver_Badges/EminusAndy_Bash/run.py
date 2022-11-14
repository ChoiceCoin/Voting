#!/usr/bin/env python3

from unicodedata import category
from flask import Flask, render_template, request, flash
from dotenv import load_dotenv

from config import Debug, Production
from model import db, Developers

load_dotenv()

app = Flask(__name__)
app.config.from_object(Debug)

db.init_app(app)


@app.route('/', methods=["GET", "POST"])
def index():
  if request.method == "POST":
    try:
      data = request.form
      walletId = Developers.query.filter_by(wallet=data['wallet']).first()
      if (walletId):
        flash('Developer with that wallet already exist', category='warning')
        return render_template('index.html')
      developer = Developers(**data)
      db.session.add(developer)
      db.session.commit()
      flash('Added developer successfully', category='success')
    except Exception as e:
      flash('An error occured. Please try again.', category='danger')
      print(f'An error occured: {str(e)}')
  return render_template('index.html')


@app.route('/payment', methods=["GET", "POST"])
def payment():
  if request.method == "POST":
    try:
      data = request.form
    except Exception as e:
      flash('An error occured. Please try again.', category='danger')
      print(f'An error occured: {str(e)}')
  return render_template("reward.html")

if __name__ == '__main__':
  with app.app_context():
    db.create_all()
    app.run()
