// Candidaturas de adoção vistas pela ONG (com dossiê + parecer da IA).
const API_URL = `${import.meta.env.VITE_API_URL}/api`;
const auth = () => ({ Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` });

export const solicitacaoService = {
  // Solicitações dos animais da ONG logada (candidato + animal + dossiê da IA)
  async listarDaOng() {
    const r = await fetch(`${API_URL}/solicitacoes`, { headers: auth() });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao listar candidaturas.');
    }
    return r.json();
  },

  // Aceita/recusa uma candidatura. status: 'aprovada' | 'recusada'.
  // ACEITAR não transfere o pet ainda — só reserva e libera combinar a entrega.
  async decidir(id, status) {
    const r = await fetch(`${API_URL}/solicitacoes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...auth() },
      body: JSON.stringify({ status }),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao decidir candidatura.');
    }
    return r.json();
  },

  // Passo 2: marca a adoção como ENTREGUE. É aqui que a posse (e a Patinha)
  // passam ao tutor e o pet vira "Adotado".
  async entregar(id) {
    const r = await fetch(`${API_URL}/solicitacoes/${id}/entregar`, {
      method: 'PUT',
      headers: auth(),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || e.message || 'Erro ao registrar a entrega.');
    }
    return r.json();
  },
};
