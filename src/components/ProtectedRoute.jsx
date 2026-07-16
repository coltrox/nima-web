import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Guard de rota por role. É proteção de UX — a trava real é no backend
 * (verificarToken + verificarCargo + verificarOngAprovada).
 *
 * @param {'ong'|'desenvolvedor'} role  role exigida
 * @param {string} loginPath            para onde mandar se não autorizado
 */
export default function ProtectedRoute({ role, loginPath, children }) {
  const { signed, user, loading } = useAuth();

  if (loading) return null; // evita "piscar" o login enquanto carrega a sessão

  if (!signed) return <Navigate to={loginPath} replace />;
  if (role && user?.cargo !== role) return <Navigate to={loginPath} replace />;

  return children;
}
