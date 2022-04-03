import { useGlobalContext } from "./context";
// import MyAlgoConnect from "@randlabs/myalgo-connect";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import styles from "../styles/header.module.css";
import Link from "next/link";
const Header = () => {
  const { isConnected, setModalOpen, isModalOpen, setConnected } =
    useGlobalContext();
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

      window?.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const connectWallet = async () => {
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
      setConnected(true);
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

        // window.location.reload();
      setConnected(true);

      }
    } catch (error) {
      alert({
        type: "alert_modal",
        alertContent: "AlgoSigner not set up yet!",
      });
    }
    return true;
  };

  const handleConnect = async (e, walletType) => {
    e.preventDefault();
    try {
      switch (walletType) {
        case "Wallet_connect":
          await connectWallet();
          setModalOpen(false);

          break;
        case "Algo_signer":
          await algoSignerConnect()
          ;
          setModalOpen(false);


          break;
        case "my_algo_wallet":
          await myAlgoConnect();
          setConnected(true);
          setModalOpen(false);

          break;
        default:
          alert("incorrect connection method");
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <header
      className={`${styles.header} fixed flex justify-between px-8 py-5 bg-white rounded-b-sm w-full top-0 shadow-lg `}
    >
      <div
        onClick={() => setModalOpen(false)}
        className={` w-screen h-screen bg-slate-300 opacity-50  ${
          styles.modal
        } ${isModalOpen ? styles.modalClosed : ""}`}
      ></div>
      <Link href="/">
        <a className="text-3xl hover:text-gray-50">Choice Proposals</a>
      </Link>
      <div className={`${styles.buttons} `}>
        {!isConnected ? (
          <div onClick={() => setModalOpen(!isModalOpen)}>Connect</div>
        ) : (
          <div onClick={() => setModalOpen(!isModalOpen)}>Disconnect</div>
        )}
        <div
          className={`${styles.connectButtons}  ${
            isModalOpen ? styles.open : ""
          } `}
        >
          {!isConnected ? (
            <div className="flex flex-col gap-3">
              <div
                className="flex"
                onClick={(e) => handleConnect(e, "my_algo_wallet")}
              >
                <img
                  src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                  alt=""
                />{" "}
                My Algo Wallwet
              </div>
              <div
                className="flex"
                onClick={(e) => handleConnect(e, "Wallet_connect")}
              >
                <img
                className="w-8"
                  src="https://i.postimg.cc/J7JZ4cFb/icon-37675b59-1.png"
                  alt=""
                />{" "}
                Wallet Connect
              </div>
              <div
                className="flex"
                onClick={(e) => handleConnect(e, "Algo_signer")}
              >
                <img
                  src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                  alt=""
                />{" "}
                AlgoSigner
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>Disconnect</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
