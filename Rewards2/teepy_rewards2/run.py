from scrapper import APIClient, API, WEB, Scrapper

# For AlgoScanAPI
client = APIClient(API.ALGOSCAN)
transaction_data = client.get_data("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
APIClient.write_to_csv(transaction_data, 'algoscan-api.csv')

# For AlgoExplorerAPI
client = APIClient(API.ALGOEXPLORER)
transaction_data = client.get_data("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
APIClient.write_to_csv(transaction_data, 'algoexplorer-api.csv')

# For AlgoExplorer Web Page
web_scrapper = Scrapper(WEB.ALGOEXPLORER)
data = web_scrapper.get_data("25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
APIClient.write_to_csv(data, 'algoexplorer-web.csv')
