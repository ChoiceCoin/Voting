# Silver Reward Generator Bash

This script reads from a parsed csvfile the `from` and `amount` row and sends `1.1 * amount` from a specific wallet address to the address specified in the `from` rows.

## Setup and Installation

```sh
$ pip install -r requirements.txt
```

Add your wallet address and your mnemonic phrases to the script before running the script

- self.myAddress = "Specify your wallet Address here"
- self.mnemonic_data = "Add your mnemonic phrases here"

## Mode Help

```sh
$ python run.py -h

Usage: python run.py <csvfile>

csv transaction

optional arguments:
         -h, --help        show this help message and exit
         csvfile           Specify path to csvfile

```

## Run Code

Run the script specifying the path to csvfile to read from

```sh
$ python run.py myFile.csv

[!] Running Script...
[!] sending 32756725.562 USDC to 25S2YKMG2E3L5RTFI67NTSWFJJQHBTDULAIN7TQVXWB3E4E5Y6BPG3O44I

```
