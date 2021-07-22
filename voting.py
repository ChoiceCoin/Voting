from algosdk import account, encoding, mnemonic,transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
from algorand_demo import choice_trade
algod_address = ""
algod_token = ""
#Initializes Client for node
headers = {"X-API-Key": algod_token }
algod_client = algod.AlgodClient(algod_token,algod_address,headers)
fund_address = "" #Put in main fund address here
fund_mnemonic = "" #Put in main fund receiver_mnemonic here
fund_key = mnemonic.to_private_key(fund_mnemonic)
choice_id = 17264161 #Official Test Asset ID for Choice Coin
decision_one = ""
decision_two = ""
test_address = ''
test_mnemonic = ''

def algo_inital(sender, key, receiver,comment):
    parameters = algod_client.suggested_params()
    #Initalize parameters
    transaction = PaymentTxn(sender, parameters, receiver, 300000,note=comment)
    #Defines an inital transaction for Algo.
    #Add some sort of hash to ensure that fund addresses are hashed properly
    #Add a hash to ensure that client addresses are protected
    signature = transaction.sign(key)
    #Signs the transaction with the sender's private key
    algod_client.send_transaction(signature)
    #Sends the transaction with the signature
    return True



def count(address):
    message = ''
    error = ''
    account_info = algod_client.account_info(address)
    assets = account_info.get("assets")
    for asset in assets:
        if asset["asset-id"] ==  choice_id:
            amount = asset.get("amount")
            message = amount
            return message
    error = 'The account has not opted-in to the asset yet.'
    return error





def choice_vote(sender, key, receiver,amount):
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(sender, parameters, receiver, amount, choice_id)
    #Defines an inital transaction for choice Coin
    signature = transaction.sign(key)
    #Signs the transaction with the senders private key
    algod_client.send_transaction(signature)
    #Sends the transaction with the signature
    final = transaction.get_txid()
    return True, final

def create_optin(receiver_mnemonic,receiver_address,index):
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(receiver_address, parameters, receiver_address, 0, index)
    #Defines a transaction that will opt the receiver into the asset.
    key = mnemonic.to_private_key(receiver_mnemonic)
    signature = transaction.sign(key)
    algod_client.send_transaction(signature)
    #Opts-in the account to the asset
    return True



def initiate_new_accounts():
    x = input("How many voters do you need?")
    x = int(x)
    for y in range(0,x):
        private,public = account.generate_account()
        passphrase = mnemonic.from_private_key(private)
        algo_inital(fund_address,fund_key,public,"Balance to opt-in to Choice Coin")
        create_optin(passphrase,public,choice_id)
        print("Address: {}\nPasscode: \"{}\"".format(public, passphrase))


def new_vote(vote,address,t_mnemonic):
    private_key = mnemonic.to_private_key(mnemonic)
    if vote == "Yes":
        choice_vote(address,private_key,decision_one,100)
    elif vote == "No":
        choice_vote(address,private_key,decision_two,100)
    else:
        print("You did not submit the proper input")


def star_voting(address,t_mnemonic,candidate_rating,candiate_type):
    if candiate_type == 'one':
        candiate_rating = int(candidate_rating)
        amount = candiate_rating * 100
        private_key = mnemonic.to_private_key(t_mnemonic)
        choice_vote(address,private_key,decision_one,amount)
    elif candiate_type == 'two':
        candiate_rating = int(candidate_rating)
        amount = candiate_rating * 100
        private_key = mnemonic.to_private_key(t_mnemonic)
        choice_vote(address,private_key,decision_one,amount)
    print("Ballot Tabulated")


def approval_voting(address,t_mnemonic):
    first = input("Do you approve of first decision? Please answer using Yes or No")
    second = input("Do you approve of second decision? Please answer using Yes or No")
    first = first.lower()
    second = second.lower()
    if first == 'yes':
        choice_vote(address,private_key,decision_one,100)
    elif second == 'yes':
        choice_vote(address,private_key,decision_two,100)

def count_votes():
    yes_count = check_holdings(decision_one)
    no_count = check_holding(decision_two)
    if yes_count > no_count:
        print("Decision One had the most votes!")
    if no_count > yes_count:
        print("Decision Two had the most votes!")
