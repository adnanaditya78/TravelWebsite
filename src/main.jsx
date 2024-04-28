import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import {thunk} from "redux-thunk";
import reducer from "./reducers";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
