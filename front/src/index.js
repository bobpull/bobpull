import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

// import { ProfileProvider } from "./context/ProfileContext";
import { FriendListProvider } from "./context/FriendListContext";
import { TallProvider } from "./context/TallContext";

ReactDOM.render(
  <React.StrictMode>
    {/* <ProfileProvider> */}
    <FriendListProvider>
      <TallProvider>
        <App />
      </TallProvider>
    </FriendListProvider>
    {/* </ProfileProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
