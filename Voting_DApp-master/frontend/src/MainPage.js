import { useSelector } from "react-redux";
import Home from "./Home";

import Faq from "./faq";
import { useWindowSize } from "@react-hook/window-size";
import { NavLink, Route, Routes } from "react-router-dom";
import TopNavigationBar from "./statics/TopNavigationBar";
import BottomNavigationBar from "./statics/BottomNavigationBar";
import ElectionList from "./ElectionList";

const MainPage = () => {
  const [width] = useWindowSize();
  const darkTheme = useSelector((state) => state.status.darkTheme);

  return (
    <main
      className={`${
        darkTheme ? "dark_theme big_screen" : "light_theme big_screen"
      }`}
      id="main_main"
    >
      <div
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          content: "",
          width: "100%",
          height: "100%",
          opacity: darkTheme ? 0.088 : 0.078,
          position: "fixed",
          pointerEvents: "none",
          background: `url("./img/background${darkTheme ? "2" : ""}.svg")`,
        }}
      />

      <TopNavigationBar darkTheme={darkTheme} NavLink={NavLink} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/home" element={<Home />} />
        <Route path="/participate" element={<ElectionList />} />
      </Routes>

      {width <= 850 && (
        <BottomNavigationBar NavLink={NavLink} darkTheme={darkTheme} />
      )}
    </main>
  );
};

export default MainPage;
