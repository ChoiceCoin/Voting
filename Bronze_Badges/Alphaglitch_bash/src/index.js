import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  type: "info",
  transition: transitions.SCALE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div
    style={{
      ...style,
      color: "#fff",
      padding: "20px",
      width: "450px",
      fontSize: "bold",
      fontSize: "12px",
      flexWrap: "wrap",
      lineHeight: "20px",
      overflow: "hidden",
      background: "#000",
    }}
  >
    <p style={{ width: "100%", flexWrap: "wrap" }}>{message}</p>
  </div>
);

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
