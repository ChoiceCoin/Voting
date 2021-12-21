import axios from "axios";
import { URL } from "./constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const GetCommittedAmount = () => {
  const addressNum = useSelector((state) => state.status.addressNum);
  const walletAddress = localStorage.getItem("address");
  const userAddress = !!walletAddress
    ? walletAddress
    : localStorage.getItem("addresses").split(",")[addressNum];

  const [Amt, setAmt] = useState(0);

  const getIt = async () => {
    try {
      if (!!userAddress) {
        axios.get(`${URL}/committed/${userAddress}`).then((response) => {
          if (!!response?.data?.data?.amount) {
            setAmt(response.data.data.amount);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  return <>{Amt}</>;
};

export default GetCommittedAmount;
