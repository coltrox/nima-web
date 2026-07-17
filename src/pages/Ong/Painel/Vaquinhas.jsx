import React, { useEffect, useState } from 'react';
import { Plus, PiggyBank, Copy, Check, Power } from 'lucide-react';
import { vaquinhaService } from '../../../services/vaquinhaService';
import * as S from '../../Panel/panelStyles';

const formVazio = { titulo: '', descricao: '', meta: '', pix_copia_cola: '', pix_chave: '' };

export default function Vaquinhas() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(formVazio);
  const [editId, setEditId] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [copiado, setCopiado] = useState(null);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setLista(await vaquinhaService.listarMinhas());
    } catch (e) {
      setErro(e.message || 'Erro ao carregar vaquinhas.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const abrirNova = () => { setForm(formVazio); setEditId(null); setModal(true); };
  const abrirEdicao = (v) => {
    setForm({ titulo: v.titulo || '', descricao: v.descricao || '', meta: v.meta ?? '', pix_copia_cola: v.pix_copia_cola || '', pix_chave: v.pix_chave || '' });
    setEditId(v.id);
    setModal(true);
  };
  const fechar = () => { setModal(false); setForm(formVazio); setEditId(null); };

  const salvar = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.pix_copia_cola) {
      setErro('Título e o PIX copia-e-cola são obrigatórios.');
      return;
    }
    const payload = { ...form, meta: form.meta === '' ? null : Number(form.meta) };
    try {
      setSalvando(true);
      setErro('');
      if (editId) await vaquinhaService.atualizar(editId, payload);
      else await vaquinhaService.criar(payload);
      fechar();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao salvar vaquinha.');
    } finally {
      setSalvando(false);
    }
  };

  const toggleAtiva = async (v) => {
    try {
      setErro('');
      await vaquinhaService.atualizar(v.id, { ativa: !v.ativa });
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao atualizar.');
    }
  };

  const copiarPix = async (v) => {
    try {
      await navigator.clipboard.writeText(v.pix_copia_cola || '');
      setCopiado(v.id);
      setTimeout(() => setCopiado(null), 1800);
    } catch { /* clipboard indisponível */ }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Vaquinhas</h1>
          <p>Divulgue o PIX da própria ONG. O sistema só mostra a chave — a doação cai direto na sua conta.</p>
        </div>
        <S.Btn $variant="primary" onClick={abrirNova}><Plus size={17} /> Nova vaquinha</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      {carregando ? (
        <S.Spinner $center />
      ) : lista.length === 0 ? (
        <S.Empty><PiggyBank size={30} style={{ opacity: 0.4 }} /><br />Nenhuma vaquinha ainda. Crie a primeira campanha.</S.Empty>
      ) : (
        <S.Grid $cols={2}>
          {lista.map((v) => (
            <S.Card key={v.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>{v.titulo}</div>
                <S.Badge $tone={v.ativa ? 'green' : 'gray'}>{v.ativa ? 'Ativa' : 'Inativa'}</S.Badge>
              </div>
              {v.descricao && <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 8 }}>{v.descricao}</p>}
              {v.meta != null && <p style={{ fontSize: 13.5, color: 'var(--ink)', marginTop: 8 }}><strong>Meta:</strong> R$ {Number(v.meta).toLocaleString('pt-BR')}</p>}

              <div style={{ marginTop: 12, background: 'var(--sand)', borderRadius: 10, padding: '10px 12px', fontSize: 12.5, color: 'var(--ink-soft)', wordBreak: 'break-all' }}>
                {(v.pix_copia_cola || '').slice(0, 64)}{(v.pix_copia_cola || '').length > 64 ? '…' : ''}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <S.Btn $variant="subtle" $sm onClick={() => copiarPix(v)}>
                  {copiado === v.id ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar PIX</>}
                </S.Btn>
                <S.Btn $variant="ghost" $sm onClick={() => abrirEdicao(v)}>Editar</S.Btn>
                <S.Btn $variant="ghost" $sm onClick={() => toggleAtiva(v)}><Power size={14} /> {v.ativa ? 'Desativar' : 'Ativar'}</S.Btn>
              </div>
            </S.Card>
          ))}
        </S.Grid>
      )}

      {modal && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>{editId ? 'Editar vaquinha' : 'Nova vaquinha'}</h3>
            <p className="modal-sub">Cole o PIX copia-e-cola da conta da sua ONG.</p>
            <form onSubmit={salvar}>
              <S.Field>Título
                <S.Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Ajude a Luna na cirurgia" />
              </S.Field>
              <S.Field>Descrição
                <S.Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Para o que é a arrecadação…" />
              </S.Field>
              <S.Field>Meta (R$, opcional)
                <S.Input type="number" min="0" value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} placeholder="1500" />
              </S.Field>
              <S.Field>PIX copia-e-cola
                <S.Textarea value={form.pix_copia_cola} onChange={(e) => setForm({ ...form, pix_copia_cola: e.target.value })} placeholder="00020126..." />
              </S.Field>
              <S.Field>Chave PIX (opcional)
                <S.Input value={form.pix_chave} onChange={(e) => setForm({ ...form, pix_chave: e.target.value })} placeholder="email / telefone / CNPJ" />
              </S.Field>
              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Salvando…' : (editId ? 'Salvar' : 'Criar')}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
