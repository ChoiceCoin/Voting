import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import Toggle from "../components/Toggle";
import ConnectWalletButton from "../components/ConnectWalletButton";
import AccountInfo from "../components/AccountInfo";
import { selectConnected } from "../store/walletSlice";
import TotalCommittedChoice from "../components/TotalCommittedChoice";

const RightMenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TopNavigationBar: React.FC<{
  darkTheme: boolean;
}> = ({ darkTheme }) => {
  const connected = useSelector(selectConnected);
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const announcement =
    "///// This site is not responsive yet. Large screen view coming soon.";

  return (
    <header className="small_header">
      <div
        className="notResponsiveWarning"
        style={{ display: width > 800 ? "flex" : "none" }}
      >
        <p>{announcement}</p>
      </div>

      <div className="small_header_inn">
        <div
          style={{
            marginLeft: "6vw",
            // width: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {/* <img src="" alt="" /> */}
          Choice Coin
        </div>

        <RightMenuWrapper>
          <div
            className="sm_act_menu_butt"
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
          </div>
          {connected && <TotalCommittedChoice />}
          {connected ? <AccountInfo /> : <ConnectWalletButton />}
          <Toggle darkTheme={darkTheme} />
        </RightMenuWrapper>
      </div>
    </header>
  );
};

export default TopNavigationBar;
