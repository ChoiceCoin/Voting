from algosdk import algod
import csv
from algosdk.v2client import algod, indexer
from algosdk import mnemonic
from algosdk.future import transaction

CHOICE_ID = 297995609
ALGOD_ADDRESS = "https://node.algoexplorerapi.io"
INDEXER_ADDRESS = "https://algoindexer.algoexplorerapi.io"
ALGOD_TOKEN = ""
ALGOD_CLIENT = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, {"X-API-Key": ""})
INDEXER_CLIENT = indexer.IndexerClient(ALGOD_TOKEN, INDEXER_ADDRESS, {"X-API-Key": ""})
# The address of the account you're sending with
SENDER_ADDRESS = ""
# The mnemonic of the address you're sending with
SENDER_MNEMONIC = ""


def send_choice(to: str, amount: float, multiplier: float) -> bool:
    suggested_params = ALGOD_CLIENT.suggested_params()
    amount = int(amount * 100 * multiplier)
    unsigned_txn = transaction.AssetTransferTxn(
        sender=SENDER_ADDRESS,
        sp=suggested_params,
        receiver=to,
        amt=amount,
        index=CHOICE_ID,
    )
    try:
        signed_txn = unsigned_txn.sign(mnemonic.to_private_key(SENDER_MNEMONIC))
        txid = ALGOD_CLIENT.send_transaction(signed_txn)
        print(txid)
        return True
    except:
        return False


with open('../myFile.csv', newline='') as f:
    reader = csv.reader(f)
    data = list(reader)

for row in data[1:]:
    sending_amount = float(row[-1])
    send_choice(to=row[0], amount=sending_amount, multiplier=0.01)


# hi = send_choice(to='25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I', amount=10, multiplier=1.0)
# print(hi)
