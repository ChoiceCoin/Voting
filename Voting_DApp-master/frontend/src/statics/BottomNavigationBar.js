import { useDispatch } from "react-redux";

const BottomNavigationBar = ({ NavLink, darkTheme }) => {
  const dispatch = useDispatch();

  const LogOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("addresses");
    localStorage.removeItem("wallet-type");
    localStorage.removeItem("walletconnect");
    window.location.reload();
  };

  const setMode = () => {
    if (!darkTheme) {
      localStorage.setItem("mode", "dark");
      dispatch({ type: "dark_mode" });
    } else {
      localStorage.setItem("mode", "light");
      dispatch({ type: "light_mode" });
    }
  };

  return (
    <footer className="ft_sm">
      <ul className="ft_sm_inn">
        <li className="ft_sm_li">
          <NavLink
            style={({ isActive }) => {
              return {
                display: "flex",
                fontSize: isActive ? "14px" : "13px",
                fontWeight: isActive && "600",
                opacity: isActive ? "1" : "0.6",
                alignItems: "center",
                flexDirection: "column",
              };
            }}
            to={`/`}
            key={"home"}
          >
            <i className="uil uil-estate"></i>
          </NavLink>
        </li>

        <li className="ft_sm_li">
          <NavLink
            style={({ isActive }) => {
              return {
                display: "flex",
                fontSize: isActive ? "14px" : "13px",
                fontWeight: isActive && "600",
                opacity: isActive ? "1" : "0.6",
                alignItems: "center",
                flexDirection: "column",
              };
            }}
            to={`/faq`}
            key={"faq"}
          >
            {/* <i className="uil uil-question-circle"></i> */}
            <i className="uil uil-list-ui-alt"></i>
          </NavLink>
        </li>

        <li className="ft_sm_li">
          <NavLink
            style={({ isActive }) => {
              return {
                width: "35px",
                height: "35px",
                display: "flex",
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: isActive && "600",
                background: "var(--main-col)",
                color: !darkTheme ? "#fff" : "",
                border: isActive
                  ? darkTheme
                    ? "1px solid var(--wht)"
                    : "1px solid #666"
                  : "none",
                fontSize: isActive ? "14px" : "13px",
              };
            }}
            to={`/participate`}
            key={"participate"}
          >
            <i className="uil uil-check"></i>
          </NavLink>
        </li>

        <li className="ft_sm_li" onClick={setMode}>
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              opacity: "0.65",
              cursor: "pointer",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {darkTheme ? (
              <i
                className="uil uil-brightness-low"
                style={{ fontSize: "21px" }}
              ></i>
            ) : (
              <i className="uil uil-moon" style={{ fontSize: "21px" }}></i>
            )}
          </div>
        </li>

        <li className="ft_sm_li">
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              opacity: "0.65",
              cursor: "pointer",
              alignItems: "center",
              flexDirection: "column",
            }}
            onClick={LogOut}
          >
            <i className="uil uil-signout" style={{ fontSize: "21px" }}></i>
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default BottomNavigationBar;
