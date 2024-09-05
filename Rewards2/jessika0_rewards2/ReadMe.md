# MY WEB SCRAPING SCRIPT USING SELENIUM PROCESS

On the processes of writing this script using beautiful soup I encountered a problem that the algo explorer webpage is a dynamic one (i.e the data are loaded dynamically with JavaScript) making the html in the web inspector diffrent from that scraped by beautiful soup .
So I had to change my approach and method using selenium.

## Selenium

The second approach I implented to scraping the dynamic web pages uses Python packages capable of executing the JavaScript itself, so that we can scrape the website as we view it in our browser. Selenium works by automating browsers to execute JavaScript to display a web page as we would normally interact with it. These codes illustrate how to use selenium to scrape algo expolorer of the **FROM** and **AMOUNT**

check [VIDEO](https://youtu.be/P3Lb-kvMSiU)

## How to Run locally

- make sure you have python installed (python-v3+) in your terminal

- make sure you have selenium installed

- make sure you have pandas installed 

- make sure you have Chrome webdriver installed and in your path

- the csv file is saved as csv and the all the data scraped is appended into an array then converted to a csv file 

I hope this script does enough justice to the task

**THANK YOU**
