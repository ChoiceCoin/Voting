import Toggle from "./Toggle";
import $ from "jquery";

const Navbar = () => {
  return (
    <nav>
      <div className="nav_logo">
        <img src="./choice2.png" alt="" />
        <p>Choice Coin</p>
      </div>

      <div className="nav_rig">
        <ul className="nav_links">
          <li>About</li>
          <li>Sign up</li>
          <li>Participate&nbsp;</li>
        </ul>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: "2px",
            marginLeft: "20px",
          }}
          className="theme_tog"
        >
          <i className="uil uil-moon"></i>
          <Toggle />
          <i className="uil uil-asterisk" style={{ fontSize: "15px" }}></i>
        </div> */}

        <div
          className="m_butt"
          onClick={() => {
            $("menu").css({ "-webkit-transform": "translate(0px,0px)" });
            $("body").css({ overflowY: "hidden" });
            $("#main_main").css({ "-webkit-filter": "blur(5px)" });
          }}
        >
          <i className="uil uil-bars"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
