// Equipe da própria ONG (quem tem acesso ao painel dela).
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });

async function json(r, msgFallback) {
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    throw new Error(e.error || e.message || msgFallback);
  }
  return r.json();
}

export const equipeService = {
  // Conta principal da ONG + membros
  listar: () => fetch(`${API_URL}/ong/equipe`, { headers: auth() }).then((r) => json(r, 'Erro ao carregar a equipe.')),

  // Adiciona um membro (cargo é sempre 'ong' no backend)
  criar: (dados) => fetch(`${API_URL}/ong/equipe`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify(dados),
  }).then((r) => json(r, 'Erro ao adicionar membro.')),

  // Suspende/reativa um membro
  setAtivo: (id, ativo) => fetch(`${API_URL}/ong/equipe/${id}/ativo`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify({ ativo }),
  }).then((r) => json(r, 'Erro ao atualizar o membro.')),

  // Define o que o membro pode fazer (só a conta principal)
  setPermissoes: (id, permissoes) => fetch(`${API_URL}/ong/equipe/${id}/permissoes`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify({ permissoes }),
  }).then((r) => json(r, 'Erro ao salvar permissões.')),
};
