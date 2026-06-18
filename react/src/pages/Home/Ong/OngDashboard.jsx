import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ClipboardList, FileCheck, LogOut, Plus, Trash2 } from 'lucide-react';

const OngDashboard = () => {
  const navigate = useNavigate();

  // Estados locais simulados e dinâmicos para a demonstração da ONG
  const [animais, setAnimais] = useState([
    { id: 1, nome: 'Apollo', especie: 'Cachorro', idade: '2 anos', status: 'Disponível' },
    { id: 2, nome: 'Luna', especie: 'Gato', idade: '5 meses', status: 'Em Triagem' },
    { id: 3, nome: 'Thor', especie: 'Cachorro', idade: '1 ano', status: 'Disponível' }
  ]);

  const [triagens] = useState([
    { id: 1, tutor: 'Pedro Coltro', pet: 'Apollo', compatibilidade: '94%' },
    { id: 2, tutor: 'Lucas D\'Ávila', pet: 'Luna', compatibilidade: '45%' }
  ]);

  const [novoNome, setNovoNome] = useState('');
  const [novaEspecie, setNovaEspecie] = useState('Cachorro');
  const [novaIdade, setNovaIdade] = useState('');

  const handleLogout = () => {
    sessionStorage.removeItem('@nima_token');
    sessionStorage.removeItem('@nima_user_role');
    navigate('/login');
  };

  const cadastrarPet = (e) => {
    e.preventDefault();
    if (!novoNome || !novaIdade) return;

    const pet = {
      id: Date.now(),
      nome: novoNome,
      especie: novaEspecie,
      idade: novaIdade,
      status: 'Disponível'
    };

    setAnimais([...animais, pet]);
    setNovoNome('');
    setNovaIdade('');
  };

  const removerPet = (id) => {
    setAnimais(animais.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#F8FAFC', color: '#1F2937' }}>
      
      {/* Sidebar Administrativa */}
      <aside style={{ width: '260px', backgroundColor: '#FFFFFF', padding: '24px', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '35px' }}>
            <Heart size={24} style={{ color: '#1D5CFF', fill: '#1D5CFF' }} />
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#05082B', letterSpacing: '0.5px' }}>nima<span style={{ color: '#1D5CFF' }}>.ong</span></h2>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: '#F1F5F9', color: '#1D5CFF', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}>
              <Heart size={18} /> Nossos Animais
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: 'transparent', color: '#4B5563', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}>
              <ClipboardList size={18} /> Triagem de Tutores
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: 'transparent', color: '#4B5563', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', textAlign: 'left' }}>
              <FileCheck size={18} /> Solicitações
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', background: 'transparent', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}
        >
          <LogOut size={18} /> Sair do Painel
        </button>
      </aside>

      {/* Área Operacional da ONG */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '35px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#05082B', margin: '0 0 4px 0' }}>Painel da Instituição</h1>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>Gerencie animais sob sua tutela, verifique compatibilidade e controle cadastros locais.</p>
        </header>

        {/* Quadro Geral de Métricas Operacionais */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '35px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Animais Sob Custódia</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>{animais.length} Animais</h3>
            <span style={{ fontSize: '12px', color: '#1D5CFF', fontWeight: '600' }}>Disponíveis para Match</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Triagens Pendentes</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>{triagens.length} Respondidas</h3>
            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>Análise semântica pendente</span>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>Taxa de Match Recente</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#05082B', margin: '8px 0 6px 0' }}>88% Eficiência</h3>
            <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: '600' }}>Adoções assertivas concluídas</span>
          </div>
        </section>

        {/* Formulário e Tabela de Pets */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          
          {/* Cadastro Rápido de Pets */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#05082B', margin: '0 0 20px 0' }}>Cadastrar Novo Pet</h3>
            <form onSubmit={cadastrarPet} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>Nome do Pet</label>
                <input 
                  type="text" 
                  value={novoNome} 
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Ex: Pipoca"
                  style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#F8FAFC', color: '#1F2937', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>Espécie</label>
                <select 
                  value={novaEspecie} 
                  onChange={(e) => setNovaEspecie(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#F8FAFC', color: '#1F2937', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>Idade Estimada</label>
                <input 
                  type="text" 
                  value={novaIdade} 
                  onChange={(e) => setNovaIdade(e.target.value)}
                  placeholder="Ex: 1 ano"
                  style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#F8FAFC', color: '#1F2937', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '6px' }}
                />
              </div>

              <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '12px', backgroundColor: '#1D5CFF', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
                <Plus size={16} /> Adicionar Pet
              </button>
            </form>
          </div>

          {/* Listagem Geral de Animais Vinculados */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#05082B', margin: '0 0 20px 0' }}>Animais em Custódia Local</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F1F5F9', color: '#6B7280', fontSize: '14px' }}>
                  <th style={{ padding: '12px' }}>Nome</th>
                  <th style={{ padding: '12px' }}>Espécie</th>
                  <th style={{ padding: '12px' }}>Idade</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {animais.map((pet) => (
                  <tr key={pet.id} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '14px', color: '#1F2937' }}>
                    <td style={{ padding: '16px 12px', fontWeight: '600', color: '#05082B' }}>{pet.nome}</td>
                    <td style={{ padding: '16px 12px', color: '#6B7280' }}>{pet.especie}</td>
                    <td style={{ padding: '16px 12px' }}>{pet.idade}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ color: pet.status === 'Disponível' ? '#10B981' : '#F59E0B', fontWeight: '600' }}>
                        ● {pet.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                      <button 
                        onClick={() => removerPet(pet.id)}
                        style={{ backgroundColor: 'transparent', color: '#EF4444', border: 'none', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
};

export default OngDashboard;