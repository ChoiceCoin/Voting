# Copyright Fortior Blockchain, LLLP 2021
# Apache License


# Imports
from algosdk.v2client import algod
from algosdk import account, mnemonic, transaction
from algosdk.future.transaction import AssetTransferTxn

# Put Algod Client address here
algod_address = "https://testnet-algorand.api.purestake.io/ps2"
# Put Algod Token here
algod_token = ""
headers = {"X-API-Key": algod_token}
# Initializes client for node.
algod_client = algod.AlgodClient(algod_token, algod_address, headers)
# Choice Asset ID.
asset_id = 42771692

# Create new address from scratch
# Variational where each option has an address
# VOID TEST ADDRESS
voter_address = ""
voter_phrase = mnemonic.to_private_key("")

# Choice Amount to be sent out
amount = 100


def create_vote_address():
    """Create Vote Address"""
    private, public = account.generate_account()
    passphrase = mnemonic.from_private_key(private)

    return {"address": public, "mnemonic": passphrase}


def transfer_choice(sender, receiver):
    """Transfers Choice"""
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(sender, parameters, receiver, amount, asset_id)
    signature = transaction.sign(voter_phrase)
    algod_client.send_transaction(signature)
    txn_id = transaction.get_txid()

    return txn_id


# Create a dictionary of all the vote_addresses
vote_addresses = {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
}
# Vote addresses must have opted into choice assest


def vote():
    id_ = input(str("Enter ID of the vote of your choice: "))
    vote_address = vote_addresses.get(id_)
    if vote_address:
        final = transfer_choice(sender=voter_address, receiver=vote_address)
        print(f"Thanks for voting for vote {id_}")
        print(final)
    else:
        print("Vote with this ID doesn't exist")


vote()
