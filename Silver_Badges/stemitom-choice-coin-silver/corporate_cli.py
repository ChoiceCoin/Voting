import argparse
from typing import Tuple
from algosdk import account, mnemonic
from algosdk.encoding import is_valid_address
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn
from algosdk.v2client import algod
from decouple import config

algod_addr = config('ALGOD_ADDRESS')
algod_token = config('ALGOD_TOKEN')
headers = {
    "X-API-Key": algod_token,
}
choice_id = 21364625
algod_client = algod.AlgodClient(algod_token, algod_addr, headers)

def generate_algo_acc() -> Tuple[str, str, str]:
    private_key, addr = account.generate_account()
    phrase = mnemonic.from_private_key(private_key)
    return private_key, phrase, addr

def create_account(escrow_key, escrow_addr):
    key, _, addr = generate_algo_acc()
    try:
        send_initial_algo(escrow_addr, escrow_key, addr, 100000)
    except:
        raise Exception("Funding is not successful. Please try to confirm balance")
    
    try:
        choice_opt_in(addr, key)
    except:
        raise Exception("Failed to opt in for choice asset. Please try again")

def contain_choice_coin(addr:str) -> bool:
    account = algod_client.account_info(addr)
    contains_choice = False
    for asset in account["assets"]:
        if asset["asset-id"] == choice_id:
            contains_choice = True
            break
    return contains_choice

def balance(addr:str) -> int:
    return algod_client.account_info(addr)["amount"]

def validate_wallet(addr:str, phrase:str) -> bool:
    if (not is_valid_address(addr)) or (not contain_choice_coin(addr)) or (balance(addr) < 1000):
        return False
    return True

def choice_opt_in(addr:str, key:str) -> bool:
    params = algod_client.suggested_params()
    if not contain_choice_coin(addr):
        transaction = AssetTransferTxn(
            addr,
            params,
            addr,
            0,
            choice_id
        )
        transaction = transaction.sign(key)
        return True

def send_initial_algo(sender:str, key:str, recepient:str, amount:int) -> bool:
    params = algod_client.suggested_params()
    transaction = PaymentTxn(
        sender,
        params,
        recepient,
        amount,
        note="Initial funding for candidate address"
    )
    algod_client.send_transaction(transaction)
    return True

def vote_with_choice(sender, key, receiver,amount,comment):
    params = algod_client.suggested_params() # Sets suggested parameters
    transaction = AssetTransferTxn(
        sender, 
        params, 
        receiver, 
        amount, 
        choice_id, 
        note=comment
    )
    signature = transaction.sign(key)
    algod_client.send_transaction(signature)
    final = transaction.get_txid()
    return True, final

def corporate_vote(addr:str, key:str, opt_one:str, opt_zero:str, pos:str):
    corporate_map = {
        'SENIOR':10,
        'MID':5,
        'ENTRY':2
    }
    candidates_map = {
        1: opt_one,
        0: opt_zero
    }
    candidate_voted_for = int(input("[+] Vote 0 for candidate zero and 1 for candidate one"))
    if candidate_voted_for not in [0,1]:
        print("[-] That's not a valid entry. Please choose candidate zero or candidate one")
        return
    vote_with_choice(
        addr, 
        key, 
        candidates_map[candidate_voted_for],
        100 * corporate_map[pos],
        "Corporate voting powered by choice"
    )
    return


def conclude_vote(addrs: list):
    results = list()
    for addr in addrs: 
        acc_info = algod_client.account_info(addr)
        for asset_subs in acc_info.get("assets"):
            results.append(asset_subs.get("amount")) if asset_subs["asset-id"] == choice_id else results
    
    opt_zero_count, opt_one_count = results

    if opt_zero_count > opt_one_count:
        print("[+] Option zero wins.")
    else:
        print("[+] Option one wins.")

def main():
    escrow_addr = str(input("Enter escrow wallet address: "))
    escrow_phrase = str(input("Enter escrow wallet phrase: "))
    position = str(input("Enter your stakeholder's position: "))

    if not validate_wallet(escrow_addr, escrow_phrase):
        print("[-] Wallet details are not valid. Please do try again")
        return
    else:
        escrow_key = mnemonic.to_private_key(escrow_phrase)
    
    if position not in ['SENIOR', 'MID', 'ENTRY']:
        print("[-] Position is not valid. Please do try again")

    opt_one_acct = create_account(escrow_key, escrow_addr)
    opt_two_acct = create_account(escrow_key, escrow_addr)
    corporate_vote(escrow_key, escrow_addr, opt_one_acct, opt_two_acct)
    conclude_vote[opt_one_acct, opt_two_acct]

if __name__ == '__main__':
    main()