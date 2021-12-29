from flask import Blueprint, Flask, render_template, request
from algosdk import mnemonic
from algod import get_balance, create_account, voting

app= Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
	balance= get_balance("F7NMTMC5X63DDZVV7HCB2VJCUIBHOXOYVB46MZJOM6OLCH47VFN7DA7RAY")
	message= voting()
	return render_template('index.html')


if __name__ == "__main__":
	app.run(debug=True)