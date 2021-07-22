#This defines a basic voting protocl using Choice Coin on the Algorand Blockchain.
#It allows for the creation of an arbitary amount of accounts/voters, and then 
#opts them into Choice Coin. 
#Finally it defines a basic first-past-the-pole vote.



from algosdk import account, encoding, mnemonic,transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "5iDNC5wssQ2e2SWgaY1XH2FOnlQZG2v28JPUkD1L"
#Initializes Client for node
headers = {"X-API-Key": algod_token }
algod_client = algod.AlgodClient(algod_token,algod_address,headers)
fund_address = "KM2C6WPCGREBUOXZPGULM4UZV7GRF4LECL43FFG3RXNOHROBBCJ662UUBA" #Put in main fund address here
fund_mnemonic = "lumber hair surge miss copper drip forum prepare help solve save unknown empower similar sauce cage series assume frown truck token soccer wheel absent distance" #Put in main fund receiver_mnemonic here
fund_key = mnemonic.to_private_key(fund_mnemonic)
choice_id = 17264161 #Official Test Asset ID for Choice Coin
decision_one = "QFT3M37MTBY334QB6RNG5STUC343F6ZUVEGHZ2YHEHGEGWOJAIQTO43GJM"
decision_two = "JOOXW4EXNN2RL7KU2YWXR5I443CR5ISCPBHSQ3MAVE6743FIBCDBB5GGXA"

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





def choice_vote(sender, key, receiver):
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(sender, parameters, receiver, 100, choice_id)
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


        
        
        
def new_vote(vote,address,mnemonic):
    if vote == "Yes":
        choice_trade(address,mnemonic,decision_one)
    elif vote == "No":
        choice_trade(address,mnemonic,decision_two)
    else:
        print("You did not submit the proper input")

def count_votes():
    yes_count = check_holdings(decision_one)
    no_count = check_holding(decision_two)
    if yes_count > no_count:
        print("Decision One had the most votes!")
    if no_count > yes_count:
        print("Decision Two had the most votes!")
