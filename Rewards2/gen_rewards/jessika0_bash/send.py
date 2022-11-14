from algosdk import algod
import pandas as pd
from algosdk.v2client import algod, indexer
from algosdk import mnemonic
from algosdk.future import transaction                                   #Importing libraries


amount = []                                                             #Creating the empty list to read the csv into
from1 = []

CHOICE_ID = 297995609
ALGOD_ADDRESS = "https://node.algoexplorerapi.io"
INDEXER_ADDRESS = "https://algoindexer.algoexplorerapi.io"
ALGOD_TOKEN = ""
ALGOD_CLIENT = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS, {"X-API-Key": ""})
INDEXER_CLIENT = indexer.IndexerClient(ALGOD_TOKEN, INDEXER_ADDRESS, {"X-API-Key": ""})

SENDER_ADDRESS = ""

SENDER_MNEMONIC = ""                                                    #Algo asset and account syntax
df = pd.read_csv("jessika0_bash/myFile.csv", usecols=['from'])          #Reading the csv file 'FROM' variable
df2 = pd.read_csv("jessika0_bash/myFile.csv", usecols=['amount'])       #Reading the csv file 'Amount' variables
for f in df:
    from1.append(df)                                                    #appending into the list
for p in df2:
    amount.apppend(df2)
x = 0
multi = 1.1
while x <= 311:                                                     #while loop looping 311 times making 311 transactions

    params = ALGOD_CLIENT.suggested_params()
    amount1 = int(amount[x] * multi)
    txn = transaction.AssetTransferTxn(

        sender1=SENDER_ADDRESS,
        sp=params,
        reciver=from1[x],
        amt=amount[x],
        index=CHOICE_ID,
    )
    try:
     txn2 = txn.sign(mnemonic.to_private_key(SENDER_MNEMONIC))
     txid = ALGOD_CLIENT.send_transaction(txn2)
     print(txid)
     
    except:                                                           #Error handling 
        print("UNABLE TO RUN")
        






