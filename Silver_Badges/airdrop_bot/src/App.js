import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAct from "./components/CreateAct/reward";
import CreateForm from "./components/CreateForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={CreateForm()} />
          <Route path="/reward" element={CreateAct()} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
