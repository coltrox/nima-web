import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Ajustado assumindo que 'contexts' fica na raiz de 'src'
import LoginScreen from './pages/Auth/Login/index.jsx';     // Adicionada a extensão .jsx explícita para o Vite
import HomeScreen from './pages/Home/Home.jsx';       // Adicionada a extensão .jsx explícita para o Vite
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