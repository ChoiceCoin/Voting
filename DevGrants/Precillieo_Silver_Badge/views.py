from flask import Blueprint, Flask, render_template, request
from algosdk import mnemonic
from algod import get_balance, create_account, voting

app= Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
	balance= get_balance("")
	message= voting()
	return render_template('index.html')


if __name__ == "__main__":
	app.run(debug=True)