import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx'; 
import LoginScreen from './pages/Auth/Login/index.jsx';     
import DevDashboard from './pages/Home/Dev/DevDashboard.jsx'; 
import OngDashboard from './pages/Home/Ong/OngDashboard.jsx'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota inicial: Redireciona obrigatoriamente para o Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Tela de Login Principal */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* Painel Exclusivo do Desenvolvedor (Métricas globais e infraestrutura) */}
          <Route path="/dev-dashboard/*" element={<DevDashboard />} />

          {/* Painel Exclusivo da ONG (Animais, triagens da IA, redes sociais e termos) */}
          <Route path="/ong-dashboard/*" element={<OngDashboard />} />
          
          {/* Qualquer rota inexistente ou antiga manda o usuário de volta para o Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;