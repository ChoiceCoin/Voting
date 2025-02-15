#Choice Coin Governance Rewards Code.
#Proposed rates: up to 5 million Choice committed: 20 percent, 10 million Choice: 15 percent, 12 million Choice: 12.5%
from algosdk import account, encoding, mnemonic,algod
from algosdk.future.transaction import AssetTransferTxn, PaymentTxn, AssetConfigTxn
from algosdk.future.transaction import AssetFreezeTxn
from algosdk.v2client import algod
from algorand_demo import choice_trade
import json
import urllib3
choice_id  = 42771692

voter_1_address = 
voter_1_mnemonic = 
voter_1_key = mnemonic.to_private_key(voter_1_mnemonic)


def choice_trade(sender, key, receiver, amount, index,comment):
    parameters = algod_client.suggested_params()
    transaction = AssetTransferTxn(sender, parameters, receiver, amount, index,note=comment)
    #Defines an inital transaction for choice Coin
    signature = transaction.sign(key)
    #Signs the transaction with the senders private key
    algod_client.send_transaction(signature)
    #Sends the transaction with the signature
    final = transaction.get_txid()
    return True, final



def fetch_addresses():
	http = urllib3.PoolManager()
	main = http.request('GET','https://testnet.algoexplorerapi.io/idx2/v2/accounts/I62YOUP2YB65PQSTA25MXEVMWHD45HSZ5PPOYAH2NVV4Y3QBZLBDY4V53A/transactions?asset-id=42771692')
	json_list = json.loads(main.data.decode('utf-8'))
	with open('data.json', 'w', encoding='utf-8') as f:
		json.dump(json_list, f, ensure_ascii=False, indent=4)
	with open('data.json') as json_file:
		data = json.load(json_file)
		transaction_data = data['transactions']

	# now we will open a file for writing
		data_file = open('file.csv', 'w')

	# create the csv writer object
		csv_writer = csv.writer(data_file)

	# Counter variable used for writing
	# headers to the CSV file
		count = 0

		for transaction in transaction_data:
		    if count == 0:

		        # Writing headers of CSV file
		        header = transaction.keys()
		        csv_writer.writerow(header)
		        count += 1

		    # Writing data of CSV file
		    csv_writer.writerow(transaction.values())

		data_file.close()

def give_rewards():
	with open('data.json', 'r') as json_file:
	    # pass the file object to reader() to get the reader object
					data = json.load(json_file)
					transaction_data = data['transactions']
					for transaction in transaction_data:
						amount = transaction["asset-transfer-transaction"]["amount"]
						amount = int(amount)
						amount = amount + amount * 0.12 #Rewards rate hardcoded
						address = transaction['sender']
						id = transaction['id']
						choice_trade(voter_1_address,voter_1_key,address,amount,choice_id,"Rewards!" + id)
fetch_addresses()
give_rewards()
