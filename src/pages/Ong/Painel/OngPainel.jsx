import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { PawPrint, ClipboardList, PiggyBank, Users, Nfc } from 'lucide-react';
import PanelLayout from '../../Panel/PanelLayout';
import { useAuth } from '../../../contexts/AuthContext';
import Animais from './Animais';
import Candidaturas from './Candidaturas';
import Vaquinhas from './Vaquinhas';
import Vagas from './Vagas';
import Patinhas from './Patinhas';

const NAV = [
  { to: '/ong/painel', label: 'Animais', icon: <PawPrint size={18} />, end: true },
  { to: '/ong/painel/candidaturas', label: 'Candidaturas', icon: <ClipboardList size={18} /> },
  { to: '/ong/painel/patinhas', label: 'Patinhas', icon: <Nfc size={18} /> },
  { to: '/ong/painel/vaquinhas', label: 'Vaquinhas', icon: <PiggyBank size={18} /> },
  { to: '/ong/painel/vagas', label: 'Vagas', icon: <Users size={18} /> },
];

export default function OngPainel() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const sair = () => {
    signOut();
    navigate('/ong/login');
  };

  return (
    <PanelLayout items={NAV} onLogout={sair}>
      <Routes>
        <Route index element={<Animais />} />
        <Route path="candidaturas" element={<Candidaturas />} />
        <Route path="patinhas" element={<Patinhas />} />
        <Route path="vaquinhas" element={<Vaquinhas />} />
        <Route path="vagas" element={<Vagas />} />
        <Route path="*" element={<Navigate to="/ong/painel" replace />} />
      </Routes>
    </PanelLayout>
  );
}
