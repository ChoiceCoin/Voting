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
client = algod.AlgodClient(algod_token,algod_address,headers)

def balance_formatter(amount, asset_id, client):
	asset_info = client.asset_info(asset_id)
	decimals = asset_info['params'].get("decimals")
	unit = asset_info['params'].get("unit-name")
	formatted_amount = amount/10**decimals
	return "{} {}".format(formatted_amount, unit)

def check_results():
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
check_results()
