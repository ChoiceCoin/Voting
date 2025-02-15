from algosdk import algod
import csv
from algosdk.v2client import algod, indexer
from algosdk import mnemonic
from algosdk.future import transaction
import pandas as pd


def main():
    CHOICE_ID = 297995609
    ALGOD_ADDRESS = "https://node.algoexplorerapi.io"
    INDEXER_ADDRESS = "https://algoindexer.algoexplorerapi.io"
    ALGOD_TOKEN = ""
    ALGOD_CLIENT = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, {"X-API-Key": ""})
    INDEXER_CLIENT = indexer.IndexerClient(
        ALGOD_TOKEN, INDEXER_ADDRESS, {"X-API-Key": ""}
    )
    SENDER_ADDRESS = ""
    SENDER_MNEMONICS = ""

    def send_choice(account, amount, multiplier):
        suggested_params = ALGOD_CLIENT.suggested_params()
        amount = int(amount * 100 * multiplier)
        unsigned_txn = transaction.AssetTransferTxn(
            sender=SENDER_ADDRESS,
            sp=suggested_params,
            receiver=account,
            amt=amount,
            index=CHOICE_ID,
        )
        try:
            signed_txn = unsigned_txn.sign(mnemonic.to_private_key(SENDER_MNEMONICS))
            txid = ALGOD_CLIENT.send_transaction(signed_txn)
            print(txid)
            return True
        except:
            return False

    dataset = pd.read_csv("myFile.csv")
    from_col = dataset["from"]
    amount_col = dataset["amount"]
    dataset_len = int(len(dataset))
    i = 0
    for i in range(dataset_len):
        amount = int(amount_col[dataset[i]])
        account = str(from_col[[dataset[i]]])
        multiplier = 1.1
        send_choice(account, amount, multiplier)


if __name__ == "__main__":
    main()
