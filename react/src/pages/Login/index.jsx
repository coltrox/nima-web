import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Loader2, Heart, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'
import './login.css';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/home');
    } catch (error) {
      alert('Erro no Login');
    }
  };

  return (
    <div className="scroll-container">
      <header className="header">
        <PawPrint size={30} color="#FFFFFF" style={{ marginRight: '10px' }} />
        <h1 className="header-title">Pet<span className="highlight-text">Lar</span></h1>
      </header>

      <main className="content">
        <div className="form-area">
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Entrar"}
            </button>
          </form>
        </div>

        <section className="info-section">
          <div className="card">
            <Heart size={35} color="#00BCD4" />
            <h4>Match Inteligente</h4>
            <p>Nossa IA analisa sua rotina para sugerir o pet ideal.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginScreen;