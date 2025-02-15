import ScrollText from "../components/ScrollText";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useSelector, useDispatch } from "react-redux";

const PopFromBottomModal = () => {
  const dispatch = useDispatch();

  const { openModal, modalType } = useSelector(
    (state) => state.status.modalMenu
  );

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

      dispatch({ type: "close_modal" });
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
        const accounts = await window.AlgoSigner.accounts({
          ledger: "TestNet",
        });
        const address = accounts[0].address;

        // close modal.
        localStorage.setItem("wallet-type", "algosigner");
        localStorage.setItem("address", address);

        dispatch({ type: "close_modal" });
        window.location.reload();
      }
    } catch (error) {
      alert("An error occured while trying to connect AlgoSigner");
    }
  };

  return (
    <menu
      className="mn_sm"
      style={{ display: `${!!openModal ? "flex" : "none"}` }}
    >
      <div
        style={{ width: "100%", flex: 1 }}
        onClick={() => {
          dispatch({ type: "close_modal" });
        }}
      ></div>

      <div className="mn_sm_modal">
        <div className="mn_sm_modal_inn">
          {modalType === "menu" ? (
            <>
              <ul className="mn_l1">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/ChoiceCoin/White_Paper"
                  >
                    <i className="uil uil-newspaper"></i> White Paper
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://choice-coin.gitbook.io/choice-coin-docs/getting-started/introduction"
                  >
                    <i className="uil uil-book-alt"></i> Docs
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://medium.com/@ChoiceCoin"
                  >
                    <i className="uil uil-document-layout-center"></i>Our Blog
                  </a>
                </li>
              </ul>

              <ul className="mn_l2">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://mobile.twitter.com/ChoiceCoinNews"
                  >
                    <i className="uil uil-twitter"></i> <p>Twitter</p>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://t.me/choicecoin"
                  >
                    <i className="uil uil-telegram"></i> <p>Telegram</p>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://medium.com/@ChoiceCoin"
                  >
                    <i className="uil uil-medium-m"></i> <p>Medium</p>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://discord.gg/9WpzukzH"
                  >
                    <i className="uil uil-discord"></i> <p>Discord</p>
                  </a>
                </li>
              </ul>
            </>
          ) : (
            modalType === "connectWallet" && (
              <>
                <div className="algo_connect_hd">
                  Connect Wallet to continue
                </div>

                <div className="connect_butt" onClick={myAlgoConnect}>
                  <div className="connect_wallet_img">
                    <img
                      src="https://i.postimg.cc/76r9kXSr/My-Algo-Logo-4c21daa4.png"
                      alt=""
                    />
                  </div>
                  <p className="connect_wallet_txt">My Algo Wallet</p>
                </div>
                <div className="connect_butt" onClick={algoSignerConnect}>
                  <div className="connect_wallet_img">
                    <img
                      src="https://i.postimg.cc/L4JB4JwT/Algo-Signer-2ec35000.png"
                      alt=""
                    />
                  </div>
                  <p className="connect_wallet_txt">
                    {typeof AlgoSigner === undefined
                      ? "Install AlgoSigner"
                      : "AlgoSigner"}
                  </p>
                </div>
              </>
            )
          )}

          <ScrollText word={"Decentralized decisions"} />
        </div>
      </div>
    </menu>
  );
};

export default PopFromBottomModal;
