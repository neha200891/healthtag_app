// require("file-loader?name=[name].[ext]!../public/index.html");
import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { saveState } from "./components/utility/localstorage";
import ScrollToTop from "./components/utility/ScrollToTop";
import throttle from "lodash/throttle";
const appElement = document.getElementById("app");
store.subscribe(
  throttle(() => {
    saveState({
      root: store.getState().root,
    });
  }, 1000)
);
//changes

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <ScrollToTop />
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
