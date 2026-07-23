import React, { useEffect, useState } from 'react';
import { Plus, Power, Users, Crown, KeyRound } from 'lucide-react';
import { equipeService } from '../../../services/equipeService';
import { useAuth } from '../../../contexts/AuthContext';
import * as S from '../../Panel/panelStyles';

const vazio = { nome: '', email: '', senha: '', telefone: '', permissoes: {} };

// Espelha CHAVES_PERMISSAO do backend (src/servicos/permissoes.js).
const PERMISSOES = [
  { chave: 'animais', rotulo: 'Gerenciar pets', ajuda: 'Cadastrar, editar, excluir, fotos e vacinas' },
  { chave: 'candidaturas', rotulo: 'Decidir adoções', ajuda: 'Aprovar ou recusar candidaturas' },
  { chave: 'patinhas', rotulo: 'Gerenciar Patinhas', ajuda: 'Vincular a pets, reservar para tutores e despachar pedidos' },
  { chave: 'vaquinhas', rotulo: 'Gerenciar vaquinhas', ajuda: 'Criar e editar campanhas de doação' },
  { chave: 'vagas', rotulo: 'Publicar vagas', ajuda: 'Abrir vagas de voluntariado' },
  { chave: 'eventos', rotulo: 'Gerenciar eventos', ajuda: 'Criar feiras e mutirões e marcar presença — a presença libera Patinha' },
];

function Checks({ valor, onChange }) {
  return PERMISSOES.map((p) => (
    <label key={p.chave} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 0', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={!!valor[p.chave]}
        onChange={(e) => onChange({ ...valor, [p.chave]: e.target.checked })}
        style={{ marginTop: 3 }}
      />
      <span>
        <span style={{ fontWeight: 600, color: 'var(--ink)', fontSize: 13.5 }}>{p.rotulo}</span>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-soft)' }}>{p.ajuda}</span>
      </span>
    </label>
  ));
}

export default function Equipe() {
  const { user } = useAuth();
  const [equipe, setEquipe] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(vazio);
  const [salvando, setSalvando] = useState(false);
  const [permModal, setPermModal] = useState(null); // membro em edição
  const [permForm, setPermForm] = useState({});

  const abrirPermissoes = (m) => { setPermModal(m); setPermForm(m.permissoes || {}); };
  const fecharPermissoes = () => { setPermModal(null); setPermForm({}); };

  const salvarPermissoes = async () => {
    try {
      setSalvando(true);
      setErro('');
      await equipeService.setPermissoes(permModal.id, permForm);
      fecharPermissoes();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao salvar permissões.');
    } finally {
      setSalvando(false);
    }
  };

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setEquipe(await equipeService.listar());
    } catch (e) {
      setErro(e.message || 'Erro ao carregar a equipe.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const fechar = () => { setModal(false); setForm(vazio); };

  const criar = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || form.senha.length < 6) {
      setErro('Preencha nome, e-mail e uma senha de ao menos 6 caracteres.');
      return;
    }
    try {
      setSalvando(true);
      setErro('');
      await equipeService.criar(form);
      fechar();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao adicionar membro.');
    } finally {
      setSalvando(false);
    }
  };

  const toggle = async (m) => {
    const acao = m.ativo ? 'suspender' : 'reativar';
    if (!window.confirm(`Deseja ${acao} o acesso de "${m.nome}"?`)) return;
    try {
      setErro('');
      await equipeService.setAtivo(m.id, !m.ativo);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao atualizar o membro.');
    }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Equipe</h1>
          <p>Quem da sua ONG tem acesso a este painel. Todo mundo aqui enxerga os mesmos pets, Patinhas e vaquinhas.</p>
        </div>
        <S.Btn $variant="primary" onClick={() => setModal(true)}><Plus size={17} /> Adicionar membro</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : equipe.length === 0 ? (
          <S.Empty style={{ border: 'none' }}><Users size={30} style={{ opacity: 0.4 }} /><br />Nenhum membro ainda.</S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr><th>Pessoa</th><th>Papel</th><th>Pode fazer</th><th>Conta</th><th style={{ textAlign: 'right' }}>Ações</th></tr>
              </thead>
              <tbody>
                {equipe.map((m) => {
                  const ehVoce = user?.id === m.id;
                  return (
                    <tr key={m.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--ink)' }}>
                          {m.nome} {ehVoce && <span style={{ fontWeight: 500, color: 'var(--ink-soft)' }}>(você)</span>}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{m.email}</div>
                      </td>
                      <td>
                        {m.dono
                          ? <S.Badge $tone="navy"><Crown size={12} /> Conta principal</S.Badge>
                          : <S.Badge $tone="gray">Membro</S.Badge>}
                      </td>
                      <td>
                        {m.dono ? (
                          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Acesso total</span>
                        ) : Object.keys(m.permissoes || {}).length === 0 ? (
                          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Somente leitura</span>
                        ) : (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {PERMISSOES.filter((p) => m.permissoes?.[p.chave]).map((p) => (
                              <S.Badge key={p.chave} $tone="gray">{p.rotulo}</S.Badge>
                            ))}
                          </div>
                        )}
                      </td>
                      <td><S.Badge $tone={m.ativo === false ? 'red' : 'green'}>{m.ativo === false ? 'Suspenso' : 'Ativo'}</S.Badge></td>
                      <td style={{ textAlign: 'right' }}>
                        {m.dono || ehVoce ? (
                          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>—</span>
                        ) : (
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <S.Btn $sm $variant="ghost" onClick={() => abrirPermissoes(m)}>
                              <KeyRound size={14} /> Permissões
                            </S.Btn>
                            <S.Btn $sm $variant={m.ativo === false ? 'primary' : 'ghost'} onClick={() => toggle(m)}>
                              <Power size={14} /> {m.ativo === false ? 'Reativar' : 'Suspender'}
                            </S.Btn>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>

      {modal && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Adicionar membro</h3>
            <p className="modal-sub">A pessoa entra em <strong>/ong/login</strong> e passa a ver os mesmos pets da sua ONG.</p>
            <form onSubmit={criar}>
              <S.Field>Nome
                <S.Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: João da Silva" />
              </S.Field>
              <S.Field>E-mail
                <S.Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="joao@suaong.org" />
              </S.Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <S.Field>Senha
                  <S.Input type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} placeholder="mín. 6 caracteres" />
                </S.Field>
                <S.Field>Telefone (opcional)
                  <S.Input value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} placeholder="(19) 90000-0000" />
                </S.Field>
              </div>
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>O que essa pessoa pode fazer</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 6 }}>
                  Sem nada marcado, ela apenas visualiza. Você pode mudar isso depois.
                </div>
                <Checks valor={form.permissoes} onChange={(p) => setForm({ ...form, permissoes: p })} />
              </div>
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Adicionando…' : 'Adicionar'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}

      {permModal && (
        <S.Overlay onClick={fecharPermissoes}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Permissões de {permModal.nome}</h3>
            <p className="modal-sub">Sem nada marcado, a pessoa apenas visualiza o painel.</p>
            <Checks valor={permForm} onChange={setPermForm} />
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fecharPermissoes}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando} onClick={salvarPermissoes}>
                {salvando ? 'Salvando…' : 'Salvar'}
              </S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
