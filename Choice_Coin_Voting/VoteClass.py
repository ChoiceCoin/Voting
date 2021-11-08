from algosdk import account, encoding, mnemonic,transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import hashlib
import matplotlib
import matplotlib.pyplot as plt
import random



matplotlib.use('TkAgg')

matplotlib.pyplot.switch_backend('Agg')
algod_address = "https://testnet-algorand.api.purestake.io/ps2" # Put Algod Client address here
algod_token = "ZloIZBz6Za5z1rTKSewfJ7xwZ4EdTNTA1mA4Rczw" # Put Algod Token here
headers = {"X-API-Key": algod_token }
# Initializes client for node.
algod_client = algod.AlgodClient(algod_token,algod_address,headers)


class Elect():

    def __init__(self):

        self.choice_id = 21364625


    def get_keys(self,address):

        key = mnemonic.to_private_key(address)
        return key


    def count(self,address):
        message = ''
        error = ''
        account_info = algod_client.account_info(address)

        assets = account_info.get("assets")

        for asset in assets:

            if asset["asset-id"] ==  self.choice_id:
                amount = asset.get("amount")
                message = amount
                return message

        error = 'The account has not opted-in to the asset yet.'
        return error

    def choice_vote(self,sender,key,receiver,amount):

        
        parameters = algod_client.suggested_params()
        
        transaction = AssetTransferTxn(sender, parameters,receiver ,amount, self.choice_id)
        

        signature = transaction.sign(key)
        algod_client.send_transaction(signature)
        final = transaction.get_txid()
        return True, final


    def election_voting(self,vote,address):

        
        message = ''

        escrow_key = self.get_keys(address[0].escrow_mnemonic)


        if vote == 'YES': # Add more boolean statements for more decisions or candidates.
            TX_ID = self.choice_vote(address[0].escrow_address,escrow_key, address[0].decision_one ,1) # choice_vote() function called for "YES". 
            message = "Ballot Tabulated. \n You can validate that your vote was counted correctly at https://testnet.algoexplorer.io/tx/" + TX_ID[1] + "."
            # AlgoExplorer returned for validation.
        elif vote == 'NO':
            TX_ID = self.choice_vote(address[0].escrow_address,escrow_key,address[0].decision_two,1)
            message = "Ballot Tabulated. \n You can validate that your vote was counted correctly at https://testnet.algoexplorer.io/tx/" + TX_ID[1] + "." 
        return message


    def show_results(self,yes_count,no_count):
        names = ['Candidate1', 'Candidate2'] # Define the two decisions.
        values = [yes_count,no_count] # Fetch the total number of votes for each decision.
        # Define a new pyplot
        plt.figure(figsize=(9, 3))
        plt.subplot(131)
        plt.bar(names, values)
        plt.suptitle('Election Results')
        plt.savefig('/Users/effemm/Documents/My Projects/Choice/Choice_Coin_Voting/static/img/Figure_1.png')
        # Return the results.




    def count_votes(self,address):

        
        yes_count = self.count(address[0].decision_one)
        no_count = self.count(address[0].decision_two)
        self.show_results(yes_count,no_count)
        if yes_count > no_count:
            if yes_count == 1:
                return "The Voting Process has ended. Candidate1 received the most votes with {0} vote.".format(yes_count)
            else:
                return "The Voting Process has ended. Candidate received the most votes with {0} votes.".format(yes_count)
        if no_count > yes_count:
            if no_count == 1:
                return "The Voting Process has ended. Candidate Two received the most votes with {0} vote.".format(no_count)
            else:
                return "The Voting Process has ended. Candidate Two received the most votes with {0} votes.".format(no_count)

        else:
            # Random sample generated from adiabatic quantum computer.
            # Generated using QunatumQuery.py.
            quantum_sample = [1,1,0,0,1,0,1,1,0,0,0,1,0,1,1,0,0,1,0,1,0,1,0,0,1,1,0,0,1,0]
            # Random sample from quantum sample.
            Q = random.choice(quantum_sample)
            if Q:
                return("Tie. The Quantum Oracle selects Candidate One!")
            else:
                return("Tie. The Quantum Orace Selects Candidate Two")


    def reset_votes(self,addresses):
    
        

        
        message = ''
        params = algod_client.suggested_params()
        yes_count = int(self.count(addresses[0].decision_one))
        print(yes_count)
        no_count = int(self.count(addresses[0].decision_two)) 
        print(no_count) 
        # Fetches the total number of Choice Coin in each account.
        if yes_count > 0:
            transaction_2 = AssetTransferTxn(addresses[0].decision_one  ,params,addresses[0].escrow_address,yes_count,self.choice_id)
            key = self.get_keys(addresses[0].mnemonic_one)
            signature_2 = transaction_2.sign(key)

            algod_client.send_transaction(signature_2)
            # Defines a clawback transaction to send Choice Coin back to the escrow account if the number of Choice Coin in the account exceeds zero.
        
        if no_count > 0:
            transaction_3 = AssetTransferTxn(addresses[0].decision_two,params,addresses[0].escrow_address,no_count,self.choice_id)
            key = self.get_keys(addresses[0].decision_two)
            signature_3 = transaction_3.sign(key)
            algod_client.send_transaction(signature_3)
        message = 'Vote accounts reset. New Voting Process started.'
        return message

        



            



