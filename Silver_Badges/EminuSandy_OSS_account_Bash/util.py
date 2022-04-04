from algosdk import kmd
from algosdk.wallet import Wallet
from algosdk.v2client import algod

kmd_address = "https://testnet-algorand.api.purestake.io/ps2"
kmd_token = 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'
algod_address = "https://testnet-algorand.api.purestake.io/ps2"
algod_token = "B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab"
algod_headers = {"X-API-key": algod_token}
# kmd_token = {"X-API-key": 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab'}
# kcl = kmd.KMDClient(kmd_token, kmd_address)

# wallet = Wallet("TestWallet", "testpassword", kcl)
# info = Wallet.info()
# print(info)
# with open('wallet.txt', 'w') as f:
#     f.write(nfo)
# address =  wallet.generate_key
# prin(address)
# wallet = kcl.create_wallet("TestWallet",)


client = algod.AlgodClient(algod_token, algod_address, headers=algod_headers)

def getAccountInfo(account):
    print(account)
    account_info = client.account_info(account.get('addr'))
    print(account_info)
    return account_info