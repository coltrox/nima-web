// Vagas de voluntariado da ONG + inscritos (candidatos).
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });

export const voluntariadoService = {
  // Vagas da própria ONG (inclui inativas)
  async listarMinhas() {
    const r = await fetch(`${API_URL}/vagas/minhas`, { headers: auth() });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao listar vagas.');
    }
    return r.json();
  },

  // Cria uma vaga. dados: { titulo, descricao? }
  async criar(dados) {
    const r = await fetch(`${API_URL}/vagas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...auth() },
      body: JSON.stringify(dados),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao criar vaga.');
    }
    return r.json();
  },

  // Inscrições (candidatos) nas vagas da ONG, cada uma com vaga_titulo + candidato
  async listarInscricoes() {
    const r = await fetch(`${API_URL}/vagas/inscricoes`, { headers: auth() });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao listar inscrições.');
    }
    return r.json();
  },

  // Aceita/recusa um candidato — aceitar é o que preenche a vaga.
  async decidir(inscricaoId, status) {
    const r = await fetch(`${API_URL}/vagas/inscricoes/${inscricaoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...auth() },
      body: JSON.stringify({ status }),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao atualizar o candidato.');
    }
    return r.json();
  },

  // Exclui a vaga (leva as inscrições junto)
  async remover(id) {
    const r = await fetch(`${API_URL}/vagas/${id}`, { method: 'DELETE', headers: auth() });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao excluir a vaga.');
    }
    return r.json();
  },
};
