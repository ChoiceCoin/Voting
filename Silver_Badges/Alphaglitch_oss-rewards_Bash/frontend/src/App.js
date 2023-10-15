import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reward from "./Reward";
import DevForm from "./DevForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reward />} />
        <Route path="/form" element={<DevForm />} />
      </Routes>
    </Router>
  );
};

export default App;
