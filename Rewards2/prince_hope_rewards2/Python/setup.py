# Importing required dependencies
from selenium import webdriver
import logging
import traceback
import pandas as pd
import time
# Building the driver we will use for and specifying the specific browser
# in our case "Chrome"

driver = webdriver.Chrome()
driver.get(
    "https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")

amount = []
From = []
prices =  driver.find_elements_by_xpath('//tbody/tr/td[4]')
addresses = driver.find_elements_by_xpath("//tbody/tr/td[5]")
def add_to_arrays():
    for price in prices:
        amount.append(price.text)
    for address in addresses:
        From.append(address.text)

recur = 0
def resursive_check(addresses):
    if addresses[0].text == driver.find_elements_by_xpath("//tbody/tr/td[5]")[0].text:
        button.click()
        resursive_check(addresses)
    else:
        print("Base case Failed")
        addresses=driver.find_elements_by_xpath("//tbody/tr/td[5]")
        return
        

num = driver.find_element_by_class_name("styles_pagination-container__i_fkI")
button = driver.find_element_by_class_name("styles_next__NxHpD")
iteratable_num = int(num.text[3:])

clicked =0
for i in range(1, iteratable_num+1):
    try:
        # get prices and amounts
        prices = driver.find_elements_by_xpath('//tbody/tr/td[4]')
        addresses = driver.find_elements_by_xpath("//tbody/tr/td[5]")

        # create time delay
        time.sleep(1)
        button.click()

        add_to_arrays()
        button.click()
        clicked = clicked+1
    except Exception as e:
        logging.error(traceback.format_exc())
        break
amounts_dict ={
    "From": From,
    "Amount":amount
}
df = pd.DataFrame(amounts_dict)
df.to_csv("Prices_and_amounts.csv")