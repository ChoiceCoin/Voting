import { combineReducers } from "redux";

const status = (
  state = {
    darkTheme: localStorage.getItem("mode") === "dark" ? true : false,
    modalMenu: { openModal: false, modalType: "menu" },
    electModal: { openElectModal: false, modalData: null },
    voteModal: { openModalVote: false, voteData: null },
  },
  action
) => {
  switch (action.type) {
    case "light_mode":
      return { ...state, darkTheme: false };
    case "dark_mode":
      return { ...state, darkTheme: true };

    case "modal_menu":
      return { ...state, modalMenu: { openModal: true, modalType: "menu" } };
    case "modal_connect":
      return {
        ...state,
        modalMenu: { openModal: true, modalType: "connectWallet" },
      };

    case "modal_connect_vote":
      return {
        ...state,
        voteModal: { openModalVote: true, voteData: action.voteData },
      };
    case "close_vote_modal":
      return { ...state, voteModal: { openModalVote: false, voteData: null } };

    case "close_modal":
      return { ...state, modalMenu: { openModal: false, modalType: "menu" } };

    case "popupElection":
      return {
        ...state,
        electModal: { openElectModal: true, modalData: action.payload },
      };
    case "closePopupElection":
      return {
        ...state,
        electModal: { openElectModal: false, modalData: null },
      };

    default:
      return state;
  }
};

export default combineReducers({ status });
