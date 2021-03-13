import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./tailwind.css";
import "rsuite/dist/styles/rsuite-default.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/createStore";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
