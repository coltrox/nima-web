import React, { useEffect, useState } from 'react';
import { Check, X, Pencil, Power, Building2, AtSign, Phone } from 'lucide-react';
import devService from '../../../services/devService';
import * as S from '../../Panel/panelStyles';

const STATUS_TONE = { pendente: 'amber', aprovada: 'green', rejeitada: 'red' };
const FILTROS = [
  { v: '', label: 'Todas' },
  { v: 'pendente', label: 'Pendentes' },
  { v: 'aprovada', label: 'Aprovadas' },
  { v: 'rejeitada', label: 'Rejeitadas' },
];

const editVazio = { nome: '', email: '', telefone: '', whatsapp: '', instagram: '', endereco: '', descricao: '' };

export default function GestaoOngs() {
  const [ongs, setOngs] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [modal, setModal] = useState(null); // 'rejeitar' | 'editar' | null
  const [alvo, setAlvo] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [edit, setEdit] = useState(editVazio);
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setOngs(await devService.listarOngs(filtro || undefined));
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao carregar ONGs.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, [filtro]);

  const aprovar = async (o) => {
    if (!window.confirm(`Aprovar a ONG "${o.nome}"? Ela poderá acessar o painel.`)) return;
    try {
      setErro('');
      await devService.homologar(o.id, 'aprovar');
      await carregar();
    } catch (e) { setErro(typeof e === 'string' ? e : 'Erro ao aprovar.'); }
  };

  const abrirRejeitar = (o) => { setAlvo(o); setMotivo(o.homologacao_motivo || ''); setModal('rejeitar'); };
  const confirmarRejeitar = async () => {
    try {
      setSalvando(true);
      await devService.homologar(alvo.id, 'rejeitar', motivo);
      fechar();
      await carregar();
    } catch (e) { setErro(typeof e === 'string' ? e : 'Erro ao rejeitar.'); }
    finally { setSalvando(false); }
  };

  const abrirEditar = (o) => {
    setAlvo(o);
    setEdit({
      nome: o.nome || '', email: o.email || '', telefone: o.telefone || '',
      whatsapp: o.whatsapp || '', instagram: o.instagram || '', endereco: o.endereco || '', descricao: o.descricao || '',
    });
    setModal('editar');
  };
  const salvarEdicao = async (e) => {
    e.preventDefault();
    try {
      setSalvando(true);
      await devService.atualizarOng(alvo.id, edit);
      fechar();
      await carregar();
    } catch (e) { setErro(typeof e === 'string' ? e : 'Erro ao salvar.'); }
    finally { setSalvando(false); }
  };

  const toggleAtiva = async (o) => {
    const acao = o.ativo ? 'suspender' : 'reativar';
    if (!window.confirm(`Deseja ${acao} a conta de "${o.nome}"?`)) return;
    try {
      setErro('');
      await devService.setUsuarioAtivo(o.id, !o.ativo);
      await carregar();
    } catch (e) { setErro(typeof e === 'string' ? e : 'Erro ao atualizar conta.'); }
  };

  const fechar = () => { setModal(null); setAlvo(null); setMotivo(''); setEdit(editVazio); };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>ONGs</h1>
          <p>Homologue, edite os dados de contato e gerencie o acesso das instituições.</p>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Toolbar>
        {FILTROS.map((f) => (
          <S.Btn key={f.v} $sm $variant={filtro === f.v ? 'primary' : 'ghost'} onClick={() => setFiltro(f.v)}>{f.label}</S.Btn>
        ))}
      </S.Toolbar>

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : ongs.length === 0 ? (
          <S.Empty style={{ border: 'none' }}><Building2 size={30} style={{ opacity: 0.4 }} /><br />Nenhuma ONG nesta lista.</S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr>
                  <th>ONG</th><th>Documento</th><th>Contato</th><th>Homologação</th><th>Conta</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {ongs.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{o.nome}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{o.email}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12.5, color: 'var(--ink-soft)' }}>{o.cnpj || o.cpf || '—'}</td>
                    <td style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
                      {o.telefone && <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}><Phone size={12} /> {o.telefone}</div>}
                      {o.instagram && <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}><AtSign size={12} /> {o.instagram}</div>}
                      {!o.telefone && !o.instagram && '—'}
                    </td>
                    <td>
                      <S.Badge $tone={STATUS_TONE[o.homologacao_status] || 'gray'}>{o.homologacao_status || '—'}</S.Badge>
                    </td>
                    <td><S.Badge $tone={o.ativo === false ? 'red' : 'green'}>{o.ativo === false ? 'Suspensa' : 'Ativa'}</S.Badge></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        {o.homologacao_status !== 'aprovada' && (
                          <S.Btn $sm $variant="primary" onClick={() => aprovar(o)} title="Aprovar"><Check size={14} /></S.Btn>
                        )}
                        {o.homologacao_status !== 'rejeitada' && (
                          <S.Btn $sm $variant="danger" onClick={() => abrirRejeitar(o)} title="Rejeitar"><X size={14} /></S.Btn>
                        )}
                        <S.Btn $sm $variant="ghost" onClick={() => abrirEditar(o)} title="Editar contato"><Pencil size={14} /></S.Btn>
                        <S.Btn $sm $variant="ghost" onClick={() => toggleAtiva(o)} title={o.ativo === false ? 'Reativar' : 'Suspender'}><Power size={14} /></S.Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>

      {/* MODAL rejeitar */}
      {modal === 'rejeitar' && alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Rejeitar ONG</h3>
            <p className="modal-sub">{alvo.nome} — informe o motivo (a ONG verá ao tentar entrar).</p>
            <S.Field>Motivo
              <S.Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ex: documento não confere, dados incompletos…" />
            </S.Field>
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="danger" disabled={salvando} onClick={confirmarRejeitar}>{salvando ? 'Salvando…' : 'Rejeitar'}</S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}

      {/* MODAL editar */}
      {modal === 'editar' && alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Editar ONG</h3>
            <p className="modal-sub">{alvo.nome} — dados de contato e apresentação.</p>
            <form onSubmit={salvarEdicao}>
              <S.Field>Nome<S.Input value={edit.nome} onChange={(e) => setEdit({ ...edit, nome: e.target.value })} /></S.Field>
              <S.Field>E-mail<S.Input value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value })} /></S.Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <S.Field>Telefone<S.Input value={edit.telefone} onChange={(e) => setEdit({ ...edit, telefone: e.target.value })} /></S.Field>
                <S.Field>WhatsApp<S.Input value={edit.whatsapp} onChange={(e) => setEdit({ ...edit, whatsapp: e.target.value })} /></S.Field>
              </div>
              <S.Field>Instagram<S.Input value={edit.instagram} onChange={(e) => setEdit({ ...edit, instagram: e.target.value })} placeholder="@ong" /></S.Field>
              <S.Field>Endereço<S.Input value={edit.endereco} onChange={(e) => setEdit({ ...edit, endereco: e.target.value })} /></S.Field>
              <S.Field>Descrição<S.Textarea value={edit.descricao} onChange={(e) => setEdit({ ...edit, descricao: e.target.value })} /></S.Field>
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Salvar'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
