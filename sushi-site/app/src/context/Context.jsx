import { createContext, useContext, useEffect, useState } from "react";

const initContext = createContext();

export const Context = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  console.log(user);

  return (
    <initContext.Provider value={{ user, setUser }}>
      {children}
    </initContext.Provider>
  );
};

export const GetContext = () => {
  return useContext(initContext);
};
