"""
This File contains tests for the functions in this module.

Instructions To Run Test.

1. Generate two algorand addresses and key pairs and edit the test_addres1, test_address2 in the setUp method of the Test class.
2. Fill in Algorand client address and algod token from purestake into the respective variables in the setUp method.
3. Generate an algorand address and add it to the test_address3 variable in the setUp file
4. Install all requirements from choice_coin_voting/requirements.txt file
5. cd into the functions file and run <python test.py>
"""

from algosdk.v2client import algod
from algosdk import mnemonic
import unittest
from main import *




class Test(unittest.TestCase):

    def setUp(self):
        algod_address = "https://testnet-algorand.api.purestake.io/ps2" # Put Algod Client address here
        algod_token = "" # Put Algod Token here
        headers = {"X-API-Key": algod_token }
        self.client = algod.AlgodClient(algod_token, algod_address, headers)
        self.asset_id = 21364625

        #SetUp test Addresses and Private Keys
        self.test_address1 = ""
        self.test_key1 = mnemonic.to_private_key("")
        self.test_address2 = ""
        self.test_key2 = mnemonic.to_private_key("")
        self.test_address3 = ""
        self.accounts = [ {'addr': self.test_address1, 'key': self.test_key1}, { 'addr': self.test_address2, 'key': self.test_key2 }]
    
    def test_holding_asset(self):
        payload = {
            "client": self.client,
            "account": self.test_address3,
            "asset_id": self.asset_id
        }
        res = holding_asset(payload)
        self.assertEqual(res, False)
    
    def test_asset_optin(self):
        result = asset_optin(
            self.client,
            self.accounts,
            self.asset_id
        )
        self.assertEqual(result, True)
    
    def test_asset_transfer(self):
        payload = {
            "client": self.client,
            "sender": self.test_address1,
            "receiver": self.test_address2,
            "private_key": self.test_key1,
            "amount": 1,
            "asset_id": self.asset_id
        }
        res = asset_transfer(payload)
        self.assertEqual(res, True)
    
    def test_valid_address(self):
        res1 = validate_address(self.test_address1)
        res2 = validate_address("NOUD53W72DZG26WLSLOCVX7I25MWEUVSUCJW25OQLH43K5YXU3R92Y8767")
        self.assertEqual(res1, True)
        self.assertEqual(res2, False)
    
    def test_valid_account(self):
        res1 = validate_mnemonic(self.test_address1, mnemonic.from_private_key(self.test_key1))
        res2 = validate_mnemonic(self.test_address1, mnemonic.from_private_key(self.test_key2))
        self.assertEqual(res1, True)
        self.assertEqual(res2, False)

    def test_check_balance(self):
        check_balance(self.test_address1, self.client)
        check_balance(self.test_address2, self.client)

    def test_generate_keypair(self):
        generate_algorand_keypair()

    def test_send_algo(self):
        payload = {
            "client": self.client,
            "sender": self.test_address1,
            "receiver": self.test_address2,
            "private_key": mnemonic.from_private_key(self.test_key1),
            "amount": 1,
        }
        res = send_algo(payload)
        self.assertEqual(res, True)



if __name__ == '__main__':
    unittest.main()