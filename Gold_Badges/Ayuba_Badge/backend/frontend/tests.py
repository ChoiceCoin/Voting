#from django.test import TestCase

# Create your tests here.

from algosdk import account,mnemonic

def generateAccount():
    private_key, public_key = account.generate_account()
    print('addr:',public_key)
    print('mnemonic:',mnemonic.from_private_key(private_key))

    return private_key,public_key

generateAccount()