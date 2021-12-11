const BottomNavigationBar = ({ NavLink, darkTheme }) => {
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
            {/* <p> Home</p> */}
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
            to={`/elections`}
            key={"elections"}
          >
            <i className="uil uil-plus-square"></i>
            {/* <p> Elections</p> */}
          </NavLink>
        </li>

        {/* Transfer Section */}
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
            to={`/transfer`}
            key={"transfer"}
          >
            <i className="uil uil-exchange"></i>
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
            <i
              className="uil uil-shield-question"
              style={{ fontSize: "21px" }}
            ></i>
            {/* <p>FAQ</p> */}
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
            to={`/settings`}
            key={"settings"}
          >
            <i className="uil uil-setting"></i>
          </NavLink>
        </li>
      </ul>
    </footer>
  );
};

export default BottomNavigationBar;
