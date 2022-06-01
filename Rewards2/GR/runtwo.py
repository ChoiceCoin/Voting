import csv
import sys
import logging
import argparse

from bs4 import BeautifulSoup
from scrapingant_client import ScrapingAntClient

# Debug 
_debug = False 
url = "https://algoexplorer.io/address/"

class AlgoScraper(object):

    # Scrapes data from AlgoExplorer
    # Returns a list of all_data containing all the rows of 'from', 'to' and 'amount'
    def __init__(self, wallet):
        # Create a new scraper on a specific wallet :param str wallet:  Wallet address
        self.url = "https://algoexplorer.io/address/" + wallet
        self.all_data = []

    def run(self):
        client = ScrapingAntClient(token="")
        content = client.general_request(self.url).content
        soup = BeautifulSoup(content, 'html.parser')
        broth = soup.find('tbody').find_all('tr', {"class": "styles_item__L_bVx"})
        for i in broth:
            carrots = i.find_all('td')
            amount = carrots[3].find("span").string if carrots[3].find("a") == None else carrots[3].find("a").contents[1]
            fromAddress = carrots[4].find("span").string if carrots[4].find("a") == None else carrots[4].find("a").string
            # toAddress = carrots[5].find("span").string if carrots[5].find("a") == None else carrots[5].find("a").string
            # self.all_data.append({'from': fromAddress, 'to': toAddress, 'amount': amount})
            self.all_data.append({'from': fromAddress, 'amount': amount})
            # log(f"{fromAddress} -> {toAddress}: {amount}")
            log(f"{fromAddress} : {amount}")
        return self.all_data


def log(msg: str, level='debug'):
    # Log output to the console
    # `Optional`
    # :param str level:   Level of verbosity
    # `Required`
    # :param str msg:     Data to display on console
    logging.basicConfig(level=logging.DEBUG if globals()['_debug'] else logging.INFO, handlers=[logging.StreamHandler()])
    logger = logging.getLogger()
    getattr(logger, level if hasattr(logger, level) else 'debug')(str(msg))


def parser():
    # Create the Argument Parser
    p = argparse.ArgumentParser(prog=sys.argv[0], usage=f"python {sys.argv[0]}",description="Web scraper")
    p.add_argument("-w","--wallet", type=str, help="Specify wallet address", default="25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
    p.add_argument("-v", "--verbose", action="store_true", help="Increase verbosity")
    return p.parse_args()

def write_csv(all_data):
    header = ["from","to", "amount"]
    log("Writing to csv file", "info")
    with open("myFile1.csv", "w", encoding="UTF-8") as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(all_data)
    print("Saved file to myFile1.csv")

def main():
    log("Running scraper....", "info")
    p = parser()
    if p.verbose:
        globals()['_debug'] = True
    scraper = AlgoScraper(p.wallet)
    all_data = scraper.run()
    write_csv(all_data=all_data)

main()

