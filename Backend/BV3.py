# Copyright Fortior Blockchain, LLLP 2021
# Apache License
# This is a work in progress to create a simplified backend voting architecture.
# This software is under construction.

# Imports
from algosdk.v2client import algod
from algosdk import account, encoding, mnemonic, transaction 
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, PaymentTxn, write_to_file

# Put Algod Client address here
algod_address = "https://testnet-algorand.api.purestake.io/ps2" 
# Put Algod Token here
algod_token = "7juTcdmLxzA0uuUyNvrG5BPj7KKRX5n1FXK9aoAa" 
headers = {"X-API-Key": algod_token }
# Initializes client for node.
algod_client = algod.AlgodClient(algod_token,algod_address,headers)
# Choice Asset ID.
asset_id = 42771692 

# Create new address from scratch
# Variational where each option has an address
# VOID TEST ADDRESS
voter_address = "KM2C6WPCGREBUOXZPGULM4UZV7GRF4LECL43FFG3RXNOHROBBCJ662UUBA"
voter_phrase = mnemonic.to_private_key("lumber hair surge miss copper drip forum prepare help solve save unknown empower similar sauce cage series assume frown truck token soccer wheel absent distance")

def vote():
    voter = input(str("Vote 0 for zero and vote 1 for one:"))
    params = algod_client.suggested_params()
    if voter is str('1'):
        # send one choice to address
        amount = 100
        vote_address = "VSHR4VD3KO362VZJS3TGL7IM4Z6MYEWHXV6TUQPVCRLADRNRKQ63JHJRTM"
        transaction = AssetTransferTxn(sender=voter_address, sp=params, receiver=vote_address, amt=amount, index=asset_id)
        signature = transaction.sign(voter_phrase)
        algod_client.send_transaction(signature)
        final = transaction.get_txid()
        print ("Thanks for voting for one.")
        print(final)
    else:
        # do not send one choice to address
        amount = 100
        vote_address = "67HCKTRN3NTX7Q7FEGZAMNCSB7JLZUOPO2556XT4T7E4RB6OR3J3SH6HNQ"
        transaction = AssetTransferTxn(sender=voter_address, sp=params, receiver=vote_address, amt=amount, index=asset_id)
        signature = transaction.sign(voter_phrase)
        algod_client.send_transaction(signature)
        final = transaction.get_txid()
        print ("Thanks for voting for zero.")
        print(final)
vote()
