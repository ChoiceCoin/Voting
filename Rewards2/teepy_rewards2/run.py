from scrapper import Scrapper, API

# For AlgoScan
client = Scrapper(API.ALGOSCAN)
transaction_data = client.get_data("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
client.write_to_csv(transaction_data, 'algoscan.csv')

#For AlgoExplorer
client = Scrapper(API.ALGOEXPLORER)
transaction_data = client.get_data("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
client.write_to_csv(transaction_data, 'algoexplorer.csv')
