import { useEffect, useState } from "react";
import { ASSET_ID } from "../constants";
import algosdk from "algosdk";
import { useDispatch } from "react-redux";
import { URL } from "../constants";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useWindowSize } from "@react-hook/window-size";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useQuery } from "react-query";
import axios from "axios";

const TopNavigationBar = ({ darkTheme }) => {
  const dispatch = useDispatch();

  const LogOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("wallet-type");
    window.location.reload();
    console.log("data");
  };

  const setMode = () => {
    if (!darkTheme) {
      localStorage.setItem("mode", "dark");
      dispatch({ type: "dark_mode" });
    } else {
      localStorage.setItem("mode", "light");
      dispatch({ type: "light_mode" });
    }
  };

  const [width] = useWindowSize();
  const [balance, setBalance] = useState(0);

  const algodClient = new algosdk.Algodv2(
    {
      "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 ",
    },
    "https://testnet-algorand.api.purestake.io/ps2",
    ""
  );

  const walletAddress = localStorage.getItem("address");

  useEffect(() => {
    const setMyBalance = async () => {
      const myAccountInfo = await algodClient
        .accountInformation(walletAddress)
        .do();

      const b = myAccountInfo.assets
        ? myAccountInfo.assets.find(
            (element) => element["asset-id"] === ASSET_ID
          ).amount / 100
        : 0;

      setBalance(b);
    };

    setMyBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const myAlgoConnect = async () => {
    const myAlgoWallet = new MyAlgoConnect();

    try {
      const accounts = await myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });
      const address = accounts[0].address;

      // close modal.
      localStorage.setItem("wallet-type", "my-algo");
      localStorage.setItem("address", address);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const algoSignerConnect = async () => {
    try {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        console.log(window.AlgoSigner.accounts);
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });

        const address = accounts[0].address;

        // close modal.
        localStorage.setItem("wallet-type", "algosigner");
        localStorage.setItem("address", address);

        window.location.reload();
      }
    } catch (error) {
      alert("AlgoSigner not set up yet!");
    }
  };

  const isWalletConnected =
    localStorage.getItem("wallet-type") === null ? false : true;

  const { isLoading, error, data } = useQuery("committed", () =>
    axios
      .get(`${URL}/committed/${walletAddress}`)
      .then((response) => response.data.data)
  );

  return (
    <header className="small_header">
      <div className="small_header_inn">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          Choice Coin
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!!isWalletConnected ? (
            <div className="addrDisplay">
              <div className="addrDisplayInn">
                <div className="addrBalance">{balance} Choice</div>

                <CopyToClipboard text={walletAddress}>
                  <div className="addressTxt">
                    <p>{walletAddress}</p>
                    <i className="uil uil-copy"></i>
                  </div>
                </CopyToClipboard>
              </div>
            </div>
          ) : (
            <div className="dropDownConnect">
              <div className="dropDownConnect_button">
                <button className="connect_wallet_button">
                  <p>
                    Connect Wallet
                    <i
                      className="uil uil-angle-down"
                      style={{ fontSize: "18px" }}
                    />
                  </p>
                </button>
              </div>

              <div className="dropDownConnect_items">
                <div className="dropDownConnect_item" onClick={myAlgoConnect}>
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">My Algo Wallet</p>
                </div>
                <div
                  className="dropDownConnect_item"
                  onClick={algoSignerConnect}
                >
                  <div className="dropDownConnect_img">
                    <img
                      src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                      alt=""
                    />
                  </div>
                  <p className="dropDownConnect_item_txt">
                    {typeof window.AlgoSigner === undefined
                      ? "Install AlgoSigner"
                      : "AlgoSigner"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/*  */}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          fontSize: "13px",
          fontWeight: "500",
          wordSpacing: "1px",
          alignItems: "center",
          color: walletAddress ? "#fff" : "var(--wht)",
          padding: "0px 5vw",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          background: walletAddress ? "var(--main-col)" : "var(--background)",
          height: "var(--sm-hd-height-half)",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <p style={{ opacity: "0.9" }}>
          Amount committed to Governance:&nbsp;
          {!isLoading && !error ? data?.amount : 0} $Choice
        </p>

        {width > 850 && (
          <ul className="listNavBig">
            <li>
              H<i className="uil uil-estate" />
              me
            </li>
            <li>
              Elect<i className="uil uil-mailbox"></i>ons
            </li>
            <li>
              Tr<i className="uil uil-exchange"></i>nsfer
            </li>
            <li onClick={setMode}>
              M
              {darkTheme ? (
                <i className="uil uil-brightness-low"></i>
              ) : (
                <i className="uil uil-moon"></i>
              )}
              de
            </li>
            <li onClick={LogOut}>
              Sign Ou
              <i className="uil uil-signout"></i>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default TopNavigationBar;
