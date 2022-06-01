# Web Scraper with Selenium
This is a web-scraper that scrapes all `from`, `to` and `amount` from the supplied wallet address from AlgoExplorer. The scraper grabs all `from`, `to` and `amount` variables on each page then moves to the next page.


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
  -v, --verbose         Increase verbosity
                         
``` 

## Run Code
This runs the scraper with a default wallet address of `25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I` using algoexplorer on selenium web driver.
```sh
$ python run.py

INFO:root:Running scraper....
INFO:root:Writing to csv file
Saved file to myFile.csv

```

## Run code by specifying a different wallet address
```sh
$ python run.py -w IGOSRE2NROQZDUELTTLYMTE37OOC4X5O5NJPATQZ3QFPFDIVVAPFUF7CNA

INFO:root:Running scraper....
INFO:root:Writing to csv file
Saved file to myFile.csv
                          
```

## Switch from AlgoExporer to AlgoScan
```sh
$ python run.py --type algoscan

INFO:root:Running scraper....
INFO:root:Running AlgoScan Scraper....
INFO:root:Writing to csv file
INFO:root:Saved file to myFile.csv

```

