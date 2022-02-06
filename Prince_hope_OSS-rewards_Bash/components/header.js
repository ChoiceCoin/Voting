import { useGlobalContext } from "./context";
import styles from "../styles/header.module.css";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import MessageProp from "./message";

import Link from "next/link";
import Image from "next/image";
const Header = () => {
  const { isConnected,message, setModalOpen, isModalOpen, setConnected } =
    useGlobalContext();

  return (
    <header
      className={`${styles.header} fixed flex justify-between px-8 py-5 bg-white rounded-b-sm w-full top-0 shadow-lg `}
    >
      <div className={`space-x-2`}>
        <Image className="" src={`/choice.png`} width="20" height="30" />
        <Link href="/">
          <a className="text-3xl text-gray-900  hover:underline hover:text-gray-700">
            Choice Reward
          </a>
        </Link>
      </div>
      <div className={`${styles.buttons} `}>
        <div
          className={`text-gray-900 text-2xl`}
          onClick={() => setModalOpen(!isModalOpen)}
        >
          <HiOutlineMenuAlt1 />
        </div>

        <div
          className={`${styles.navButtons}  ${isModalOpen ? styles.open : ""} `}
        >
          <Link href="/">
            <a onClick={() => setModalOpen(false)} className={``}>
              Home
            </a>
          </Link>
          <Link href="/pay">
            <a onClick={() => setModalOpen(false)} className={``}>
              reward Users
            </a>
          </Link>
          <Link href="/new/reward">
            <a onClick={() => setModalOpen(false)} className={``}>
              Add Participants 
            </a>
          </Link>
        </div>
      </div>
   {message.open === true && <MessageProp/>}
    </header>
  );
};
export default Header;
