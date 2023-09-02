import styled from "styled-components";
import { useDispatch } from "react-redux";

const ConnectButton = styled.button`
  align-self: center;
  line-height: 1;
  font-size: 13px;
  padding: 2.5px 8px;
  border: 1px solid;
  border-radius: 4px;
`;

const ConnectWalletButton = () => {
  const dispatch = useDispatch();
  const openWalletOptionsModal = () => {
    dispatch({
      type: "modal_connect_vote",
    });
  };
  return (
    <ConnectButton onClick={openWalletOptionsModal}>
      Connect Wallet
    </ConnectButton>
  );
};

export default ConnectWalletButton;
