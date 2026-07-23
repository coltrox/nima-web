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

  /**
   * Define a QUANTIDADE TOTAL de Patinhas de uma ONG — não incrementa.
   * 10 deixa a ONG com 10 (numeradas 1..10); 8 depois disso remove as duas
   * últimas e a sequência continua fechada.
   *
   * O backend recusa com 409 quando a redução esbarra numa Patinha já
   * vinculada a um pet (ela está fisicamente na coleira do animal e o link
   * público pararia de funcionar). Nesse caso a resposta traz `bloqueadas`,
   * por isso o erro aqui preserva o corpo inteiro em vez de virar string.
   */
  definirQuantidadeTags: async (ong_id, quantidade, prefixo) => {
    try {
      const response = await axios.put(
        `${API_URL}/ongs/${ong_id}/tags`,
        { quantidade, prefixo },
        authHeader(),
      );
      return response.data;
    } catch (error) {
      const corpo = error.response?.data;
      if (corpo?.bloqueadas) throw corpo;
      throw corpo?.message || corpo?.error || 'Erro ao definir a quantidade de Patinhas.';
    }
  },

  // ------------------------------------------------------------------ GUIAS
  // Conteúdo da tela Guia do app. Só o dev edita: é material institucional da
  // Nima, não de cada ONG.

  listarGuias: async () => {
    try {
      const response = await axios.get(`${API_URL}/guias`, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.response?.data?.message || 'Erro ao listar guias.';
    }
  },

  criarGuia: async (dados) => {
    try {
      const response = await axios.post(`${API_URL}/guias`, dados, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.response?.data?.message || 'Erro ao criar guia.';
    }
  },

  atualizarGuia: async (id, patch) => {
    try {
      const response = await axios.put(`${API_URL}/guias/${id}`, patch, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.response?.data?.message || 'Erro ao atualizar guia.';
    }
  },

  removerGuia: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/guias/${id}`, authHeader());
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.response?.data?.message || 'Erro ao remover guia.';
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
