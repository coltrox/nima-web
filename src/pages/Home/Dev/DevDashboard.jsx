import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShieldCheck, Building2, Users, UserCog } from 'lucide-react';
import PanelLayout from '../../Panel/PanelLayout';
import { useAuth } from '../../../contexts/AuthContext';
import HomologarOngs from '../HomologarONG/homologarONG';
import VisaoGeral from '../../Dev/Painel/VisaoGeral';
import GestaoOngs from '../../Dev/Painel/GestaoOngs';
import Usuarios from '../../Dev/Painel/Usuarios';
import Equipe from '../../Dev/Painel/Equipe';

const NAV = [
  { to: '/dev', label: 'Visão geral', icon: <LayoutDashboard size={18} />, end: true },
  { to: '/dev/homologar', label: 'Homologação', icon: <ShieldCheck size={18} /> },
  { to: '/dev/ongs', label: 'ONGs', icon: <Building2 size={18} /> },
  { to: '/dev/usuarios', label: 'Usuários', icon: <Users size={18} /> },
  { to: '/dev/equipe', label: 'Equipe', icon: <UserCog size={18} /> },
];

export default function DevDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const sair = () => {
    signOut();
    navigate('/dev/login');
  };

  return (
    <PanelLayout items={NAV} onLogout={sair}>
      <Routes>
        <Route index element={<VisaoGeral />} />
        <Route path="homologar" element={<HomologarOngs />} />
        <Route path="ongs" element={<GestaoOngs />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="*" element={<Navigate to="/dev" replace />} />
      </Routes>
    </PanelLayout>
  );
}
