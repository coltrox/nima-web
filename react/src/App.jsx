import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './pages/contexts/AuthContext'; 
import LoginScreen from './pages/Login/index';
import HomeScreen from './pages/Home/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rota inicial: manda para o Login */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Tela de Login */}
          <Route path="/login" element={<LoginScreen />} />
          
          {/* A Home e todas as suas sub-rotas (Feed, Perfil, etc). 
            O '/*' é fundamental para que as rotas dentro de Home.jsx funcionem.
          */}
          <Route path="/home/*" element={<HomeScreen />} />
          
          {/* Caso o usuário digite uma URL que não existe */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;