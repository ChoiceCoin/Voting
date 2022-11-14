from algosdk import account, mnemonic
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod


import ssl

ssl._create_default_https_context = ssl._create_unverified_context


algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "ti4RqMynth6ecRMzEDRI414YbBppr4ociEOFKkLi"

headers = {"X-API-Key": algod_token}
algod_client = algod.AlgodClient(algod_token, algod_address, headers)
escrow_address = "6KCOIOQB77UTHE67QUVJJ3NDGQCIBGO67KGOEYZZATIGK7KBU34EWG52AE"
escrow_mnemonic = "left later pencil gospel coast eight agree spatial raccoon absorb victory tell pioneer actor mouse refuse suggest help pledge tape oil drop gym absent raise"
fund_address = "WHNTB5KQTGKBQSZAJ5VX745SGYJTCKSQ2PX7KA3MVCXV7FNAEGLIGOKOZE"
fund_mnemonic = "foam fault power empty bulb usage round guard evoke city wish screen logic express assume extra copper kind prize table math wheat bargain absorb like"
choice_id = 17264161
fund_key = mnemonic.to_private_key(fund_mnemonic)


def send_algo(sender, key, receiver, comment):
    """Funds voter with enough algo they can use to purchase choice"""
    parameters = algod_client.suggested_params()
    # Initalize parameters
    transaction = PaymentTxn(sender, parameters, receiver, 1000000, note=comment)
    # Defines an inital transaction for Algo.
    # Add some sort of hash to ensure that fund addresses are hashed properly
    # Add a hash to ensure that client addresses are protected
    signature = transaction.sign(key)
    # Signs the transaction with the sender's private key
    algod_client.send_transaction(signature)
    # Sends the transaction with the signature
    return True


def create_optin(receiver_mnemonic, receiver_address, index):
    """Opts in user for choice"""
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(
        receiver_address, parameters, receiver_address, 0, index
    )
    # Defines a transaction that will opt the receiver into the asset.
    key = mnemonic.to_private_key(receiver_mnemonic)
    signature = transaction.sign(key)
    algod_client.send_transaction(signature)
    # Opts-in the account to the asset
    return True


def create_new_account():
    """Create a user"""
    private, public = account.generate_account()
    passphrase = mnemonic.from_private_key(private)
    send_algo(fund_address, fund_key, public, "Balance to opt-in to Choice Coin")
    create_optin(passphrase, public, choice_id)

    return {"Address": public, "Phrase": passphrase}


def send_choice(sender, receiver_mnemonic):
    parameters = algod_client.suggested_params()
    key = mnemonic.to_private_key(receiver_mnemonic)
    transaction = AssetTransferTxn(sender, parameters, escrow_address, 1, choice_id)
    signature = transaction.sign(key)
    algod_client.send_transaction(signature)


def return_choice(receiver_address):
    parameters = algod_client.suggested_params()
    key = mnemonic.to_private_key(escrow_mnemonic)
    transaction = AssetTransferTxn(
        escrow_address, parameters, receiver_address, 1, choice_id
    )
    signature = transaction.sign(key)
    algod_client.send_transaction(signature)
