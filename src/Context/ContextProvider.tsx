import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SOPContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const SOPContext = createContext<SOPContextProps | undefined>(undefined);

interface SOPContextProviderProps {
  children: ReactNode;
}

const SOPContextProvider: React.FC<SOPContextProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <SOPContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </SOPContext.Provider>
  );
};

const useSOP = () => {
  const context = useContext(SOPContext);

  if (!context) {
    throw new Error('useSOP must be used within a SOPContextProvider');
  }

  return context;
};

export { SOPContextProvider, useSOP };
