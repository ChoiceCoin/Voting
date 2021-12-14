import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
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
`;

const MenuButton = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 2px;
  margin-right: 20px;
  cursor: pointer;
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
  height: var(--sm-hd-height-half);
  justify-content: space-between;
  font-weight: ${({ darkTheme }) => (darkTheme ? "normal" : 500)};
  p {
    opacity: 0.8;
  }
`;

const SiteTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 6vw;
  text-transform: uppercase;
`;

const TopNavigationBar: React.FC<{
  darkTheme: boolean;
}> = ({ darkTheme }) => {
  const connected = useSelector(selectConnected);
  const address = useSelector(selectAddress);
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const announcement =
    "///// This site is not responsive yet. Large screen view coming soon.";

  return (
    <SmallHeader>
      <div
        className="notResponsiveWarning"
        style={{ display: width > 800 ? "flex" : "none" }}
      >
        <p>{announcement}</p>
      </div>

      <SmallHeaderInner darkTheme={darkTheme}>
        <SiteTitle>
          {/* <img src="" alt="" /> */}
          Choice Coin
        </SiteTitle>

        <RightMenuWrapper>
          <MenuButton
            onClick={() => {
              dispatch({ type: "modal_menu" });
            }}
          >
            <p>
              <i
                style={{
                  fontSize: "20px",
                  paddingBottom: "2px",
                  marginRight: "10px",
                }}
                className="uil uil-bars"
              />
            </p>
            <p style={{ paddingBottom: "2px" }}>menu</p>
          </MenuButton>
          {connected && <TotalCommittedChoice />}
          {address ? <AccountInfo /> : <ConnectWalletButton />}
          <Toggle darkTheme={darkTheme} />
        </RightMenuWrapper>
      </SmallHeaderInner>
    </SmallHeader>
  );
};

export default TopNavigationBar;
