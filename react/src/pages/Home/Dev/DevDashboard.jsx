import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Terminal, Users, ShieldAlert, Building2, LogOut } from 'lucide-react';
import HomologarOngs from '../HomologarONG/homologarONG';

const DevDashboard = () => {
  const navigate = useNavigate();

  // 1. Estado dos Usuários
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Desenvolvedor Master Nima', email: 'dev@nima.org', cpf: '00000000001', cargo: 'desenvolvedor', status: 'Ativo' },
    { id: 2, nome: 'ONG Patinhas Felizes', email: 'contato@patinhasfelizes.org', cpf: '00000000002', cargo: 'ong', status: 'Ativo' },
    { id: 3, nome: 'Pedro Coltro', email: 'pedro@tutor.com', cpf: '12345678910', cargo: 'usuario', status: 'Ativo' },
    { id: 4, nome: 'ONG Proteção Animal', email: 'admin@protecao.org', cpf: '00000000003', cargo: 'ong', status: 'Pendente' },
  ]);

  // 2. Funções de Ação
  const handleLogout = () => {
    sessionStorage.removeItem('@nima_token');
    sessionStorage.removeItem('@nima_user_role');
    navigate('/login');
  };

  const alterarCargo = (id, novoCargo) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, cargo: novoCargo } : user
    ));
    console.log(`[GOVERNANÇA] Cargo do usuário ID ${id} alterado para: ${novoCargo}`);
  };

  const alternarStatus = (id) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, status: user.status === 'Ativo' ? 'Suspenso' : 'Ativo' } : user
    ));
  };

  // 3. Sub-componente interno para renderizar a tabela original (Controle de Perfis)
  const ControlePerfisConteudo = () => {
    return (
      <>
        <header style={{ marginBottom: '35px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#05082B', margin: '0 0 4px 0' }}>Gerenciamento do Sistema</h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>Controle completo sobre credenciais, níveis de acesso corporativos e alteração de privilégios.</p>
        </header>

        {/* Quadro Geral de Métricas */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '35px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Total de Usuários</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>{usuarios.length} Contas</h3>
            <span style={{ fontSize: '12px', color: '#1D5CFF', fontWeight: '600' }}>Registrados na Base</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>ONGs Ativas</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>
              {usuarios.filter(u => u.cargo === 'ong').length} Instituições
            </h3>
            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>Operando Módulos</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Corpo Técnico (Devs)</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>
              {usuarios.filter(u => u.cargo === 'desenvolvedor').length} Administradores
            </h3>
            <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: '600' }}>Acesso Total Corporativo</span>
          </div>
        </section>

        {/* Tabela Clara de Gerenciamento de Usuários */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#05082B', margin: '0 0 20px 0' }}>Lista de Contas Registradas</h3>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F1F5F9', color: '#6B7280', fontSize: '14px' }}>
                <th style={{ padding: '12px' }}>Nome / Email</th>
                <th style={{ padding: '12px' }}>Documento</th>
                <th style={{ padding: '12px' }}>Cargo Atual</th>
                <th style={{ padding: '12px' }}>Mudar Nível</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px', color: '#1F2937' }}>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ fontWeight: '600', color: '#05082B' }}>{user.nome}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '16px 12px', fontFamily: 'monospace', color: '#4B5563' }}>{user.cpf}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      backgroundColor: user.cargo === 'desenvolvedor' ? '#FEE2E2' : user.cargo === 'ong' ? '#D1FAE5' : '#DBEAFE',
                      color: user.cargo === 'desenvolvedor' ? '#991B1B' : user.cargo === 'ong' ? '#065F46' : '#1E40AF'
                    }}>
                      {user.cargo}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <select
                      value={user.cargo}
                      onChange={(e) => alterarCargo(user.id, e.target.value)}
                      style={{ backgroundColor: '#F8FAFC', color: '#1F2937', border: '1px solid #E2E8F0', padding: '6px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
                    >
                      <option value="usuario">Usuário Comum</option>
                      <option value="ong">ONG Parceira</option>
                      <option value="desenvolvedor">Desenvolvedor</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ color: user.status === 'Ativo' ? '#10B981' : '#EF4444', fontWeight: '600' }}>
                      ● {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <button 
                      onClick={() => !user.email.startsWith('dev') && alternarStatus(user.id)}
                      disabled={user.email.startsWith('dev')}
                      style={{ 
                        backgroundColor: user.email.startsWith('dev') ? '#E2E8F0' : (user.status === 'Ativo' ? '#FEE2E2' : '#D1FAE5'), 
                        color: user.email.startsWith('dev') ? '#94A3B8' : (user.status === 'Ativo' ? '#991B1B' : '#065F46'), 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '6px', 
                        cursor: user.email.startsWith('dev') ? 'not-allowed' : 'pointer', 
                        fontSize: '12px', 
                        fontWeight: '600' 
                      }}
                    >
                      {user.status === 'Ativo' ? 'Suspender' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  // 4. Renderização Estrutural do Dashboard Principal
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#F8FAFC', color: '#1F2937' }}>
      
      {/* Sidebar de Governança Estilo Clara */}
      <aside style={{ width: '260px', backgroundColor: '#FFFFFF', padding: '24px', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '35px' }}>
            <Terminal size={24} style={{ color: '#1D5CFF' }} />
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#05082B', letterSpacing: '0.5px' }}>nima<span style={{ color: '#1D5CFF' }}>.dev</span></h2>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              onClick={() => navigate('/dev-dashboard')} 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: '#F1F5F9', color: '#1D5CFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}
            >
              <Users size={18} /> Controle de Perfis
            </button>
            <button 
              onClick={() => navigate('/dev-dashboard/homologar')} 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: 'transparent', color: '#4B5563', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}
            >
              <Building2 size={18} /> Homologar ONGs
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: 'transparent', color: '#4B5563', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}>
              <ShieldAlert size={18} /> Auditoria Geral
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: 'transparent', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}
        >
          <LogOut size={18} /> Sair do Sistema
        </button>
      </aside>

      {/* Área de Gerenciamento Central Dinâmica */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Routes>
          {/* Rota raiz do painel /dev-dashboard */}
          <Route path="/" element={<ControlePerfisConteudo />} />
          
          {/* Sub-rota interna para /dev-dashboard/homologar */}
          <Route path="/homologar" element={<HomologarOngs />} />
        </Routes>
      </main>
    </div>
  );
};

export default DevDashboard;