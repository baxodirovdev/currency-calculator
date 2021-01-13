import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ExchangeState } from "./context/ExchangeState";

ReactDOM.render(
  <React.StrictMode>
    <ExchangeState>
      <App />
    </ExchangeState>
  </React.StrictMode>,
  document.getElementById("root")
);
