import { combineReducers } from "redux";
import appReducer, { AppState } from './appSlice';
import walletReducer, { WalletState } from './walletSlice';

export interface State {
  status: AppState,
  wallet: WalletState,
}

const rootReducer = combineReducers<State>({ status: appReducer, wallet: walletReducer });
export default rootReducer;