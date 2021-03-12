import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.css";
import Routes from "./Router";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/createStore";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);
