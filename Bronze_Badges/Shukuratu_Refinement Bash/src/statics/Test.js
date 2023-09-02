import { WalletSelector } from "@xbacked-dao/algorand-wallet-select";

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { useEffect } from "react";

const Test = () => {
  //

  useEffect(() => {
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

      console.log(accounts);
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      const { accounts } = payload.params[0];

      console.log(accounts);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        console.log(error);
      }
    });
  }, []);

  const returnWallet = async (data) => {
    if (!!data) {
      console.log(data?.connector?.check());
      console.log(await data.connector.connect());
      console.log(data.connector.provider);
    }
  };

  return <WalletSelector returnWallet={returnWallet} wallets="walletconnect" />;

  return <div></div>;
};

export default Test;
