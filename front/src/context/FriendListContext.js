import React, { useState, createContext } from "react";

const FriendListContext = createContext();

const FriendListProvider = ({children}) => {
  const [friendList, setFriendList] = useState([]);
  const store = { friendList, setFriendList };

  return (
    <FriendListContext.Provider value={store}>
      {children}
    </FriendListContext.Provider>
  );
};

export { FriendListProvider, FriendListContext };
