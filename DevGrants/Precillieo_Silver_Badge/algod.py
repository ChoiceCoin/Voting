#Import the necessary python packages
import base64, sys
import algosdk
from algosdk.v2client import algod
from flask import request
from algosdk import account, encoding, mnemonic, transaction 
from algosdk.constants import microalgos_to_algos_ratio
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, PaymentTxn, write_to_file



#Initialize the algosdk in Python
def algod_client():
	algod_address= "https://testnet-algorand.api.purestake.io/ps2"
	algod_token= ""
	headers= {"X-API-Key": algod_token}
	return algod.AlgodClient(algod_token, algod_address, headers)


#Initialize the addresses
voter_address= ""
zero_address= ""
one_address= ""
passphrase= ""
asset_id= 21364625
voter_address= mnemonic.to_public_key(passphrase)
voter_phrase= mnemonic.to_private_key(passphrase)


#Function to new create accounts for users
def create_account():
	private_key, address= account.generate_account()
	passphrase= mnemonic.from_private_key(private_key)
	return passphrase
#passphrase= create_account()



#Function to get balance from address in python
def get_balance(address):
	account_info= algod_client().account_info(address)
	balance= account_info.get('amount') / microalgos_to_algos_ratio
	return balance 
balance= get_balance(mnemonic.to_public_key(passphrase))



#The Voting Function
def voting():
	params= algod_client().suggested_params()
	#print(params)
	yes_option= request.form.get("yes")
	no_option= request.form.get("no")
	amount= request.form.get('amount')
	if yes_option == 'yes' and no_option is None:
		transaction= AssetTransferTxn(sender= voter_address, sp= params, receiver= zero_address, amt= int(amount), index= asset_id)
		signature= transaction.sign(voter_phrase)
		algod_client().send_transaction(signature)
		final= transaction.get_txid()
		message= "Thanks for voting for zero. Your transaction ID is {}".format(final)
		return message

	elif no_option== 'no' and yes_option is None:
		transaction= AssetTransferTxn(sender= voter_address, sp= params, receiver= one_address, amt= int(amount), index= asset_id)
		signature= transaction.sign(voter_phrase)
		algod_client().send_transaction(signature)
		final= transaction.get_txid()
		message= "Thanks for voting for One. Your transaction ID is {}".format(final)
		return message


