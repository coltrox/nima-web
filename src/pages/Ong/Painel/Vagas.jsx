import React, { useEffect, useState } from 'react';
import { Plus, Users, Mail, Phone, Trash2, Check, X, RotateCcw } from 'lucide-react';
import { voluntariadoService } from '../../../services/voluntariadoService';
import * as S from '../../Panel/panelStyles';

const vazio = { titulo: '', descricao: '', total_vagas: '' };

const STATUS = {
  aceito: { rotulo: 'Aceito', tone: 'green' },
  recusado: { rotulo: 'Recusado', tone: 'red' },
  pendente: { rotulo: 'Pendente', tone: 'amber' },
};

// Barra de preenchimento — só faz sentido quando a vaga tem limite.
function Preenchimento({ preenchidas, total }) {
  if (total == null) {
    return <S.Badge $tone={preenchidas ? 'green' : 'gray'}>{preenchidas} aceito{preenchidas === 1 ? '' : 's'} · sem limite</S.Badge>;
  }
  const pct = Math.min(100, Math.round((preenchidas / total) * 100));
  const cheia = preenchidas >= total;
  return (
    <div style={{ minWidth: 150 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4 }}>
        <strong style={{ color: cheia ? 'var(--moss)' : 'var(--ink)' }}>{preenchidas}/{total}</strong>
        <span style={{ color: 'var(--ink-soft)' }}>{cheia ? 'completa' : 'preenchidas'}</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: 'var(--line)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99, background: cheia ? 'var(--moss)' : 'var(--blue)', transition: 'width .25s' }} />
      </div>
    </div>
  );
}

export default function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(vazio);
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      const [vs, ins] = await Promise.all([
        voluntariadoService.listarMinhas(),
        voluntariadoService.listarInscricoes(),
      ]);
      setVagas(vs);
      setInscricoes(ins);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar vagas.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const fechar = () => { setModal(false); setForm(vazio); };
  const inscritosDe = (vagaId) => inscricoes.filter((i) => i.vaga_id === vagaId);

  const criar = async (e) => {
    e.preventDefault();
    if (!form.titulo) { setErro('Informe o título da vaga.'); return; }
    try {
      setSalvando(true);
      setErro('');
      await voluntariadoService.criar(form);
      fechar();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao criar vaga.');
    } finally {
      setSalvando(false);
    }
  };

  const excluir = async (v) => {
    const n = inscritosDe(v.id).length;
    const aviso = n
      ? `Excluir a vaga "${v.titulo}"? As ${n} inscriç${n === 1 ? 'ão' : 'ões'} dela vão junto.`
      : `Excluir a vaga "${v.titulo}"?`;
    if (!window.confirm(aviso)) return;
    try {
      setErro('');
      await voluntariadoService.remover(v.id);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao excluir a vaga.');
    }
  };

  const decidir = async (inscricao, status) => {
    try {
      setErro('');
      await voluntariadoService.decidir(inscricao.id, status);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao atualizar o candidato.');
    }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Vagas de voluntariado</h1>
          <p>Abra vagas, defina quantas pessoas precisa e aceite os candidatos — a vaga vai preenchendo sozinha.</p>
        </div>
        <S.Btn $variant="primary" onClick={() => setModal(true)}><Plus size={17} /> Nova vaga</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      {carregando ? (
        <S.Spinner $center />
      ) : vagas.length === 0 ? (
        <S.Empty><Users size={30} style={{ opacity: 0.4 }} /><br />Nenhuma vaga aberta ainda.</S.Empty>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {vagas.map((v) => {
            const inscritos = inscritosDe(v.id);
            const pendentes = inscritos.filter((i) => i.status === 'pendente');
            return (
              <S.Card key={v.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 260px' }}>
                    <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>{v.titulo}</div>
                    {v.descricao && <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 6 }}>{v.descricao}</p>}
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 8 }}>
                      {inscritos.length} inscrito{inscritos.length === 1 ? '' : 's'}
                      {pendentes.length > 0 && ` · ${pendentes.length} aguardando resposta`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Preenchimento preenchidas={v.preenchidas ?? 0} total={v.total_vagas} />
                    <S.Btn $sm $variant="ghost" onClick={() => excluir(v)} title="Excluir vaga"><Trash2 size={14} /></S.Btn>
                  </div>
                </div>

                {inscritos.length > 0 && (
                  <div style={{ marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 12, display: 'grid', gap: 12 }}>
                    {inscritos.map((i) => {
                      const st = STATUS[i.status] || STATUS.pendente;
                      return (
                        <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                          <div style={{ fontSize: 13.5, flex: '1 1 220px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <strong style={{ color: 'var(--ink)' }}>{i.candidato?.nome || 'Voluntário'}</strong>
                              <S.Badge $tone={st.tone}>{st.rotulo}</S.Badge>
                            </div>
                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--ink-soft)', marginTop: 2 }}>
                              {i.candidato?.email && <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Mail size={13} /> {i.candidato.email}</span>}
                              {i.candidato?.telefone && <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Phone size={13} /> {i.candidato.telefone}</span>}
                            </div>
                            {i.mensagem && <div style={{ color: 'var(--ink-soft)', marginTop: 2 }}>“{i.mensagem}”</div>}
                          </div>
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            {i.status !== 'aceito' && (
                              <S.Btn $sm $variant="primary" onClick={() => decidir(i, 'aceito')} title="Aceitar"><Check size={14} /> Aceitar</S.Btn>
                            )}
                            {i.status !== 'recusado' && (
                              <S.Btn $sm $variant="ghost" onClick={() => decidir(i, 'recusado')} title="Recusar"><X size={14} /></S.Btn>
                            )}
                            {i.status !== 'pendente' && (
                              <S.Btn $sm $variant="subtle" onClick={() => decidir(i, 'pendente')} title="Voltar para pendente"><RotateCcw size={14} /></S.Btn>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </S.Card>
            );
          })}
        </div>
      )}

      {modal && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Nova vaga</h3>
            <p className="modal-sub">Descreva a oportunidade de voluntariado.</p>
            <form onSubmit={criar}>
              <S.Field>Título
                <S.Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Voluntário para feiras de adoção" />
              </S.Field>
              <S.Field>Descrição
                <S.Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="O que a pessoa vai fazer, dias, local…" />
              </S.Field>
              <S.Field>Quantas pessoas você precisa?
                <S.Input
                  type="number"
                  min="1"
                  value={form.total_vagas}
                  onChange={(e) => setForm({ ...form, total_vagas: e.target.value })}
                  placeholder="Deixe vazio para não limitar"
                />
              </S.Field>
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Criar'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
