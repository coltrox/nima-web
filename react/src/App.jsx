import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Landing from './pages/Landing/index.jsx';
import LoginScreen from './pages/Auth/Login/index.jsx';
import DevDashboard from './pages/Home/Dev/DevDashboard.jsx';
import OngDashboard from './pages/Home/Ong/OngDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* adotenima.com.br → landing pública */}
          <Route path="/" element={<Landing />} />

          {/* adotenima.com.br/login → painel de ONGs e administração */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Painel do administrador (homologação de ONGs, métricas) */}
          <Route path="/dev-dashboard/*" element={<DevDashboard />} />

          {/* Painel da ONG (animais, candidaturas, campanhas) */}
          <Route path="/ong-dashboard/*" element={<OngDashboard />} />

          {/* Rota inexistente volta para a landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
