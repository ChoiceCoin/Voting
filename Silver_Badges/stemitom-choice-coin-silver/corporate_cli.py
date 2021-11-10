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

def contain_choice_coin(addr) -> bool:
    account = algod_client.account_info(addr)
    contains_choice = False
    for asset in account["assets"]:
        if asset["asset-id"] == choice_id:
            contains_choice = True
            break
    return contains_choice

def balance(addr):
    return algod_client.account_info(addr)["amount"]

