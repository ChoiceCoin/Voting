import { Dispatch, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WalletConnect from "@walletconnect/client";
import algowallet from "../assets/algorandwallet.svg";
import myalgo from "../assets/myalgo.svg";
import algosigner from "../assets/algosigner.svg";
import ScrollText from "../components/ScrollText";
import {
  ChainType,
  getAccountAssets,
  selectAddress,
  selectConnected,
  selectConnector,
  selectWalletType,
  setAccounts,
  setConnected,
  setWalletType,
} from "../store/walletSlice";

const chain = ChainType.TestNet;
export const subscribeToEvents =
  (dispatch: Dispatch<any>) => (connector: WalletConnect) => {
    if (!connector) {
      return;
    }
    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
      console.log("%cOn connect", "background: yellow");
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      dispatch({ type: "accounts", payload: accounts });
    });

    connector.on("session_update", (error, payload) => {
      console.log("%cOn session_update", "background: yellow");
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      dispatch({ type: "accounts", payload: accounts });
    });

    connector.on("disconnect", (error, payload) => {
      console.log("%cOn disconnect", "background: yellow");
      if (error) {
        throw error;
      }
      dispatch({ type: "reset" });
    });
  };

const PopFromBottomModal = () => {
  const connector = useSelector(selectConnector);
  const walletType = useSelector(selectWalletType);
  const connected = useSelector(selectConnected);
  const address = useSelector(selectAddress);
  const dispatch = useDispatch();

  const { openModalVote } = useSelector(
    (state) => (state as any).status.voteModal
  );

  const chooseWallet = async (_walletType: string) => {
    if (!walletType || walletType !== _walletType) {
      dispatch(setWalletType(_walletType));
    } else {
      connectWallet();
    }
  };

  const setAccountsAtConnection = useCallback(
    (accounts: []) => {
      dispatch(setAccounts(accounts));
      dispatch(setConnected(true));
    },
    [dispatch]
  );

  const setAlgoSignerAccounts = useCallback(() => {
    connector
      .accounts({ ledger: "TestNet" })
      .then((accounts: []) => {
        setAccountsAtConnection(accounts);
      })
      .catch((error: ErrorEvent) => {
        console.error(error);
      });
  }, [connector, setAccountsAtConnection]);

  const connectWallet = useCallback(() => {
    if (walletType && connector && !address) {
      // Check if connection is already established
      // Connect wallet
      if (!connector) {
        return;
      }
      if (walletType === "walletConnect") {
        subscribeToEvents(dispatch)(connector);
        if (!connector.connected) {
          connector.createSession();
        }
        const { accounts } = connector;
        setAccountsAtConnection(accounts);
      }
      if (walletType === "myAlgo") {
        connector.connect().then((accounts: []) => {
          setAccountsAtConnection(accounts);
        });
      }
      if (walletType === "algoSigner") {
        if (connected) {
          setAlgoSignerAccounts();
        } else {
          (window as any).AlgoSigner.connect()
            .then((results: any) => {
              console.log("results? ", results);
              setAlgoSignerAccounts();
            })
            .catch((error: ErrorEvent) => {
              console.log("here?");
              console.error(error);
            });
        }
      }
      dispatch({ type: "close_vote_modal" });
    }
  }, [
    connector,
    address,
    connected,
    dispatch,
    setAccountsAtConnection,
    setAlgoSignerAccounts,
    walletType,
  ]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  useEffect(() => {
    // Check if connection is already established
    if (connector && address && address.length > 0) {
      dispatch(getAccountAssets({ chain, address }));
    }
  }, [address]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <menu
      className="mn_sm"
      style={{ display: `${!!openModalVote ? "flex" : "none"}` }}
    >
      <div
        style={{ width: "100%", flex: 1 }}
        onClick={() => {
          dispatch({ type: "close_vote_modal" });
        }}
      ></div>

      <div className="mn_sm_modal">
        <div className="mn_sm_modal_inn">
          <>
            <div className="algo_connect_hd">Select Wallet to continue</div>

            <div
              className="connect_butt"
              onClick={() => chooseWallet("walletConnect")}
            >
              <div className="connect_wallet_img">
                <img src={algowallet} alt="" />
              </div>
              <p className="connect_wallet_txt">Algorand Wallet</p>
            </div>
            <div
              className="connect_butt"
              onClick={() => chooseWallet("myAlgo")}
            >
              <div className="connect_wallet_img">
                <img src={myalgo} alt="" />
              </div>
              <p className="connect_wallet_txt">My Algo Wallet</p>
            </div>
            <div
              className="connect_butt"
              onClick={() => chooseWallet("algoSigner")}
            >
              <div className="connect_wallet_img">
                <img src={algosigner} alt="" />
              </div>
              <p className="connect_wallet_txt">
                {typeof (window as any).AlgoSigner === undefined
                  ? "Install AlgoSigner"
                  : "AlgoSigner"}
              </p>
            </div>
          </>

          <ScrollText word={"Decentralized decisions"} />
        </div>
      </div>
    </menu>
  );
};

export default PopFromBottomModal;
