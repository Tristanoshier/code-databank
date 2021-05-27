import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from "./App";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
