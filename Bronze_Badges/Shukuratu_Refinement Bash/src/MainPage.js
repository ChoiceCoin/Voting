import { useSelector } from "react-redux";
import ElectionList from "./ElectionList";
import { useWindowSize } from "@react-hook/window-size";
import { NavLink, Route, Routes } from "react-router-dom";
import TopNavigationBar from "./statics/TopNavigationBar";
import BottomNavigationBar from "./statics/BottomNavigationBar";
import Test from "./statics/Test";

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

      {/* <Test /> */}

      <Routes>
        <Route path="/" element={<ElectionList />} />
        <Route path="/home" element={<ElectionList />} />
      </Routes>

      {width <= 850 && (
        <BottomNavigationBar NavLink={NavLink} darkTheme={darkTheme} />
      )}
    </main>
  );
};

export default MainPage;
