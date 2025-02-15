from algosdk.v2client import algod
from algosdk import mnemonic,transaction,account

def generate():
    pk,adr = account.generate_account()
    print("address:",adr)
    print("prk:",mnemonic.from_private_key(pk))
generate()