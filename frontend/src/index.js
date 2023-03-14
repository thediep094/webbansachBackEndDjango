import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import LanChuotLenTop from "./LanChuotLenTop";
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LanChuotLenTop />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
