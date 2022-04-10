import styled from "styled-components";
import { useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import Toggle from "../components/Toggle";
import ConnectWalletButton from "../components/ConnectWalletButton";
import AccountInfo from "../components/AccountInfo";
import { selectAddress, selectConnected } from "../store/walletSlice";
import TotalCommittedChoice from "../components/TotalCommittedChoice";

const RightMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const SmallHeader = styled.header`
  top: 0;
  left: 0;
  z-index: 90;
  width: 100vw;
  display: flex;
  font-size: 13px;
  color: var(--wht);
  position: fixed;
  flex-direction: column;
  background-color: var(--background);
  border-bottom: 1px solid var(--border-default);
`;

const SmallHeaderInner = styled.div<{ darkTheme: boolean }>`
  width: 100%;
  display: flex;
  font-size: 13px;
  flex-direction: row;
  padding: 8px 0;
  justify-content: space-between;
  font-weight: ${({ darkTheme }) => (darkTheme ? "normal" : 500)};
  p {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccountDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
`;

const SiteTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin-left: 6vw;
  @media (max-width: 768px) {
    margin-left: 8px;
  }
`;

const TopNavigationBar: React.FC<{
  darkTheme: boolean;
}> = ({ darkTheme }) => {
  const [width] = useWindowSize();

  const connected = useSelector(selectConnected);
  const address = useSelector(selectAddress);

  const NavBarContent = () => {
    return (
      <AccountDetailsRow>
        {connected && <TotalCommittedChoice />}
        {address ? <AccountInfo /> : <ConnectWalletButton />}
      </AccountDetailsRow>
    );
  };
  return (
    <SmallHeader>
      <SmallHeaderInner darkTheme={darkTheme}>
        {width < 768 ? (
          <>
            <MobileRow>
              <SiteTitle>Choice Coin</SiteTitle>
              <Toggle darkTheme={darkTheme} />
            </MobileRow>
            <NavBarContent />
          </>
        ) : (
          <>
            <SiteTitle>Choice Coin</SiteTitle>
            <RightMenuWrapper>
              <NavBarContent />
              <Toggle darkTheme={darkTheme} />
            </RightMenuWrapper>
          </>
        )}
      </SmallHeaderInner>
    </SmallHeader>
  );
};

export default TopNavigationBar;
