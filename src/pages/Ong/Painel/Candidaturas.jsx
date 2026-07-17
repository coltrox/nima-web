import React, { useEffect, useState } from 'react';
import { Check, X, Mail, Phone, Sparkles, ClipboardList, ChevronDown } from 'lucide-react';
import { solicitacaoService } from '../../../services/solicitacaoService';
import * as S from '../../Panel/panelStyles';

const STATUS_TONE = { pendente: 'amber', aprovada: 'green', recusada: 'red' };

// Converte o parecer da IA (marcações **negrito**) em nós React, sem HTML cru.
function comNegrito(txt) {
  if (!txt) return null;
  return String(txt).split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

const OCULTAR = new Set(['id', 'tutor_id', 'created_at', 'updated_at', 'relatorio_ia', 'score_ia', 'status_analise']);

function scoreTone(s) {
  if (s == null) return 'gray';
  if (s >= 70) return 'green';
  if (s >= 40) return 'amber';
  return 'red';
}

export default function Candidaturas() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [abertos, setAbertos] = useState({}); // respostas expandidas por id
  const [decidindo, setDecidindo] = useState(null);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setLista(await solicitacaoService.listarDaOng());
    } catch (e) {
      setErro(e.message || 'Erro ao carregar candidaturas.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const decidir = async (id, status) => {
    const msg = status === 'aprovada'
      ? 'Aprovar esta adoção? O animal será marcado como Adotado e as demais candidaturas dele serão recusadas.'
      : 'Recusar esta candidatura?';
    if (!window.confirm(msg)) return;
    try {
      setDecidindo(id);
      setErro('');
      await solicitacaoService.decidir(id, status);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao decidir.');
    } finally {
      setDecidindo(null);
    }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Candidaturas</h1>
          <p>Cada pedido de adoção chega com o dossiê do candidato e o parecer da IA para apoiar a sua decisão.</p>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      {carregando ? (
        <S.Spinner $center />
      ) : lista.length === 0 ? (
        <S.Empty><ClipboardList size={30} style={{ opacity: 0.4 }} /><br />Nenhuma candidatura ainda.</S.Empty>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {lista.map((s) => {
            const d = s.dossie;
            const respostas = d?.respostas ? Object.entries(d.respostas).filter(([k, v]) => !OCULTAR.has(k) && v != null && v !== '') : [];
            return (
              <S.Card key={s.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 18, color: 'var(--ink)' }}>
                      {s.candidato?.nome || 'Candidato'}
                    </div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 2 }}>
                      quer adotar <strong style={{ color: 'var(--ink)' }}>{s.animal?.nome || 'animal'}</strong>
                      {s.animal?.especie ? ` · ${s.animal.especie}` : ''}
                    </div>
                  </div>
                  <S.Badge $tone={STATUS_TONE[s.status] || 'gray'}>{s.status}</S.Badge>
                </div>

                {/* contato */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12, color: 'var(--ink-soft)', fontSize: 13.5 }}>
                  {s.candidato?.email && <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Mail size={14} /> {s.candidato.email}</span>}
                  {s.candidato?.telefone && <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Phone size={14} /> {s.candidato.telefone}</span>}
                </div>

                {s.mensagem && (
                  <p style={{ marginTop: 12, fontSize: 14, color: 'var(--ink)', background: 'var(--sand)', padding: '10px 12px', borderRadius: 10 }}>
                    “{s.mensagem}”
                  </p>
                )}

                {/* dossiê + IA */}
                <div style={{ marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Sparkles size={16} style={{ color: 'var(--blue)' }} />
                    <strong style={{ fontSize: 14 }}>Parecer da IA</strong>
                    {d && <S.Badge $tone={scoreTone(d.score_ia)}>{d.score_ia != null ? `${d.score_ia}/100` : 'sem nota'}</S.Badge>}
                    {d && <S.Badge $tone="gray">{d.status_analise || 'pendente'}</S.Badge>}
                  </div>

                  {!d ? (
                    <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>Este candidato ainda não respondeu o questionário — análise indisponível.</p>
                  ) : d.relatorio_ia ? (
                    <div style={{ fontSize: 14, color: 'var(--ink)', whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>{comNegrito(d.relatorio_ia)}</div>
                  ) : (
                    <p style={{ fontSize: 13.5, color: 'var(--ink-soft)' }}>Questionário respondido; parecer da IA ainda em processamento.</p>
                  )}

                  {respostas.length > 0 && (
                    <>
                      <button
                        onClick={() => setAbertos((o) => ({ ...o, [s.id]: !o[s.id] }))}
                        style={{ marginTop: 12, background: 'none', border: 'none', color: 'var(--blue)', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--body)' }}
                      >
                        <ChevronDown size={15} style={{ transform: abertos[s.id] ? 'rotate(180deg)' : 'none', transition: '0.15s' }} />
                        {abertos[s.id] ? 'Ocultar' : 'Ver'} respostas do questionário
                      </button>
                      {abertos[s.id] && (
                        <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>
                          {respostas.map(([k, v]) => (
                            <div key={k} style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                              <strong style={{ color: 'var(--ink)', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}:</strong> {String(v)}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* ações */}
                {s.status === 'pendente' && (
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
                    <S.Btn $variant="danger" $sm disabled={decidindo === s.id} onClick={() => decidir(s.id, 'recusada')}><X size={15} /> Recusar</S.Btn>
                    <S.Btn $variant="primary" $sm disabled={decidindo === s.id} onClick={() => decidir(s.id, 'aprovada')}><Check size={15} /> Aprovar</S.Btn>
                  </div>
                )}
              </S.Card>
            );
          })}
        </div>
      )}
    </>
  );
}
