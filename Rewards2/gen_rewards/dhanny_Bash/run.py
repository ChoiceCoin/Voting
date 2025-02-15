#!/usr/bin/env python3

import sys
import os
import csv

import colorama
from algosdk import mnemonic
from algosdk.v2client import algod
from algosdk.future import transaction


def log(msg, level="info"):
    if level == "info":
        print(colorama.Fore.YELLOW + "[!] " + colorama.Fore.RESET + msg)
    elif level == "error":
        print(colorama.Fore.RED + "[-] " + colorama.Fore.RESET + msg)
    elif level == "success":
        print(colorama.Fore.GREEN + "[+]" + colorama.Fore.RESET + msg )
    else:
        print(msg)

class Sender:

    def __init__(self, csvpath):
        try:
            self.csvpath = csvpath
            self.header = []
            self.rows = []
            self.multiple = 1.1 # Multiply the amount by the value specified here
            self.algod_token = ""  # Specify Algorand API Token Here
            self.algod_address = "https://node.testnet.algoexplorerapi.io" # Specify Algorand Address Here: TestNet algor
            self.asset_id = 10458941 # USDC ASSET ID Change this to asset
            self.myAddress = "" # Specify Wallet Address Here
            self.algod_header = {'X-API-KEY': self.algod_token}
            self.algod_client = algod.AlgodClient(self.algod_token, self.algod_address, self.algod_header)
            self.params = self.algod_client.suggested_params()
            self.mnemonic_data = "" # Specify Mnemonic data here before running the script
            try:
                self.private_key = mnemonic.to_private_key(self.mnemonic_data)
            except:
                log("Invalid Mnemonic data", "info")
                exit(1)
        except Exception as e:
            if "Forbidden" in str(e):
                log("Invalid Token", "info")
                exit(1)
            else:
                log("An error occured: " + str(e), "info")
                exit(1)

    def get_account_details(self):
        account_info = self.algod_client.account_info(address=self.myAddress)
        print(account_info)

    def read_csv(self):
        log(f"Reading file: {self.csvpath}")
        with open(self.csvpath) as csvfile:
            csvreader = csv.reader(csvfile)
            self.header = next(csvreader)
            for row in csvreader:
                self.rows.append(row)
        


    def send_transaction(self, from_address, amount):
        new_amount = int(amount * self.multiple * 1000000)
        log(f"sending {new_amount / 1000000} USDC to {from_address}", "info") # I specified USDC here becuase that's the assetId im using.
        unsigned_txn = transaction.AssetTransferTxn(self.myAddress, self.params, from_address, int(new_amount), self.asset_id)
        stxn = unsigned_txn.sign(self.private_key)
        try:
            txid = self.algod_client.send_transaction(stxn)
            log(f"Signed transaction with txID: {txid}", "success")
            confirmed_txn = transaction.wait_for_confirmation(self.algod_client, txid)
            log(f"Transaction Confirmed on round {str(confirmed_txn['confirmed-round'])}, visit:  https://testnet.algoexplorer.io/tx/{txid}", "info")
        except Exception as err:
            log(f"Error Occured: {err}", 'error')

    
    def run(self):
        try:
            self.read_csv()
            from_index = self.header.index('from')
            amount_index = self.header.index('amount')
            for csvrow in self.rows:
                self.send_transaction(csvrow[from_index], float(csvrow[amount_index]))
        except ValueError:
            log("Specified file is not a csv format", "error")
            exit(1)


def print_help():
    print("")
    print(colorama.Style.BRIGHT + f"Usage: python {sys.argv[0]} <csvfile> \n")
    print("csv transaction\n")
    print("optional arguments:")
    print("\t -h, --help        show this help message and exit")
    print("\t csvfile           Specify path to csvfile" + colorama.Style.RESET_ALL)
    exit(1)

def check_exists(csvpath):
    if not os.path.isfile(csvpath):
        log("csv file does not exist", "error")
        return False
    return True

def main():
    log("Running Script...")
    if len(sys.argv) < 2:
        log("csv file not specified", "error")
        print_help()
    if "-h" in sys.argv:
        print_help()
    csvpath = sys.argv[1]
    if check_exists(csvpath):
        sender = Sender(csvpath)
        sender.run()
    else:
        print_help()


if __name__ == '__main__':
    main()
