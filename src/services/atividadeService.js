// Linha do tempo da ONG (só a conta principal enxerga).
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });

async function json(r, msgFallback) {
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    throw new Error(e.error || e.message || msgFallback);
  }
  return r.json();
}

export const atividadeService = {
  listar: ({ ator_id, limit } = {}) => {
    const qs = new URLSearchParams();
    if (ator_id) qs.set('ator_id', ator_id);
    if (limit) qs.set('limit', String(limit));
    const sufixo = qs.toString() ? `?${qs}` : '';
    return fetch(`${API_URL}/ong/atividades${sufixo}`, { headers: auth() })
      .then((r) => json(r, 'Erro ao carregar o histórico.'));
  },
};
