import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Loader2, Heart, ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import authService from '../authService';
import './Login.css';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    try {
      const data = await authService.login(email, password);
      
      if (data.token) {
        sessionStorage.setItem('@nima_token', data.token);
      }
      
      // Armazena o cargo para controle de estado, se necessário
      if (data.user?.cargo) {
        sessionStorage.setItem('@nima_user_role', data.user.cargo);
      }

      // CORREÇÃO: Redirecionamento baseado nas novas regras de negócio e rotas de destino
      if (data.user?.cargo === 'desenvolvedor') {
        navigate('/dev-dashboard');
      } else if (data.user?.cargo === 'ong') {
        navigate('/ong-dashboard');
      } else {
        // Fallback preventivo caso seja um usuário comum sem painel estruturado
        setErrorMessage('Este painel é restrito para Desenvolvedores e ONGs cadastradas.');
      }

    } catch (error) {
      setErrorMessage(typeof error === 'string' ? error : 'Falha na autenticação corporativa. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="background-blob blob-top" />
      <div className="background-blob blob-bottom" />
      
      <div className="login-grid-layout">
        {/* Lado Esquerdo: Banner Informativo voltado a Organizações e Governança */}
        <div className="login-sidebar-banner">
          <div className="sidebar-content-wrapper">
            <div className="sidebar-logo-area">
              <PawPrint size={38} className="sidebar-logo-icon" />
              <span className="sidebar-logo-text">nima<span>.</span></span>
            </div>
            
            <h2 className="sidebar-title">Painel de Controle e Governança do Ecossistema</h2>
            <p className="sidebar-subtitle">
              Módulo Central Web unificado para a triagem semântica de solicitações, homologação de ONGs parceiras e monitoramento estatístico.
            </p>

            <div className="sidebar-features-list">
              <div className="sidebar-feature-item">
                <div className="feature-icon-box pink-variant">
                  <Heart size={22} />
                </div>
                <div className="feature-text-box">
                  <h4>Triagem Semântica por IA</h4>
                  <p>Relatórios gerados dinamicamente detalhando a viabilidade comportamental da adoção, mitigando as taxas de devolução.</p>
                </div>
              </div>

              <div className="sidebar-feature-item">
                <div className="feature-icon-box green-variant">
                  <ShieldCheck size={22} />
                </div>
                <div className="feature-text-box">
                  <h4>Console do Desenvolvedor & CLI</h4>
                  <p>Área restrita para manutenção das regras de negócio do back-end, auditoria de logs e provisionamento de Smart Tags físicas.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-footer">
            <p>© 2026 Nima Ecosystem. Painel Corporativo desenvolvido para Etec Bento Quirino.</p>
          </div>
        </div>

        {/* Lado Direito: Área de Formulário Restrito */}
        <div className="login-form-area">
          <div className="login-card-wrapper">
            <header className="login-card-header">
              <div className="login-logo-mobile">
                <PawPrint size={32} className="login-logo-icon" />
              </div>
              <h1 className="login-header-title">Acesso Restrito</h1>
              <p className="login-header-subtitle">Insira suas credenciais institucionais para acessar o painel de ONGs ou desenvolvedores.</p>
            </header>

            <main className="login-content-area">
              <form onSubmit={handleLogin} className="login-form">
                
                {errorMessage && (
                  <div className="login-error-container">
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="login-input-group">
                  <label className="login-input-label">E-mail Corporativo ou Dev</label>
                  <div className="login-input-field-wrapper">
                    <Mail size={18} className="login-input-icon" />
                    <input 
                      type="email" 
                      placeholder="nome.sobrenome@nima.org" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="login-input"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="login-input-group">
                  <label className="login-input-label">Senha Administrativa</label>
                  <div className="login-input-field-wrapper">
                    <Lock size={18} className="login-input-icon" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="login-input"
                      required
                      disabled={loading}
                    />
                    <button 
                      type="button" 
                      className="login-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button type="submit" className="login-action-button" disabled={loading}>
                  {loading ? (
                    <div className="login-loading-wrapper">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Autenticando credenciais...</span>
                    </div>
                  ) : (
                    "Autenticar no Sistema"
                  )}
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;