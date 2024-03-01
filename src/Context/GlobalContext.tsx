import React, { createContext, useContext } from 'react';
import { Login } from "../Interfaces/UserType";


const QuizContext = createContext<Login | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fetchLoginData = async () => {
    try {
      const response = await fetch('http://localhost:3000/quizzes');
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Błąd podczas pobierania danych z serwera:', error);
    }
  };


  return (
    <QuizContext.Provider value={{ fetchLoginData}}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz musi być używane wewnątrz dostawcy QuizProvider');
  }
  return context;
};
