from selenium import webdriver
import time
import pandas as pd
from selenium.webdriver.common.by import By

# Location of the chromedriver
web_driver = webdriver.Chrome(r"C:\\chromedriver\chromedriver.exe")

# Accessing the account url from algoexplorer
web_driver.get("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")

# Empty lists and a counter that starts initially at 0
Amount = []  # empty lists
From1 = []
counter = 0

# A while loop that loops 30 times moving from the first page to the last page(30th page)
while counter <= 29:
    # button variable that finds the element by class name
    button1 = web_driver.find_element(By.CLASS_NAME, "styles_next__NxHpD")
    # method that clicks on the next button automating the clicking on the button
    button1.click()
    amount_sent = web_driver.find_element(By.XPATH, '//tbody/tr/td[4]')
    # noinspection PyTypeChecker
    for p in amount_sent:
        # appends it the value scrapped into the list Amount
        Amount.append(amount_sent.text)
    # scrapes the From variable
    addresses = web_driver.find_elements(By.XPATH, '//tbody/tr/td[5]')
    for i in addresses:
        From1.append(i.text)
    counter += 1
    time.sleep(0)
print(len(Amount))
print(len(From1))

df = pd.DataFrame({'From': From1,                          'Amount': Amount})
df.to_csv("algo_transactions.csv", index=True)
