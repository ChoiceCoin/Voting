import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import WalletConnect from "@walletconnect/client";
import algowallet from "../assets/algorandwallet.svg";
import myalgo from "../assets/myalgo.svg";
import algosigner from "../assets/algosigner.svg";
import ScrollText from "../components/ScrollText";
import {
  reset,
  selectAddress,
  selectConnected,
  selectConnector,
  selectWalletType,
  setAccounts,
  setConnected,
  setWalletType,
} from "../store/walletSlice";
import styled from "styled-components";

const ConnectWalletImageWrapper = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  img {
    width: 20px;
    height: 20px;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const PopFromBottomModal = () => {
  const walletConnector = useSelector(selectConnector);
  const walletType = useSelector(selectWalletType);
  const connected = useSelector(selectConnected);
  const address = useSelector(selectAddress);
  const dispatch = useDispatch();

  const { openModalVote } = useSelector(
    (state) => (state as any).status.voteModal
  );

  const chooseWallet = (_walletType: string) => {
    dispatch(setWalletType(_walletType));
    connectWallet();
  };

  const setAccountsAtConnection = useCallback(
    (accounts: string[]) => {
      console.log("accounts in set accounts at connection? ", accounts);
      if (accounts.length > 0) {
        dispatch(setAccounts(accounts));
        dispatch(setConnected(true));
      } else {
        dispatch(setWalletType(null));
      }
    },
    [dispatch]
  );

  const subscribeToEvents = useCallback(() => {
    if (!walletConnector || !(walletConnector instanceof WalletConnect)) {
      return;
    }
    const _walletConnector = walletConnector as WalletConnect;
    // Subscribe to connection events
    _walletConnector.on("connect", (error, payload) => {
      console.log("%cOn connect", "background: yellow");
      if (error) {
        throw error;
      }
      localStorage.setItem("walletType", "walletConnect");
      const { accounts } = payload.params[0];
      setAccountsAtConnection(accounts);
    });

    _walletConnector.on("session_update", (error, payload) => {
      console.log("%cOn session_update", "background: yellow");
      if (error) {
        throw error;
      }
      const { accounts } = payload.params[0];
      setAccountsAtConnection(accounts);
    });

    _walletConnector.on("disconnect", (error, payload) => {
      console.log("%cOn disconnect", "background: yellow");
      if (error) {
        throw error;
      }
      dispatch(reset());
    });
  }, [dispatch, walletConnector, setAccountsAtConnection]);

  const setAlgoSignerAccounts = useCallback(() => {
    (walletConnector as any)
      .accounts({ ledger: "TestNet" })
      .then((accounts: []) => {
        setAccountsAtConnection(accounts);
      })
      .catch((error: ErrorEvent) => {
        console.error(error);
      });
  }, [walletConnector, setAccountsAtConnection]);

  // eslint-disable-next-line
  const connectWallet = useCallback(() => {
    if (walletType && walletConnector && !address) {
      // Check if connection is already established
      // Connect wallet
      if (!walletConnector) {
        return;
      }
      if (walletType === "walletConnect") {
        subscribeToEvents();
        if (
          walletConnector instanceof WalletConnect &&
          !walletConnector.connected
        ) {
          walletConnector.createSession();
        }
        const { accounts } = walletConnector as WalletConnect;
        setAccountsAtConnection(accounts);
      }
      if (walletType === "myAlgo") {
        walletConnector.connect().then((accounts: []) => {
          setAccountsAtConnection(accounts);
        });
      }
      if (walletType === "algoSigner") {
        if (connected) {
          setAlgoSignerAccounts();
        } else {
          (window as any).AlgoSigner.connect()
            .then((results: any) => {
              setAlgoSignerAccounts();
            })
            .catch((error: ErrorEvent) => {
              console.error(error);
            });
        }
      }
      dispatch({ type: "close_vote_modal" });
    }
  }, [
    walletType,
    walletConnector,
    address,
    connected,
    dispatch,
    setAccountsAtConnection,
    setAlgoSignerAccounts,
    subscribeToEvents,
  ]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

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
              <ConnectWalletImageWrapper>
                <img src={algowallet} alt="" />
              </ConnectWalletImageWrapper>
              <p className="connect_wallet_txt">Algorand Wallet</p>
            </div>
            <div
              className="connect_butt"
              onClick={() => chooseWallet("myAlgo")}
            >
              <ConnectWalletImageWrapper>
                <img src={myalgo} alt="" />
              </ConnectWalletImageWrapper>
              <p className="connect_wallet_txt">My Algo Wallet</p>
            </div>
            <div
              className="connect_butt"
              onClick={() => chooseWallet("algoSigner")}
            >
              <ConnectWalletImageWrapper>
                <img src={algosigner} alt="" />
              </ConnectWalletImageWrapper>
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
