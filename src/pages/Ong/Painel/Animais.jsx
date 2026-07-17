import React, { useEffect, useState } from 'react';
import { Plus, Syringe, Nfc, RefreshCw, PawPrint, UserRound } from 'lucide-react';
import { animalService } from '../../../services/animalService';
import * as S from '../../Panel/panelStyles';

const STATUS_TONE = { 'Disponível': 'green', 'Adotado': 'blue', 'Desaparecido': 'amber' };
const STATUS_OPS = ['Disponível', 'Adotado', 'Desaparecido'];

const formVazio = { nome: '', especie: 'Cão', raca: '', porte: 'Médio', idade: '', temperamento: '', dono_nome: '', dono_telefone: '', dono_whatsapp: '' };
const donoVazio = { dono_nome: '', dono_telefone: '', dono_whatsapp: '' };

export default function Animais() {
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [modal, setModal] = useState(null); // 'novo' | 'vacinas' | 'tag' | 'dono' | null
  const [form, setForm] = useState(formVazio);
  const [foto, setFoto] = useState(null);
  const [alvo, setAlvo] = useState(null); // animal selecionado p/ vacinas/tag/dono
  const [campo, setCampo] = useState(''); // valor do textarea/input do modal
  const [donoForm, setDonoForm] = useState(donoVazio);
  const [salvando, setSalvando] = useState(false);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setAnimais(await animalService.listarMinhas());
    } catch (e) {
      setErro(e.message || 'Erro ao carregar animais.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const fecharModal = () => { setModal(null); setForm(formVazio); setFoto(null); setAlvo(null); setCampo(''); setDonoForm(donoVazio); };

  const cadastrar = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.raca || !form.idade || !form.temperamento) {
      setErro('Preencha nome, raça, idade e temperamento.');
      return;
    }
    try {
      setSalvando(true);
      setErro('');
      const novo = await animalService.cadastrar(form);
      if (foto) await animalService.adicionarFoto(novo.id, foto);
      fecharModal();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Falha ao cadastrar.');
    } finally {
      setSalvando(false);
    }
  };

  const mudarStatus = async (id, status) => {
    try {
      setErro('');
      await animalService.atualizarStatus(id, status);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao mudar status.');
    }
  };

  const abrirVacinas = (a) => { setAlvo(a); setCampo(a.prontuario_vacinas || ''); setModal('vacinas'); };
  const abrirTag = (a) => { setAlvo(a); setCampo(a.smart_tag_id || ''); setModal('tag'); };

  const salvarVacinas = async () => {
    try {
      setSalvando(true);
      await animalService.atualizarVacinas(alvo.id, campo);
      fecharModal();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao salvar vacinas.');
    } finally { setSalvando(false); }
  };

  const salvarTag = async () => {
    try {
      setSalvando(true);
      await animalService.vincularSmartTag(alvo.id, campo.trim());
      fecharModal();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao vincular a Patinha.');
    } finally { setSalvando(false); }
  };

  const abrirDono = (a) => { setAlvo(a); setDonoForm({ dono_nome: a.dono_nome || '', dono_telefone: a.dono_telefone || '', dono_whatsapp: a.dono_whatsapp || '' }); setModal('dono'); };

  const salvarDono = async () => {
    try {
      setSalvando(true);
      await animalService.atualizarDono(alvo.id, donoForm);
      fecharModal();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao salvar o contato do dono.');
    } finally { setSalvando(false); }
  };

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Nossos animais</h1>
          <p>Cadastre e gerencie os animais da sua ONG. A adoção acontece no app — aqui você mantém o acervo.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <S.Btn $variant="ghost" $sm onClick={carregar}><RefreshCw size={15} /> Atualizar</S.Btn>
          <S.Btn $variant="primary" onClick={() => setModal('novo')}><Plus size={17} /> Cadastrar animal</S.Btn>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : animais.length === 0 ? (
          <S.Empty style={{ border: 'none' }}>
            <PawPrint size={30} style={{ opacity: 0.4 }} /><br />
            Nenhum animal cadastrado ainda. Clique em “Cadastrar animal”.
          </S.Empty>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <S.Table>
              <thead>
                <tr>
                  <th style={{ width: 64 }}>Foto</th>
                  <th>Nome</th>
                  <th>Espécie</th>
                  <th>Raça</th>
                  <th>Idade</th>
                  <th>Situação</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {animais.map((a) => (
                  <tr key={a.id}>
                    <td>
                      {a.fotos && a.fotos[0] ? (
                        <img src={a.fotos[0]} alt={a.nome} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <PawPrint size={18} style={{ color: 'var(--blue)' }} />
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{a.nome}</td>
                    <td style={{ color: 'var(--ink-soft)' }}>{a.especie}</td>
                    <td style={{ color: 'var(--ink-soft)' }}>{a.raca || '—'}</td>
                    <td>{a.idade}</td>
                    <td><S.Badge $tone={STATUS_TONE[a.status_posse] || 'gray'}>{a.status_posse || 'Disponível'}</S.Badge></td>
                    <td>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap' }}>
                        <S.Select
                          style={{ width: 'auto', padding: '6px 8px', fontSize: 13 }}
                          value={a.status_posse || 'Disponível'}
                          onChange={(e) => mudarStatus(a.id, e.target.value)}
                        >
                          {STATUS_OPS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </S.Select>
                        <S.Btn $variant="ghost" $sm onClick={() => abrirVacinas(a)} title="Prontuário de vacinas"><Syringe size={15} /></S.Btn>
                        <S.Btn $variant="ghost" $sm onClick={() => abrirTag(a)} title="Vincular Patinha (Smart Tag)"><Nfc size={15} /></S.Btn>
                        <S.Btn $variant="ghost" $sm onClick={() => abrirDono(a)} title="Contato do dono/tutor"><UserRound size={15} /></S.Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </div>
        )}
      </S.Card>

      {/* MODAL: novo animal */}
      {modal === 'novo' && (
        <S.Overlay onClick={fecharModal}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Cadastrar animal</h3>
            <p className="modal-sub">Os dados aparecem para os adotantes no app Nima.</p>
            <form onSubmit={cadastrar}>
              <S.Field>Nome
                <S.Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex: Pipoca" />
              </S.Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <S.Field>Espécie
                  <S.Select value={form.especie} onChange={(e) => setForm({ ...form, especie: e.target.value })}>
                    <option>Cão</option><option>Gato</option>
                  </S.Select>
                </S.Field>
                <S.Field>Porte
                  <S.Select value={form.porte} onChange={(e) => setForm({ ...form, porte: e.target.value })}>
                    <option>Pequeno</option><option>Médio</option><option>Grande</option>
                  </S.Select>
                </S.Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <S.Field>Raça
                  <S.Input value={form.raca} onChange={(e) => setForm({ ...form, raca: e.target.value })} placeholder="SRD, Siamês…" />
                </S.Field>
                <S.Field>Idade estimada
                  <S.Input value={form.idade} onChange={(e) => setForm({ ...form, idade: e.target.value })} placeholder="1 ano, 5 meses" />
                </S.Field>
              </div>
              <S.Field>Temperamento
                <S.Textarea value={form.temperamento} onChange={(e) => setForm({ ...form, temperamento: e.target.value })} placeholder="Calmo, brincalhão, se dá bem com crianças…" />
              </S.Field>
              <S.Field>Foto (opcional)
                <S.Input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files?.[0] || null)} />
              </S.Field>

              <div style={{ borderTop: '1px solid var(--line)', margin: '4px 0 14px', paddingTop: 14 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 10 }}>
                  Contato do dono/tutor (opcional — aparece na Patinha antiperda)
                </div>
                <S.Field>Nome do tutor
                  <S.Input value={form.dono_nome} onChange={(e) => setForm({ ...form, dono_nome: e.target.value })} placeholder="Ex: Maria Silva" />
                </S.Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <S.Field>Telefone
                    <S.Input value={form.dono_telefone} onChange={(e) => setForm({ ...form, dono_telefone: e.target.value })} placeholder="(19) 90000-0000" />
                  </S.Field>
                  <S.Field>WhatsApp
                    <S.Input value={form.dono_whatsapp} onChange={(e) => setForm({ ...form, dono_whatsapp: e.target.value })} placeholder="(19) 90000-0000" />
                  </S.Field>
                </div>
              </div>

              <div className="modal-actions">
                <S.Btn type="button" $variant="ghost" onClick={fecharModal}>Cancelar</S.Btn>
                <S.Btn type="submit" $variant="primary" disabled={salvando}>{salvando ? 'Salvando…' : 'Cadastrar'}</S.Btn>
              </div>
            </form>
          </S.ModalCard>
        </S.Overlay>
      )}

      {/* MODAL: vacinas */}
      {modal === 'vacinas' && alvo && (
        <S.Overlay onClick={fecharModal}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Prontuário de vacinas</h3>
            <p className="modal-sub">{alvo.nome} — histórico vacinal e observações de saúde.</p>
            <S.Field>Histórico
              <S.Textarea style={{ minHeight: 140 }} value={campo} onChange={(e) => setCampo(e.target.value)} placeholder="V8/V10, antirrábica, vermifugação…" />
            </S.Field>
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fecharModal}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando} onClick={salvarVacinas}>{salvando ? 'Salvando…' : 'Salvar'}</S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}

      {/* MODAL: smart tag */}
      {modal === 'tag' && alvo && (
        <S.Overlay onClick={fecharModal}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Vincular Patinha</h3>
            <p className="modal-sub">{alvo.nome} — ID da Smart Tag antiperda.</p>
            <S.Field>ID da Patinha
              <S.Input value={campo} onChange={(e) => setCampo(e.target.value)} placeholder="Ex: NIMA-TAG-000123" />
            </S.Field>
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fecharModal}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando || !campo.trim()} onClick={salvarTag}>{salvando ? 'Salvando…' : 'Vincular'}</S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}

      {/* MODAL: contato do dono/tutor */}
      {modal === 'dono' && alvo && (
        <S.Overlay onClick={fecharModal}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Contato do dono</h3>
            <p className="modal-sub">{alvo.nome} — aparece na Patinha antiperda (tem prioridade sobre o contato da ONG).</p>
            <S.Field>Nome do tutor
              <S.Input value={donoForm.dono_nome} onChange={(e) => setDonoForm({ ...donoForm, dono_nome: e.target.value })} placeholder="Ex: Maria Silva" />
            </S.Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <S.Field>Telefone
                <S.Input value={donoForm.dono_telefone} onChange={(e) => setDonoForm({ ...donoForm, dono_telefone: e.target.value })} placeholder="(19) 90000-0000" />
              </S.Field>
              <S.Field>WhatsApp
                <S.Input value={donoForm.dono_whatsapp} onChange={(e) => setDonoForm({ ...donoForm, dono_whatsapp: e.target.value })} placeholder="(19) 90000-0000" />
              </S.Field>
            </div>
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fecharModal}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando} onClick={salvarDono}>{salvando ? 'Salvando…' : 'Salvar'}</S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
