import React, { useEffect, useState } from 'react';
import { Nfc, Link2, Unlink, Copy, Check, UserPlus, UserX } from 'lucide-react';
import { tagsService } from '../../../services/tagsService';
import { animalService } from '../../../services/animalService';
import * as S from '../../Panel/panelStyles';

const DOMINIO = 'adotenima.com.br';

// Patinhas emitidas pela ONG.
//
// Desde a migração 018 `tags.ong_id` significa QUEM EMITIU, não "de quem é".
// Uma Patinha entregue continua nesta lista — agora com o dono ao lado. É a
// ONG que gravou aquele código naquele objeto físico; ela precisa poder achar.
//
// ENTREGA em dois passos, de propósito:
//   1. a ONG RESERVA no nome do tutor  (intenção de quem entrega)
//   2. o tutor digita o código no app  (posse do objeto)
// Os códigos são sequenciais, então o passo 2 sozinho não prova nada: sem a
// reserva, adivinhar "NIMA-0002" bastaria para roubar a Patinha do vizinho.

// Desde a 023 o código é global e único: a URL é sempre /tags/<codigo>.
const urlDaTag = (t) => `${DOMINIO}${t.url_publica || `/tags/${t.codigo}`}`;

function Situacao({ t }) {
  if (t.tutor) return <S.Badge $tone="navy">Entregue · {t.tutor.nome}</S.Badge>;
  if (t.reservada) return <S.Badge $tone="amber">Reservada · {t.reservada.nome}</S.Badge>;
  if (t.animal) return <S.Badge $tone="green">Vinculada · {t.animal.nome}</S.Badge>;
  return <S.Badge $tone="gray">Livre</S.Badge>;
}

export default function Patinhas() {
  const [tags, setTags] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [modal, setModal] = useState(null); // 'vincular' | 'reservar' | null
  const [alvo, setAlvo] = useState(null);
  const [animalSel, setAnimalSel] = useState('');
  const [emailTutor, setEmailTutor] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [copiado, setCopiado] = useState(null);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      const [ts, as] = await Promise.all([tagsService.listarMinhas(), animalService.listarMinhas()]);
      setTags(ts);
      setAnimais(as);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar Patinhas.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const fechar = () => { setModal(null); setAlvo(null); setAnimalSel(''); setEmailTutor(''); };

  const abrirVincular = (t) => { setAlvo(t); setAnimalSel(''); setModal('vincular'); };
  const abrirReservar = (t) => { setAlvo(t); setEmailTutor(''); setModal('reservar'); };

  const vincular = async () => {
    if (!animalSel) { setErro('Escolha um pet.'); return; }
    try {
      setSalvando(true);
      setErro('');
      await tagsService.vincular(alvo.id, animalSel);
      fechar();
      await carregar();
    } catch (e) { setErro(e.message || 'Erro ao vincular.'); }
    finally { setSalvando(false); }
  };

  const reservar = async () => {
    if (!emailTutor.trim()) { setErro('Informe o e-mail do tutor.'); return; }
    try {
      setSalvando(true);
      setErro('');
      await tagsService.reservar(alvo.id, { email: emailTutor.trim() });
      fechar();
      await carregar();
    } catch (e) { setErro(e.message || 'Erro ao reservar.'); }
    finally { setSalvando(false); }
  };

  const desvincular = async (t) => {
    if (!window.confirm(`Soltar a Patinha ${t.codigo}? Ela volta a ficar livre.`)) return;
    try { setErro(''); await tagsService.desvincular(t.id); await carregar(); }
    catch (e) { setErro(e.message || 'Erro ao desvincular.'); }
  };

  const cancelarReserva = async (t) => {
    if (!window.confirm(`Cancelar a reserva de ${t.codigo} para ${t.reservada?.nome}?`)) return;
    try { setErro(''); await tagsService.cancelarReserva(t.id); await carregar(); }
    catch (e) { setErro(e.message || 'Erro ao cancelar a reserva.'); }
  };

  const copiar = async (t) => {
    try {
      await navigator.clipboard.writeText(`https://${urlDaTag(t)}`);
      setCopiado(t.id);
      setTimeout(() => setCopiado(null), 1600);
    } catch { /* clipboard bloqueado — sem drama */ }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Patinhas</h1>
          <p>
            Suas Smart Tags antiperda chegam prontas da Nima, já com o código. Aqui você
            relaciona cada uma a um pet, imprime o QR da URL e entrega a tutores — reservando
            no nome de quem vai receber.
          </p>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : tags.length === 0 ? (
          <S.Empty style={{ border: 'none' }}>
            <Nfc size={30} style={{ opacity: 0.4 }} /><br />
            Nenhuma Patinha ainda. Elas são enviadas pela Nima — fale com a administração.
          </S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr>
                  <th>Código</th><th>URL da tag</th><th>Situação</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((t) => (
                  <tr key={t.id}>
                    <td style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: 'var(--ink)' }}>
                      {t.codigo}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--ink-soft)' }}>
                        <span style={{ wordBreak: 'break-all' }}>{urlDaTag(t)}</span>
                        <S.Btn $variant="ghost" $sm onClick={() => copiar(t)} title="Copiar URL">
                          {copiado === t.id ? <Check size={13} /> : <Copy size={13} />}
                        </S.Btn>
                      </div>
                    </td>
                    <td><Situacao t={t} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        {t.animal ? (
                          <S.Btn $variant="ghost" $sm onClick={() => desvincular(t)} title="Desvincular do pet">
                            <Unlink size={14} /> Tirar
                          </S.Btn>
                        ) : (
                          <S.Btn $variant="subtle" $sm onClick={() => abrirVincular(t)}>
                            <Link2 size={14} /> Relacionar
                          </S.Btn>
                        )}

                        {/* Entrega: quem já tem dono saiu do estoque e não volta por aqui. */}
                        {!t.tutor && (t.reservada ? (
                          <S.Btn $variant="ghost" $sm onClick={() => cancelarReserva(t)} title="Cancelar reserva">
                            <UserX size={14} />
                          </S.Btn>
                        ) : (
                          <S.Btn $variant="subtle" $sm onClick={() => abrirReservar(t)}>
                            <UserPlus size={14} /> Entregar
                          </S.Btn>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>

      {/* MODAL: vincular a um pet */}
      {modal === 'vincular' && alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Vincular {alvo.codigo}</h3>
            <p className="modal-sub">Escolha o pet que vai usar esta Patinha.</p>
            <S.Field>Pet
              <S.Select value={animalSel} onChange={(e) => setAnimalSel(e.target.value)}>
                <option value="">Selecione um pet…</option>
                {animais.map((a) => <option key={a.id} value={a.id}>{a.nome} · {a.especie}</option>)}
              </S.Select>
            </S.Field>
            {animais.length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                Cadastre um animal primeiro na seção Animais.
              </p>
            )}
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando || !animalSel} onClick={vincular}>
                {salvando ? 'Vinculando…' : 'Vincular'}
              </S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}

      {/* MODAL: reservar para um tutor */}
      {modal === 'reservar' && alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Entregar {alvo.codigo}</h3>
            <p className="modal-sub">
              A Patinha fica reservada no nome do tutor. Ela só vira dele quando ele digitar
              o código <strong>{alvo.codigo}</strong> no app — então entregue o objeto em mãos.
            </p>
            <S.Field>E-mail da conta do tutor
              <S.Input
                type="email"
                value={emailTutor}
                onChange={(e) => setEmailTutor(e.target.value)}
                placeholder="tutor@email.com"
                autoComplete="off"
              />
            </S.Field>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>
              Precisa ser o e-mail com que a pessoa entra no app. Contas de ONG e do
              desenvolvedor não recebem Patinha.
            </p>
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando || !emailTutor.trim()} onClick={reservar}>
                {salvando ? 'Reservando…' : 'Reservar'}
              </S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
