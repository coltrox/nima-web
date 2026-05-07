import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { PawPrint, QrCode, User } from 'lucide-react'; // Ícones para web
import './Home.css';

// Importe suas telas adaptadas para web aqui
import FeedScreen from '../Feed/Feed';

const Home = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="home-wrapper">
      {/* Área onde as telas serão renderizadas */}
      <main className="home-content">
        <Routes>
          <Route path="/" element={<FeedScreen />} />
          <Route path="/smart-tag" element={<SmartTagScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/pet-record" element={<PetRecordScreen />} />
          <Route path="/pet-detail/:id" element={<PetDetailScreen />} />
        </Routes>
      </main>

      {/* Tab Bar (Menu Inferior) */}
      <nav className="bottom-tabs">
        <Link to="/home" className={`tab-item ${isActive('/home') ? 'active' : ''}`}>
          <PawPrint size={24} />
          <span>Pets</span>
        </Link>

        <Link to="/home/smart-tag" className={`tab-item ${isActive('/home/smart-tag') ? 'active' : ''}`}>
          <QrCode size={24} />
          <span>IoT Tag</span>
        </Link>

        <Link to="/home/profile" className={`tab-item ${isActive('/home/profile') ? 'active' : ''}`}>
          <User size={24} />
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default Home;