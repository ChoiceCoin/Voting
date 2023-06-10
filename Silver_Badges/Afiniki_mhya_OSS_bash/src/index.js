import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import{ AppProvider} from "./context"
import {BrowserRouter,Route, Routes} from "react-router-dom"
import PaymentPage from "./routes/paymentPage"
import RewardsPage from "./routes/rewardPage";
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />}/>
            {/* <Route index element={<Header />} /> */}
            <Route path="pay" element={<PaymentPage />} />
            <Route path="reward" element={<RewardsPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
