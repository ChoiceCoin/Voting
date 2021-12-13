
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WalletConnect from "@walletconnect/client";
import { apiGetAccountAssets } from "../utils/api";
import { State } from "./reducers";

export enum ChainType {
  MainNet = "MainNet",
  TestNet = "TestNet",
}

export interface IAssetData {
  id: number;
  amount: bigint;
  creator: string;
  frozen: boolean;
  decimals: number;
  name?: string;
  unitName?: string;
  url?: string;
}

export interface WalletState {
  chain: ChainType,
  walletType: string,
  accounts: string[],
  address: string,
  assets: IAssetData[],
  connected: boolean,
  connector: any,
  fetching: boolean,
}

const initialState = {
  chain: ChainType.TestNet,
  walletType: "",
  accounts: [],
  address: "",
  assets: [],
  connected: false,
  connector: null,
  fetching: false,
} as WalletState;

export const getAccountAssets = createAsyncThunk("walletConnect/getAccountAssets", async (accountData: {chain: ChainType, address: string}) => {
  const { chain, address } = accountData;
  const response = apiGetAccountAssets(chain, address)
  return response;
})

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
      setFetching(state, action) {
        console.log("setFetching: ", action.payload)
        state.fetching = action.payload;
      },
      setWalletType(state, action) {
        state.walletType = action.payload;
      },
      switchChain(state, action) {
        console.log("switchChain chain: ", action.payload)
        state.chain = action.payload;
      },
      reset: (state) => {
        state.accounts = [];
        state.address = "";
        state.assets = [];
        state.connected = false;
        state.connector = null;
        state.walletType = "";
      },
      setConnector: (state, action) => {
        state.connector = action.payload;
      },
      setConnected: (state, action) => {
        state.connected = action.payload;
      },
      setAccounts: (state, action) => {
        state.accounts = action.payload;
        if (state.walletType === "walletConnect") {
          state.address = action.payload[0];
        } else if (state.walletType === "myAlgo" || state.walletType === "algoSigner") {
          state.address = action.payload[0].address;
        }
      },
      setAccountAssets: (state, action) => {
        state.assets = action.payload;
      },
      killSession: state => {
        if (state.connected) {
          if (state.walletType === "walletConnect") {
            (state.connector as WalletConnect).killSession();
          }
          walletSlice.caseReducers.reset(state);
        }
      }
    },
    extraReducers(builder) {
      builder.addCase(getAccountAssets.fulfilled, (state, action) => {
        state.assets = action.payload;
      })
    }
});

export const selectConnector = (state: State) => state.wallet.connector;
export const selectAddress = (state: State) => state.wallet.address;
export const selectAssets = (state: State) => state.wallet.assets;
export const selectChain = (state: State) => state.wallet.chain;
export const selectConnected = (state: State) => state.wallet.connected;
export const selectWalletType = (state: State) => state.wallet.walletType;

export const {
  setFetching,
  switchChain,
  reset,
  setWalletType,
  setConnector,
  setConnected,
  setAccounts,
  killSession
} = walletSlice.actions;

export default walletSlice.reducer;
