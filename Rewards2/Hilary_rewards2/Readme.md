# Web Scrapping Algo-block explorer

The program is written to scrap all FROM and AMOUNT variables from the algorand address:  25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I on the Algo block explorer, this page contains all the choice coin transactions on the Algo block explorer.
Given the fact that the site was dynamic in nature the use of Beautifulsoup wasn't effective. 
Beautifulsoup is used mostly for static websites while selenium is more effective for dynamic sites 

The program used selenium to scrap the pages for the data and used pandas to create a dataframe and converts the dataframe to a csv file.

## Prequities 
``Python -> 3.9``
``Selenium -> 3.141.0``
``Chrome webdriver -> 100.0.4896.60``
``Jupyter notebook``

## How to install Dependencies 
``Python`` -> [linkhttps://www.tutorialspoint.com/how-to-install-python-in-windows]
``Selenium`` -> [Linkhttps://selenium-python.readthedocs.io/installation.html]
``Chrome Webdriver`` -> [Linkhttps://chromedriver.chromium.org/]
``Jupyter notebook`` -> [Linkhttps://jupyter.org/install]

## How to run the program
Youtube -> [Videohttps://www.youtube.com/watch?v=vYoDsoN177E]
The link above leads to a video that explains how to run the code properly