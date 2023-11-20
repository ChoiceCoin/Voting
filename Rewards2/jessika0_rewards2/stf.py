
PATH = "/Users/ahamuefuleterence/chromedriver"

from selenium import webdriver
import time
import pandas as pd

driver = webdriver.Chrome() #using the webdriver method 
driver.get("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I") #getting the access to the url

#button = driver.find_element_by_xpath('//button[@data-cy = "next"]')
#button1 = driver.find_element_by_class_name("styles_next__NxHpD")
Amount = []                                                                   #empty lists
From1 = [] 
counter = 0
while counter <= 29:                                                          #while loop that loops 30 times clicking the next button 29 times scraping from the first to the last page
    button1 = driver.find_element_by_class_name("styles_next__NxHpD")         #button variable that finds the element by class name
    button1.click()                                                           #method that clicks on the next button automating the clicking on the button
    price_1 = driver.find_elements_by_xpath('//tbody/tr/td[4]')                  #this line scrapes the amount variable 
    for price in price_1:
        Amount.append(price.text)                                             #appends it the value scrapped into the list Amount
                
    Address_From = driver.find_elements_by_xpath('//tbody/tr/td[5]')               #scrapes the From variable
    for p in Address_From:
        From1.append(p.text)                                                  #appends the value in the From1 list
    counter += 1                                                              #increment
    time.sleep(3)                                                             #python is usually too fast for the website so this slows down the time allowing the script to scrape the data efficiently 
print(len(Amount))
print(len(From1))

df = pd.DataFrame({'Amount':Amount, 'Addresses From':From1 })
df.to_csv("CSV FILE", index=False)                                             #creating the csv file