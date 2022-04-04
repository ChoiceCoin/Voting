import csv

from bs4 import BeautifulSoup
from scrapingant_client import ScrapingAntClient


url = "https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I"

def write_csv(all_data):
    header = ["from","to", "amount"]
    with open("myFile.csv", "w", encoding="UTF-8") as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(all_data)
    print("Saved file to myFile.csv")


def main():
    print("Running program...")
    all_data = []
    client = ScrapingAntClient(token="abed92409362483abb2b9543426d73c7")
    content = client.general_request("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I").content
    soup = BeautifulSoup(content, 'html.parser')
    broth = soup.find('tbody').find_all('tr', {"class": "styles_item__L_bVx"})
    for i in broth:
        carrots = i.find_all('td')
        amount = carrots[3].find("span").string if carrots[3].find("a") == None else carrots[3].find("a").contents[1]
        fromAddress = carrots[4].find("span").string if carrots[4].find("a") == None else carrots[4].find("a").string
        toAddress = carrots[5].find("span").string if carrots[5].find("a") == None else carrots[5].find("a").string
        all_data.append({'from': fromAddress, 'to': toAddress, 'amount': amount})
        print(f"{fromAddress} -> {toAddress}: {amount}")
    write_csv(all_data=all_data)
    print("Finished!!")

main()



