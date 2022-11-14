# Voting using Choice Coin

# A map to building decision software on Algorand

# Overview
##################################
# This Tutorial is a guide to building voting technology on Algorand using Choice Coin. 
# Choice Coin is an Algorand Standard Asset (ASA) for solving the decentralized governance problem, which refers to the lack of a secure and autonomous process for decentralized organizations to make decisions. 
# This Tutorial focuses on getting started with Decentralized Decisions, an open source voting software powered by Choice Coin.

# Requirements
##################################
# All requirements for this Tutorial can be found in the [requirements.txt](https://github.com/ChoiceCoin/Voting/blob/main/Choice_Coin_Voting/requirements.txt) file on the Choice Coin GitHub. 
# To install the requirements run: 

pip install requirements.txt

# Background
##################################
# Collective decision making is an important and essential part of groups across the world. 
# Governments, corporations, charities, and many other organizations use voting as a means for making decisions impacting collections of people. Indeed, voting happens across industry – from corporate shareholder meetings to political elections. 
# Fundamentally, voting is a method by which collective information is processed to determine consensus and make decisions. 

# The purpose of Choice Coin is to allow decentralized organizations to govern themselves and control digital assets in an equitable fashion. More and more, organizations developing projects in Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), and blockchain networks need a way to govern. Contrary to centralized systems, which are inherently hierarchical and pyramid like in nature, decentralized systems distribute power and decision making across global networks in a fair fashion. Thus, there exists a need for a way decentralized organizations can make decisions across distributed ledgers.

# Decentralized Decisions is a software designed to meet this need and provide a ready to use decentralized voting application using Choice Coin on the Algorand Network. 
# The Decentralized Decisions software is open source and available on GitHub. 
# The main programming language used for Decentralized Decisions development is Python, however the software may be written in other languages too, such as JavaScript.

# Steps
##################################
# 1. Import Algorand Python-SDK
# Start by importing the necessary dependencies from the Algorand Python-SDK.

from algosdk.v2client import algod
from algosdk import account, encoding, mnemonic, transaction 
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, PaymentTxn, write_to_file

# 2. Connect to the Network 
# Connect to the Algorand Network using the [PureStake API](https://developer.purestake.io/).

algod_address = "https://testnet-algorand.api.purestake.io/ps2" 
algod_token = "" 
headers = {"X-API-Key": algod_token }
algod_client = algod.AlgodClient(algod_token,algod_address,headers)

# 3. Set Voting Variables
# Set the variables for voting using Choice Coin and for the specific voter's Algorand address.

asset_id = 42771692
voter_address = ""
voter_phrase = mnemonic.to_private_key("")

# 4. Vote
# The `vote` function allows voters to make a vote between two choices, zero and one. 
# The code block presents the voter with a choice to `Vote 0 for zero and vote 1 for one`.
# These variables may be changed to correspond with many different options, such as candidates in an election, an approval on a decentralized autonomous organization (DAO) proposal, or whether to appoint a new board member in a corporation.

def vote():
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
vote()
`
# Here, the two `vote_address` variables refer to the respective choices available, so they should each be set to different addresses. 
# In turn, the respective addresses may correspond with any two choices which may be voted upon and more addresses may be added to accommodate additional selection options. 

# 5. Check Results
# The `balance_formatter` function, cleans the asset data and is called by the `check_results` functions.

def balance_formatter(amount, asset_id, client):
	asset_info = client.asset_info(asset_id)
	decimals = asset_info['params'].get("decimals")
	unit = asset_info['params'].get("unit-name")
	formatted_amount = amount/10**decimals
	return "{} {}".format(formatted_amount, unit)`

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
check_results_one()

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
check_results_zero()`

# 6. Build the Best Voting Technology
# The Choice Coin Open Source Software (OSS) Program rewards developers for building Choice Coin software on GitHub.
