import React, { useEffect, useState } from 'react';
import { Plus, Users, Mail, Phone } from 'lucide-react';
import { voluntariadoService } from '../../../services/voluntariadoService';
import * as S from '../../Panel/panelStyles';

export default function Vagas() {
  const [vagas, setVagas] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ titulo: '', descricao: '' });
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

  const fechar = () => { setModal(false); setForm({ titulo: '', descricao: '' }); };

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

  const inscritosDe = (vagaId) => inscricoes.filter((i) => i.vaga_id === vagaId);

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Vagas de voluntariado</h1>
          <p>Abra vagas e acompanhe quem se inscreveu para ajudar a sua ONG.</p>
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
            return (
              <S.Card key={v.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>{v.titulo}</div>
                    {v.descricao && <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginTop: 6 }}>{v.descricao}</p>}
                  </div>
                  <S.Badge $tone={inscritos.length ? 'blue' : 'gray'}>{inscritos.length} inscrito{inscritos.length === 1 ? '' : 's'}</S.Badge>
                </div>

                {inscritos.length > 0 && (
                  <div style={{ marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 12, display: 'grid', gap: 10 }}>
                    {inscritos.map((i) => (
                      <div key={i.id} style={{ fontSize: 13.5 }}>
                        <strong style={{ color: 'var(--ink)' }}>{i.candidato?.nome || 'Voluntário'}</strong>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: 'var(--ink-soft)', marginTop: 2 }}>
                          {i.candidato?.email && <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Mail size={13} /> {i.candidato.email}</span>}
                          {i.candidato?.telefone && <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Phone size={13} /> {i.candidato.telefone}</span>}
                        </div>
                        {i.mensagem && <div style={{ color: 'var(--ink-soft)', marginTop: 2 }}>“{i.mensagem}”</div>}
                      </div>
                    ))}
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
