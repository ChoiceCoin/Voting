import './App.css';
import logo from './Logo.png';

// React functions must return a React component
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
        <h1>
          <div id = "displaytext" style={{ color: "blue" }}> Choice Coin </div>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </p>
        </p>
        <div>
          <h3 id = "displaytext" style={{ color: "blue" }}> Algorand or Solana </h3>
          <break>

          <h4 id = "displaytext" style={{ color: "blue" }}> Tuesday October 20 </h4>
          <h4 id = "displaytext" style={{ color: "blue" }}> Voting Closed </h4>
          <h4 id = "displaytext" style={{ color: "blue" }}> Oracle Predicts Solana Wins </h4>
        </break>
          <h4 id = "displaytext" style={{ color: "blue" }}> Algorand </h4>
          <h4 id = "displaytext" style={{ color: "blue" }}> 40000 Choice </h4>

          <div>

          </div>
          <h4 id = "displaytext" style={{ color: "blue" }}> Solana </h4>
          <h4 id = "displaytext" style={{ color: "blue" }}> 60000 Choice </h4>

          <div>

          </div>
        </div>
        <break>
        <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </break>
      </header>
    </div>
  );

}
export default App