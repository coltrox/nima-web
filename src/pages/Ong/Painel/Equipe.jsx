import React, { useEffect, useState } from 'react';
import { Plus, Power, Users, Crown } from 'lucide-react';
import { equipeService } from '../../../services/equipeService';
import { useAuth } from '../../../contexts/AuthContext';
import * as S from '../../Panel/panelStyles';

const vazio = { nome: '', email: '', senha: '', telefone: '' };

export default function Equipe() {
  const { user } = useAuth();
  const [equipe, setEquipe] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(vazio);
  const [salvando, setSalvando] = useState(false);

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
                <tr><th>Pessoa</th><th>Papel</th><th>Conta</th><th style={{ textAlign: 'right' }}>Ações</th></tr>
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
                      <td><S.Badge $tone={m.ativo === false ? 'red' : 'green'}>{m.ativo === false ? 'Suspenso' : 'Ativo'}</S.Badge></td>
                      <td style={{ textAlign: 'right' }}>
                        {m.dono || ehVoce ? (
                          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>—</span>
                        ) : (
                          <S.Btn $sm $variant={m.ativo === false ? 'primary' : 'ghost'} onClick={() => toggle(m)}>
                            <Power size={14} /> {m.ativo === false ? 'Reativar' : 'Suspender'}
                          </S.Btn>
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
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Adicionando…' : 'Adicionar'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
