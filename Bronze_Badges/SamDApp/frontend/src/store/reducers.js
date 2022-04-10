import { combineReducers } from "redux";

const status = (
  state = {
    darkTheme: localStorage.getItem("mode") === "light" ? false : true,
    alertModal: { openModal: false, modalContent: "" },
    electModal: { openElectModal: false, modalData: null },
    voteModal: { openModalVote: false, voteData: null },
    addressNum: 0,
    address: null,
  },
  action
) => {
  switch (action.type) {
    case "setAlgoAddress":
      localStorage.setItem("address", `${action?.addr}`);
      return { ...state, addressNum: action.addressIndex };

    case "light_mode":
      return { ...state, darkTheme: false };
    case "dark_mode":
      return { ...state, darkTheme: true };

    case "alert_modal":
      return {
        ...state,
        alertModal: { openModal: true, modalContent: action.alertContent },
      };

    case "close_modal":
      return { ...state, alertModal: { openModal: false, modalContent: "" } };

    default:
      return state;
  }
};

export default combineReducers({ status });
