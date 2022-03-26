import React, { useState, createContext } from "react";

const TallContext = createContext();

const TallProvider = ({ children }) => {
  const [tall, setTall] = useState(0);
  const store = { tall, setTall };

  return <TallContext.Provider value={store}>{children}</TallContext.Provider>;
};

export { TallProvider, TallContext };
