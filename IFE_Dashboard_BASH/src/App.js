import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import Generate from "./components/generate";
import Existing from "./components/existing";
import Algosigner from "./components/algosigner";
import MyAlgo from "./components/myAlgo";
import MobileWallet from "./components/mobilewallet";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={Main()} />
        <Route path="/generate" element={Generate()} exact />
        <Route path="/existing" element={Existing()} exact />
        <Route path="/algosigner" element={Algosigner()} exact />
        <Route path="/myAlgo" element={MyAlgo()} exact />
        <Route path="/mobilewallet" element={MobileWallet()} exact />
      </Routes>
    </Router>
  );
}

export default App;
