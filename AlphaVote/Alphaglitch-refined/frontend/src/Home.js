import Footer from "./components/Footer";
import Roadmap from "./sections/Roadmap";
import Landing from "./sections/Landing";
import Founders from "./sections/Founders";
import ElectionList from "./sections/ElectionList";

const Home = () => {
  return (
    <>
      <Landing />
      <ElectionList />
      <Roadmap />
      <Founders />
      <Footer />
    </>
  );
};

export default Home;
