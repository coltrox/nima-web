import React, { useEffect, useState } from 'react';
import { Plus, Power, ShieldCheck } from 'lucide-react';
import devService from '../../../services/devService';
import { useAuth } from '../../../contexts/AuthContext';
import * as S from '../../Panel/panelStyles';

const vazio = { nome: '', email: '', senha: '' };

export default function Equipe() {
  const { user } = useAuth();
  const [devs, setDevs] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(vazio);
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setDevs(await devService.listarUsuarios({ cargo: 'desenvolvedor' }));
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao carregar a equipe.');
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
      await devService.criarUsuario({ ...form, cargo: 'desenvolvedor' });
      fechar();
      await carregar();
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao criar o dev.');
    } finally {
      setSalvando(false);
    }
  };

  const toggle = async (u) => {
    const acao = u.ativo ? 'suspender' : 'reativar';
    if (!window.confirm(`Deseja ${acao} o acesso de "${u.nome}"?`)) return;
    try {
      setErro('');
      await devService.setUsuarioAtivo(u.id, !u.ativo);
      await carregar();
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao atualizar.');
    }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Equipe</h1>
          <p>Quem administra o Nima. Cada pessoa aqui tem acesso total ao painel de governança.</p>
        </div>
        <S.Btn $variant="primary" onClick={() => setModal(true)}><Plus size={17} /> Adicionar dev</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : devs.length === 0 ? (
          <S.Empty style={{ border: 'none' }}><ShieldCheck size={30} style={{ opacity: 0.4 }} /><br />Nenhum dev cadastrado.</S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr><th>Pessoa</th><th>Conta</th><th style={{ textAlign: 'right' }}>Ações</th></tr>
              </thead>
              <tbody>
                {devs.map((u) => {
                  const ehVoce = user?.id === u.id;
                  return (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--ink)' }}>
                          {u.nome} {ehVoce && <span style={{ fontWeight: 500, color: 'var(--ink-soft)' }}>(você)</span>}
                        </div>
                        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{u.email}</div>
                      </td>
                      <td><S.Badge $tone={u.ativo === false ? 'red' : 'green'}>{u.ativo === false ? 'Suspenso' : 'Ativo'}</S.Badge></td>
                      <td style={{ textAlign: 'right' }}>
                        <S.Btn
                          $sm
                          $variant={u.ativo === false ? 'primary' : 'ghost'}
                          disabled={ehVoce}
                          onClick={() => toggle(u)}
                          title={ehVoce ? 'Você não pode suspender a própria conta' : ''}
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

      {modal && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Adicionar dev</h3>
            <p className="modal-sub">A pessoa entra em <strong>/dev/login</strong> com esses dados.</p>
            <form onSubmit={criar}>
              <S.Field>Nome
                <S.Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: Maria Silva" />
              </S.Field>
              <S.Field>E-mail
                <S.Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="maria@nima.org" />
              </S.Field>
              <S.Field>Senha
                <S.Input type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} placeholder="mínimo 6 caracteres" />
              </S.Field>
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Criando…' : 'Criar dev'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
