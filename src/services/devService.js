import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/dev`;

// Anexa o token do dev a cada requisição (rotas /api/dev/* são só de desenvolvedor).
const authHeader = () => ({
  headers: { Authorization: `Bearer ${sessionStorage.getItem('@nima_token')}` },
});

const devService = {
  // Lista ONGs (opcionalmente por status: pendente | aprovada | rejeitada)
  listarOngs: async (status) => {
    try {
      const response = await axios.get(`${API_URL}/ongs`, {
        params: status ? { status } : {},
        ...authHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao carregar ONGs.';
    }
  },

  // Aprova ou rejeita uma ONG. acao: 'aprovar' | 'rejeitar'
  homologar: async (id, acao, motivo) => {
    try {
      const response = await axios.patch(
        `${API_URL}/ongs/${id}/homologar`,
        { acao, motivo },
        authHeader(),
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao homologar ONG.';
    }
  },

  // Edita infos de contato/cadastro de uma ONG.
  atualizarOng: async (id, patch) => {
    try {
      const response = await axios.put(`${API_URL}/ongs/${id}`, patch, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao atualizar ONG.';
    }
  },
};

export default devService;
