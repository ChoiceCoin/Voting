import asyncio
import requests
from bs4 import BeautifulSoup
from pyppeteer import launch
from scrapingant_client import ScrapingAntClient

url = "https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I"
# html = requests.get("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
# #print(html.content)


# browser = launch()
# page = browser.newPage()
# soup = BeautifulSoup(html.content, 'html.parser')
# broth = soup.find('tbody').find_all('tr')
# for i in broth:
#     carrots = i.find_all('td')
#     for j in carrots:
#         print(j)
#         celery = j.find('a')
#         print(celery)
#         print(celery.string)


async def main():
    browser = await launch()

    page = await browser.newPage()
    await page.goto("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I")
    content = await page.content()
    soup = BeautifulSoup(content, 'html.parser')
    broth = soup.find('tbody').find_all('tr')
    for i in broth:
        carrots = i.find_all('td')
        for j in carrots:
            print(j)
            celery = j.find('a')
            print(celery)
            print(celery.string)


def main():
    client = ScrapingAntClient(token="abed92409362483abb2b9543426d73c7")
    content = client.general_request("https://algoexplorer.io/address/25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I").content
    soup = BeautifulSoup(content, 'html.parser')
    broth = soup.find('tbody').find_all('tr', {"class": "styles_item__L_bVx"})
    for i in broth:
        carrots = i.find_all('td')
        # print(carrots[3].find('a').contents[1])
        amount = carrots[3].find("span").string if carrots[3].find("a") == None else carrots[3].find("a").contents[1]
        fromAddress = carrots[4].find("span").string if carrots[4].find("a") == None else carrots[4].find("a").string
        toAddress = carrots[5].find("span").string if carrots[5].find("a") == None else carrots[5].find("a").string
        print(f"{fromAddress} -> {toAddress}: {amount}")


main()
# asyncio.get_event_loop().run_until_complete(main())



