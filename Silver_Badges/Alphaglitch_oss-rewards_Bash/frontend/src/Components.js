import { NavLink } from "react-router-dom";

const Navbar = () => (
  <div className="navbar">
    <p>Reward Payment</p>
    <NavLink to={`/form`} key={"form"}>
      <i className="uil uil-postcard"></i>
    </NavLink>
  </div>
);
const NavbarForm = () => (
  <div className="navbar">
    <p>Particpant Form</p>
    <NavLink to={`/`} key={"home"}>
      <i className="uil uil-home"></i>
    </NavLink>
  </div>
);

const RewardName = ({ validName }) => (
  <div className="reward_name">
    <p>Reward name:</p>
    <input type="text" placeholder="Reward Name" id="reward_name" />
    {!validName && <div className="warn">Supply name for the reward</div>}
  </div>
);

const Addresses = ({ validAddresses }) => {
  return (
    <div className="addresses">
      <p>Addresses:</p>
      <textarea
        type="text"
        id="reward_wallet_addresses"
        placeholder="Ox3487JHH2345...9a, Ox3487JHH2345...92,0x3487JHH2345...9a, Ox3487JHH2345...9a, Ox3487JHH2345...9a,
      Ox3487JHH2345...9a, Ox3487JHH2345...92,0x3487JHH2345...9a, Ox3487JHH2345...9a, Ox3487JHH2345...9a,
      Ox3487JHH2345...9a, Ox3487JHH2345...92,0x3487JHH2345...9a, Ox3487JHH2345...9a, Ox3487JHH2345...9a,
      Ox3487JHH2345...9a, Ox3487JHH2345...92,0x3487JHH2345...9a, Ox3487JHH2345...9a, Ox3487JHH2345...9a,
      Ox3487JHH2345...9a, Ox3487JHH2345...92,0x3487JHH2345...9a, Ox3487JHH2345...9a, Ox3487JHH2345...9a"
        className="addr_inp"
      />
      {!validAddresses && (
        <div className="warn">Input wallet addresses for reward</div>
      )}
    </div>
  );
};

const Amount = ({ validAmt }) => (
  <div className="amount">
    <p>Amount of Choice:</p>
    <div className="amount_inp">
      <div className="dollar">$</div>
      <input
        type="number"
        placeholder="Enter amount of Choice"
        id="amt_inp"
        className="amt_inp"
      />
    </div>
    {!validAmt && <div className="warn">Please input amount of choice</div>}
  </div>
);

const TxnFail = () => <div className="txn_fail">Failed</div>;
const TxnSuccess = () => <div className="txn_success">Success</div>;

export {
  Navbar,
  NavbarForm,
  RewardName,
  Addresses,
  Amount,
  TxnFail,
  TxnSuccess,
};
