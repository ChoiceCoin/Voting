# Copyright Fortior Blockchain, LLLP 2021

# Imports
from algosdk import account, encoding, mnemonic,transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod

# Put Algod Client address here
algod_address = "https://testnet-algorand.api.purestake.io/idx2" 
# Put Algod Token here
algod_token = "" 
headers = {"X-API-Key": algod_token }
# Initializes client for node.
algod_client = algod.AlgodClient(algod_token,algod_address,headers)
# Choice TestNet Asset ID.
asset_id = 21364625 


# VOID TEST ADDRESS
vote_address = "66PWZ4YF7MT6SRAFESWZ44KA262BLNSH6PTE7CUULPIHMNWYX4ZGPMZJMQ"

def vote():
    voter = print("Vote 0 for zeo and vote 1 for one:", input(voter))
    if voter is 1:
        # send one choice to vote_address
        print ("Thanks for voting for one.")
    else:
        # send zero choice to vote_address
        print ("Thanks for voting for zero.")
vote()

def calculate():
    # Check total Choice in Address
    
    # Fetch account information for the address.
    # account_info = algod_client.account_info(address) 

    # Fetch asset information.
    # assets = account_info.get("assets") 

    total_votes = total_transactions/2
    option_zero_votes = total_votes - voter
    option_one_votes = voter

calculate()

def winner():
    if option_zero_votes > option_one_votes:
        print("Option zero wins.")
    else:
        print("Option one wins.")
winner()
