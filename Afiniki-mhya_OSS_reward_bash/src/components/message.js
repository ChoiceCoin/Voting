import React from "react"
import styles from "../styles/message.module.css"
import { useContextObject } from "../context";
const MessageProp = () => {
  const { message } = useContextObject();
  return (
    <div
      className={`${styles.message} ${
        message.isError === true ? styles.failure : styles.failure
      }  `}
    >
      <h1 className={`${styles.h1} font-bold text-xl uppercase`}>
        {message.isError ? "Error" : "Success"}
      </h1>
      <p>{message.message}</p>
    </div>
  );
};
export default MessageProp;
