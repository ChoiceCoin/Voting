from flask import Flask, request, render_template, redirect, url_for
from algosdk.v2client import algod
from algosdk import account, encoding, mnemonic, transaction 
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, PaymentTxn, write_to_file
from utils import choice_balance

#The algod_token variable can be changed to your api key on purestake

algod_address = "https://testnet-algorand.api.purestake.io/ps2" 
algod_token = "6HrMYd5r3C59gsCd1zHip5JgDDVwGTAu61L8wQ28"
headers = {"X-API-Key": algod_token }
client = algod.AlgodClient(algod_token,algod_address,headers)

asset_id = 21364625

#You can generate address and mnemonics for each of the variables and edit appropriately. Function to generate key_pair can be found in the utils file
one_address = "TR7QWZCPOBD65PG4UB76XMKCKIFIQZPQOANHPI67NT6UBWNZH6DB5I6D6Y"
one_key = mnemonic.to_private_key("toward label truly episode text oak walk fragile student staff time captain repeat pet lonely slab used affair high power burst object place above build")
two_address = "4SRGIIKJPAGH2YBPBCPNGLQMG5FN72BQKKTZ3SZUXNKGGJLJN75NIRC26Q"
two_key = mnemonic.to_private_key("broccoli style lounge toast connect wage element fantasy hollow amused rate unveil surprise bullet refuse snack play sadness just sand tenant pink pool absent sad")


app = Flask(__name__)


@app.route("/")
def start():
	return render_template('index.html')

@app.route("/results")
def results():
    data = [choice_balance(client, one_address)/100, choice_balance(client, two_address)/100]

    #Can Edit labels to the name of candidates matching the addresses
    result = {"labels": ["WizKid", "Davido"], "data": data}
    return render_template('results.html', result=result)

if __name__ == "__main__":
    app.run()


"""def vote():
    voter = input(str("Vote 0 for zero and vote 1 for one:"))
    params = algod_client.suggested_params()
    if voter is str('1'):
        amount = 100
        vote_address = ""
        transaction = AssetTransferTxn(sender=voter_address, sp=params, receiver=vote_address, amt=amount, index=asset_id)
        signature = transaction.sign(voter_phrase)
        algod_client.send_transaction(signature)
        final = transaction.get_txid()
        print ("Thanks for voting for one.")
        print(final)
    else:
        amount = 100
        vote_address = ""
        transaction = AssetTransferTxn(sender=voter_address, sp=params, receiver=vote_address, amt=amount, index=asset_id)
        signature = transaction.sign(voter_phrase)
        algod_client.send_transaction(signature)
        final = transaction.get_txid()
        print ("Thanks for voting for zero.")
        print(final)

def balance_formatter(amount, asset_id, client):
	asset_info = client.asset_info(asset_id)
	decimals = asset_info['params'].get("decimals")
	unit = asset_info['params'].get("unit-name")
	formatted_amount = amount/10**decimals
	return "{} {}".format(formatted_amount, unit)

# The `check_results_one` function checks the amount of Choice in the address for option one and the `check_results_zero` function checks the amount of Choice in the address for option zero.

def check_results_one():
    asset_id = 42771692 
    address = ""
    account_info = client.account_info(address)
    assets = account_info.get("assets")
    for asset in assets:
        if asset['asset-id'] == asset_id:
            amount = asset.get("amount")
            print("Account {} has {}.".format(address, balance_formatter(amount, asset_id, client)))
            return
        print("Account {} must opt-in to Asset ID {}.".format(address, asset_id))
#check_results_one()

def check_results_zero():
    asset_id = 42771692 
    address = ""
    account_info = client.account_info(address)
    assets = account_info.get("assets")
    for asset in assets:
        if asset['asset-id'] == asset_id:
            amount = asset.get("amount")
            print("Account {} has {}.".format(address, balance_formatter(amount, asset_id, client)))
            return
        print("Account {} must opt-in to Asset ID {}.".format(address, asset_id))
#check_results_zero()

# 6. Build the Best Voting Technology
# The Choice Coin Open Source Software (OSS) Program rewards developers for building Choice Coin software on GitHub.
# Currently, there are two OSS reward structures, the Gold Badge and the Silver Badge. 
# The Silver Badge rewards substantial contributions to the Voting Repository on the Choice Coin GitHub. 
# The Gold Badge rewards deployment of the Decentralized Decisions software for real world use cases.
"""