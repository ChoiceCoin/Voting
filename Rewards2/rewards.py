#Imports
from urllib.request import urlopen
from bs4 import BeautifulSoup
import csv
import re

def get_data():
    try:
        #html = urlopen("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I/")
        html = requests.get("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I/")
    except Exception as e:
        print(e)
        return

    soup = BeautifulSoup(html.content, 'html.parser')
    Sender_Data = soup.find_all('a')
    print(Sender_Data)

get_data()
    
    #Sender = SenderData[7].text.strip().replace('\n', ' ').replace('\r', '')
    #Amount
    #Amount_data = soup.find_all('b')
    #Amount_strip = Date_Data[3].text.strip('\t\r\n')
    #Amount = Amount_strip.strip()
    #def write():
        #Openfile
        #with open('database.csv', 'a') as csvfile:
            #define fieldnames
            #fieldnames = ['Patent_Number', 'Title', 'Assignee', 'Date']
            #Define writer
            #writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            #Write
            #writer.writerow({'Patent_Number': Patent_Number, 'Title':Title, 'Assignee':Assignee, 'Date':Date})
    #Call function
    #write()

    #--------
    #page 1
    #--------
    
    #image = soup.find("img", valign="MIDDLE", alt="[NEXT_DOC]")
    #link = image.parent
    #new_link = link.attrs['href']
    #new_page = urlopen('LINK'+new_link)
    #soup = BeautifulSoup(new_page, 'html.parser')
