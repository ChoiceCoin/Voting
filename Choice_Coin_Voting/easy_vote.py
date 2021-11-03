# Copyright Fortior Blockchain, LLLP 2021
# Apache License
# This is a work in progress to create a simplified backend voting architecture.
# This software is under construction.

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
# Choice Asset ID.
asset = 42771692 

# VOID TEST ADDRESS
address = "VSHR4VD3KO362VZJS3TGL7IM4Z6MYEWHXV6TUQPVCRLADRNRKQ63JHJRTM"
# Create new address from scratch
# Variational where each option has an address

def vote():
    voter = input("Vote 0 for zero and vote 1 for one:")
    if voter is 1:
        # send one choice to address
        print ("Thanks for voting for one.")
    else:
        # send zero choice to address
        print ("Thanks for voting for zero.")
vote()

def calculate():
    # Check total Choice in Address
    account_info = algod_client.account_info(address)
    assets = account_info.get("assets") 
    amount = asset.get("amount")
    option_zero = amount * 1
    total_vote = input("Total votes:", total_vote)
    option_one = total_vote - option_one
    print("Option zero:", option_zero) 
    print("Option one:", option_one)
calculate()

def winner():
    if option_zero > option_one:
        print("Option zero wins.")
    else:
        print("Option one wins.")
winner()
