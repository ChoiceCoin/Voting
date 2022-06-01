# Open Source under Apache License

# This code defines a decenteralized voting system on the Algorand Blockchain.
# It uses Choice Coin, an Algorand Standard Asset, to record votes on a distributed ledger.
# The system makes both efficiency and security a priority. 
# An escrow account holds the total number of Choice Coin required for the voting process, and Algorand accounts for each of the decisions made. 
# Each of the individual decisions made by the voters connect back to the escrow account.
# In turn, one Choice Coin transfers to the appropriate decision account through a stateless smart contract. 
# Furthermore, a SHA-512 hashing algorithm is used to encrypt voter information at all stages, ensuring that private information is made secure. 
# This is especially useful where voters need to give personal identification for verification purposes.

# Imports and dependicies include the Algorand Python SDK, the Python Hashlib library, and the Python Matplotlib library.
from random import random

from algosdk import account, encoding, mnemonic, transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import hashlib
import matplotlib
import matplotlib.pyplot as plt
import ssl

ssl._create_default_https_context = ssl._create_unverified_context
# Matplot parameters for the matplotlib function to generate a new plot.
matplotlib.use('TkAgg')
algod_address = ""
algod_token = ""

headers = {"X-API-Key": algod_token}
algod_client = algod.AlgodClient(algod_token, algod_address, headers)
escrow_address = ""
escrow_mnemonic = ""
fund_address = ""
fund_mnemonic = ""

choice_id = 17264161
fund_key = mnemonic.to_private_key(fund_mnemonic)
  # Put in main fund receiver_mnemonic here
escrow_key = mnemonic.to_private_key(escrow_mnemonic)
choice_id = 21364625  # Official Test Asset ID for Choice Coin

decision_one = "XLNANSINDLT74CSRJ3WWT7Y45AWKUCDI4CBMCBFXF3DBGQ5KQNT7TZH5ZU"


# # Decisions.
# #To add more decisions for the election process, add the address for the new decision here.
# #Then, add an appropriate boolean statement at line 100 of this file. Be sure to also add additional
# #counts at line 148 of this file as well.
# decision_one = ""
# decision_two = ""
# corporate_decision_one = ""
# corporate_decision_two = ""

# Clawback Address required to reset accounts to start new voting process.
# Sets up accounts for both the regular election process and the corporate decision process. 
# Add more accounts to adjust for more decisions.
# clawback_address = ""
# clawback_mnemonic = ""
# clawback_key = mnemonic.to_private_key(clawback_mnemonic)

# This function counts the number of Choice Coin in an account. 
# It first fetches the account_info, and specifically searches among the assets that the account owns for Choice Coin.
# It then returns the number of Choice Coin that the account owns.
def count(address):
    message = ''
    error = ''
    account_info = algod_client.account_info(address)  # Fetch account information for the address.
    assets = account_info.get("assets")  # Fetch asset information.
    for asset in assets:
        # Iterate over assets until Choice Coin is reached. Return the amount if it exists.
        if asset["asset-id"] == choice_id:
            amount = int(asset.get("amount"))
            message = amount
            return message
    error = 'The account has not opted-in to the asset yet.'
    raise Exception(error)


# This function hashes a string using the SHA-512 cryptographic scheme.
# SHA-512 is a post-quantum cryptographic scheme, thus ensuring that private information is made secure from malicious attackers. 
def hashing(item):
    # Assumes the default UTF-8.
    hash_object = hashlib.sha512(item.encode())  # This encodes the string with the SHA-512 scheme.
    item = hash_object.hexdigest()  # This returns the hexadecimal encode as a string.
    return item


# This function defines a stateless smart contract on the Algorand Network.
# It sends Choice Coin to the appropriate destination address based on user input.
def choice_vote(sender, key, receiver, amount, comment):
    parameters = algod_client.suggested_params()  # Sets suggested parameters
    transaction = AssetTransferTxn(sender, parameters, receiver, amount, choice_id, note=comment)
    # Defines an inital transaction for Choice Coin
    signature = transaction.sign(key)
    # Signs the transaction with the senders private key
    algod_client.send_transaction(signature)
    # Sends the transaction with the signature
    final = transaction.get_txid()
    return True, final


# This function describes a methodology for Electoral Voting on the Choice Coin platform.
# It calls the choice_vote() function with the appropriate inputs based on which decision the voter selected. 
# It is currently defined for two candidates/decisions, but it can be easily amended to include more.
def election_voting():
    message = ''
    TX_ID = choice_vote(escrow_address, escrow_key, decision_one, 100,
                            "Tabulated using Choice Coin")  # choice_vote() function called for "YES".
    message = "https://testnet.algoexplorer.io/tx/" + \
                  TX_ID[1]
        # AlgoExplorer returned for validation.

    return message




# Returns a dynamic bar-graph showing the results of the vote.
# Uses PyPlot for both corporate and electoral voting.
def show_results(yes_count):
     # Define a new pyplot
    plt.figure(figsize=(3, 3))
    # plt.subplot(131)
    plt.pie([yes_count, 800 - yes_count], labels = ['Signed', ''], explode = [0.2, 0], shadow = True)
    plt.suptitle('Petition Progress')
    plt.savefig('static/chart.png')
     # Return the results.




# Counts the total number of votes to return a statement regarding which candidate has won.
# Applies to both corporate and electoral voting.
def count_votes():
    yes_count = count(decision_one)
    show_results(yes_count)
    return "The Petition Process has ended."


