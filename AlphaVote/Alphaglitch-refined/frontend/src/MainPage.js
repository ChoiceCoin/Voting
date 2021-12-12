import { NavLink, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Transfer from "./transfer";
import Elections from "./elections";
import { useSelector } from "react-redux";
import CreateElection from "./elections/create";
import { useWindowSize } from "@react-hook/window-size";
import TopNavigationBar from "./statics/TopNavigationBar";
import BottomNavigationBar from "./statics/BottomNavigationBar";

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
      <TopNavigationBar darkTheme={darkTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/elections/create" element={<CreateElection />} />
      </Routes>

      {width <= 850 && (
        <BottomNavigationBar NavLink={NavLink} darkTheme={darkTheme} />
      )}
    </main>
  );
};

export default MainPage;
