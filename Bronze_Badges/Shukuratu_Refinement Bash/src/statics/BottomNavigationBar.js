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
