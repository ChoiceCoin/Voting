import { useContextObject } from "../context.js";
import styles from "../styles/header.module.css";
import { BiMenu } from "react-icons/bi";
import MessageProperty from "./message";
import {Link } from "react-router-dom"

const Header = () => {
  const { message, setModalOpen, isModalOpen, } =
    useContextObject();

  return (
    <header
      className={`${styles.header}  `}
    >
      <div className={`space-x-2`}>
        <img className="" src={`/choice.png`} width="20" height="30" />
        <Link to="/">Choice</Link>
      </div>
      <div className={`${styles.buttons} `}>
        <div
          className={``}
          onClick={() => setModalOpen(!isModalOpen)}
        >
          <div className={styles.button}>
            <BiMenu />
          </div>
        </div>

        <div
          className={`${styles.navButtons}  ${isModalOpen ? styles.open : ""} `}
        >
          <Link to="/">
            <div onClick={() => setModalOpen(false)} className={``}>
              Home
            </div>
          </Link>
          <Link to="/pay">
            <div onClick={() => setModalOpen(false)} className={``}>
              Reward
            </div>
          </Link>
          <Link to="/reward">
            <div onClick={() => setModalOpen(false)} className={``}>
              Add
            </div>
          </Link>
        </div>
      </div>
      {message.open === true && <MessageProperty />}
    </header>
  );
};
export default Header;
