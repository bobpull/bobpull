import React, { createContext, useReducer } from "react";

const UserContext = createContext({
  user: null,
});

const loginReducer = (userState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("%c로그인!", "color: #d93d1a;");
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGOUT":
      console.log("%c로그아웃!", "color: #d93d1a;");
      return {
        ...userState,
        user: null,
      };
    default:
      return userState;
  }
};

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(loginReducer, {
    user: null,
  });
  const store = {
    userState,
    userDispatch,
  };
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
