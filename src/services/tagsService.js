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
  // Todas as Patinhas da ONG (cada uma com o pet vinculado, se houver).
  // A ONG NÃO cria/exclui tag — quem fabrica é o dev; aqui ela só relaciona.
  listarMinhas: () => fetch(`${API_URL}/tags/minhas`, { headers: auth() }).then((r) => json(r, 'Erro ao listar Patinhas.')),

  // Vincula a Patinha a um pet
  vincular: (id, animal_id) => fetch(`${API_URL}/tags/${id}/vincular`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify({ animal_id }),
  }).then((r) => json(r, 'Erro ao vincular Patinha.')),

  // Solta a Patinha (volta a ficar livre)
  desvincular: (id) => fetch(`${API_URL}/tags/${id}/desvincular`, {
    method: 'PUT', headers: auth(),
  }).then((r) => json(r, 'Erro ao desvincular Patinha.')),

  // ------------------------------------------------------ ENTREGA (018)
  // Reservar é a autorização de entrega: sem ela o tutor não resgata nem
  // sabendo o código. Os códigos são sequenciais (NIMA-0001, 0002…), então
  // "saber o código" sozinho não prova nada.
  reservar: (id, { tutor_id, email }) => fetch(`${API_URL}/tags/${id}/reservar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...auth() },
    body: JSON.stringify(tutor_id ? { tutor_id } : { email }),
  }).then((r) => json(r, 'Erro ao reservar a Patinha.')),

  cancelarReserva: (id) => fetch(`${API_URL}/tags/${id}/reserva`, {
    method: 'DELETE', headers: auth(),
  }).then((r) => json(r, 'Erro ao cancelar a reserva.')),

  // ------------------------------------------------- PEDIDOS DE PATINHA
  // Tutores pedem pelo app (doação ou voluntariado); a ONG despacha aqui.
  // A resposta traz { pedidos, tags_livres } — as livres são o que ela
  // consegue entregar agora.
  listarPedidos: () => fetch(`${API_URL}/ong/patinhas/pedidos`, { headers: auth() })
    .then((r) => json(r, 'Erro ao listar pedidos de Patinha.')),

  // patch: { status?, resposta?, tag_id? }
  // Informando tag_id e havendo pet no pedido, a tag é vinculada de verdade.
  decidirPedido: (id, patch) => fetch(`${API_URL}/ong/patinhas/pedidos/${id}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', ...auth() }, body: JSON.stringify(patch),
  }).then((r) => json(r, 'Erro ao atualizar o pedido.')),
};
