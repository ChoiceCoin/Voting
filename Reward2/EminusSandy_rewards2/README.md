# Choice Coin Web-Scraper

This script enables a user to scrape data on `from`, `to` and `amount` from AlgoScan or AlgoExplorer with the use of selenium . This scraped data is then saved in a csv file called `my.csv`.

## Installation and setup

- git clone the repository
- Install dependencies

```sh
$ npm install
```

- Start App

```sh
$ node index.js / npm start
```

This runs the program with the default wallet `25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I`

you can also specify your own wallet address by typing `-a`

```sh
$ node index.js -a wallet_address
```

You can also switch to algoscan by specifying `-s`

```sh
$ node index.js -s
```

## Video Preview

- Video preview https://youtu.be/ch0uGYYRmwA
