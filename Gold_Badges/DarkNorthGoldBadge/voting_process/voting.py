#This defines voting functions using traditional majority, STAR, and approval protocols.
#All of the protocols below use Choice Coin to both quantify and send votes.
#The funcions also define the ability to create accounts for an arbitary amount of voters.
#The protocols below are minimum representations for two candidates, decisions,etc.
#Read the Docs to learn how to add more candiates, decisions, and how to implement this protocol 
#into you governance system.

from algosdk import account, encoding, mnemonic,transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
from algorand_demo import choice_trade
aalgod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "ti4RqMynth6ecRMzEDRI414YbBppr4ociEOFKkLi"

headers = {"X-API-Key": algod_token}
algod_client = algod.AlgodClient(algod_token, algod_address, headers)
escrow_address = "6KCOIOQB77UTHE67QUVJJ3NDGQCIBGO67KGOEYZZATIGK7KBU34EWG52AE"
escrow_mnemonic = "left later pencil gospel coast eight agree spatial raccoon absorb victory tell pioneer actor mouse " \
                  "refuse suggest help pledge tape oil drop gym absent raise "
fund_address = "WHNTB5KQTGKBQSZAJ5VX745SGYJTCKSQ2PX7KA3MVCXV7FNAEGLIGOKOZE"
fund_mnemonic = "foam fault power empty bulb usage round guard evoke city wish screen logic express assume extra " \
                "copper kind prize table math wheat bargain absorb like "
choice_id = 17264161
fund_key = mnemonic.to_private_key(fund_mnemonic)


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



#This is quantifies a voter's vote and allows its to be recorded on the Algorand Blockchain through Choice Coin.
#Each of the candiates/decisions will have their own Algorand Accounts to recieve these votes in the form of Choice Coin.
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


#This allows the organization to generate an arbitary amount of Algorand Accounts for its voters.
def initiate_new_accounts():
    x = input("How many voters do you need?")
    x = int(x)
    for y in range(0,x):
        private,public = account.generate_account()
        passphrase = mnemonic.from_private_key(private)
        algo_inital(fund_address,fund_key,public,"Balance to opt-in to Choice Coin")
        create_optin(passphrase,public,choice_id)
        print("Address: {}\nPasscode: \"{}\"".format(public, passphrase))


        
#This defines a basic majority scheme on the Algorand Blockchain using the choice_vote function described earlier.       
def new_vote(vote,address,t_mnemonic):
    private_key = mnemonic.to_private_key(mnemonic)
    if vote == "Yes":
        choice_vote(address,private_key,decision_one,100)
    elif vote == "No":
        choice_vote(address,private_key,decision_two,100)
    else:
        print("You did not submit the proper input")

#This defines a basic Star_Voting scheme using Choice Coin. Users are allowed to rate
#each candidate. Once they have done this, the choice_vote function will
#send the appropriate allocation of Choice Coin to the winner account.
#Read the docs to create a restriction on how many start per voter
#are possible.
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

#This defines a basic approval voting system. Again, this allows the voter 
#to select all the decisons/candidates they approve of. This again only has two decisions.
#Read our Docs to find out more!
def approval_voting(address,t_mnemonic):
    first = input("Do you approve of first decision? Please answer using Yes or No")
    second = input("Do you approve of second decision? Please answer using Yes or No")
    first = first.lower()
    second = second.lower()
    if first == 'yes':
        choice_vote(address,private_key,decision_one,100)
    elif second == 'yes':
        choice_vote(address,private_key,decision_two,100)
        
def check_holdings(asset_id, address):
	"""
	Checks the asset balance for the specific address and asset id.
	"""
	account_info = client.account_info(address)
	assets = account_info.get("assets")
	for asset in assets:
		if asset['asset-id'] == asset_id:
			amount = asset.get("amount")
			print("Account {} has {}.".format(address, balance_formatter(amount, asset_id, client)))
			return
	print("Account {} must opt-in to Asset ID {}.".format(address, asset_id))
    
  
#This is a stateful smart contract to count the number of votes each candiate recieved
#on the Algorand Blockchain.
def count_votes():
    yes_count = check_holdings(decision_one)
    no_count = check_holding(decision_two)
    if yes_count > no_count:
        print("Decision One had the most votes!")
    if no_count > yes_count:
        print("Decision Two had the most votes!")
