# Voting
This is a repository for voting software built using Choice Coin on the Algorand Network. Our voting software is centered around Decentralized Decisions, an open-source voting software that allows organizations to make decisions in a distributed manner. The votes in Decentralized Decisions are recorded on the Algorand Blockchain and are tabulated using a stateless smart contract. Post-quantum cryptography ensures that voter information is kept secure throughout the entire process at all points of vulnerability. This repository is meant to facilitate open-development on the Choice Coin Platform and to serve as a starting point for developers looking to set up their own decentralized voting network. Development here can directly be used for Choice Coin's Developer Awards Program. Developers should follow the instructions below to get started. We are looking forward to seeing all the great innovations that will come out of our community!


# Dependencies
- To run the code in the *Choice_Coin_Voting* Folder, you first must have Python installed. Please download the latest version of Python, and create a virtual environment specifically for this directory. Python Download: https://www.python.org/downloads/.
- Also be sure to have the latest version of MySQL installed. MySQL Download: https://www.mysql.com/products/community/.
- After Performing all these steps, Proceed to set up the dependencies as stated below.
- Clone the repository
- cd into the voting folder
- create a virtual environment and activate 
- cd into the choice_coin_voting folder
- run `pip install -r requirements.txt`
- Open msql terminal as a root user by typing: `sudo mysql -u root` into your terminal on linux.
- copy and paste this code into the mysql terminal: ```CREATE DATABASE voting;
    USE DATABASE voting;```
- Locate `index.py` file in the Choice_coin_voting folder and replace the empty string on line 16: `app.config['SQLALCHEMY_DATABASE_URI'] = ''` with `mysql+pymysql://root:''@localhost/voting`
- run `python` in the choice_coin_voting folder and then type the following; `from index.py import db`; `db.create_all()`.


# Run Steps
- To run the code found in the *Choice_Coin_Voting* folder, make sure to first download the dependencies as described above.

- Furthermore, connect to the Algorand Network through a service such as the PureStake API or the Algorand Sandbox, the code was tested using the PureStake API, and assign your new address and token to *algod_address* and *algod_token* respectively in the *vote.py* file.

- Generate An algorand address and mnemonic using the *utils.py* in the choice_coin_voting file; This would be used to set the escrow address and mnenomic while running the app. Use https://bank.testnet.algorand.network to get free test net algorand tokens, connect to your wallet using algorand wallet and the address and mnemonic generated, switch to testnet and  use https://testnet.tinyman.org/#/swap to opt-in choice into the algorand account and also swap some algorand for choice (Not all). 

- Configure the *admin_key* in line 88 *index.py* based on your own administrative key. Then, enter in the string that you want to be the main administrator key, which will be hashed by the SHA-512.

- To do this manually through the SHA-512 hashing algorithm in the code, open a new python terminal in this directory with the virtual environment activated. Import *hashing* from *vote*, and simply run *hashing* with your secret key as the input. Assign this to the *admin_key* variable in *index.py*.

- run `python index.py` in the choice_coin_voting folder to run the web app
- To learn more about the web application, watch the Demo Video here: https://youtu.be/DWXNGDYXnIM.

# Gold Badge
Submission by: @Tee-py https://github.com/Tee-py

YouTube: https://www.youtube.com/watch?v=U1XEEFlw3Bc

