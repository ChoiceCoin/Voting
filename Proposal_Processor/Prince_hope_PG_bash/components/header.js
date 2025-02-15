import {useGlobalContext} from "./context"
// import MyAlgoCosnnect from "@randlabs/myalgo-connect";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal"
import styles from "../styles/header.module.css"
import Link from "next/link";
const Header = () =>{
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
      }
    } catch (error) {
      alert({
        type: "alert_modal",
        alertContent: "AlgoSigner not set up yet!",
      });
    }
    return true
  };

const handleConnect = async (e,walletType) =>{
  e.preventDefault()
 try{ switch (walletType) {
    case "Wallet_connect":
      await connectWallet()
setConnected(true)
setModalOpen(false);


      break;
    case "Algo_signer":
      await algoSignerConnect()
setConnected(true);
setModalOpen(false)

console.log("Successfull");

      break;
    case "my_algo_wallet":
      await myAlgoConnect()
setConnected(true);
setModalOpen(false);


      break;
    default:
      alert("incorrect connection method")
      break;
  }
}
  catch(e){
    console.log(e)
  }
}
    return (
      <header
        className={`${styles.header} flex justify-between px-8 py-3 bg-blue-300 w-full fixed top-0  `}
      >
        <div
          onClick={() => setModalOpen(false)}
          className={` w-screen h-screen bg-slate-300 opacity-50  ${
            styles.modal
          } ${isModalOpen ? styles.modalClosed : ""}`}
        ></div>
        <Link href="/"><a className="text-2xl hover:text-gray-50">Choice Proposals</a></Link>
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
              <div className="flex flex-col gap-3" >
                {/* <div
                  className=""
                  onClick={(e) => handleConnect(e, "my_algo_wallet")}
                >
                  My Algo Wallwet
                </div> */}
                <div
                  className=""
                  onClick={(e) => handleConnect(e, "Wallet_connect")}
                >
                  Wallet Connect
                </div>
                <div
                  className=""
                  onClick={(e) => handleConnect(e, "Algo_signer")}
                >
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
}
export default Header