import './App.css';

const mm_connect = 0+1
const mm_disconnect = 1+0
const option_0 = 0+2
const option_1 = 2+0

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        <h1>
          <div id = "displaytext" style={{ color: "blue" }}> Choice Coin </div>
          <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </h1>
        <p>
          <h4 id = "displaytext" style={{ color: "blue" }}> Ethereum </h4>
          <button id='button1' onClick={mm_connect}> Connect</button>
          <button id='button2' onClick={mm_disconnect}> Disconnect</button>
          <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </p>
        </p>
        <p>
          <h4 id = "displaytext" style={{ color: "blue" }}> Vote </h4>
          <button id='button1' onClick={option_0}> Option 0</button>
          <button id='button2' onClick={option_1}> Option 1</button>
          <h3 id = "displaytext" style={{ color: "blue" }}> ______________________ </h3>
        </p>
      </header>
    </div>
  );
}

export default App;
