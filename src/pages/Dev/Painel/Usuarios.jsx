import React, { useEffect, useMemo, useState } from 'react';
import { Power, Search, Users as UsersIcon, ChevronRight, ChevronDown, Building2, Code2, Crown } from 'lucide-react';
import devService from '../../../services/devService';
import { useAuth } from '../../../contexts/AuthContext';
import * as S from '../../Panel/panelStyles';

// Linha de pessoa reaproveitada nas três seções. Só nome, e-mail e status —
// documento (CPF/CNPJ) não aparece aqui e nem vem mais da API.
function Pessoa({ p, ehVoce, dono, onToggle, recuado }) {
  return (
    <tr>
      <td style={{ paddingLeft: recuado ? 34 : undefined }}>
        <div style={{ fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {dono && <Crown size={13} style={{ color: 'var(--honey)' }} />}
          {p.nome} {ehVoce && <span style={{ fontWeight: 500, color: 'var(--ink-soft)' }}>(você)</span>}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{p.email}</div>
      </td>
      <td>
        <S.Badge $tone={p.ativo === false ? 'red' : 'green'}>{p.ativo === false ? 'Suspenso' : 'Ativo'}</S.Badge>
        {p.ativo === false && p.suspenso_com_ong && (
          <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 3 }}>junto com a ONG</div>
        )}
      </td>
      <td style={{ textAlign: 'right' }}>
        <S.Btn
          $sm
          $variant={p.ativo === false ? 'primary' : 'ghost'}
          disabled={ehVoce}
          onClick={() => onToggle(p)}
          title={ehVoce ? 'Você não pode suspender a própria conta' : (p.ativo === false ? 'Reativar' : 'Suspender')}
        >
          <Power size={14} /> {p.ativo === false ? 'Reativar' : 'Suspender'}
        </S.Btn>
      </td>
    </tr>
  );
}

function Secao({ icone, titulo, sub, children }) {
  return (
    <S.Card style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '13px 16px', borderBottom: '1px solid var(--line)' }}>
        {icone}
        <strong style={{ color: 'var(--ink)' }}>{titulo}</strong>
        <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{sub}</span>
      </div>
      {children}
    </S.Card>
  );
}

export default function Usuarios() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [ativo, setAtivo] = useState('');
  const [busca, setBusca] = useState('');
  const [abertos, setAbertos] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro('');
      // Carrega tudo e agrupa no cliente: o volume é pequeno e assim o filtro
      // de status/busca vale para as três seções sem N chamadas.
      setTodos(await devService.listarUsuarios({}));
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao listar usuários.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { carregar(); }, []);

  const toggle = async (p) => {
    const ehOng = p.cargo === 'ong' && !p.ong_id;
    const acao = p.ativo ? 'suspender' : 'reativar';
    const aviso = ehOng
      ? (p.ativo
        ? `Suspender a ONG "${p.nome}"? A equipe dela perde o acesso junto.`
        : `Reativar a ONG "${p.nome}"? Voltam só os membros que caíram junto com ela.`)
      : `Deseja ${acao} a conta de "${p.nome}"?`;
    if (!window.confirm(aviso)) return;
    try {
      setErro('');
      await devService.setUsuarioAtivo(p.id, !p.ativo);
      await carregar();
    } catch (e) {
      setErro(typeof e === 'string' ? e : 'Erro ao atualizar conta.');
    }
  };

  const { tutores, ongs, devs } = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    const casa = (p) => {
      if (ativo === 'true' && p.ativo === false) return false;
      if (ativo === 'false' && p.ativo !== false) return false;
      if (!termo) return true;
      return `${p.nome} ${p.email}`.toLowerCase().includes(termo);
    };

    const principais = todos.filter((p) => p.cargo === 'ong' && !p.ong_id);
    const porOng = {};
    for (const p of todos) if (p.cargo === 'ong' && p.ong_id) (porOng[p.ong_id] ||= []).push(p);

    return {
      tutores: todos.filter((p) => p.cargo === 'usuario').filter(casa),
      devs: todos.filter((p) => p.cargo === 'desenvolvedor').filter(casa),
      // Uma ONG entra na lista se ela própria casa com a busca OU se algum membro casa.
      ongs: principais
        .map((o) => ({ ...o, membros: (porOng[o.id] || []) }))
        .filter((o) => casa(o) || o.membros.some(casa))
        .map((o) => ({ ...o, membrosFiltrados: o.membros.filter(casa) })),
    };
  }, [todos, busca, ativo]);

  const abrir = (id) => setAbertos((a) => ({ ...a, [id]: !a[id] }));

  return (
    <>
      <S.PageHead>
        <div>
          <h1>Usuários</h1>
          <p>Tutores em lista; ONGs e desenvolvedores agrupados — clique para ver quem está dentro.</p>
        </div>
      </S.PageHead>

      {erro && <S.Alert>⚠️ {erro}</S.Alert>}

      <S.Toolbar>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
          <S.Input style={{ paddingLeft: 34 }} value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome ou e-mail" />
        </div>
        <S.Select style={{ width: 'auto' }} value={ativo} onChange={(e) => setAtivo(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="true">Ativos</option>
          <option value="false">Suspensos</option>
        </S.Select>
      </S.Toolbar>

      {carregando ? (
        <S.Spinner $center />
      ) : (
        <>
          <Secao
            icone={<Building2 size={17} style={{ color: 'var(--blue)' }} />}
            titulo="ONGs"
            sub={`${ongs.length} organizaç${ongs.length === 1 ? 'ão' : 'ões'}`}
          >
            {ongs.length === 0 ? (
              <S.Empty style={{ border: 'none' }}>Nenhuma ONG encontrada.</S.Empty>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <S.Table>
                  <tbody>
                    {ongs.map((o) => (
                      <React.Fragment key={o.id}>
                        <tr style={{ cursor: 'pointer' }} onClick={() => abrir(o.id)}>
                          <td>
                            <div style={{ fontWeight: 700, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              {abertos[o.id] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                              {o.nome}
                              <span style={{ fontWeight: 500, fontSize: 12.5, color: 'var(--ink-soft)' }}>
                                · {o.membros.length} {o.membros.length === 1 ? 'membro' : 'membros'}
                              </span>
                            </div>
                            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', paddingLeft: 21 }}>{o.email}</div>
                          </td>
                          <td><S.Badge $tone={o.ativo === false ? 'red' : 'green'}>{o.ativo === false ? 'Suspensa' : 'Ativa'}</S.Badge></td>
                          <td style={{ textAlign: 'right' }}>
                            <S.Btn
                              $sm
                              $variant={o.ativo === false ? 'primary' : 'ghost'}
                              onClick={(e) => { e.stopPropagation(); toggle(o); }}
                            >
                              <Power size={14} /> {o.ativo === false ? 'Reativar' : 'Suspender'}
                            </S.Btn>
                          </td>
                        </tr>
                        {abertos[o.id] && (o.membrosFiltrados.length === 0 ? (
                          <tr><td colSpan={3} style={{ paddingLeft: 34, fontSize: 12.5, color: 'var(--ink-soft)' }}>Sem membros na equipe.</td></tr>
                        ) : o.membrosFiltrados.map((m) => (
                          <Pessoa key={m.id} p={m} recuado ehVoce={user?.id === m.id} onToggle={toggle} />
                        )))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </S.Table>
              </div>
            )}
          </Secao>

          <Secao
            icone={<Code2 size={17} style={{ color: 'var(--ink)' }} />}
            titulo="Desenvolvedores"
            sub={`${devs.length} conta${devs.length === 1 ? '' : 's'}`}
          >
            <div style={{ padding: '10px 16px' }}>
              <S.Btn $sm $variant="ghost" onClick={() => abrir('__devs__')}>
                {abertos.__devs__ ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {abertos.__devs__ ? 'Ocultar' : 'Ver contas'}
              </S.Btn>
            </div>
            {abertos.__devs__ && (
              devs.length === 0 ? (
                <S.Empty style={{ border: 'none' }}>Nenhum desenvolvedor encontrado.</S.Empty>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <S.Table>
                    <tbody>
                      {devs.map((d) => <Pessoa key={d.id} p={d} ehVoce={user?.id === d.id} onToggle={toggle} />)}
                    </tbody>
                  </S.Table>
                </div>
              )
            )}
          </Secao>

          <Secao
            icone={<UsersIcon size={17} style={{ color: 'var(--moss)' }} />}
            titulo="Tutores"
            sub={`${tutores.length} conta${tutores.length === 1 ? '' : 's'}`}
          >
            {tutores.length === 0 ? (
              <S.Empty style={{ border: 'none' }}>Nenhum tutor encontrado.</S.Empty>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <S.Table>
                  <tbody>
                    {tutores.map((t) => <Pessoa key={t.id} p={t} ehVoce={user?.id === t.id} onToggle={toggle} />)}
                  </tbody>
                </S.Table>
              </div>
            )}
          </Secao>
        </>
      )}
    </>
  );
}
