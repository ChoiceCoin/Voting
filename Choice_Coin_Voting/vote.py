# Open Source under Apache License

# This code defines a decenteralized voting system on the Algorand Blockchain.
# It uses Choice Coin, an Algorand Standard Asset, to record votes on a distributed ledger.
# The system makes both efficiency and security a priority. 
# An escrow account holds the total number of Choice Coin required for the voting process, and Algorand accounts for each of the decisions are made. 
# Each of the individual decisions made by the voters connect back to the escrow account.
# In turn, one Choice Coin transfers to the appropriate decision account through a stateless smart contract. 
# Furthermore, a SHA-512 hashing algorithm is used to encrypt voter information at all stages, ensuring that private information is made secure. 
# This is especially useful where voters need to give personal identification for verification purposes.

# Imports and dependicies include the Algorand Python SDK, the Python Hashlib library, and the Python Matplotlib library.
from algosdk import account, encoding, mnemonic,transaction
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
import hashlib
import matplotlib
import matplotlib.pyplot as plt

# Matplot parameters for the matplotlib function to generate a new plot.
matplotlib.use('TkAgg')
algod_address = "" # Put Algod Client address here
algod_token = "" # Put Algod Token here
headers = {"X-API-Key": algod_token }
# Initializes client for node.
algod_client = algod.AlgodClient(algod_token,algod_address,headers)

# Escrow creation.
escrow_address = "" # Put in main fund address here
escrow_mnemonic = "" # Put in main fund receiver_mnemonic here
escrow_key = mnemonic.to_private_key(escrow_mnemonic)
choice_id = 21364625 # Official Test Asset ID for Choice Coin

# Decisions.
#To add more decisions for the election process, add the address for the new decision here.
#Then, add an appropriate boolean statement at line 100 of this file. Be sure to also add additional 
#counts at line 148 of this file as well. 
decision_one = ""
decision_two = ""
corporate_decision_one = ""
corporate_decision_two = ""

# Clawback Address required to reset accounts to start new voting process.
# Sets up accounts for both the regular election process and the corporate decision process. 
# Add more accounts to adjust for more decisions.
clawback_address = ""
clawback_mnemonic = ""
clawback_key = mnemonic.to_private_key(clawback_mnemonic)

# This function counts the number of Choice Coin in an account. 
# It first fetches the account_info, and specifically searches among the assets that the account owns for Choice Coin.
# It then returns the number of Choice Coin that the account owns.
def count(address):
    message = ''
    error = ''
    account_info = algod_client.account_info(address) # Fetch account information for the address.
    assets = account_info.get("assets") # Fetch asset information.
    for asset in assets:
        # Iterate over assets until Choice Coin is reached. Return the amount if it exists.
        if asset["asset-id"] ==  choice_id:
            amount = asset.get("amount")
            message = amount
            return message
    error = 'The account has not opted-in to the asset yet.'
    return error

# This function hashes a string using the SHA-512 cryptographic scheme. 
# SHA-512 is a post-quantum cryptographic scheme, thus ensuring that private information is made secure from malicious attackers. 
def hashing(item):
    # Assumes the default UTF-8.
    hash_object = hashlib.sha512(item.encode()) # This encodes the string with the SHA-512 scheme.
    item = hash_object.hexdigest() # This returns the hexadecimal encode as a string.
    return item

# This function defines a stateless smart contract on the Algorand Network. 
# It sends Choice Coin to the appropriate destination address based on user input.
def choice_vote(sender, key, receiver,amount,comment):
    parameters = algod_client.suggested_params() # Sets suggested parameters
    transaction = AssetTransferTxn(sender, parameters, receiver, amount, choice_id,note=comment)
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
def election_voting(vote):
    message = ''
    if vote == 'YES': # Add more boolean statements for more decisions or candidates.
        TX_ID = choice_vote(escrow_address,escrow_key,decision_one,100,"Tabulated using Choice Coin") # choice_vote() function called for "YES". 
        message = "Ballot Tabulated. \n You can validate that your vote was counted correctly at https://testnet.algoexplorer.io/tx/" + TX_ID[1] + "."
        # AlgoExplorer returned for validation.
    elif vote == 'NO':
        TX_ID = choice_vote(escrow_address,escrow_key,decision_two,100,"Tabulated using Choice Coin")
        message = "Ballot Tabulated. \n You can validate that your vote was counted correctly at https://testnet.algoexplorer.io/tx/" + TX_ID[1] + "." 
    return message

# This defines a corporate voting mechanism using Choice Coin. 
# It works very similarly to the electoral voting scheme defined earlier.
# However, it does introduce the stake as a new variable. 
# The stake defines the ownership stake of the shareholder that is voting.
def corporate_voting(vote,stake):
    message = ''
    stake = int(stake) # Define the ownership stake.
    amount = 100 * stake
    if vote == 'YES':
        comment = "Tabulated using Choice Coin"
        choice_vote(escrow_address,escrow_key,corporate_decision_one,amount,comment)
        # Call the choice_vote() function that sends the appropriate number of Choice Coin based on the ownership stake.
        message = "Ballot Tabulated"
    elif vote == 'NO':
        choice_vote(escrow_address,escrow_key,corporate_decision_two,amount,comment)
        message = "Ballot Tabulated"
    return message

# Returns a dynamic bar-graph showing the results of the vote. 
# Uses PyPlot for both corporate and electoral voting.
def show_results(yes_count,no_count):
    names = ['Candidate 1', 'Candidate 2'] # Define the two decisions.
    values = [yes_count,no_count] # Fetch the total number of votes for each decision.
    # Define a new pyplot
    plt.figure(figsize=(9, 3))
    plt.subplot(131)
    plt.bar(names, values)
    plt.suptitle('Election Results')
    plt.savefig('/home/archie/Inital_Demo/static/img/Figure_1.png')
    # Return the results.

def show_corporate_results(yes_count,no_count):
    names = ['Decision 1', 'Decision 2']
    values = [yes_count,no_count]
    plt.figure(figsize=(9, 3))
    plt.subplot(131)
    plt.bar(names, values)
    plt.suptitle('Corporate Voting Results')
    plt.savefig('/home/archie/Inital_Demo/static/img/Figure_2.png')

# Counts the total number of votes to return a statement regarding which candidate has won.
# Applies to both corporate and electoral voting.
def count_votes():
    yes_count = count(decision_one)
    no_count = count(decision_two)
    show_results(yes_count,no_count)
    if yes_count > no_count:
        if yes_count == 1:
            return "The Voting Process has ended. Candidate One received the most votes with {0} vote.".format(yes_count)
        else:
            return "The Voting Process has ended. Candidate One received the most votes with {0} votes.".format(yes_count)
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
            return("Tie. The Quantum Oracle selects Candidate Two!")

def count_corporate_votes():
    yes_count = count(corporate_decision_one)
    no_count = count(corporate_decision_two)
    show_corporate_results(yes_count,no_count)
    if yes_count > no_count:
        return "The Voting Process has ended. Decision One had the most votes!"
    if no_count > yes_count:
        return "Decision Two had the most votes!"
    else:
        # Random sample generated from adiabatic quantum computer.
        # Generated using QunatumQuery.py.
        quantum_sample = [1,1,0,0,1,0,1,1,0,0,0,1,0,1,1,0,0,1,0,1,0,1,0,0,1,1,0,0,1,0]
        # Random sample from quantum sample.
        Q = random.choice(quantum_sample)
        if Q:
            return("Tie. The Quantum Oracle selects Decision One!")
        else:
            return("Tie. The Quantum Oracle selects Decision Two!")

# This function resets the voting accounts to start a new voting process. 
# It uses the clawback functionality built into Choice Coin to send the Choice Coin back to the main escrow account.
def reset_votes():
    message = ''
    params = algod_client.suggested_params()
    yes_count = count(decision_one)
    no_count = count(decision_two)
    # Fetches the total number of Choice Coin in each account.
    if yes_count > 0:
        transaction_2 = AssetTransferTxn(clawback_address,params,escrow_address,yes_count,choice_id,revocation_target = decision_one)
        signature_2 = transaction_2.sign(clawback_key)
        algod_client.send_transaction(signature_2)
        # Defines a clawback transaction to send Choice Coin back to the escrow account if the number of Choice Coin in the account exceeds zero.
    if no_count > 0:
        transaction_3 = AssetTransferTxn(clawback_address,params,escrow_address,no_count,choice_id,revocation_target = decision_two)
        signature_3 = transaction_3.sign(clawback_key)
        algod_client.send_transaction(signature_3)
    message = 'Vote accounts reset. New Voting Process started.'
    return message

def reset_corporate_votes():
    message = ''
    params = algod_client.suggested_params()
    yes_count = count(corporate_decision_one)
    no_count = count(corporate_decision_two)
    if yes_count > 0:
        transaction_2 = AssetTransferTxn(clawback_address,params,escrow_address,yes_count,choice_id,revocation_target = corporate_decision_one)
        signature_2 = transaction_2.sign(clawback_key)
        algod_client.send_transaction(signature_2)
    if no_count > 0:
        transaction_3 = AssetTransferTxn(clawback_address,params,escrow_address,no_count,choice_id,revocation_target = corporate_decision_two)
        signature_3 = transaction_3.sign(clawback_key)
        algod_client.send_transaction(signature_3)
    message = 'Vote accounts reset. New Voting Process started.'
    return message
