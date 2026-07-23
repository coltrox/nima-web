import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Syringe, Nfc, RefreshCw, PawPrint, UserRound, Trash2 } from 'lucide-react';
import { animalService } from '../../../services/animalService';
import { tagsService } from '../../../services/tagsService';
import * as S from '../../Panel/panelStyles';

const STATUS_TONE = { 'Disponível': 'green', 'Adotado': 'blue', 'Desaparecido': 'amber' };
const STATUS_OPS = ['Disponível', 'Adotado', 'Desaparecido'];

// `sob_gestao` vem do backend: false = a posse já foi transferida ao tutor
// numa adoção aprovada, e o animal continua listado só pelo `ong_origem_id`.
const ABAS = [
  { v: 'acervo', label: 'Acervo' },
  { v: 'adotados', label: 'Adotados' },
];

const formVazio = { nome: '', especie: 'Cão', raca: '', porte: 'Médio', idade: '', temperamento: '', dono_nome: '', dono_telefone: '', dono_whatsapp: '' };
const donoVazio = { dono_nome: '', dono_telefone: '', dono_whatsapp: '' };

export default function Animais() {
  const [animais, setAnimais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  // 'acervo' = ainda sob gestão da ONG · 'adotados' = posse já transferida
  const [aba, setAba] = useState('acervo');

  // Backend antigo não mandava `sob_gestao`; ausente é tratado como acervo.
  const ehAdotado = (a) => a.sob_gestao === false;
  const listados = useMemo(
    () => animais.filter((a) => (aba === 'adotados' ? ehAdotado(a) : !ehAdotado(a))),
    [animais, aba],
  );
  const contagem = useMemo(
    () => ({
      acervo: animais.filter((a) => !ehAdotado(a)).length,
      adotados: animais.filter(ehAdotado).length,
    }),
    [animais],
  );

  const [modal, setModal] = useState(null); // 'novo' | 'vacinas' | 'tag' | 'dono' | null
  const [form, setForm] = useState(formVazio);
  const [foto, setFoto] = useState(null);
  const [alvo, setAlvo] = useState(null); // animal selecionado p/ vacinas/tag/dono
  const [campo, setCampo] = useState(''); // valor do textarea/input do modal
  const [donoForm, setDonoForm] = useState(donoVazio);
  const [tagsLivres, setTagsLivres] = useState([]);
  const [tagSel, setTagSel] = useState('');   // id de uma tag livre
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

  const fecharModal = () => { setModal(null); setForm(formVazio); setFoto(null); setAlvo(null); setCampo(''); setDonoForm(donoVazio); setTagSel(''); };

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
  const abrirTag = async (a) => {
    setAlvo(a); setTagSel(''); setModal('tag');
    try {
      const todas = await tagsService.listarMinhas();
      setTagsLivres(todas.filter((t) => !t.animal_id));
    } catch (e) {
      setErro(e.message || 'Erro ao carregar Patinhas livres.');
    }
  };

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
    if (!tagSel) { setErro('Escolha uma Patinha livre.'); return; }
    try {
      setSalvando(true);
      setErro('');
      await tagsService.vincular(tagSel, alvo.id);
      fecharModal();
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao vincular a Patinha.');
    } finally { setSalvando(false); }
  };

  const excluir = async (a) => {
    if (!window.confirm(`Excluir o pet "${a.nome}"? Esta ação não pode ser desfeita.`)) return;
    try {
      setErro('');
      await animalService.remover(a.id);
      await carregar();
    } catch (e) {
      setErro(e.message || 'Erro ao excluir o pet.');
    }
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

      {/* A lista inclui os pets que a ONG DEU para adoção: ao aprovar, a posse
          passa para o tutor (ong_id nulo) e o vínculo com a ONG fica em
          ong_origem_id. Sem o filtro, eles se misturariam ao acervo ativo. */}
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

      <S.Card style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <S.Spinner $center />
        ) : listados.length === 0 ? (
          <S.Empty style={{ border: 'none' }}>
            <PawPrint size={30} style={{ opacity: 0.4 }} /><br />
            {animais.length === 0
              ? 'Nenhum animal cadastrado ainda. Clique em “Cadastrar animal”.'
              : aba === 'adotados'
                ? 'Nenhuma adoção concluída ainda.'
                : 'Nenhum animal no acervo ativo.'}
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
                {listados.map((a) => (
                  <tr key={a.id} style={{ opacity: a.sob_gestao === false ? 0.72 : 1 }}>
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
                      {/* Pet já adotado saiu da posse da ONG (tutor_id preenchido,
                          ong_id nulo): as rotas de escrita respondem 404 nele.
                          Em vez de botões que falham, mostramos o histórico. */}
                      {a.sob_gestao === false ? (
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
                          <S.Badge $tone="blue">Adotado — agora é do tutor</S.Badge>
                        </div>
                      ) : (
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
                          <S.Btn $variant="danger" $sm onClick={() => excluir(a)} title="Excluir pet"><Trash2 size={15} /></S.Btn>
                        </div>
                      )}
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
            <p className="modal-sub">{alvo.nome} — escolha uma das Patinhas livres que a Nima enviou pra sua ONG.</p>
            {alvo.smart_tag_id && (
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: -6, marginBottom: 14 }}>
                Patinha atual: <strong style={{ color: 'var(--ink)' }}>{alvo.smart_tag_id}</strong>
              </p>
            )}
            <S.Field>Patinha livre
              <S.Select value={tagSel} onChange={(e) => setTagSel(e.target.value)}>
                <option value="">{tagsLivres.length ? 'Selecione…' : 'Nenhuma Patinha livre'}</option>
                {tagsLivres.map((t) => <option key={t.id} value={t.id}>{t.codigo}</option>)}
              </S.Select>
            </S.Field>
            {tagsLivres.length === 0 && (
              <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                Nenhuma Patinha livre no momento. As Patinhas são enviadas pela Nima — fale com a administração ou solte uma que já esteja vinculada.
              </p>
            )}
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fecharModal}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando || !tagSel} onClick={salvarTag}>{salvando ? 'Salvando…' : 'Vincular'}</S.Btn>
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
