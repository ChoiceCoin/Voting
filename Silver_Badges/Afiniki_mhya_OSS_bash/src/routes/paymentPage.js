import { useEffect, useState } from "react";
import processPaymentTransaction from "../helpers/processPayments";
import { useContextObject } from "../context";
import Header from "../components/Header";
import defaultArray from "../helpers/defaultArray";
import styles from "../styles/payment.module.css"


export default function PaymentPage() {


  const { setObjectProperties, objectProperties } = useContextObject();


  const [arrayOfAddress, setArrayOfAddress] = useState([]);
  const [amount, setAmount] = useState(0);
  const [tablecontent, setTablecontent] = useState([]);
  const [arr, setArr] = useState([]);


  useEffect(() => {
    let storage = localStorage.getItem("rewardsList");
    if (storage) {
      localStorage.setItem("rewardsList", JSON.stringify(defaultArray));
      storage = localStorage.getItem("rewardsList");
    }
    setObjectProperties(JSON.parse(storage));
  }, []);
  useEffect(() => {
    setArr([...tablecontent, ...arr]);
  }, [tablecontent]);

  const handlePayment = (e) => {
    e.preventDefault();
    if (arrayOfAddress.length < 1) return;
    let placeHolderArray = [];
    let compiledArr = arrayOfAddress.map((_addr) => {
      return { name: "Undefined", wallet_Address: _addr, status: false };
    });

    compiledArr.forEach(({ wallet_Address }, index) => {
      objectProperties.forEach((item) => {
        if (wallet_Address === item.wallet_Address) {
          compiledArr[index] = { ...item, status: true };
        }
      });
    });

    compiledArr.forEach(async ({ wallet_Address, status }, index) => {
      if (!status) {
        placeHolderArray.unshift({ ...compiledArr[index] });
        setTablecontent([{ ...compiledArr[index] }, ...tablecontent]);
      } else {
        const state = await processPaymentTransaction(wallet_Address, amount);
        compiledArr[index] = { ...compiledArr[index], status: state };
        placeHolderArray.unshift({ ...compiledArr[index] });

        setTablecontent([{ ...compiledArr[index] }, ...tablecontent]);
      }
    });
  };

  return (
    <div className={``}>
      <Header />

      <section className={`${styles.main}`}>
        <h1 className={``}>Pay Active Participants</h1>
        <div className={``}>
          Copy and paste this into box below:
          <div className={styles.address}>
            RWXX2OACYFWOH7JKS5W6HLFDXUC6GLI6MYUJTAQ5B4VH6ZFS5LQSS6MJ2I,ILSYSYHSCMQ4KSVGQEDODDA4N6ZF4CRPQASYWJBV2T5RF2FZQQKTFB5GW4,IAWNDP5OXXP7BD7I7QUMUOF35SM3IZWUW755HHDJK2VK25D7TLJY2UZGUE
          </div>
        </div>
        <form className="">
          <textarea
            onChange={(e) =>
              setArrayOfAddress([...e.target.value.split(/[ ,]+/)])
            }
            className=""
            placeholder="Copy and paste a list of addresses here"
          ></textarea>

          <span className="">
            <p>Choice Amount :</p>{" "}
            <input
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
              className=""
            />
          </span>
          <input
            type="submit"
            value="Pay"
            onClick={handlePayment}
            className={styles.pay}
          />
        </form>
      </section>
      <section className={styles.section}>
        <h1 className="">Payment Status</h1>
        <div className={`${styles.table}`}>
          <span className="">Status </span>
          <span className="">Name </span>
          <span className="">wallet Address</span>
        </div>
        {arr &&
          arr.map(({ name, wallet_Address, status }) => {
            return (
              <div className={`${styles.tables}`}>
                <span
                  className={` ${status === true ? styles.green : styles.red}`}
                >
                  {" "}
                  {status
                    ? "Success"
                    : status === false
                    ? "Failure"
                    : `${status}`}
                </span>
                <span className=""> {name}</span>
                <span className="">
                  {wallet_Address.substring(0, 5)}...
                  {wallet_Address.substring(
                    wallet_Address.length - 7,
                    wallet_Address.length - 1
                  )}
                </span>
              </div>
            );
          })}
      </section>
    </div>
  );
}
