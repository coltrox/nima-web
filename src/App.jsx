import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Landing from './pages/Landing/index.jsx';
import ParaOngs from './pages/Ong/ParaOngs/index.jsx';
import LoginScreen from './pages/Auth/Login/index.jsx';
import OngRegister from './pages/Auth/OngRegister/index.jsx';
import DevDashboard from './pages/Home/Dev/DevDashboard.jsx';
import OngDashboard from './pages/Home/Ong/OngDashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* adotenima.com.br → landing pública */}
          <Route path="/" element={<Landing />} />

          {/* ---------------- ONG ---------------- */}
          {/* Página pública de captação de ONGs */}
          <Route path="/ong" element={<ParaOngs />} />
          {/* Cadastro self-service (fica pendente até o dev homologar) */}
          <Route path="/ong/registro" element={<OngRegister />} />
          {/* Login da ONG */}
          <Route path="/ong/login" element={<LoginScreen role="ong" />} />
          {/* Painel da ONG — protegido */}
          <Route
            path="/ong/painel/*"
            element={
              <ProtectedRoute role="ong" loginPath="/ong/login">
                <OngDashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------------- DEV ---------------- */}
          {/* Login do desenvolvedor */}
          <Route path="/dev/login" element={<LoginScreen role="desenvolvedor" />} />
          {/* Painel do dev (homologação/governança) — protegido */}
          <Route
            path="/dev/*"
            element={
              <ProtectedRoute role="desenvolvedor" loginPath="/dev/login">
                <DevDashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------- Redirects legados ---------- */}
          <Route path="/login" element={<Navigate to="/ong/login" replace />} />
          <Route path="/dev-dashboard/*" element={<Navigate to="/dev" replace />} />
          <Route path="/ong-dashboard/*" element={<Navigate to="/ong/painel" replace />} />

          {/* Rota inexistente volta para a landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
