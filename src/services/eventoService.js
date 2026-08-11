// Eventos da ONG (migração 018): feira de adoção, mutirão, campanha.
//
// Diferente de `voluntariadoService` (vagas = trabalho contínuo): evento é
// pontual, tem data e local, e a ONG marca presença depois que ele acontece.
// A presença confirmada é o que libera uma Patinha para o voluntário.
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });
const jsonHeaders = () => ({ 'Content-Type': 'application/json', ...auth() });

async function json(r, msgFallback) {
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    throw new Error(e.error || e.message || msgFallback);
  }
  return r.json();
}

export const eventoService = {
  // Eventos da ONG logada, inclusive os já encerrados.
  listarMeus: () => fetch(`${API_URL}/eventos/meus`, { headers: auth() })
    .then((r) => json(r, 'Erro ao carregar seus eventos.')),

  // Candidatos de TODOS os eventos da ONG, de uma vez.
  listarParticipacoes: () => fetch(`${API_URL}/eventos/participacoes`, { headers: auth() })
    .then((r) => json(r, 'Erro ao carregar as candidaturas.')),

  criar: (evento) => fetch(`${API_URL}/eventos`, {
    method: 'POST', headers: jsonHeaders(), body: JSON.stringify(evento),
  }).then((r) => json(r, 'Erro ao criar o evento.')),

  atualizar: (id, patch) => fetch(`${API_URL}/eventos/${id}`, {
    method: 'PUT', headers: jsonHeaders(), body: JSON.stringify(patch),
  }).then((r) => json(r, 'Erro ao atualizar o evento.')),

  remover: (id) => fetch(`${API_URL}/eventos/${id}`, {
    method: 'DELETE', headers: auth(),
  }).then((r) => json(r, 'Erro ao remover o evento.')),

  // status: 'aceito' | 'recusado' | 'pendente'
  decidir: (participacaoId, status) => fetch(`${API_URL}/eventos/participacoes/${participacaoId}`, {
    method: 'PUT', headers: jsonHeaders(), body: JSON.stringify({ status }),
  }).then((r) => json(r, 'Erro ao decidir a candidatura.')),

  // Marca (ou desfaz) a presença. O backend recusa se a candidatura não foi
  // aceita ou se o evento ainda não começou.
  marcarPresenca: (participacaoId, presente = true) => fetch(
    `${API_URL}/eventos/participacoes/${participacaoId}/presenca`,
    { method: 'PUT', headers: jsonHeaders(), body: JSON.stringify({ presente }) },
  ).then((r) => json(r, 'Erro ao marcar presença.')),

  // Transfere uma Patinha do estoque da ONG direto pra posse do voluntário
  // presente. Exige presença confirmada e Patinha livre no estoque.
  transferirPatinha: (participacaoId) => fetch(
    `${API_URL}/eventos/participacoes/${participacaoId}/patinha`,
    { method: 'POST', headers: auth() },
  ).then((r) => json(r, 'Erro ao transferir a Patinha.')),
};
