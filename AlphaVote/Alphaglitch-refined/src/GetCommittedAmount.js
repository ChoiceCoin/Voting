import algosdk from "algosdk";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const port = "";
const CHOICE_ID = 21364625;
const indexerAddress = "https://testnet-algorand.api.purestake.io/idx2";
const token = { "X-API-Key": "fi0QdbiBVl8hsVMCA2SUg6jnQdvAzxY48Zy2G6Yc" };
const indexerClient = new algosdk.Indexer(token, indexerAddress, port);

const GetCommittedAmount = () => {
  const addressNum = useSelector((state) => state.status.addressNum);
  const walletAddress = localStorage.getItem("address");
  const userAddress = !!walletAddress
    ? walletAddress
    : localStorage.getItem("addresses").split(",")[addressNum];

  // const userAddress = localStorage.getItem("address");

  const options = [
    {
      address: "DQ2NPLGQ3CV3QAPMS7KHIRUNUF2ZSTYRT5SZGDCPLB7VPC5OSSLCI5H7DM",
      image: "",
      name: "Yes",
    },

    {
      address: "6P6D5KQH5VIXEJGW6LXPUMEZ77XNLHQXB6GMW4CBDBN2VJ4CFZ7HCIKUBM",
      image: "",
      name: "No",
    },
  ];

  const firstAddress = options[0].address;
  const secondAddress = options[1].address;
  let txnAmt = 0;

  const [Amt, setAmt] = useState(0);

  const getIt = async () => {
    try {
      let pastTxn = await indexerClient
        .searchForTransactions()
        .address(userAddress)
        .assetID(CHOICE_ID)
        .limit()
        .do();
      const txns = pastTxn["transactions"];

      txns.forEach((item) => {
        const txn = item["asset-transfer-transaction"];
        if (
          txn["receiver"] === firstAddress ||
          txn["receiver"] === secondAddress
        ) {
          txnAmt = txnAmt + txn["amount"] / 100;
        }
      });

      setAmt(txnAmt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIt();
  }, [userAddress]);

  return <>{Amt}</>;
};

export default GetCommittedAmount;
