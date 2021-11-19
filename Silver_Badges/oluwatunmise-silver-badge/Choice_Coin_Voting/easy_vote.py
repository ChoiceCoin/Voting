# Copyright Fortior Blockchain, LLLP 2021
# Apache License

# Imports
from algosdk.v2client import algod
from algosdk import account, encoding, mnemonic, transaction 
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, PaymentTxn, write_to_file
from algosdk import mnemonic

# Put Algod Client address here
algod_address = "https://testnet-algorand.api.purestake.io/ps2" 
# Put Algod Token here
algod_token = "" 
headers = {"X-API-Key": algod_token }
# Initializes client for node.
algod_client = algod.AlgodClient(algod_token,algod_address,headers)
# Choice Asset ID.
asset_id = 42771692 

# VOID TEST ADDRESS
vote_address = ""
# Create new address from scratch
# Variational where each option has an address
# VOID TEST ADDRESS
voter_address = ""
voter_phrase = mnemonic.to_private_key("")

def vote():
    voter = input(str("Vote 0 for zero and vote 1 for one:"))
    params = algod_client.suggested_params()
    if voter is str('1'):
        # send one choice to address
        amount = 100
        transaction = AssetTransferTxn(sender=voter_address, sp=params, receiver=vote_address, amt=amount, index=asset_id)
        signature = transaction.sign(voter_phrase)
        algod_client.send_transaction(signature)
        final = transaction.get_txid()
        print ("Thanks for voting for one.")
        print(final)
    else:
        # do not send one choice to address
        print ("Thanks for voting for zero.")
vote()

# TXID: ZZX2ODLUMOG5UC2U6DG4L3NIBAEFXGYMEDDT3QW5HSZNDL6BWRAA
