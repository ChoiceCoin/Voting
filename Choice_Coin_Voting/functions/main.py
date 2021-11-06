from typing import List
from algosdk import account, mnemonic
from algosdk.encoding import is_valid_address
from algosdk.account import address_from_private_key
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, AssetFreezeTxn, PaymentTxn
import base64


def asset_optin(client, account, asset_id: str, multiple=False):
    """
    An Utility Function to Opt-In choice into any algorand account.
    This is usefull when we need to generate addresses for registered decisions or candidates as they need to opt-in choice.
    Can also be used for a list of algorand address

    client: alogod_client
    account: {"addr": "address", "key": <private key>}; for multiple=True=> [{"addr": "address", "key": <private key>}]
    asset_id: id of the asset to be opted-in
    multiple: a boolean indicating a multiple asset opt-in
    """
    params = client.suggested_params()
    if multiple:
        for acct in account:
            account_info = client.account_info(acct['addr'])
            holding = None
            idx = 0
            for my_account_info in account_info['assets']:
                scrutinized_asset = account_info['assets'][idx]
                idx = idx + 1    
                if (scrutinized_asset['asset-id'] == asset_id):
                    holding = True
                    break
            if not holding:
                txn = AssetTransferTxn(
                    sender=acct['addr'],
                    sp=params,
                    receiver=acct['addr'],
                    amt=0,
                    index=asset_id)
                stxn = txn.sign(acct['key'])
                txid = client.send_transaction(stxn)
                wait_for_confirmation(client, txid)
    else:
        account_info = client.account_info(account['addr'])
        holding = None
        idx = 0

        for my_account_info in account_info['assets']:
            scrutinized_asset = account_info['assets'][idx]
            idx = idx + 1    
            if (scrutinized_asset['asset-id'] == asset_id):
                holding = True
                break

        if not holding:
            txn = AssetTransferTxn(
                sender=account['addr'],
                sp=params,
                receiver=account['addr'],
                amt=0,
                index=asset_id)
            stxn = txn.sign(account['key'])
            txid = client.send_transaction(stxn)
            wait_for_confirmation(client, txid)
    
def validate_address(addr):
    """
    Check if the string address is a valid Algorand address.
    Args:
        addr (str): base32 address
    Returns:
        bool: whether or not the address is valid
    """
    return is_valid_address(addr)

def validate_mnemonic(address, phrase):
    """
    Validate An Algorand Wallet Address Against Mnemonic.

    arguments:
    address: wallet address
    phrase: mnemonic
    """
    try:
        addr = address_from_private_key(mnemonic.to_private_key(phrase))
        if address == addr:
            return True
    except:
        return False
    return False

def check_balance(address, client):
    """
    Checks Algorand Balance For An Address.

    address: wallet_address
    client: algod client
    """
    account_info = client.account_info(address)
    balance = account_info.get('amount')
    print("Account balance: {} microAlgos".format(balance))
    return balance

def generate_algorand_keypair():
    """
    Generates Algorand Addresses and Mnemonic
    """
    private_key, address = account.generate_account()
    phrase = mnemonic.from_private_key(private_key)
    print("Generated address: {}".format(address))
    print("Generated private key: {}".format(private_key))
    print("Generated mnemonic: {}".format(phrase))
    return address, phrase

def wait_for_confirmation(client, txid):
    """
    Utility function to wait until the transaction is
    confirmed before proceeding.
    """
    last_round = client.status().get('last-round')
    txinfo = client.pending_transaction_info(txid)
    while not (txinfo.get('confirmed-round') and txinfo.get('confirmed-round') > 0):
        print("Waiting for confirmation")
        last_round += 1
        client.status_after_block(last_round)
        txinfo = client.pending_transaction_info(txid)
    print("Transaction {} confirmed in round {}.".format(txid, txinfo.get('confirmed-round')))
    return txinfo

def holding_asset(client, account, asset_id):
    """
    Function To check if an address as opted-in an asset

    account: wallet_address
    cleint: algod_client
    asset_id: 
    """
    params = client.suggested_params()
    account_info = client.account_info(account)
    holding = False
    idx = 0
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1    
        if (scrutinized_asset['asset-id'] == asset_id):
            holding = True
            break
    return holding

def send_algo(client, sender, receiver, phrase, amount):
    """
    Function to send algo from one address to another

    client: algod_client
    sender: sender wallet address
    receiver: receiver wallet address
    phrase: sender mnemonic
    amount: amount to be sent
    """
    #send algorand
    params = client.suggested_params()
    unsigned_txn = PaymentTxn(sender, params, receiver, amount, None, "Candidate Creation For Choice Voting")
    signed_txn = unsigned_txn.sign(mnemonic.to_private_key(phrase))
    txid = client.send_transaction(signed_txn)
    
    #wait for confirmation
    try:
        wait_for_confirmation(client, txid)  
    except Exception as err:
        print(err)
        return True
    print(f"View Transaction At https://testnet.algoexplorer.io/tx/{txid}")
    return False



        