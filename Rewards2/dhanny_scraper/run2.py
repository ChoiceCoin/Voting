# Standard Library
import csv
import sys
import base64
import logging
import argparse

# Packages
from bs4 import BeautifulSoup
from scrapingant_client import ScrapingAntClient
from scrapingant_client.errors import ScrapingantInvalidTokenException



# Debug 
_debug = False 

url = "https://algoexplorer.io/address/"



class Scraper(object):
    """
    scraper class used to create client connection to the api.
    AlgoExplorer and Algoscan inherit this properties to scrape data.
    """
    def __init__(self, wallet):
        """
        Create a new scraper on a specific wallet

        :param str wallet:  Wallet address
        """
        self.token = "d86a450e99e0458bb62e808a39a9e066" # Insert your Token Here
        self.all_data = []
        self.wallet = wallet
        self.client = ScrapingAntClient(token=self.token)
        


class AlgoScan(Scraper):

    def __init__(self, wallet) -> None:
        super(AlgoScan, self).__init__(wallet)
        self.url = "https://algoscan.app/address/" + wallet
        self.count = 1
        self.STOP = False

    def next_page(self, num):
        try:
            func_snippet = f"""
            const nextBtn = document.querySelector("#__next > main > section.mt-4 > div > div > button:nth-child(3)");
            for (let i=0; i < {num}; i++) {{
                nextBtn.click();
                await new Promise(r => setTimeout(r, 2000));
            }}
            """
            return func_snippet
        except Exception as e:
            log(f"{self.next_page.__name__} Error occured : {str(e)}", "info")
            exit(1)
    

    def scrape_data(self, soup):
        broth = soup.find('tbody').find_all('tr')
        next_btn = soup.find('button', {'aria-label': 'right', 'class': 'ml-1 hover:shadow-accent disabled:shadow-none undefined'})
        if next_btn.has_attr('disabled'):
            self.STOP = True
        for i in broth:
            carrots = i.find_all('td')
            fromAddress = carrots[4].find("a").string 
            toAddress = carrots[6].find("a").string
            amount = carrots[7].contents[0]
            amount = float(''.join(amount.split(' ')[0].split(',')))
            self.all_data.append({'from': fromAddress, 'to': toAddress, 'amount': amount})
            log(f"{fromAddress} -> {toAddress}: {amount}")


    def run(self):
        try:
            log("Running AlgoScan Scraper....", "info")
            content = self.client.general_request(self.url).content
            soup = BeautifulSoup(content, 'html.parser')
            log("Scraping 1st page", "info")
            self.scrape_data(soup)
            while not self.STOP:
                log(f"Scraping  {self.count + 1}  page", "info")
                session2 = self.client.general_request(self.url, js_snippet=self.next_page(self.count))
                soup2 = BeautifulSoup(session2.content, 'html.parser')
                self.scrape_data(soup2)
                self.count += 1
            return self.all_data
        except ScrapingantInvalidTokenException:
            log("Invalid scrapingant Token", "info")
            log("Exiting....", "info")
            exit(1)
        except Exception as e:
            log(f"{self.run.__name__} An error occured: {str(e)} ", "info")
            return self.all_data

    

class AlgoExplorer(Scraper):
    """
    Scrapes data from AlgoExplorer

    Returns a list of all_data containing all the rows of 'from',
    'to' and 'amount'
    """

    def __init__(self, wallet):
        """
        Create a new scraper on a specific wallet

        :param str wallet:  Wallet address
        :param str token:   Scrapingant API Token
        """
        super(AlgoExplorer, self).__init__(wallet)
        self.url = "https://algoexplorer.io/address/" + self.wallet


    def next_page(self, num):
        try:
            func_snippet = f"""
            const nextBtn = document.querySelector("button.styles_pagination-btn__vJnM4.styles_next__NxHpD.btn.btn-secondary");
            for (let i=0; i < {num}; i++) {{
                nextBtn.click();
                await new Promise(r => setTimeout(r, 2000));
            }}
            """
            return func_snippet
        except Exception as e:
            log(f"{self.next_page.__name__} Error occured : {str(e)}", "info")
            exit(1)

    def scrape_data(self, soup):
        broth = soup.find('tbody').find_all('tr', {"class": "styles_item__L_bVx"})
        for i in broth:
            carrots = i.find_all('td')
            amount = carrots[3].find("span").string if carrots[3].find("a") == None else carrots[3].find("a").contents[1]
            fromAddress = carrots[4].find("span").string if carrots[4].find("a") == None else carrots[4].find("a").string
            toAddress = carrots[5].find("span").string if carrots[5].find("a") == None else carrots[5].find("a").string
            amount = float(''.join(amount.split(' ')[0].split(',')))
            self.all_data.append({'from': fromAddress, 'to': toAddress, 'amount': amount})
            log(f"{fromAddress} -> {toAddress}: {amount}")


    def run(self):
        try:
            log("Running AlgoExplorer Scraper....", "info")
            session = self.client.general_request(self.url)
            soup = BeautifulSoup(session.content, 'html.parser')
            total_page = int(soup.find("div", {"data-cy": "pagination"}).contents[1].split(" ")[1])
            log(f"AlgoExplorer discovered a total of {total_page}", "info")
            log("Scraping  1st page", "info")
            self.scrape_data(soup)
            for i in range(total_page):
                log(f"Scraping  {i + 2}/{total_page}  page", "info")
                session2 = self.client.general_request(self.url, js_snippet=self.next_page(i + 1))
                soup2 = BeautifulSoup(session2.content, 'html.parser')
                self.scrape_data(soup2)
            return self.all_data
        except ScrapingantInvalidTokenException:
            log("Invalid scrapingant Token", "info")
            log("Exiting....", "info")
            exit(1)
        except Exception as e:
            log(f"{self.run.__name__} An error occured: {str(e)} ", "info")
            return self.all_data


def log(msg: str, level='debug'):
    """
    Log output to the console

    `Optional`
    :param str level:   Level of verbosity

    `Required`
    :param str msg:     Data to display on console
    """
    logging.basicConfig(level=logging.DEBUG if globals()['_debug'] else logging.INFO, handlers=[logging.StreamHandler()])
    logger = logging.getLogger()
    getattr(logger, level if hasattr(logger, level) else 'debug')(str(msg))


def parser():
    """
    Create the Argument Parser
    """
    p = argparse.ArgumentParser(prog=sys.argv[0], usage=f"python {sys.argv[0]}",description="Web scraper")
    p.add_argument("-w","--wallet", type=str, help="Specify wallet address", default="25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
    p.add_argument("--type", type=str, default="explorer", choices=["explorer","algoscan"], help="Choose between AlgoExplorer or AlgoScan Scraper")
    p.add_argument("-v", "--verbose", action="store_true", help="Increase verbosity")
    return p.parse_args()




def write_csv(all_data):
    header = ["from","to", "amount"]
    log("Writing to csv file", "info")
    with open("myFile.csv", "w", encoding="UTF-8") as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(all_data)
    log("Saved file to myFile.csv", "info")


def main():
    p = parser()
    if p.verbose:
        globals()['_debug'] = True
    log("Running scraper....", "info")
    if p.type == "explorer":
        scraper = AlgoExplorer(p.wallet)
    else:
        scraper = AlgoScan(p.wallet)
    all_data = scraper.run()
    write_csv(all_data=all_data)


if __name__ == '__main__':
    main()



