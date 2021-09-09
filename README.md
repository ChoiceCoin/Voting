# Voting
This is a repository for voting software built using Choice Coin on the Algorand Network. Our voting software is centered around Decentralized Decisions, an open-source voting software that allows organizations to make decisions in a distributed manner. The votes in Decentralized Decisions are recorded on the Algorand Blockchain and are tabulated using a stateless smart contract. Post-quantum cryptography ensures that voter information is kept secure throughout the entire process at all points of vulnerability. This repository is meant to facilitate open-development on the Choice Coin Platform and to serve as a starting point for developers looking to set up their own decentralized voting network. Development here can directly be used for Choice Coin's Developer Awards Program. Developers should follow the instructions below to get started. We are looking forward to seeing all the great innovations that will come out of our community!.


# Dependencies
- To run the code in the *Choice_Coin_Voting* Folder, you first must have Python installed. Please download the latest version of Python, and create a virtual environment specifically for this directory. Python Download: https://www.python.org/downloads/.
- Also be sure to have the latest version of MySQL installed. MySQL Download: https://www.mysql.com/downloads/.
- Second, your Python virtual environment  must have all of the packages listed in the *requirements.txt* file, which is also found in the *Choice_Coin_Voting* folder.
- Your MySQL Database must be set up similarly to the way it is described in the *MySQL_Code.sql* file under *Choice_Coin_Voting*.


# Run Steps
- To run the code found in the *Choice_Coin_Voting* folder, make sure to first download the dependencies as described above using *pip*.
- First, make sure that you have an account with an adequate amount of Choice Coin. This will be used as the escrow account that contains the Choice Coin that is used for voting. It will also send this Choice Coin to the appropriate decision address as dictated by individual voters. Put the accounts' address and mnemonic under *escrow_address* and *escrow_mnemonic* in the *vote.py* file.
- Furthermore, connect to the Algorand Network through a service such as the PureStake API or the Algorand Sandbox, the code was tested using the PureStake API, and assign your new address and token to *algod_address* and *algod_token* respectively in the *vote.py* file.
- Configure the *keys* in *index.py* based on your own administrative key. Then, enter in the string that you want to be the main administrator key, which will be hashed by the SHA-512.
- To do this manually through the SHA-512 hashing algorithm in the code, open a new python terminal in this directory with the virtual environment activated. Import *hashing* from *vote*, and simply run *hashing* with your secret key as the input. Assign this to the *keys* in *index.py*.
- Edit the number of decisions based on your preference. To do this, make a new address for the decision, make sure that it is opted into the Choice Coin asset, and add it at each of the appropriate spots in the code files based on the instructions provided in the documentation. Be sure to adjust the code at every juncture necessary to get the best results.
- Specifically, edit the *vote.py* file, the *index.py*, and the *vote.html* files according to the instructions in the files. The instructions are written as comments at the top of each respective file.
- This protocol also supports corporate or organizational voting. To add additional decisions, follow the same steps as above, except editing the functions and files with *corporate* in the name.
- Create a new MySQL database with the appropriate credentials as described in the *SQL_Code.sql* file. Be sure to enter in your MySQL credentials at the appropriate points at lines *15-20* in *index.py*. Specifically, create a new MySQL user with root privileges that can easily access and change the database.  
- Finally, to test as a web application, use the command *python index.py* in a regular terminal with the virtual environment configured. This will launch a web-application that you can interact with.
- To learn more about the web application, watch the Demo Video here: https://youtu.be/DWXNGDYXnIM.

