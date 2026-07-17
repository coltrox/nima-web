import React, { useEffect, useState } from 'react';
import { Power, Search, Users as UsersIcon } from 'lucide-react';
import devService from '../../../services/devService';
import { useAuth } from '../../../contexts/AuthContext';
import * as S from '../../Panel/panelStyles';

const CARGO_TONE = { desenvolvedor: 'red', ong: 'navy', usuario: 'blue' };
const CARGO_LABEL = { desenvolvedor: 'dev', ong: 'ONG', usuario: 'tutor' };

export default function Usuarios() {
  const { user } = useAuth();
  const [lista, setLista] = useState([]);
  const [cargo, setCargo] = useState('');
  const [ativo, setAtivo] = useState('');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = async (params) => {
    try {
      setCarregando(true);
      setErro('');
      const q = {};
      if (params.cargo) q.cargo = params.cargo;
      if (params.ativo) q.ativo = params.ativo;
      if (params.busca) q.busca = params.busca;
      setLista(await devService.listarUsuarios(q));
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao listar usuários.');
    } finally {
      setCarregando(false);
    }
  };

  // Recarrega quando cargo/ativo mudam ou após 300ms sem digitar na busca.
  useEffect(() => {
    const t = setTimeout(() => carregar({ cargo, ativo, busca }), 300);
    return () => clearTimeout(t);
  }, [cargo, ativo, busca]);

  const toggle = async (u) => {
    const acao = u.ativo ? 'suspender' : 'reativar';
    if (!window.confirm(`Deseja ${acao} a conta de "${u.nome}"?`)) return;
    try {
      setErro('');
      await devService.setUsuarioAtivo(u.id, !u.ativo);
      await carregar({ cargo, ativo, busca });
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao atualizar conta.');
    }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Usuários</h1>
          <p>Todas as contas do sistema. Suspenda ou reative o acesso quando necessário.</p>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Toolbar>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
          <S.Input style={{ paddingLeft: 34 }} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou e-mail" />
        </div>
        <S.Select style={{ width: 'auto' }} value={cargo} onChange={(e) => setCargo(e.target.value)}>
          <option value="">Todos os cargos</option>
          <option value="usuario">Tutores</option>
          <option value="ong">ONGs</option>
          <option value="desenvolvedor">Desenvolvedores</option>
        </S.Select>
        <S.Select style={{ width: 'auto' }} value={ativo} onChange={(e) => setAtivo(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="true">Ativos</option>
          <option value="false">Suspensos</option>
        </S.Select>
      </S.Toolbar>

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : lista.length === 0 ? (
          <S.Empty style={{ border: 'none' }}><UsersIcon size={30} style={{ opacity: 0.4 }} /><br />Nenhum usuário encontrado.</S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr>
                  <th>Usuário</th><th>Documento</th><th>Cargo</th><th>Conta</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((u) => {
                  const ehVoce = user?.id === u.id;
                  return (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{u.nome} {ehVoce && <span style={{ fontWeight: 500, color: 'var(--ink-soft)' }}>(você)</span>}</div>
                        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{u.email}</div>
                      </td>
                      <td style={{ fontFamily: 'monospace', fontSize: 12.5, color: 'var(--ink-soft)' }}>{u.cnpj || u.cpf || '—'}</td>
                      <td><S.Badge $tone={CARGO_TONE[u.cargo] || 'gray'}>{CARGO_LABEL[u.cargo] || u.cargo}</S.Badge></td>
                      <td><S.Badge $tone={u.ativo === false ? 'red' : 'green'}>{u.ativo === false ? 'Suspenso' : 'Ativo'}</S.Badge></td>
                      <td style={{ textAlign: 'right' }}>
                        <S.Btn
                          $sm
                          $variant={u.ativo === false ? 'primary' : 'ghost'}
                          disabled={ehVoce}
                          onClick={() => toggle(u)}
                          title={ehVoce ? 'Você não pode suspender a própria conta' : (u.ativo === false ? 'Reativar' : 'Suspender')}
                        >
                          <Power size={14} /> {u.ativo === false ? 'Reativar' : 'Suspender'}
                        </S.Btn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>
    </>
  );
}
