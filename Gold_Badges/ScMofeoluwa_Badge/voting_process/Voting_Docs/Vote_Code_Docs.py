# Copyright Fortior Blockchain, LLLP 2021

# Hash function to secure data using quantum secure hash.
# The hash function converts a string to a secure code using the SHA-512 cryptographic scheme. 
# SHA-512 is a post-quantum cryptographic scheme, thus ensuring that private information is made secure from malicious attackers. 
def hash(item):
    # Assumes the default UTF-8.
    # This encodes the string with the SHA-512 scheme.
    hash_object = hashlib.sha512(item.encode()) 
    # This returns the hexadecimal encode as a string.
    item = hash_object.hexdigest() 
    return item

# The voting function allows the decision to happen.
# The choice_vote function defines a stateless smart contract on the Algorand Network. 
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

# The count_votes funciton counts the votes to determine the winner.
# Counts the total number of votes to return a statement regarding which candidate has won.
# Applies to both corporate and electoral voting.
def count_votes():
    yes_count = count(decision_one)
    no_count = count(decision_two)
    show_results(yes_count,no_count)
    if yes_count > no_count:
        return "The Voting Process has ended. Choice One had the most votes!"
    else no_count > yes_count:
        return "The Voting Process has ended. Choice Two had the most votes!"