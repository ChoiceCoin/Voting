import csv
from algosdk.v2client import algod
from algosdk import mnemonic, transaction 
from algosdk.future.transaction import transaction

algod_address = "https://node.testnet.algoexplorerapi.io" 
indexer_address = "https://algoindexer.testnet.algoexplorerapi.io"
algod_token = "" 
headers = {"X-API-Key": algod_token }
algod_client = algod.AlgodClient(algod_token,algod_address,headers)

# Choice Asset ID
asset_id = "297995609"
# Address of account being used to send asset
send_address = ""
# Converts the mnemonic address to private key
send_phrase = mnemonic.to_private_key("")

def send_asset(to: str, amount: float, multiplier: float) -> bool:
    suggested_params = algod_client.suggested_params()
    amount = int(amount * 100 * multiplier)
    unsigned_txn = transaction.AssetTransferTxn(
        sender=send_address,
        sp=suggested_params,
        receiver=to,
        amt=amount,
        index=asset_id,
    )
    try:
        signed_txn = unsigned_txn.sign(send_phrase)
        txid = algod_client.send_transaction(signed_txn)
        print(txid)
        return True
    except:
        return False


data = open('data.csv', 'r+')
read = csv.reader(data)


for row in read:
    x = float(row[-1])
    send_asset(to=row[0], amount=x, multiplier=1.1)

