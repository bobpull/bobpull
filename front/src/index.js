import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { ProjectProvider } from "./context/ProjectContext";
import {ProfileProvider} from "./context/ProfileContext"
import { FriendListProvider } from "./context/FriendListContext";

ReactDOM.render(
  <React.StrictMode>
      <ProfileProvider>
        <FriendListProvider>
        <ProjectProvider>
          <App />
          </ProjectProvider>
        </FriendListProvider>
      </ProfileProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
