// import algosdk from "algosdk";
// import { ASSET_ID } from "./constants";
// import { useEffect, useState } from "react";
// import MyAlgoConnect from "@randlabs/myalgo-connect";
// import { useWindowSize } from "@react-hook/window-size";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import WalletConnect from "@walletconnect/client";
// import QRCodeModal from "algorand-walletconnect-qrcode-modal";

const TopNavigationBar = ({ darkTheme, NavLink }) => {

  // const isWalletConnected =
  //   localStorage.getItem("wallet-type") === null ? false : true;
  const LogOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("addresses");
    localStorage.removeItem("wallet-type");
    localStorage.removeItem("walletconnect");
    window.location.reload();
    console.log("data");
  };

  const setMode = () => {
    if (!darkTheme) {
      localStorage.setItem("mode", "dark");
      // dispatch({ type: "dark_mode" });
    } else {
      localStorage.setItem("mode", "light");
      // dispatch({ type: "light_mode" });
    }
  };

  // const [balance, setBalance] = useState([]);

  // const algodClient = new algosdk.Algodv2(
  //   {
  //     "X-API-Key": "Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 ",
  //   },
  //   "https://testnet-algorand.api.purestake.io/ps2",
  //   ""
  // );

  // const walletAddress = localStorage.getItem("address");
  // const addresses = localStorage.getItem("addresses")?.split(",");

  // let addrArr = [];

  // useEffect(() => {
  //   addresses?.forEach(async (item) => {
  //     const myAccountInfo = await algodClient.accountInformation(item).do();
  //     const bal =
  //       myAccountInfo.assets.find((element) => element["asset-id"] === ASSET_ID)
  //         ?.amount / 100;

  //     addrArr.push({ balance: !!bal ? bal : 0, address: item });

  //     if (addrArr?.length === addresses?.length) {
  //       dispatch({
  //         type: "setAlgoAddress",
  //         addressIndex: 0,
  //         addr: addrArr[0]?.address,
  //       });
  //       setBalance(addrArr);
  //     }
  //   });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const myAlgoConnect = async () => {
    const myAlgoWallet = new MyAlgoConnect({ shouldSelectOneAccount: false });

    try {
      const accounts = await myAlgoWallet.connect({
        shouldSelectOneAccount: true,
      });

      const addresses = accounts.map((item) => item?.address);
      const address = accounts[0].address;

      // close modal.
      localStorage.setItem("wallet-type", "my-algo");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    if (!connector.connected) {
      connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts } = payload.params[0];

      const addresses = accounts.map((item) => item);
      const address = accounts[0];

      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts } = payload.params[0];

      const addresses = accounts.map((item) => item);
      const address = accounts[0];

      localStorage.setItem("wallet-type", "walletconnect");
      localStorage.setItem("address", address);
      localStorage.setItem("addresses", addresses);

      window.location.reload();
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        console.log(error);
      }
    });
  };

  const algoSignerConnect = async () => {
    try {
      if (typeof window.AlgoSigner === "undefined") {
        window.open(
          "https://chrome.google.com/webstore/detail/algosigner/kmmolakhbgdlpkjkcjkebenjheonagdm",
          "_blank"
        );
      } else {
        await window.AlgoSigner.connect({
          ledger: "TestNet",
        });
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });

        const addresses = accounts.map((item) => item?.address);
        const address = accounts[0].address;

        // close modal.
        localStorage.setItem("wallet-type", "algosigner");
        localStorage.setItem("address", address);
        localStorage.setItem("addresses", addresses);

        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: "alert_modal",
        alertContent: "AlgoSigner not set up yet!",
      });
    }
  };

  return (
    <header className="">
      
      <div className="">
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
          {true? (
            <>
              <div className="">
                <div className="">
                  <div className="">
                    <div className="">
                      Choice
                    </div>

                    {/* <CopyToClipboard text={balance[addressNum]?.address}>
                      <div className="">
                        <p>{balance[addressNum]?.address}</p>
                        <i className=" uil-copy"></i>
                      </div>
                    </CopyToClipboard> */}
                  </div>
                </div>

                <div className="">
                </div>
              </div>
            </>
          ) : (
            <div className="">
              <div className="">
                <button className="">
                  <p>
                    Connect Wallet
                    <i
                      className=" uil-angle-down"
                      style={{ fontSize: "18px" }}
                    />
                  </p>
                </button>
              </div>

              <div className="">
                <div className="" onClick={myAlgoConnect}>
                  <div className="">
                    <img
                      src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                      alt=""
                    />
                  </div>
                  <p className="">My Algo Wallet</p>
                </div>

                <div
                  className=""
                  onClick={algoSignerConnect}
                >
                  <div className="">
                    <img
                      src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                      alt=""
                    />
                  </div>
                  <p className="">
                    {typeof window.AlgoSigner === undefined
                      ? "Install AlgoSigner"
                      : "AlgoSigner"}
                  </p>
                </div>

                <div className="" onClick={connectWallet}>
                  <div className="">
                    <img
                      src="https://i.postimg.cc/J7JZ4cFb/icon-37675b59-1.png"
                      alt=""
                    />
                  </div>
                  <p className="">
                    Algorand Mobile Wallet
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          fontSize: "12px",
          fontWeight: "500",
          wordSpacing: "1px",
          alignItems: "center",
          color: "var(--wht)",
          padding: "0px 5vw",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          background: "var(--background)",
          height: "var(--sm-hd-height-half)",
          justifyContent: "space-between",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <p style={{ opacity: "0.9" }}>
          Amount committed to Governance:&nbsp;
          {true&& <div>GetCommittedAmount</div>} Choice
        </p>

        {true && (
          <ul className="">
            <li>
          
            </li>

            <li>
            </li>

            <li>
         
            </li>

            <li >
              M
              {darkTheme ? (
                <i className=" uil-brightness-low"></i>
              ) : (
                <i className=" uil-moon"></i>
              )}
              de
            </li>
            <li>Sign Out</li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default TopNavigationBar;
