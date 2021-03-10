import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UnleashClient } from "unleash-proxy-client";

let userId = localStorage.getItem("userId");

if (!userId) {
  userId = Math.round(Math.random() * 100000000);
  localStorage.setItem("userId", userId);
}

const unleash = new UnleashClient({
  url: process.env.REACT_APP_PROXY_URL,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
  refreshInterval: 2,
  appName: "landing-example",
  environment: "production",
});

unleash.updateContext({ userId });
unleash.start();

ReactDOM.render(
  <React.StrictMode>
    <App unleash={unleash} userId={userId} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
