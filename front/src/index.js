import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import {ProfileProvider} from "./context/ProfileContext"

ReactDOM.render(
  <React.StrictMode>
      <ProfileProvider>
        <App />
      </ProfileProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
