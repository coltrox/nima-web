import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [compatibilityScore, setCompatibilityScore] = useState(0);

  // Carrega o score salvo anteriormente, se existir
  useEffect(() => {
    const savedScore = localStorage.getItem('@PetLar:score');
    if (savedScore) {
      setCompatibilityScore(Number(savedScore));
    }
  }, []);

  const saveQuizAnswers = (answers) => {
    console.log("Processando respostas no Navegador:", answers);
    setUserAnswers(answers);
    
    // Simulação de lógica de IA (SSD)
    const simulatedScore = Math.floor(Math.random() * 40) + 60; 
    
    setCompatibilityScore(simulatedScore);
    localStorage.setItem('@PetLar:score', simulatedScore.toString());
    
    return simulatedScore;
  };
  
  const clearUserData = () => {
      setUserAnswers({});
      setCompatibilityScore(0);
      localStorage.removeItem('@PetLar:score');
  }

  return (
    <UserContext.Provider value={{
      userAnswers,
      compatibilityScore,
      saveQuizAnswers,
      clearUserData,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);