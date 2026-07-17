// Vaquinhas da ONG (a ONG cadastra o PRÓPRIO PIX; o sistema só divulga).
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });

export const vaquinhaService = {
  // Vaquinhas da própria ONG (inclui inativas)
  async listarMinhas() {
    const r = await fetch(`${API_URL}/vaquinhas/minhas`, { headers: auth() });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao listar vaquinhas.');
    }
    return r.json();
  },

  // Cria uma vaquinha. dados: { titulo, descricao?, meta?, pix_copia_cola, pix_chave? }
  async criar(dados) {
    const r = await fetch(`${API_URL}/vaquinhas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth() },
      body: JSON.stringify(dados),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao criar vaquinha.');
    }
    return r.json();
  },

  // Edita/ativa/desativa. patch pode conter titulo, descricao, meta, pix_copia_cola, pix_chave, ativa
  async atualizar(id, patch) {
    const r = await fetch(`${API_URL}/vaquinhas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...auth() },
      body: JSON.stringify(patch),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao atualizar vaquinha.');
    }
    return r.json();
  },
};
