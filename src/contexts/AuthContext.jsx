import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar o usuário do localStorage ao iniciar o app
  useEffect(() => {
    const storagedUser = localStorage.getItem('@PetLar:user');
    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    console.log('Autenticando Web:', email);

    // Simulação de chamada de API
    if (email === 'adotante@petlar.com' && password === '123456') {
      const userData = { id: '123', name: 'Usuário de Teste', email };
      
      setUser(userData);
      // Salva no navegador para não deslogar no Refresh
      localStorage.setItem('@PetLar:user', JSON.stringify(userData));
    } else {
      throw new Error('E-mail ou senha incorretos.');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@PetLar:user');
    setUser(null);
    console.log('Sessão encerrada na Web');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        signIn, 
        signOut, 
        signed: !!user, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);