import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { ProjectProvider } from "./context/ProjectContext";
import { FriendListProvider } from "./context/FriendListContext";
import { TallProvider } from "./context/TallContext";

ReactDOM.render(
  <React.StrictMode>
    <FriendListProvider>
      <TallProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </TallProvider>
    </FriendListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
