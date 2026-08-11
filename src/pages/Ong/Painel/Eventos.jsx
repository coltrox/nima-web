import React, { useEffect, useState } from 'react';
import {
  Plus, CalendarDays, MapPin, Mail, Phone, Trash2, Check, X, RotateCcw, UserCheck, Undo2, PawPrint,
} from 'lucide-react';
import { eventoService } from '../../../services/eventoService';
import * as S from '../../Panel/panelStyles';

// Eventos da ONG (migração 018).
//
// O que separa esta tela de "Vagas": vaga é trabalho contínuo, evento é
// pontual e datado. E só aqui existe PRESENÇA — o passo depois do evento em
// que a ONG marca quem realmente apareceu. É essa marcação que libera uma
// Patinha para o voluntário; candidatar-se sozinho não libera nada.

const vazio = { titulo: '', descricao: '', local: '', endereco: '', data_inicio: '', vagas: '' };

const STATUS = {
  aceito: { rotulo: 'Aceito', tone: 'green' },
  recusado: { rotulo: 'Recusado', tone: 'red' },
  pendente: { rotulo: 'Pendente', tone: 'amber' },
};

const formatarData = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
};

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [participacoes, setParticipacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(vazio);
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      const [evs, parts] = await Promise.all([
        eventoService.listarMeus(),
        eventoService.listarParticipacoes(),
      ]);
      setEventos(evs);
      setParticipacoes(parts);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar eventos.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const fechar = () => { setModal(false); setForm(vazio); };
  const candidatosDe = (eventoId) => participacoes.filter((p) => p.evento_id === eventoId);

  const criar = async (e) => {
    e.preventDefault();
    if (!form.titulo) { setErro('Dê um título ao evento.'); return; }
    if (!form.local) { setErro('Informe o local do evento.'); return; }
    if (!form.data_inicio) { setErro('Informe a data do evento.'); return; }
    try {
      setSalvando(true);
      setErro('');
      // O <input type="datetime-local"> devolve horário LOCAL sem fuso;
      // new Date(...).toISOString() é o que converte para UTC antes de enviar.
      await eventoService.criar({
        ...form,
        data_inicio: new Date(form.data_inicio).toISOString(),
        vagas: form.vagas === '' ? null : Number(form.vagas),
      });
      fechar();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao criar o evento.');
    } finally {
      setSalvando(false);
    }
  };

  const excluir = async (ev) => {
    const n = candidatosDe(ev.id).length;
    const aviso = n
      ? `Excluir "${ev.titulo}"? As ${n} candidatura${n === 1 ? '' : 's'} vão junto.`
      : `Excluir "${ev.titulo}"?`;
    if (!window.confirm(aviso)) return;
    try {
      setErro('');
      await eventoService.remover(ev.id);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao excluir o evento.');
    }
  };

  const decidir = async (participacao, status) => {
    try {
      setErro('');
      await eventoService.decidir(participacao.id, status);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao atualizar a candidatura.');
    }
  };

  const transferir = async (participacao) => {
    if (!window.confirm('Transferir uma Patinha do estoque para este voluntário? A posse passa direto para ele.')) return;
    try {
      setErro('');
      const r = await eventoService.transferirPatinha(participacao.id);
      await carregar();
      window.alert(r?.message || 'Patinha transferida.');
    } catch (e) {
      setErro(e.message || 'Erro ao transferir a Patinha.');
    }
  };

  const presenca = async (participacao, presente) => {
    try {
      setErro('');
      await eventoService.marcarPresenca(participacao.id, presente);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao marcar presença.');
    }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Eventos</h1>
          <p>
            Feira de adoção, mutirão de castração, campanha na praça. Depois do evento,
            marque quem apareceu — a presença confirmada libera uma Patinha para o voluntário.
          </p>
        </div>
        <S.Btn $variant="primary" onClick={() => setModal(true)}><Plus size={17} /> Novo evento</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      {carregando ? (
        <S.Spinner $center />
      ) : eventos.length === 0 ? (
        <S.Empty>
          <CalendarDays size={30} style={{ opacity: 0.4 }} /><br />
          Nenhum evento criado ainda.
        </S.Empty>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {eventos.map((ev) => {
            const candidatos = candidatosDe(ev.id);
            const pendentes = candidatos.filter((p) => p.status === 'pendente');
            return (
              <S.Card key={ev.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>
                        {ev.titulo}
                      </span>
                      {ev.ja_aconteceu
                        ? <S.Badge $tone="gray">Já aconteceu</S.Badge>
                        : <S.Badge $tone="blue">Agendado</S.Badge>}
                      {ev.cheio && <S.Badge $tone="amber">Lotado</S.Badge>}
                      {!ev.ativo && <S.Badge $tone="red">Inativo</S.Badge>}
                    </div>

                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--ink-soft)', fontSize: 13.5, marginTop: 6 }}>
                      <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                        <CalendarDays size={14} /> {formatarData(ev.data_inicio)}
                      </span>
                      <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                        <MapPin size={14} /> {ev.local}
                      </span>
                    </div>

                    {ev.descricao && <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 6 }}>{ev.descricao}</p>}

                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 8 }}>
                      {ev.candidatos} candidato{ev.candidatos === 1 ? '' : 's'}
                      {' · '}{ev.aceitos} aceito{ev.aceitos === 1 ? '' : 's'}
                      {ev.vagas != null && ` de ${ev.vagas}`}
                      {' · '}
                      <strong style={{ color: ev.presentes ? 'var(--moss)' : 'var(--ink-soft)' }}>
                        {ev.presentes} presente{ev.presentes === 1 ? '' : 's'}
                      </strong>
                      {pendentes.length > 0 && ` · ${pendentes.length} aguardando resposta`}
                    </div>
                  </div>

                  <S.Btn $sm $variant="ghost" onClick={() => excluir(ev)} title="Excluir evento">
                    <Trash2 size={14} />
                  </S.Btn>
                </div>

                {candidatos.length > 0 && (
                  <div style={{ marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 12, display: 'grid', gap: 12 }}>
                    {candidatos.map((p) => {
                      const st = STATUS[p.status] || STATUS.pendente;
                      return (
                        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                          <div style={{ fontSize: 13.5, flex: '1 1 220px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              <strong style={{ color: 'var(--ink)' }}>{p.usuario?.nome || 'Voluntário'}</strong>
                              <S.Badge $tone={st.tone}>{st.rotulo}</S.Badge>
                              {p.presente && <S.Badge $tone="green">Presença confirmada</S.Badge>}
                            </div>
                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--ink-soft)', marginTop: 2 }}>
                              {p.usuario?.email && (
                                <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                                  <Mail size={13} /> {p.usuario.email}
                                </span>
                              )}
                              {p.usuario?.telefone && (
                                <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                                  <Phone size={13} /> {p.usuario.telefone}
                                </span>
                              )}
                            </div>
                            {p.mensagem && <div style={{ color: 'var(--ink-soft)', marginTop: 2 }}>“{p.mensagem}”</div>}
                          </div>

                          <div style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
                            {p.status !== 'aceito' && (
                              <S.Btn $sm $variant="primary" onClick={() => decidir(p, 'aceito')}>
                                <Check size={14} /> Aceitar
                              </S.Btn>
                            )}
                            {p.status !== 'recusado' && (
                              <S.Btn $sm $variant="ghost" onClick={() => decidir(p, 'recusado')} title="Recusar">
                                <X size={14} />
                              </S.Btn>
                            )}
                            {p.status !== 'pendente' && (
                              <S.Btn $sm $variant="subtle" onClick={() => decidir(p, 'pendente')} title="Voltar para pendente">
                                <RotateCcw size={14} />
                              </S.Btn>
                            )}

                            {/* Presença só existe depois do evento e só para quem foi aceito.
                                O backend também barra — aqui é para não oferecer o botão à toa. */}
                            {p.status === 'aceito' && ev.ja_aconteceu && (
                              p.presente ? (
                                <>
                                  <S.Btn $sm $variant="subtle" onClick={() => presenca(p, false)} title="Desfazer presença">
                                    <Undo2 size={14} /> Desfazer
                                  </S.Btn>
                                  <S.Btn $sm $variant="primary" onClick={() => transferir(p)} title="Dar uma Patinha do estoque">
                                    <PawPrint size={14} /> Transferir Patinha
                                  </S.Btn>
                                </>
                              ) : (
                                <S.Btn $sm $variant="primary" onClick={() => presenca(p, true)}>
                                  <UserCheck size={14} /> Marcar presença
                                </S.Btn>
                              )
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
            <h3>Novo evento</h3>
            <p className="modal-sub">Quem aparecer e tiver presença confirmada pode resgatar uma Patinha.</p>
            <form onSubmit={criar}>
              <S.Field>Título
                <S.Input
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Feira de adoção no Parque Portugal"
                />
              </S.Field>
              <S.Field>Quando
                <S.Input
                  type="datetime-local"
                  value={form.data_inicio}
                  onChange={(e) => setForm({ ...form, data_inicio: e.target.value })}
                />
              </S.Field>
              <S.Field>Local
                <S.Input
                  value={form.local}
                  onChange={(e) => setForm({ ...form, local: e.target.value })}
                  placeholder="Parque Portugal — Portão 3"
                />
              </S.Field>
              <S.Field>Endereço (opcional)
                <S.Input
                  value={form.endereco}
                  onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                  placeholder="Av. Heitor Penteado, s/n — Campinas/SP"
                />
              </S.Field>
              <S.Field>Descrição
                <S.Textarea
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  placeholder="O que vai acontecer, o que o voluntário vai fazer…"
                />
              </S.Field>
              <S.Field>Quantos voluntários você precisa?
                <S.Input
                  type="number"
                  min="1"
                  value={form.vagas}
                  onChange={(e) => setForm({ ...form, vagas: e.target.value })}
                  placeholder="Deixe vazio para não limitar"
                />
              </S.Field>

              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>
                  {salvando ? 'Criando…' : 'Criar evento'}
                </S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
