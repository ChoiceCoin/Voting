import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import styled from "styled-components";
import { subscribeToEvents } from "../utils/walletUtils";

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

const chain = ChainType.TestNet;

const PopFromBottomModal = () => {
  const walletConnector = useSelector(selectConnector);
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
    walletConnector
      .accounts({ ledger: "TestNet" })
      .then((accounts: []) => {
        setAccountsAtConnection(accounts);
      })
      .catch((error: ErrorEvent) => {
        console.error(error);
      });
  }, [walletConnector, setAccountsAtConnection]);

  const connectWallet = useCallback(() => {
    if (walletType && walletConnector && !address) {
      // Check if connection is already established
      // Connect wallet
      if (!walletConnector) {
        return;
      }
      if (walletType === "walletConnect") {
        subscribeToEvents(dispatch)(walletConnector);
        if (!walletConnector.connected) {
          walletConnector.createSession();
        }
        const { accounts } = walletConnector;
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
    walletConnector,
    address,
    connected,
    dispatch,
    subscribeToEvents,
    setAccountsAtConnection,
    setAlgoSignerAccounts,
    walletType,
  ]);

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  useEffect(() => {
    // Check if connection is already established
    if (walletConnector && address && address.length > 0) {
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
