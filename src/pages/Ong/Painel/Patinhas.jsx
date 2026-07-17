import React, { useEffect, useState } from 'react';
import { Plus, Nfc, Link2, Unlink, Trash2, Copy, Check } from 'lucide-react';
import { tagsService } from '../../../services/tagsService';
import { animalService } from '../../../services/animalService';
import * as S from '../../Panel/panelStyles';

const BASE_URL = 'adotenima.com.br/tag/';

export default function Patinhas() {
  const [tags, setTags] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [modal, setModal] = useState(null); // 'nova' | 'vincular' | null
  const [codigo, setCodigo] = useState('');
  const [alvo, setAlvo] = useState(null); // tag selecionada p/ vincular
  const [animalSel, setAnimalSel] = useState('');
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

  const fechar = () => { setModal(null); setCodigo(''); setAlvo(null); setAnimalSel(''); };

  const criar = async (e) => {
    e.preventDefault();
    if (!codigo.trim()) { setErro('Informe o código da Patinha.'); return; }
    try {
      setSalvando(true);
      setErro('');
      await tagsService.criar(codigo.trim());
      fechar();
      await carregar();
    } catch (e) { setErro(e.message || 'Erro ao criar Patinha.'); }
    finally { setSalvando(false); }
  };

  const abrirVincular = (t) => { setAlvo(t); setAnimalSel(''); setModal('vincular'); };

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

  const desvincular = async (t) => {
    if (!window.confirm(`Soltar a Patinha ${t.codigo}? Ela volta a ficar livre.`)) return;
    try { setErro(''); await tagsService.desvincular(t.id); await carregar(); }
    catch (e) { setErro(e.message || 'Erro ao desvincular.'); }
  };

  const remover = async (t) => {
    if (!window.confirm(`Remover a Patinha ${t.codigo} do registro?`)) return;
    try { setErro(''); await tagsService.remover(t.id); await carregar(); }
    catch (e) { setErro(e.message || 'Erro ao remover.'); }
  };

  const copiar = async (t) => {
    try { await navigator.clipboard.writeText(`https://${BASE_URL}${t.codigo}`); setCopiado(t.id); setTimeout(() => setCopiado(null), 1600); } catch { /* */ }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Patinhas</h1>
          <p>Suas Smart Tags antiperda. Crie o código, vincule a um pet e imprima o QR da URL abaixo.</p>
        </div>
        <S.Btn $variant="primary" onClick={() => setModal('nova')}><Plus size={17} /> Nova Patinha</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : tags.length === 0 ? (
          <S.Empty style={{ border: 'none' }}><Nfc size={30} style={{ opacity: 0.4 }} /><br />Nenhuma Patinha ainda. Crie a primeira.</S.Empty>
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
                    <td style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 700, color: 'var(--ink)' }}>{t.codigo}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--ink-soft)' }}>
                        <span style={{ wordBreak: 'break-all' }}>{BASE_URL}{t.codigo}</span>
                        <S.Btn $variant="ghost" $sm onClick={() => copiar(t)} title="Copiar URL">
                          {copiado === t.id ? <Check size={13} /> : <Copy size={13} />}
                        </S.Btn>
                      </div>
                    </td>
                    <td>
                      {t.animal
                        ? <S.Badge $tone="green">Vinculada · {t.animal.nome}</S.Badge>
                        : <S.Badge $tone="gray">Livre</S.Badge>}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        {t.animal
                          ? <S.Btn $variant="ghost" $sm onClick={() => desvincular(t)} title="Desvincular"><Unlink size={14} /></S.Btn>
                          : <S.Btn $variant="subtle" $sm onClick={() => abrirVincular(t)}><Link2 size={14} /> Vincular</S.Btn>}
                        <S.Btn $variant="ghost" $sm onClick={() => remover(t)} title="Remover"><Trash2 size={14} /></S.Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>

      {/* MODAL: nova Patinha */}
      {modal === 'nova' && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Nova Patinha</h3>
            <p className="modal-sub">O código vai na URL (ex.: NIMA-0001). Depois você imprime o QR e cola na coleira.</p>
            <form onSubmit={criar}>
              <S.Field>Código
                <S.Input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="NIMA-0001" />
              </S.Field>
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Criando…' : 'Criar'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}

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
            {animais.length === 0 && <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Cadastre um animal primeiro na seção Animais.</p>}
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando || !animalSel} onClick={vincular}>{salvando ? 'Vinculando…' : 'Vincular'}</S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
