import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SOPContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const SOPContext = createContext<SOPContextProps | undefined>(undefined);

interface SOPContextProviderProps {
  children: ReactNode;
}

const SOPContextProvider: React.FC<SOPContextProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setLoggedIn(true);
        console.log(data.message); 
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3001/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setLoggedIn(false);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
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
