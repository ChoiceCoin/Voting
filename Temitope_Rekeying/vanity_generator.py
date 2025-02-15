from algosdk import account
from algosdk import mnemonic
from algosdk import account, mnemonic
from algosdk import transaction
from algosdk import algod

vanity_private_key, vanity_address = account.generate_account()
print("Private key:", vanity_private_key)
print("Address:", vanity_address)

prefix = "GREEN_REX"

while (not vanity_address.startswith(prefix)):
    vanity_private_key, vanity_address = account.generate_account()

print("Mnemonic:", mnemonic.from_private_key(vanity_private_key))
existing_private_key, existing_address = account.generate_account()

algod_token = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
algod_address = 'http://localhost:4001'
algod_client = algod.AlgodClient(algod_token, algod_address)

params = algod_client.suggested_params()
txn_rekey = transaction.PaymentTxn(vanity_address, params['minFee'], params['lastRound'], params['lastRound']+1000, params['genesishashb64'], vanity_address, 0, rekey_to=existing_address)
stxn_rekey = txn_rekey.sign(vanity_private_key)
algod_client.send_transaction(stxn_rekey)


txn_test = transaction.Payment(vanity_address, params['minFee'], params['lastRound'], params['lastRound']+1000, params['genesishashb64'], existing_address, 1000000)

stxn_test = txn_test.sign(existing_private_key)
algod_client.send_transaction(stxn_test)