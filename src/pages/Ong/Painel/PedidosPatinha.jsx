import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Nfc, Check, X, Send, Gift, Inbox } from 'lucide-react';
import { tagsService } from '../../../services/tagsService';
import * as S from '../../Panel/panelStyles';

// Pedidos de Patinha feitos pelos tutores no app.
//
// Duas origens chegam aqui, e elas exigem coisas diferentes de você:
//
//   VOLUNTARIADO — já verificado. O backend só deixa o pedido existir se a
//                  pessoa tiver inscrição 'aceito' numa vaga sua.
//   DOAÇÃO       — NÃO verificado. O Pix é da sua ONG e acontece fora do app,
//                  sem webhook. Confira no seu extrato o valor e a data que o
//                  tutor escreveu antes de aprovar.
//
// Despachar com uma Patinha selecionada vincula a tag ao pet na hora (quando o
// pedido aponta um). Sem pet, a tag fica só reservada ao pedido.

const STATUS = {
  pendente: { rotulo: 'Aguardando você', tom: 'amber' },
  aprovado: { rotulo: 'Aprovado', tom: 'blue' },
  enviado: { rotulo: 'Enviado', tom: 'blue' },
  entregue: { rotulo: 'Entregue', tom: 'green' },
  recusado: { rotulo: 'Recusado', tom: 'red' },
};

const ORIGEM = { doacao: 'Doação', voluntariado: 'Voluntariado', compra: 'Compra' };

const ABAS = [
  { v: 'abertos', label: 'Em aberto' },
  { v: 'encerrados', label: 'Encerrados' },
];

const ABERTO = ['pendente', 'aprovado', 'enviado'];

export default function PedidosPatinha() {
  const [pedidos, setPedidos] = useState([]);
  const [tagsLivres, setTagsLivres] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [aba, setAba] = useState('abertos');

  const [alvo, setAlvo] = useState(null);
  const [tagSel, setTagSel] = useState('');
  const [resposta, setResposta] = useState('');
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      const r = await tagsService.listarPedidos();
      setPedidos(r.pedidos || []);
      setTagsLivres(r.tags_livres || []);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar os pedidos.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const listados = useMemo(
    () => pedidos.filter((p) => (aba === 'abertos' ? ABERTO.includes(p.status) : !ABERTO.includes(p.status))),
    [pedidos, aba],
  );
  const contagem = useMemo(
    () => ({
      abertos: pedidos.filter((p) => ABERTO.includes(p.status)).length,
      encerrados: pedidos.filter((p) => !ABERTO.includes(p.status)).length,
    }),
    [pedidos],
  );

  const abrir = (p) => {
    setAlvo(p);
    setTagSel(p.tag_id || '');
    setResposta(p.resposta || '');
    setErro('');
  };

  const fechar = () => { setAlvo(null); setTagSel(''); setResposta(''); setErro(''); };

  const decidir = async (status) => {
    try {
      setSalvando(true);
      setErro('');
      const patch = { status, resposta: resposta.trim() || null };
      // Só manda tag quando o status significa que ela realmente saiu.
      if (tagSel && ['aprovado', 'enviado', 'entregue'].includes(status)) patch.tag_id = tagSel;
      await tagsService.decidirPedido(alvo.id, patch);
      fechar();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao atualizar o pedido.');
    } finally {
      setSalvando(false);
    }
  };

  const pendentes = contagem.abertos;

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Pedidos de Patinha</h1>
          <p>Tutores que pediram uma Patinha à sua ONG — por doação ou voluntariado.</p>
        </div>
        <S.Btn $variant="ghost" $sm onClick={carregar}><RefreshCw size={15} /> Atualizar</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Grid style={{ marginBottom: 22 }}>
        <S.StatCard><strong>{pendentes}</strong><span>pedidos em aberto</span></S.StatCard>
        <S.StatCard><strong>{tagsLivres.length}</strong><span>Patinhas livres no estoque</span></S.StatCard>
        <S.StatCard><strong>{contagem.encerrados}</strong><span>já encerrados</span></S.StatCard>
      </S.Grid>

      {tagsLivres.length === 0 && pendentes > 0 && (
        <S.Alert>
          ⚠️ Você não tem Patinha livre no estoque. Peça mais ao desenvolvedor, ou desvincule
          alguma que não esteja em uso.
        </S.Alert>
      )}

      <S.Toolbar>
        {ABAS.map((f) => (
          <S.Btn
            key={f.v}
            $sm
            $variant={aba === f.v ? 'primary' : 'ghost'}
            onClick={() => setAba(f.v)}
          >
            {f.label} ({contagem[f.v]})
          </S.Btn>
        ))}
      </S.Toolbar>

      {carregando ? (
        <S.Spinner $center />
      ) : listados.length === 0 ? (
        <S.Empty>
          <Inbox size={26} />
          <p>
            {aba === 'abertos'
              ? 'Nenhum pedido em aberto. Quando um tutor pedir pelo app, ele aparece aqui.'
              : 'Nenhum pedido encerrado ainda.'}
          </p>
        </S.Empty>
      ) : (
        <S.Card style={{ padding: 0, overflow: 'hidden' }}>
          <S.Table>
            <thead>
              <tr>
                <th>Tutor</th>
                <th>Origem</th>
                <th>Pet</th>
                <th>Patinha</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listados.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.tutor?.nome ?? '—'}</strong>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 3 }}>
                      {p.tutor?.email}
                      {p.tutor?.telefone ? ` · ${p.tutor.telefone}` : ''}
                    </div>
                  </td>
                  <td>
                    <S.Badge $tone={p.origem === 'voluntariado' ? 'green' : 'amber'}>
                      {ORIGEM[p.origem] ?? p.origem}
                    </S.Badge>
                    {p.origem === 'voluntariado' && (
                      <div style={{ fontSize: 11.5, color: 'var(--moss)', marginTop: 4 }}>
                        voluntariado confirmado
                      </div>
                    )}
                  </td>
                  <td>{p.animal?.nome ?? <span style={{ color: 'var(--ink-soft)' }}>sem pet</span>}</td>
                  <td>
                    {p.tag?.codigo
                      ? <span style={{ fontFamily: 'ui-monospace, monospace' }}>{p.tag.codigo}</span>
                      : <span style={{ color: 'var(--ink-soft)' }}>—</span>}
                  </td>
                  <td>
                    <S.Badge $tone={(STATUS[p.status] || {}).tom || 'gray'}>
                      {(STATUS[p.status] || {}).rotulo || p.status}
                    </S.Badge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <S.Btn $sm $variant="subtle" onClick={() => abrir(p)}>
                      <Nfc size={14} /> Atender
                    </S.Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.Card>
      )}

      {/* MODAL atender */}
      {alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()} style={{ maxWidth: 620 }}>
            <h3>Pedido de {alvo.tutor?.nome ?? 'tutor'}</h3>
            <p className="modal-sub">
              {ORIGEM[alvo.origem]}
              {alvo.animal?.nome ? ` · para ${alvo.animal.nome}` : ' · sem pet indicado'}
              {alvo.tutor?.email ? ` · ${alvo.tutor.email}` : ''}
            </p>

            {alvo.observacao && (
              <div style={{ background: 'var(--sand)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                <strong style={{ fontSize: 12.5 }}>O que o tutor escreveu</strong>
                <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', marginTop: 5 }}>{alvo.observacao}</div>
              </div>
            )}

            {/* O que dá e o que não dá para confiar */}
            {alvo.origem === 'doacao' ? (
              <div style={{ background: 'rgba(255,194,75,0.16)', border: '1px solid rgba(255,194,75,0.4)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                <strong style={{ color: '#8a5a00', fontSize: 13 }}>Confirme antes de aprovar</strong>
                <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 5 }}>
                  A doação cai direto no Pix da sua ONG, fora do app — o sistema não tem como
                  verificar. Procure no seu extrato o valor e a data que o tutor informou.
                </div>
              </div>
            ) : alvo.origem === 'voluntariado' ? (
              <div style={{ background: 'rgba(31,157,107,0.1)', border: '1px solid rgba(31,157,107,0.3)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                <strong style={{ color: 'var(--moss)', fontSize: 13 }}>Voluntariado já conferido</strong>
                <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 5 }}>
                  Este tutor tem inscrição aceita numa vaga sua — o backend validou isso ao
                  receber o pedido.
                </div>
              </div>
            ) : null}

            <S.Field>
              Patinha a entregar
              <S.Select value={tagSel} onChange={(e) => setTagSel(e.target.value)}>
                <option value="">— escolher depois —</option>
                {alvo.tag?.id && !tagsLivres.some((t) => t.id === alvo.tag.id) && (
                  <option value={alvo.tag.id}>{alvo.tag.codigo} (já reservada)</option>
                )}
                {tagsLivres.map((t) => (
                  <option key={t.id} value={t.id}>{t.codigo}</option>
                ))}
              </S.Select>
            </S.Field>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '-8px 0 14px' }}>
              {alvo.animal?.nome
                ? `Ao aprovar com uma Patinha escolhida, ela é vinculada a ${alvo.animal.nome} na hora.`
                : 'Sem pet indicado, a Patinha fica reservada a este pedido — o vínculo acontece quando o tutor cadastrar o animal.'}
            </p>

            <S.Field>
              Recado ao tutor <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(opcional)</span>
              <S.Textarea
                value={resposta}
                onChange={(e) => setResposta(e.target.value)}
                placeholder="Ex.: pode retirar na sede de segunda a sexta, das 9h às 17h."
              />
            </S.Field>

            <div className="modal-actions" style={{ flexWrap: 'wrap', gap: 8 }}>
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Fechar</S.Btn>
              <S.Btn type="button" $variant="danger" disabled={salvando} onClick={() => decidir('recusado')}>
                <X size={15} /> Recusar
              </S.Btn>
              <S.Btn type="button" $variant="honey" disabled={salvando} onClick={() => decidir('aprovado')}>
                <Check size={15} /> Aprovar
              </S.Btn>
              <S.Btn type="button" $variant="ghost" disabled={salvando} onClick={() => decidir('enviado')}>
                <Send size={15} /> Enviei
              </S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando} onClick={() => decidir('entregue')}>
                <Gift size={15} /> {salvando ? 'Salvando…' : 'Entregue'}
              </S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
