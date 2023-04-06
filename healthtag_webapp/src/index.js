import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import { Provider } from "react-redux";
import store from "./store";
import { saveState } from "./components/utility/localstorage";
import ScrollToTop from "./components/utility/ScrollToTop";
import throttle from "lodash/throttle";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
store.subscribe(
  throttle(() => {
    saveState({
      root: store.getState().root,
    });
  }, 1000)
);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <React.StrictMode>
      <Provider store={store}>
        <ScrollToTop />
        <ReactNotifications />
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
