#Imports
from urllib.request import urlopen
import urllib
import csv
import re
import requests
from bs4 import BeautifulSoup

def get_data():
    try:
        html = requests.get("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I/")
    except Exception as e:
        print(e)
        return
    soup = BeautifulSoup(html.content, 'html.parser')
    for i in soup.find_all('tr'):
        carrots = soup.find_all('td')
        print(carrots)
        for j in carrots:
            celery = soup.find_all('a')
            print(celery)
            for k in celery:
                choice = celery[3]
                print(choice)
            for k in celery:
                sender = celery[4]
                print(sender)
        
get_data()

