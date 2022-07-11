import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";

const root = ReactDOM.createRoot(document.getElementById("root"));

const storeInfo = {
  name: "store-test",
};

root.render(
  <React.StrictMode>
    <App storeInfo={storeInfo} />
  </React.StrictMode>
);
