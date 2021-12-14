import { NavLink, Route, Routes } from "react-router-dom";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import MyAlgo from "@randlabs/myalgo-connect";

import Faq from "./faq";
import Home from "./Home";
import Elections from "./elections";
import Participate from "./participate";
import Transfer from "./transfer";
import CreateElection from "./elections/create";

import TopNavigationBar from "./statics/TopNavigationBar";
import BottomNavigationBar from "./statics/BottomNavigationBar";

import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import { useEffect } from "react";
import { State } from "./store/reducers";
import { setConnector, setWalletType } from "./store/walletSlice";

const getWalletConnect = () =>
  new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

const getMyAlgo = () => new MyAlgo();

const getAlgoSigner = () => (window as any).AlgoSigner;

const MainPage = () => {
  const [width] = useWindowSize();
  const darkTheme = useSelector((state: State) => state.status.darkTheme);
  const walletType = useSelector((state: State) => state.wallet.walletType);
  const dispatch = useDispatch();

  useEffect(() => {
    // auto-detect is user has connected their wallet to the app
    if (window.localStorage.getItem("walletconnect") != null) {
      dispatch(setWalletType("walletConnect"));
    } else if (typeof (window as any).AlgoSigner !== "undefined") {
      dispatch(setWalletType("algoSigner"));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (walletType.length > 0) {
      let connector;
      switch (walletType) {
        case "walletConnect":
          connector = getWalletConnect();
          break;
        case "myAlgo":
          connector = getMyAlgo();
          break;
        case "algoSigner":
          connector = getAlgoSigner();
          break;
        default:
          connector = null;
      }
      dispatch(setConnector(connector));
    }
  }, [walletType]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main
      className={`${
        darkTheme
          ? width > 800
            ? "dark_theme big_screen"
            : "dark_theme"
          : width > 800
          ? "light_theme big_screen"
          : "light_theme"
      }`}
      id="main_main"
    >
      <TopNavigationBar darkTheme={darkTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/elections/create" element={<CreateElection />} />
        <Route path="/participate" element={<Participate />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>

      <BottomNavigationBar NavLink={NavLink} darkTheme={darkTheme} />
    </main>
  );
};

export default MainPage;
