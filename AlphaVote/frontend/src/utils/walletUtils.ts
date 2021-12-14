import algosdk, { Transaction } from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import MyAlgo from "@randlabs/myalgo-connect";

import { ChainType, clientForChain } from "./api";
import { reset, setAccounts } from "../store/walletSlice";
import { Dispatch } from "react";

export interface SignedTxn {
  txID: string
  blob: Uint8Array
}

export async function sign(txns: Transaction[], walletType: string, connector: any): Promise<SignedTxn[]> {

  const txnsToSign = txns.map((txn) => {
    const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64");

    return {txn: encodedTxn};
  })

  const request = formatJsonRpcRequest("algo_signTxn", [txnsToSign]);
  
  let result: string[] = [];
  if (walletType === "walletConnect") {
    result = await connector.sendCustomRequest(request);
    return result.map((element, idx) => {
      console.log("Element: ", element)
      return element ? {
          txID: txns[idx].txID(), 
          blob: new Uint8Array(Buffer.from(element, "base64"))
        } : {
          txID:txns[idx].txID(), 
          blob:new Uint8Array()
        };
    });
  } else if (walletType === "myAlgo") {
    result = await connector.signTransaction(txnsToSign.map(txn => txn.txn));
  } else if (walletType === "algoSigner") {
    result = await connector.signTxn([txnsToSign]);
  }
  console.log("RESULT: ",result);

  return result.map((element, idx) => {
    console.log("Element: ", element)
    return element ? {
        txID: txns[idx].txID(), 
        blob: new Uint8Array(Buffer.from((element as any).blob, "base64"))
      } : {
        txID:txns[idx].txID(), 
        blob:new Uint8Array()
      };
  });
}

// Utility function to block after sending the raw transaction for 3 rounds in this case
export async function sendWait(signed: SignedTxn[], chain: ChainType): Promise<any> {
  const client = clientForChain(chain)
  const {txId} = await client.sendRawTransaction(signed.map((t)=>{return t.blob})).do()
  const result = await waitForConfirmation(txId, 3, chain)
  return result 
}

// Continuously poll the pending txn endpoint with the txn id to see if its been confirmed
// At the time of reading, this may have been included in the js-sdk and that one should
// be used instead of this one
async function waitForConfirmation(txId: string, timeout: number, chain: ChainType): Promise<any> {
  const client = clientForChain(chain)

  if (client == null || txId == null || timeout < 0) {
    throw new Error('Bad arguments.');
  }

  const status = await client.status().do();
  if (typeof status === 'undefined')
    throw new Error('Unable to get node status');

  const startround = status['last-round'] + 1;
  let currentround = startround;

  /* eslint-disable no-await-in-loop */
  while (currentround < startround + timeout) {
    const pending = await client
      .pendingTransactionInformation(txId)
      .do();

    if (pending !== undefined) {
      if ( pending['confirmed-round'] !== null && pending['confirmed-round'] > 0) 
        return pending;

      if ( pending['pool-error'] != null && pending['pool-error'].length > 0) 
        throw new Error( `Transaction Rejected pool error${pending['pool-error']}`);
    }

    await client.statusAfterBlock(currentround).do();
    currentround += 1;
  }

  /* eslint-enable no-await-in-loop */
  throw new Error(`Transaction not confirmed after ${timeout} rounds!`);
}


// eslint-disable-next-line
export const subscribeToEvents = (dispatch: Dispatch<any>) => (_walletConnector: WalletConnect) => {
  if (!_walletConnector) {
    return;
  }
  // Subscribe to connection events
  _walletConnector.on("connect", (error, payload) => {
    console.log("%cOn connect", "background: yellow");
    if (error) {
      throw error;
    }
    const { accounts } = payload.params[0];
    dispatch(setAccounts(accounts));
  });

  _walletConnector.on("session_update", (error, payload) => {
    console.log("%cOn session_update", "background: yellow");
    if (error) {
      throw error;
    }
    const { accounts } = payload.params[0];
    dispatch(setAccounts(accounts));
  });

  _walletConnector.on("disconnect", (error, payload) => {
    console.log("%cOn disconnect", "background: yellow");
    if (error) {
      throw error;
    }
    dispatch(reset());
  });
};

  
export const getWalletConnect = () =>
  new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: QRCodeModal,
  });

export const getMyAlgo = () => new MyAlgo();

export const getAlgoSigner = () => (window as any).AlgoSigner;