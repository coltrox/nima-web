import React, { useEffect, useState } from 'react';
import { Check, X, Pencil, Power, Building2, AtSign, Phone, Nfc } from 'lucide-react';
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

  const [modal, setModal] = useState(null); // 'rejeitar' | 'editar' | 'patinhas' | null
  const [alvo, setAlvo] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [edit, setEdit] = useState(editVazio);
  const [salvando, setSalvando] = useState(false);

  // Geração de Patinhas em lote
  const [tagsOng, setTagsOng] = useState([]);
  const [qtd, setQtd] = useState(10);
  const [prefixo, setPrefixo] = useState('NIMA-');
  const [resultado, setResultado] = useState(null);

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
    // Suspender uma ONG derruba a equipe dela junto; reativar traz de volta só
    // quem caiu nessa cascata (quem a própria ONG suspendeu continua suspenso).
    const aviso = o.ativo
      ? `Suspender a ONG "${o.nome}"? A equipe dela perde o acesso junto.`
      : `Reativar a ONG "${o.nome}"? Voltam só os membros que caíram junto com ela.`;
    if (!window.confirm(aviso)) return;
    try {
      setErro('');
      await devService.setUsuarioAtivo(o.id, !o.ativo);
      await carregar();
    } catch (e) { setErro(typeof e === 'string' ? e : 'Erro ao atualizar conta.'); }
  };

  const abrirPatinhas = async (o) => {
    setAlvo(o); setQtd(10); setPrefixo('NIMA-'); setResultado(null); setTagsOng([]); setModal('patinhas');
    try { setTagsOng(await devService.listarTags(o.id)); } catch { /* ignore */ }
  };

  const gerar = async () => {
    const n = parseInt(qtd, 10);
    if (!Number.isInteger(n) || n < 1) { setErro('Quantidade inválida.'); return; }
    try {
      setSalvando(true); setErro('');
      const r = await devService.criarTags(alvo.id, n, prefixo);
      setResultado(r);
      setTagsOng(await devService.listarTags(alvo.id));
    } catch (e) { setErro(typeof e === 'string' ? e : 'Erro ao gerar Patinhas.'); }
    finally { setSalvando(false); }
  };

  const fechar = () => { setModal(null); setAlvo(null); setMotivo(''); setEdit(editVazio); setResultado(null); setTagsOng([]); };

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
                        {/* Rejeitar é decisão de HOMOLOGAÇÃO: só faz sentido enquanto está pendente.
                            ONG já aprovada se resolve com Suspender (o Power ali embaixo). */}
                        {o.homologacao_status === 'pendente' && (
                          <S.Btn $sm $variant="danger" onClick={() => abrirRejeitar(o)} title="Rejeitar"><X size={14} /></S.Btn>
                        )}
                        <S.Btn $sm $variant="ghost" onClick={() => abrirEditar(o)} title="Editar contato"><Pencil size={14} /></S.Btn>
                        <S.Btn $sm $variant="subtle" onClick={() => abrirPatinhas(o)} title="Gerar Patinhas"><Nfc size={14} /></S.Btn>
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

      {/* MODAL gerar Patinhas */}
      {modal === 'patinhas' && alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Patinhas — {alvo.nome}</h3>
            <p className="modal-sub">
              Gera um lote de Patinhas pra esta ONG. Ela recebe já com o código e só relaciona aos pets.
              {' '}Hoje: <strong>{tagsOng.length}</strong> no total · <strong>{tagsOng.filter((t) => !t.animal_id).length}</strong> livres.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <S.Field>Quantidade
                <S.Input type="number" min="1" max="200" value={qtd} onChange={(e) => setQtd(e.target.value)} />
              </S.Field>
              <S.Field>Prefixo
                <S.Input value={prefixo} onChange={(e) => setPrefixo(e.target.value)} placeholder="NIMA-" />
              </S.Field>
            </div>

            {resultado && (
              <div style={{ background: 'rgba(31,157,107,0.1)', border: '1px solid rgba(31,157,107,0.3)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                <strong style={{ color: 'var(--moss)' }}>{resultado.criadas} Patinha(s) gerada(s):</strong>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12.5, marginTop: 6, color: 'var(--ink)', display: 'flex', flexWrap: 'wrap', gap: '4px 10px' }}>
                  {(resultado.tags || []).map((t) => <span key={t.id}>{t.codigo}</span>)}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Fechar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando} onClick={gerar}>{salvando ? 'Gerando…' : 'Gerar Patinhas'}</S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}

    </>
  );
}
