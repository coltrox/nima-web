import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, BookOpen } from 'lucide-react';
import * as S from '../../Panel/panelStyles';
import devService from '../../../services/devService';

// Guias de cuidado — conteúdo da tela Guia do app.
//
// Só o dev edita: é material institucional da Nima, não de cada ONG. O app lê
// apenas os ativos (GET /api/guias), agrupados por categoria e ordenados por
// `ordem`. Aqui os inativos também aparecem, para poder reativar.
//
// `tipo` decide onde o guia aparece no app:
//   rapido   → faixa "Leitura rápida" no topo
//   completo → lista da categoria

// Sugestões, não uma lista fechada: o campo é texto livre para poder criar
// uma seção nova sem mexer no código.
const CATEGORIAS_SUGERIDAS = ['Saúde', 'Bem-estar', 'Alimentação', 'Adestramento', 'Segurança'];

const vazio = {
  categoria: '',
  titulo: '',
  resumo: '',
  conteudo: '',
  icone: '',
  tipo: 'completo',
  ordem: 0,
  ativo: true,
};

export default function Guias() {
  const [guias, setGuias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(null);      // 'form' | 'excluir'
  const [alvo, setAlvo] = useState(null);
  const [form, setForm] = useState(vazio);
  const [salvando, setSalvando] = useState(false);
  const [filtro, setFiltro] = useState('todas');

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      setGuias(await devService.listarGuias());
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao carregar guias.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const categorias = useMemo(() => {
    const vistas = [];
    for (const g of guias) if (g.categoria && !vistas.includes(g.categoria)) vistas.push(g.categoria);
    return vistas;
  }, [guias]);

  const listados = useMemo(
    () => (filtro === 'todas' ? guias : guias.filter((g) => g.categoria === filtro)),
    [guias, filtro],
  );

  const abrirNovo = () => {
    setAlvo(null);
    // Já sugere a próxima posição na categoria filtrada, para não empilhar tudo em 0.
    const naCategoria = guias.filter((g) => g.categoria === filtro);
    setForm({
      ...vazio,
      categoria: filtro === 'todas' ? '' : filtro,
      ordem: naCategoria.length,
    });
    setErro('');
    setModal('form');
  };

  const abrirEdicao = (g) => {
    setAlvo(g);
    setForm({
      categoria: g.categoria ?? '',
      titulo: g.titulo ?? '',
      resumo: g.resumo ?? '',
      conteudo: g.conteudo ?? '',
      icone: g.icone ?? '',
      tipo: g.tipo ?? 'completo',
      ordem: g.ordem ?? 0,
      ativo: g.ativo !== false,
    });
    setErro('');
    setModal('form');
  };

  const salvar = async () => {
    if (!form.categoria.trim() || !form.titulo.trim() || !form.conteudo.trim()) {
      setErro('Categoria, título e conteúdo são obrigatórios.');
      return;
    }
    try {
      setSalvando(true);
      setErro('');
      const dados = {
        ...form,
        categoria: form.categoria.trim(),
        titulo: form.titulo.trim(),
        resumo: form.resumo.trim() || null,
        icone: form.icone.trim() || null,
        ordem: Number(form.ordem) || 0,
      };
      if (alvo) await devService.atualizarGuia(alvo.id, dados);
      else await devService.criarGuia(dados);
      setModal(null);
      setAlvo(null);
      await carregar();
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao salvar o guia.');
    } finally {
      setSalvando(false);
    }
  };

  const alternarAtivo = async (g) => {
    try {
      setErro('');
      await devService.atualizarGuia(g.id, { ativo: !g.ativo });
      await carregar();
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao atualizar o guia.');
    }
  };

  const excluir = async () => {
    try {
      setSalvando(true);
      setErro('');
      await devService.removerGuia(alvo.id);
      setModal(null);
      setAlvo(null);
      await carregar();
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao remover o guia.');
    } finally {
      setSalvando(false);
    }
  };

  const fechar = () => { setModal(null); setAlvo(null); setErro(''); };

  const ativos = guias.filter((g) => g.ativo !== false).length;
  const rapidos = guias.filter((g) => g.tipo === 'rapido' && g.ativo !== false).length;

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Guias</h1>
          <p>O conteúdo da tela Guia do aplicativo. Só os ativos aparecem para o tutor.</p>
        </div>
        <S.Btn $variant="primary" onClick={abrirNovo}><Plus size={16} /> Novo guia</S.Btn>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Grid style={{ marginBottom: 22 }}>
        <S.StatCard><strong>{guias.length}</strong><span>guias cadastrados</span></S.StatCard>
        <S.StatCard><strong>{ativos}</strong><span>visíveis no app</span></S.StatCard>
        <S.StatCard><strong>{rapidos}</strong><span>de leitura rápida</span></S.StatCard>
        <S.StatCard><strong>{categorias.length}</strong><span>categorias</span></S.StatCard>
      </S.Grid>

      <S.Toolbar>
        <S.Select value={filtro} onChange={(e) => setFiltro(e.target.value)} style={{ maxWidth: 240 }}>
          <option value="todas">Todas as categorias</option>
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </S.Select>
      </S.Toolbar>

      {carregando ? (
        <S.Spinner />
      ) : listados.length === 0 ? (
        <S.Empty>
          <BookOpen size={26} />
          <p>
            {guias.length === 0
              ? 'Nenhum guia cadastrado ainda. Enquanto isso, o app mostra um conteúdo inicial próprio.'
              : 'Nenhum guia nesta categoria.'}
          </p>
        </S.Empty>
      ) : (
        <S.Card style={{ padding: 0, overflow: 'hidden' }}>
          <S.Table>
            <thead>
              <tr>
                <th>Guia</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Ordem</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listados.map((g) => (
                <tr key={g.id}>
                  <td>
                    <strong>{g.titulo}</strong>
                    {g.resumo && (
                      <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 3 }}>
                        {g.resumo}
                      </div>
                    )}
                  </td>
                  <td>{g.categoria}</td>
                  <td>
                    <S.Badge $tone={g.tipo === 'rapido' ? 'blue' : 'gray'}>
                      {g.tipo === 'rapido' ? 'Leitura rápida' : 'Completo'}
                    </S.Badge>
                  </td>
                  <td>{g.ordem}</td>
                  <td>
                    <S.Badge $tone={g.ativo !== false ? 'green' : 'gray'}>
                      {g.ativo !== false ? 'Visível' : 'Oculto'}
                    </S.Badge>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <S.Btn
                      $sm
                      $variant="subtle"
                      onClick={() => alternarAtivo(g)}
                      title={g.ativo !== false ? 'Ocultar do app' : 'Mostrar no app'}
                    >
                      {g.ativo !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                    </S.Btn>{' '}
                    <S.Btn $sm $variant="subtle" onClick={() => abrirEdicao(g)} title="Editar">
                      <Pencil size={14} />
                    </S.Btn>{' '}
                    <S.Btn
                      $sm
                      $variant="danger"
                      onClick={() => { setAlvo(g); setModal('excluir'); }}
                      title="Excluir"
                    >
                      <Trash2 size={14} />
                    </S.Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.Card>
      )}

      {/* MODAL criar/editar */}
      {modal === 'form' && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680 }}>
            <h3>{alvo ? 'Editar guia' : 'Novo guia'}</h3>
            <p className="modal-sub">
              "Leitura rápida" aparece na faixa do topo do app; "Completo" entra na lista da categoria.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <S.Field>
                Categoria
                <S.Input
                  list="categorias-guias"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  placeholder="Ex.: Saúde"
                />
                {/* datalist: sugere as existentes sem impedir uma nova */}
                <datalist id="categorias-guias">
                  {[...new Set([...CATEGORIAS_SUGERIDAS, ...categorias])].map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </S.Field>

              <S.Field>
                Tipo
                <S.Select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                  <option value="completo">Completo</option>
                  <option value="rapido">Leitura rápida</option>
                </S.Select>
              </S.Field>
            </div>

            <S.Field>
              Título
              <S.Input
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                placeholder="Ex.: Calendário de vacinas"
              />
            </S.Field>

            <S.Field>
              Resumo <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(opcional)</span>
              <S.Input
                value={form.resumo}
                onChange={(e) => setForm({ ...form, resumo: e.target.value })}
                placeholder="Uma linha explicando o que o tutor vai encontrar."
              />
            </S.Field>

            <S.Field>
              Conteúdo
              <S.Textarea
                value={form.conteudo}
                onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                placeholder="O texto do guia. Use linhas em branco para separar parágrafos."
                style={{ minHeight: 200 }}
              />
            </S.Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <S.Field>
                Ícone <span style={{ color: 'var(--ink-soft)', fontWeight: 400 }}>(opcional)</span>
                <S.Input
                  value={form.icone}
                  onChange={(e) => setForm({ ...form, icone: e.target.value })}
                  placeholder="medkit-outline"
                />
              </S.Field>

              <S.Field>
                Ordem
                <S.Input
                  type="number"
                  value={form.ordem}
                  onChange={(e) => setForm({ ...form, ordem: e.target.value })}
                />
              </S.Field>

              <S.Field>
                Visível no app
                <S.Select
                  value={form.ativo ? 'sim' : 'nao'}
                  onChange={(e) => setForm({ ...form, ativo: e.target.value === 'sim' })}
                >
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </S.Select>
              </S.Field>
            </div>

            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', margin: '4px 0 14px' }}>
              O ícone usa os nomes do Ionicons (o mesmo conjunto do app). Em branco, o app escolhe
              um pela categoria.
            </p>

            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="primary" disabled={salvando} onClick={salvar}>
                {salvando ? 'Salvando…' : 'Salvar guia'}
              </S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}

      {/* MODAL excluir */}
      {modal === 'excluir' && alvo && (
        <S.Overlay onClick={fechar}>
          <S.ModalCard onClick={(e) => e.stopPropagation()}>
            <h3>Excluir guia</h3>
            <p className="modal-sub">
              "{alvo.titulo}" será removido de vez. Se a intenção é só tirar do app por enquanto,
              use <strong>Ocultar</strong>.
            </p>
            <div className="modal-actions">
              <S.Btn type="button" $variant="ghost" onClick={fechar}>Cancelar</S.Btn>
              <S.Btn type="button" $variant="danger" disabled={salvando} onClick={excluir}>
                {salvando ? 'Excluindo…' : 'Excluir'}
              </S.Btn>
            </div>
          </S.ModalCard>
        </S.Overlay>
      )}
    </>
  );
}
