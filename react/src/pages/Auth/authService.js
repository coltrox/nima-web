import axios from 'axios';

const API_URL = 'http://172.17.1.98:3000/api/auth';

/**
 * Função interna baseada na fórmula do Módulo 11 para validação real de CPF.
 * Útil caso o painel possua fluxos de cadastro ou checagem de responsáveis técnicos.
 */
const validateCPF = (rawCpf) => {
  if (!rawCpf) return false;
  
  const cleanCpf = rawCpf.replace(/[^\d]+/g, '');

  if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let rest = sum % 11;
  let digit1 = rest < 2 ? 0 : 11 - rest;

  if (digit1 !== parseInt(cleanCpf.charAt(9))) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  rest = sum % 11;
  let digit2 = rest < 2 ? 0 : 11 - rest;

  if (digit2 !== parseInt(cleanCpf.charAt(10))) {
    return false;
  }

  return true;
};

const authService = {
  /**
   * Realiza o login enviando credenciais de Desenvolvedor ou ONG ao backend.
   */
  login: async (identifier, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { 
        email: identifier, 
        password 
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro de conexão com o servidor corporativo';
      throw message;
    }
  },

  /**
   * Registro de novas entidades/ONGs parceiras.
   */
  register: async (userData) => {
    const { nome, email, cpf, password } = userData;

    if (!validateCPF(cpf)) {
      throw 'Por favor, insira um CPF válido para o responsável técnico.';
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        nome,
        email,
        cpf: cpf.replace(/[^\d]+/g, ''),
        password
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao homologar entidade no ecossistema';
      throw message;
    }
  },

  /**
   * Solicita o envio do código de recuperação de credenciais institucionais.
   */
  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao solicitar recuperação de acesso.';
      throw message;
    }
  },

  /**
   * Valida o token de segurança enviado ao e-mail institucional corporativo.
   */
  verifyCode: async (email, code) => {
    try {
      const response = await axios.post(`${API_URL}/verify-code`, { email, code });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Código de verificação inválido.';
      throw message;
    }
  },

  /**
   * Envia a nova senha para atualização no SGBD.
   */
  resetPassword: async (email, code, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { 
        email, 
        code, 
        password: newPassword 
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao redefinir credenciais de acesso.';
      console.error(`[PANEL-WEB-ERR] ${message}`);
      throw message;
    }
  },

  /**
   * Extrai apenas o primeiro nome do desenvolvedor ou gestor logado.
   */
  getFirstName: (fullName) => {
    if (!fullName) return 'Usuário';
    return fullName.trim().split(' ')[0];
  },

  /**
   * Submete o formulário de finalização de parametrização estrutural da ONG.
   */
  completeProfile: async (profileData) => {
    try {
      const token = sessionStorage.getItem('@nima_token');
      const response = await axios.post(`${API_URL}/complete-profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      sessionStorage.setItem('@nima_profile_completed', 'true');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao salvar parametrizações estruturais.';
      throw message;
    }
  }
};

export default authService;