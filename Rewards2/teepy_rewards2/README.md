# AlgoScan & AlgoExplorer Transaction Scrapper
This codebase contains codes which can be used to scrape Transaction Data for a specific address from either [AlgoScan](https://algoscan.app/) or [AlgoExplorer](https://algoexplorer.io/)

# Usage
Bellow is a sample code on how to use the `Scrapper` & `ApiClient` class in the `scrapper.py` file.
```
from scrapper import APIClient, API, Scrapper, WEB

# For API
client = APIClient(API.ALGOSCAN) #You can specify API.ALGOEXPLORER to fetch from ALGOEXPLORER instead of ALGOSCAN
transaction_data = client.get_data(<algorand_address>, <pages>) #Pages Argument can be ommitted to fetch all pages
APIClient.write_to_csv(transaction_data, <output_file>)

# For Web Scrapping
scrapper = Scrapper(WEB.ALGOEXPLORER) #Only Supports ALGOEXPLORER
transaction_data = scarpper.get_data(<algorand_address>, <pages>) #Pages Argument can be ommitted to fetch all pages
APIClient.write_to_csv(transaction_data, <output_file>)

``` 
More Details can be found in the `run.py` file and `scrapper.py` file.

# Run Steps
- Run `pip install -r requirements.txt` to install dependecies.
- Note that the `Scrapper` class requires selenium webdriver. [Click Here To Install Chrome Web Driver](https://chromedriver.chromium.org/)
- To Test the scripts run `python run.py`. This creates two csv files in this folder.
- You can also Modify the `run.py` file to suit your usecase.

### Happy Hacking 🚀