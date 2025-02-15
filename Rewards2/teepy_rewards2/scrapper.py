from enum import Enum
from typing import Union, List
import requests
import csv
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time


class API(Enum):

    ALGOEXPLORER = "https://indexer.algoexplorerapi.io/rl/v1/transactions"
    ALGOSCAN = "https://algoscan.app/api/transactions/"

class WEB(Enum):

    ALGOEXPLORER = "https://algoexplorer.io/address/"
    #ALGOSCAN = "https://algoscan.app/address/"

class APIClient:

    def __init__(self, api: API):
        self.api = api
        self.api_base_url = api.value
    
    def get_data(self, address: str, pages: Union[int, None]=None) -> List:
        try:
            if self.api == API.ALGOSCAN:
                return self._algoscan(address, pages)
            else:
                return self._algoexplorer(address, pages)
        except Exception as e:
            print(f'Error Fetching Transaction Data: {e}')
            return []
        
    def _algoscan(self, address: str, pages: Union[int, None]=None) -> List:
        """
        Makes a request to algoScan API to fetch transaction data for the given address.

        Args:
            - address: desired address for transaction data
            - pages: desired number of pages for response[can be skipped to fetch all pages]
        Returns:
            - List[{}]: A list of transaction data for the given address
        """
        data = []
        offset = 0
        page = 0
        while True:
            if pages:
                if page == pages:
                    break
            res = requests.get(f"{self.api_base_url}{address}?offset={offset}")
            dat = res.json()
            if dat == []:
                break
            data.extend(list(map(lambda item: {'from': item['sender'], 'amount': item['amount']}, dat)))
            page += 1
            offset += 20
        return data

    def _algoexplorer(self, address: str, pages: Union[int, None]=None):
        """
        Makes a request to algoExplorer API to fetch transaction data for the given address.

        Args:
            - address: desired address for transaction data
            - pages: desired number of pages for response[can be skipped to fetch all pages]
        Returns:
            - List[{}]: A list of transaction data for the given address
        """
        page = 1
        limit = 50
        data = []
        while True:

            if pages:
                if page == pages:
                    break
            url = f"{self.api_base_url}?page={page}&limit={limit}&address={address}"
            resp = requests.get(url)
            try:
                dat = resp.json()['transactions']
            except Exception as e:
                break
            data.extend(list(map(lambda item: {'from': item['sender'], 'amount': item['asset-transfer-transaction']['amount']} if item.get('asset-transfer-transaction', None) else {'from': item['sender'], 'amount': item['payment-transaction']['amount']}, dat)))
            page += 1
        return data

    @staticmethod
    def write_to_csv(data: List, output_file: str):
        if not data:
            print('Empty Data')
            return
        keys = data[0].keys()
        with open(output_file, 'w', newline='') as file:
            dict_writer = csv.DictWriter(file, keys)
            dict_writer.writeheader()
            dict_writer.writerows(data)  

class Scrapper:
    """
    This Class Scrapes AlgoExplorer.io or AlgoScan For Transaction Data For A Specified Address.
    Currently Supports AlgoExplorer only.
    """

    def __init__(self, web: WEB):
        self.web = web
        self.web_base_url = web.value
        self.browser = Chrome()
    
    def get_data(self, address: str, pages: Union[int, None]=None) -> List:
        if self.web == WEB.ALGOEXPLORER:
            return self._algoexplorer(address, pages)
        else:
            return self._algoscan(address, pages)
    
    def _algoexplorer(self, address, pages=None):
        """
        Scrapes AlgoExplorer.io To fetch transaction data for Address.

        Args:
            - address: desired address for transaction data
            - pages: desired number of pages for response[can be skipped to fetch all pages]
        Returns:
            - List[{}]: A list of transaction data for the given address
        """
        data = []
        self.browser.get(f"{self.web_base_url}{address}")
        # Getting All Rows On the Page
        rows = self.browser.find_elements(by=By.TAG_NAME, value='tr')
        # Getting the Value of The Last Page from The Page
        last_page = self.browser.find_element(By.CLASS_NAME, value="styles_pagination-container__i_fkI")
        last_page = re.sub("[^0123456789\.]", '', last_page.text) # Removing Characters from the LastPage Value (from 'out of 30' to '30')
        curr_page = 1
        next_page_click = self.browser.find_elements(By.CLASS_NAME, 'styles_pagination-btn__vJnM4')[2] # Element To Click For Next Page Navigation
        while curr_page <= int(last_page):
            for row in rows[1:]:
                try:
                    # Fetch All A Tags and All Elements in the Table Row
                    a_tags = row.find_elements(by=By.TAG_NAME, value='a')
                    all_els = row.find_elements(By.XPATH, ".//*")
                    all_elements_count = len(all_els)
                
                    if all_elements_count < 17:
                        # For Algorand Transfer
                        amount = all_els[7].text
                        sender = all_els[9].text
                    else:
                        # For Asset Transfer
                        sender = all_els[10].text
                        amount = a_tags[2].text
                    amount = re.sub("[^0123456789\.]", '', amount)
                    data.append({'from': sender, 'amount': float(amount)})
                except:
                    pass
            if pages:
                # Break The Loop Once Required Page is Reached
                if curr_page == pages:
                    break
            # Click The Nextpage Button and Wait For Spinner To Disappear
            next_page_click.click()
            WebDriverWait(self.browser, 10).until(EC.invisibility_of_element_located((By.CLASS_NAME, 'spinner')))
            curr_page += 1
        self.browser.close()
        return data








