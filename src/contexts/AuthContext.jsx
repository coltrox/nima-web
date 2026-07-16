import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext({});

const TOKEN_KEY = '@nima_token';
const USER_KEY = '@nima_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recupera a sessão do sessionStorage no boot (limpa ao fechar a aba).
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const raw = sessionStorage.getItem(USER_KEY);
    if (token && raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login real contra o backend. `roleEsperada` ('ong' | 'desenvolvedor') barra
   * o acesso quando a conta é de outra role — evita logar no painel errado.
   * O backend já bloqueia ONG não-homologada (403) antes de emitir o token.
   */
  const signIn = async (email, password, roleEsperada) => {
    const data = await authService.login(email, password); // lança string em erro
    const cargo = data?.user?.cargo;

    if (roleEsperada && cargo !== roleEsperada) {
      throw 'Esta conta não tem acesso a este painel.';
    }

    sessionStorage.setItem(TOKEN_KEY, data.token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
    // Compatibilidade com telas antigas que liam @nima_user_role
    sessionStorage.setItem('@nima_user_role', cargo);
    setUser(data.user);
    return data.user;
  };

  const registerOng = async (dados) => authService.registerOng(dados);

  const signOut = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem('@nima_user_role');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.cargo ?? null,
        signed: !!user,
        loading,
        signIn,
        registerOng,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
