// Registro de Patinhas (Smart Tags) da ONG.
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });

async function json(r, msgFallback) {
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    throw new Error(e.error || e.message || msgFallback);
  }
  return r.json();
}

export const tagsService = {
  // Todas as Patinhas da ONG (cada uma com o pet vinculado, se houver)
  listarMinhas: () => fetch(`${API_URL}/tags/minhas`, { headers: auth() }).then((r) => json(r, 'Erro ao listar Patinhas.')),

  // Cria uma Patinha livre
  criar: (codigo) => fetch(`${API_URL}/tags`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify({ codigo }),
  }).then((r) => json(r, 'Erro ao criar Patinha.')),

  // Vincula a Patinha a um pet
  vincular: (id, animal_id) => fetch(`${API_URL}/tags/${id}/vincular`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify({ animal_id }),
  }).then((r) => json(r, 'Erro ao vincular Patinha.')),

  // Solta a Patinha (volta a ficar livre)
  desvincular: (id) => fetch(`${API_URL}/tags/${id}/desvincular`, {
    method: 'PUT', headers: auth(),
  }).then((r) => json(r, 'Erro ao desvincular Patinha.')),

  // Remove a Patinha do registro
  remover: (id) => fetch(`${API_URL}/tags/${id}`, {
    method: 'DELETE', headers: auth(),
  }).then((r) => json(r, 'Erro ao remover Patinha.')),
};
