// Ficha pública do pet + leitura da Patinha (Smart Tag). Rotas PÚBLICAS (sem token).
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const petService = {
  // Ficha pública por id (link compartilhável /pets/:id). Não registra leitura.
  async getFicha(id) {
    const r = await fetch(`${API_URL}/pets/${id}`);
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      const err = new Error(e.error || e.message || 'Pet não encontrado.');
      err.status = r.status;
      throw err;
    }
    return r.json();
  },

  // Leitura da tag: com coords faz POST (registra geo); sem coords, GET simples.
  async lerTag(codigo, coords) {
    const cod = encodeURIComponent(codigo);
    const opts = coords
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(coords) }
      : { method: 'GET' };
    const url = coords ? `${API_URL}/tag/${cod}/leitura` : `${API_URL}/tag/${cod}`;
    const r = await fetch(url, opts);
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      const err = new Error(e.error || e.message || 'Patinha não encontrada.');
      err.status = r.status;
      throw err;
    }
    return r.json();
  },
};
