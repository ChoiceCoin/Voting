import Toggle from "../components/Toggle";
import { useDispatch } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";

const TopNavigationBar = ({ darkTheme }) => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();

  return (
    <header className="small_header">
      <div
        className="notResponsiveWarning"
        style={{ display: width > 800 ? "flex" : "none" }}
      >
        <p>
          ///// This site is not responsive yet. Large screen view coming soon.
        </p>
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

        <div style={{ display: "flex", flexDirection: "row" }}>
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
          <div className="theme_tog">
            <Toggle darkTheme={darkTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigationBar;
