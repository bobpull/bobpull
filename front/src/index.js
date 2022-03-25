import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import {ProjectProvider} from "./context/ProjectContext"
import { FriendListProvider } from "./context/FriendListContext";

ReactDOM.render(
  <React.StrictMode>
    <FriendListProvider>
      <ProjectProvider>
      <App />
      </ProjectProvider>
    </FriendListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
