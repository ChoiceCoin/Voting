# Web Scraper with Selenium
This is a web-scraper that scrapes all `from`, `to` and `amount` from the supplied wallet address from AlgoExplorer or AlgoScan. The scraper grabs all `from`, `to` and `amount` variables on each page then moves to the next page. This is achieved with selenium.


## Setup and Installation

```sh
$ pip install -r requirements.txt
```

## Mode Help
```sh
$ python run.py -h

usage: python run.py

Web scraper

optional arguments:
  -h, --help            show this help message and exit
  -w WALLET, --wallet WALLET
                        Specify wallet address
  --type {explorer,algoscan}
                        Choose between AlgoExplorer or AlgoScan Scraper
  --api                 Use the Api instead
  -v, --verbose         Increase verbosity
                                            
``` 

## Run Code
This runs the scraper with a default wallet address of `25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I` using algoexplorer on selenium web driver.
```sh
$ python run.py

INFO:root:Running scraper....
INFO:root:Using Selenium for scraping
INFO:root:Running AlgoExplorer Scraper...
INFO:root:Finished Scraping data!
INFO:root:Writing to csv file
INFO:root:Saved csv file to 25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I_explorer.csv
```

## Run code by specifying a different wallet address
```sh
$ python run.py -w IGOSRE2NROQZDUELTTLYMTE37OOC4X5O5NJPATQZ3QFPFDIVVAPFUF7CNA

INFO:root:Running scraper....
INFO:root:Using Selenium for scraping
INFO:root:Running AlgoExplorer Scraper...
INFO:root:Finished Scraping data!
INFO:root:Writing to csv file
INFO:root:Saved csv file to IGOSRE2NROQZDUELTTLYMTE37OOC4X5O5NJPATQZ3QFPFDIVVAPFUF7CNA_explorer.csv
```

## Switch from AlgoExporer to AlgoScan
```sh
$ python run.py --type algoscan

INFO:root:Running scraper....
INFO:root:Using Selenium for scraping
INFO:root:Running AlgoScan Scraper...
INFO:root:Finished Scraping data!
INFO:root:Writing to csv file
INFO:root:Saved csv file to 25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I_algoscan.csv
```

## Use of AlgoExplorer Api
This makes use of algoexplorer api to get the data. This is retrieves the files asychronously therefore making it faster than the rest
```sh
$ python run.py --api

INFO:root:Running scraper....
INFO:root:Using Api for scraping
INFO:root:Getting number of pages for 25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I...
INFO:root:Gathering data...
INFO:root:Writing to csv file
INFO:root:Saved csv file to 25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I_explorer.csv
```

## Youtube URL
- Video Preview [https://www.youtube.com/watch?v=08P1z7V8vM4](https://www.youtube.com/watch?v=08P1z7V8vM4)

## Functionalities
1. Switch between algoexplorer and algoscan when scraping with selenium
2. SWitch to algoexplorer api to fetch data quickly asychronously
3. Ability to increase verbosity. Easy for debuging code
4. Add a different wallet address to scrape from


## TechStack
- Selenium
- Requests
- Aiohttp
- Asyncio