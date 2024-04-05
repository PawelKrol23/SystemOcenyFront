import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Achievement, UserSession } from '../Interfaces/UserType';

interface SOPContextProps {
  isLoggedIn: boolean;
  AllAchievements: Achievement[];
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserAllAchievements: () => Promise<Achievement[] | null>;
  getUserSession: () => UserSession | null; 
}

const SOPContext = createContext<SOPContextProps | undefined>(undefined);

interface SOPContextProviderProps {
  children: ReactNode;
}

const SOPContextProvider: React.FC<SOPContextProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [AllAchievements, setAllAchievements] = useState<Achievement[]>([]);
  
  const getUserAllPodkategorias = async () => {
    const userSession = getUserSession();
    
    
  }

  const getUserAllAchievements = async () => {
    const userSession = getUserSession();

    if (userSession && userSession.token) {
      try {
        const response = await fetch('http://localhost:8080/osiagniecia', {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${userSession.token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          return data;
        } else {
          alert(`Error fetching achievements: ${data.message}`);
          return null;
        }
      } catch (error) {
        alert(`Error fetching achievements: ${error}`);
        return null;
      }
    }

    return null;
  };

  const login = async (login: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoggedIn(true);

        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 15 * 60 * 1000); // 15 minut
        const newData = data;
        newData.tokenExpiration = expirationTime.getMinutes();
        document.cookie = `userSession=${JSON.stringify(newData)}; expires=${expirationTime.toUTCString()}; path=/`;

        const achievements = await getUserAllAchievements();
        if (achievements) {
          setAllAchievements(achievements);
        }
      } else {
        alert(`Error during login: ${data.message}`);
      }
    } catch (error) {
      alert(`Error during login: ${error}`);
    }
  };

  const logout = async () => {
    setLoggedIn(false);
    document.cookie = 'userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const getUserSession = (): UserSession | null => {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)userSession\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (cookieValue) {
      return JSON.parse(cookieValue);
    }
    return null;
  };

  return (
    <SOPContext.Provider value={{ isLoggedIn, AllAchievements, login, logout, getUserSession, getUserAllAchievements }}>
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
