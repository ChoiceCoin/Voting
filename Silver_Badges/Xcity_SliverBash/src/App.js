import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Proposal from "./pages/proposal";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={Home()} />
        <Route path="/proposal" element={Proposal()} exact />
      </Routes>
    </Router>
  );
}

export default App;
