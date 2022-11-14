# standard library
import argparse
import sys
import logging
import string
import csv

#packages
import aiohttp
import asyncio
import requests
from selenium import webdriver as Web
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, NoSuchElementException, StaleElementReferenceException
from selenium.webdriver.chrome.options import Options


# Debug 
_debug = False 


class SeleniumScraper(object):
    """
    Selenium scraper class used to start and close the selenium browser.
    AlgoExplorer and Algoscan inherit this properties to scrape data.
    """
    all_data = []

    def __init__(self, wallet):
        """
        Create a new scraper on a specific wallet

        :param str wallet:  Wallet address
        """
        self.wallet = wallet
        self.options = Options()
        self.options.add_experimental_option("detach", True)
        self.browser = Web.Chrome("chromedriver", options=self.options)
        self.browser.set_window_size(1000, 900)
        self.total_pages = 1

    
    def close_browser(self):
        """
        Close selenium web browser
        """
        self.browser.close()
        self.browser.quit()
    
class ExplorerScraper(SeleniumScraper):
    """
    Scrapes data from Algoexplorer

    Returns a list of all_data containing all the rows of 'from',
    'to' and 'amount'
    """

    def __init__(self, wallet):
        """
        Create a new scraper on a specific wallet

        :param str wallet:  Wallet address
        """
        super(ExplorerScraper, self).__init__(wallet)
        self.url = "https://algoexplorer.io/address/" + wallet
        self.total_pages = 1

    def check_exists(self, row, xpath):
        """
        Checks if an xpath exists

        `Required`
        :param row:         row to find path on
        :param str xpath:   xpath to check that exists
        """
        try:
            row.find_element_by_xpath(xpath)
            return True
        except NoSuchElementException:
            return False
            
    @property
    def _get_total_pages(self):
        """
        Gets the the total page that exists.
        """
        total_pages = self.browser.find_element_by_xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[1]/div[2]').text
        self.total_pages = int(total_pages.split(' ')[1])

    def _next_page(self):
        """
        Moves to the next page
        """
        self.browser.find_element_by_xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[1]/div[2]/button[3]').click()

    def scrape_rows(self):
        """
        Scrapes the data on a page
        """
        rows = self.browser.find_elements_by_css_selector('div.master > div.root > div > div:nth-child(3) > div > div > div > div > div.table-responsive > table > tbody > tr.row.styles_item__L_bVx')
        for row in rows:
            fromAddress = row.find_element_by_xpath('.//td[5]/span') if self.check_exists(row, './/td[5]/span') else row.find_element_by_xpath('.//td[5]/a')
            toAddress = row.find_element_by_xpath('.//td[6]/span') if self.check_exists(row, './/td[6]/span') else row.find_element_by_xpath('.//td[6]/a')
            amount = row.find_element_by_xpath('.//td[4]/span') if self.check_exists(row, './/td[4]/span') else row.find_element_by_xpath('.//td[4]/a')
            self.all_data.append({"from": fromAddress.text, "to": toAddress.text, "amount": amount.text})   
    
    def run(self):
        """
        Handle the AlgoExplorer scraper
        """
        log("Running AlgoExplorer Scraper...", "info")
        self.browser.get(self.url)
        WebDriverWait(self.browser, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[2]/table/tbody')))
        self._get_total_pages
        self.scrape_rows()
        for i in range(self.total_pages):
            log(f'Getting {i + 1} page...')
            self._next_page()
            WebDriverWait(self.browser, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[2]/table/tbody')))
            self.scrape_rows()
        log("Finished Scraping data!", 'info')
        self.close_browser()
        return self.all_data


class AlgoScanScraper(SeleniumScraper):
    """
    Scrapes data from AlgoScan

    Returns a list of all_data containing all the rows of 'from',
    'to' and 'amount'
    """

    def __init__(self, wallet):
        """
        Create a new scraper on a specific wallet

        :param str wallet:  Wallet address
        """
        super(AlgoScanScraper, self).__init__(wallet)
        self.url = "https://algoscan.app/address/" + wallet

            

    def _next_page(self):
        """
        Move to the next page
        """
        self.browser.find_element_by_xpath('//*[@id="__next"]/div/div[1]/div[1]/div/div[2]/div/div/div/div/div[1]/div[2]/button[3]').click()

    def scrape_rows(self):
        """
        Scrape rows on a page
        """
        rows = self.browser.find_elements_by_css_selector('#__next > main > section.mt-4 > section > table > tbody > tr')
        for row in rows:
            fromAddress = row.find_element_by_xpath('.//td[5]/a')
            toAddress = row.find_element_by_xpath('.//td[7]/a')
            amount = row.find_element_by_xpath('.//td[8]')
            log({"from": fromAddress.text, "to": toAddress.text, "amount": amount.text})
            self.all_data.append({"from": fromAddress.text, "to": toAddress.text, "amount": amount.text})   

    def run(self):
        """
        Handle the AlgoScan scraper
        """
        log("Running AlgoScan Scraper...", "info")
        self.browser.get(self.url)
        WebDriverWait(self.browser, 10).until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/section[2]/section/table/tbody')))
        nextBtn = self.browser.find_element_by_xpath('//*[@id="__next"]/main/section[2]/div/div/button[3]')
        self.scrape_rows()
        while not nextBtn.get_attribute('disabled'):
            log("Getting next Page...")
            nextBtn.click()
            ignored_exceptions = (NoSuchElementException, StaleElementReferenceException)
            WebDriverWait(self.browser, 10, ignored_exceptions=ignored_exceptions).until_not(EC.presence_of_element_located((By.CSS_SELECTOR, '#__next > main > section.mt-4 > div > div > svg.animate-spin')))
            self.scrape_rows()
        log("Finished Scraping data!", 'info')
        self.close_browser()
        return self.all_data



class WebApi(object):
    """
    Gets data from AlgoExplorer Api

    Returns a list of all_data containing all the rows of 'from',
    'to' and 'amount' 
    """
    headers = {
        'User-Agent': "choice scraper"
    }
    all_data = []

    def __init__(self, urls: list) -> None:
        """
        Create a new scraper on a specific wallet

        `Required`
        :param list urls:  All the url to fetch data from
        """
        self.urls = urls
        self.all_data = []
    
    async def fetch(self, session, url: str) -> None:
        """
        Fethces data from the api and extracts `from`, `to` and `amount`

        `Required`
        :param session:     A ClientSession
        :param str url:     Url extract data from
        """
        try:
            async with session.get(url) as response:
                text = await response.json()
                await self.extract_info(text)
        except Exception as e:
            log(f"{self.fetch.__name__} Error occured: {e}")


    async def extract_info(self, text) -> None:
        """
        Function that extracts the `from`, `to` and `amount`

        `Required`
        :param dict text:   Json response from API
        """
        try:
            for transactions in text.get("transactions"):
                asset_transactions = transactions.get("asset-transfer-transaction")
                self.all_data.append({"from": transactions.get("sender"), "to": asset_transactions.get("receiver"), "amount": asset_transactions.get("amount")})
        except Exception as e:
            log(f"{self.extract_info.__name__} Error occured: {e}")

    async def main(self) -> None:
        """
        Creates the ClientSession and loops through the list of urls to extract data from
        """
        tasks = []
        async with aiohttp.ClientSession(headers=self.headers) as session:
            for url in self.urls:
                log(f"Making connections to url: {url}...")
                tasks.append(self.fetch(session, url))
            htmls = await asyncio.gather(*tasks)


    def run(self) -> None:
        """
        Handle the AlgoExplorer Api extraction
        """
        log("Gathering data...", "info")
        asyncio.run(self.main())
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
    p.add_argument("--api", action="store_true", help="Use the Api instead")
    p.add_argument("-v", "--verbose", action="store_true", help="Increase verbosity")
    return p.parse_args()



def create_urls(address):
    """
    Creates the list of url for the different pages on the api

    `Required`
    :param str address:     Address to use for the creation of the url
    """
    urls = []
    url = string.Template("https://indexer.algoexplorerapi.io/rl/v1/transactions?page=${page}&&limit=10&&address=${address}")
    log(f"Getting number of pages for {address}...", "info")
    response = requests.get(url.substitute(page=1, address=address))
    if response.status_code == 200:
        text = response.json()
        total_pages = text["num-total-pages"]
        log(f"Gotten total pages of {total_pages}")
        for i in range(total_pages):
            log(f"Creating url for page {i + 1}...")
            urls.append(url.substitute(page=i+1, address=address))
        return urls
    print(f"Error {response.status_code} occured in retrieving info.\nProbably Invalid wallet address")
    exit(1)

def write_csv(all_data, wallet, type):
    """
    Writes to a csv file the data received with a filename of the walletaddress and the scantype (algoexplorer or algoscan)

    `Required`
    :param list all_data:   A list of data containing `from`,`to` and `amount`
    :param str wallet:      The wallet address
    :param str type:        Scan type (algoexplorer/algoscan)
    """
    log("Writing to csv file", "info")
    header = ["from", "to","amount"]
    filename = f"{wallet}_{type}.csv"
    with open(filename, "w", encoding="UTF-8") as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(all_data)
    log(f"Saved csv file to {filename}", "info")


def main():
    p = parser()
    if p.verbose:
        globals()['_debug'] = True
    log("Running scraper....", "info")
    if p.api:
        log("Using Api for scraping", "info")
        urls = create_urls(p.wallet)
        scraper = WebApi(urls)
        all_data = scraper.run()
    else:
        log("Using Selenium for scraping", "info")
        if p.type == "explorer":
            selScraper = ExplorerScraper(p.wallet)
            all_data = selScraper.run()
        else:
            selScraper = AlgoScanScraper(p.wallet)
            all_data = selScraper.run()
    write_csv(all_data, p.wallet, p.type)

if __name__ == '__main__':
    main()
