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

  // Visão geral do sistema (contagens reais para os cards do painel).
  overview: async () => {
    try {
      const response = await axios.get(`${API_URL}/overview`, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao carregar visão geral.';
    }
  },

  // Lista todos os usuários. params: { cargo?, ativo?, busca? }
  listarUsuarios: async (params = {}) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`, { params, ...authHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao listar usuários.';
    }
  },

  // Suspende/reativa uma conta (qualquer cargo).
  setUsuarioAtivo: async (id, ativo) => {
    try {
      const response = await axios.patch(`${API_URL}/usuarios/${id}/ativo`, { ativo }, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao atualizar usuário.';
    }
  },

  // Cria um usuário de equipe: dev (cargo 'desenvolvedor') ou membro de ONG (cargo 'ong' + ong_id).
  criarUsuario: async (dados) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios`, dados, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao criar usuário.';
    }
  },

  // Gera um lote de Patinhas para uma ONG (o dev fabrica; a ONG só relaciona).
  criarTags: async (ong_id, quantidade, prefixo) => {
    try {
      const response = await axios.post(`${API_URL}/tags`, { ong_id, quantidade, prefixo }, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao gerar Patinhas.';
    }
  },

  // Lista Patinhas (todas ou de uma ONG via ?ong_id).
  listarTags: async (ong_id) => {
    try {
      const response = await axios.get(`${API_URL}/tags`, { params: ong_id ? { ong_id } : {}, ...authHeader() });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao listar Patinhas.';
    }
  },

  // Remove uma Patinha do estoque.
  removerTag: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tags/${id}`, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erro ao remover Patinha.';
    }
  },
};

export default devService;
