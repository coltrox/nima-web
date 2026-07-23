import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { PawPrint, ClipboardList, PiggyBank, Users, Nfc, UserCog, History, Inbox } from 'lucide-react';
import PanelLayout from '../../Panel/PanelLayout';
import { useAuth } from '../../../contexts/AuthContext';
import Animais from './Animais';
import Candidaturas from './Candidaturas';
import Vaquinhas from './Vaquinhas';
import Vagas from './Vagas';
import Patinhas from './Patinhas';
import PedidosPatinha from './PedidosPatinha';
import Equipe from './Equipe';
import Atividades from './Atividades';

// `perm` = chave exigida para o item aparecer; `dono` = exclusivo da conta principal.
// Animais não tem `perm`: é a home do painel e a leitura é liberada a todo membro.
const NAV = [
  { to: '/ong/painel', label: 'Animais', icon: <PawPrint size={18} />, end: true },
  { to: '/ong/painel/candidaturas', label: 'Candidaturas', icon: <ClipboardList size={18} />, perm: 'candidaturas' },
  { to: '/ong/painel/patinhas', label: 'Patinhas', icon: <Nfc size={18} />, perm: 'patinhas' },
  // Mesma permissão do estoque de Patinhas: quem pode vincular tag pode despachar pedido.
  { to: '/ong/painel/pedidos-patinha', label: 'Pedidos de Patinha', icon: <Inbox size={18} />, perm: 'patinhas' },
  { to: '/ong/painel/vaquinhas', label: 'Vaquinhas', icon: <PiggyBank size={18} />, perm: 'vaquinhas' },
  { to: '/ong/painel/vagas', label: 'Vagas', icon: <Users size={18} />, perm: 'vagas' },
  { to: '/ong/painel/equipe', label: 'Equipe', icon: <UserCog size={18} />, dono: true },
  { to: '/ong/painel/atividades', label: 'Atividades', icon: <History size={18} />, dono: true },
];

export default function OngPainel() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  // Sessões antigas não têm `dono`; trata ausência como conta principal para não
  // esconder o painel de quem já estava logado antes desta versão.
  const ehDono = user?.dono !== false;
  const permissoes = user?.permissoes || {};

  const itens = NAV.filter((i) => {
    if (i.dono) return ehDono;
    if (i.perm) return ehDono || permissoes[i.perm] === true;
    return true;
  });

  const sair = () => {
    signOut();
    navigate('/ong/login');
  };

  return (
    <PanelLayout items={itens} onLogout={sair}>
      <Routes>
        <Route index element={<Animais />} />
        <Route path="candidaturas" element={<Candidaturas />} />
        <Route path="patinhas" element={<Patinhas />} />
        <Route path="pedidos-patinha" element={<PedidosPatinha />} />
        <Route path="vaquinhas" element={<Vaquinhas />} />
        <Route path="vagas" element={<Vagas />} />
        <Route path="equipe" element={<Equipe />} />
        <Route path="atividades" element={<Atividades />} />
        <Route path="*" element={<Navigate to="/ong/painel" replace />} />
      </Routes>
    </PanelLayout>
  );
}
