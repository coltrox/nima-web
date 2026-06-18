import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PawPrint, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Bell, 
  Settings, 
  Search, 
  ChevronRight, 
  ArrowRight,
  User,
  Info,
  LogOut,
  Home as HomeIcon,
  MessageCircle,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

// --- COMPONENTE DO TUTORIAL (ONBOARDING SLIDES) ---
const TutorialWeb = ({ visible, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Bem-vindo ao nima!',
      description: 'O seu match perfeito está a apenas alguns passos de você. Conheça nossa proposta amorosa para encontrar seu novo companheiro.',
      icon: <PawPrint size={64} />,
      backgroundColor: '#FFD1DC', 
    },
    {
      id: 2,
      title: 'Explore Livremente!',
      description: 'Dê uma geral na nossa plataforma! Veja insights, destaques e explore um exemplar das recomendações da nossa Inteligência Artificial.',
      icon: <Heart size={64} />,
      backgroundColor: '#B2E2F2', 
    },
    {
      id: 3,
      title: 'A IA precisa te conhecer',
      description: 'Para receber as suas recomendações reais de match personalizadas, crie sua conta e responda ao nosso questionário divertido!',
      icon: <Sparkles size={64} />,
      backgroundColor: '#C5E1A5', 
    },
    {
      id: 4,
      title: 'Sua segurança em 1º lugar',
      description: 'Para liberar o Match Real e as funções completas de adoção segura, você poderá enviar sua foto e documentos com total privacidade.',
      icon: <ShieldCheck size={64} />,
      backgroundColor: '#FFE082', 
    },
  ];

  if (!visible) return null;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onClose();
    }
  };

  const progressPercent = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="web-modal-overlay">
      <div 
        className="web-slide-card" 
        style={{ backgroundColor: slides[currentSlide].backgroundColor }}
      >
        <button className="web-skip-btn" onClick={onClose}>
          Pular
        </button>

        <div className="web-slide-content">
          <div className="web-slide-icon-wrapper">
            {slides[currentSlide].icon}
          </div>
          <h2 className="web-slide-title">{slides[currentSlide].title}</h2>
          <p className="web-slide-description">{slides[currentSlide].description}</p>
        </div>

        <div className="web-slide-footer">
          <div className="web-progress-bar-container">
            <div 
              className="web-progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button className="web-next-btn" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            <ArrowRight size={18} style={{ marginLeft: 6 }} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DA HOME ---
const Home = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Usando os dados autenticados reais do seu contexto
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSmartInsights, setShowSmartInsights] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [isFirstTimeTutorialVisible, setIsFirstTimeTutorialVisible] = useState(true);
  
  // Controle fictício de progresso do perfil do usuário logado
  const [profileProgress] = useState({ hasPhoto: true, hasForm: false, hasDocs: false });

  const completedSteps = Object.values(profileProgress).filter(Boolean).length;
  const totalSteps = 3;
  const profilePercent = (completedSteps / totalSteps) * 100;
  const isProfileComplete = user && completedSteps === totalSteps;

  const handleLogoutClick = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      alert('Erro ao sair');
    }
  };

  const suggestions = [
    { id: 1, name: 'Luna', breed: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=300&h=400&auto=format&fit=crop' },
    { id: 2, name: 'Thor', breed: 'Bulldog Francês', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=300&h=400&auto=format&fit=crop' },
    { id: 3, name: 'Mel', breed: 'Vira-lata', image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=300&h=400&auto=format&fit=crop' },
  ];

  return (
    <div className="home-wrapper">
      {/* Onboarding fofo inicial */}
      <TutorialWeb 
        visible={isFirstTimeTutorialVisible} 
        onClose={() => setIsFirstTimeTutorialVisible(false)} 
      />

      {/* Header Fofo superior adaptado à Web */}
      <header className="web-header">
        <div className="web-header-left">
          <span className="web-logo">nima<span className="dot-logo">.</span></span>
        </div>
        <div className="web-header-right">
          <button className="web-nav-icon"><Bell size={22} /></button>
          <button className="web-nav-icon"><Settings size={22} /></button>
          
          {user ? (
            <div className="web-user-logged-menu" onClick={handleLogoutClick} title="Clique para sair">
              <div className="web-profile-avatar">
                <User size={20} />
              </div>
              <span className="web-username-text">{user.email?.split('@')[0]}</span>
              <LogOut size={16} className="logout-icon-inline" />
            </div>
          ) : (
            <button className="web-btn-login-trigger" onClick={() => navigate('/')}>
              Entrar
            </button>
          )}
        </div>
      </header>

      {/* Conteúdo rolável centralizado */}
      <div className="home-content">
        <div className="web-layout-content">
          
          {/* Feed Principal Esquerdo */}
          <main className="web-main-feed">
            <section className="web-greeting-box">
              <h1>{user ? `Olá, ${user.email?.split('@')[0]}!` : "Conheça o nima!"}</h1>
              <div className="web-search-wrapper">
                <Search size={20} className="search-icon-inside" />
                <input 
                  type="text" 
                  placeholder="Buscar o seu novo melhor amigo no nima..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </section>

            {/* Banner Informativo base de Perfil */}
            {(!user || !isProfileComplete) && (
              <section className="web-discovery-card">
                <Info size={32} className="info-discovery-icon" />
                <div className="discovery-text">
                  <h3>{!user ? "Modo Descoberta Ativo" : "Perfil em Andamento!"}</h3>
                  <p>
                    {!user 
                      ? "Explore o nima! Abaixo mostramos um exemplar de como funcionam os destaques e matches reais. Faça login para uma experiência completa." 
                      : "Abaixo está um exemplar do painel. Conclua o envio dos seus documentos para ativar os matches definitivos via Inteligência Artificial."}
                  </p>
                </div>
              </section>
            )}

            {/* Destaque do Dia */}
            <section className="web-section">
              <h2 className="web-section-title">Destaque do Dia</h2>
              <div className="web-match-hero-card">
                <img 
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop" 
                  alt="Bento" 
                  className="hero-card-img"
                />
                <div className="hero-card-overlay">
                  <div className="hero-card-details">
                    <h3>Bento, 2 anos</h3>
                    <p>Golden Retriever</p>
                  </div>
                  <div className="hero-badge-match">
                    <span>98% Match</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Grid de Recomendações */}
            <section className="web-section">
              <h2 className="web-section-title">Recomendações sugeridas</h2>
              <div className="web-suggestions-grid">
                {suggestions.map((item) => (
                  <div key={item.id} className="web-pet-card">
                    <div className="pet-card-image-wrapper">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <h4>{item.name}</h4>
                    <p>{item.breed}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar Direita (Apenas visível em telas maiores) */}
          <aside className="web-sidebar">
            {user && (
              <div className="web-sidebar-card progress-sidebar">
                <div className="sidebar-card-header">
                  <h4>Complete seu Perfil</h4>
                  <span className="percent-text">{Math.round(profilePercent)}%</span>
                </div>
                <div className="web-progress-line-bg">
                  <div className="web-progress-line-fill" style={{ width: `${profilePercent}%` }} />
                </div>
                <p className="sidebar-card-desc">Adicione fotos e envie a documentação para liberar o selo de verificado.</p>
              </div>
            )}

            <div className="web-sidebar-card insights-sidebar">
              <div className="sidebar-toggle-header">
                <h4>{showSmartInsights ? "Insights da Semana" : "Compatibilidade"}</h4>
                <button 
                  className="web-toggle-text-btn"
                  onClick={() => setShowSmartInsights(!showSmartInsights)}
                >
                  Alternar view
                </button>
              </div>

              {showSmartInsights ? (
                <div className="web-metrics-vertical">
                  <div className="web-metric-box"><strong>12</strong> <span>Matches</span></div>
                  <div className="web-metric-box"><strong>45</strong> <span>Visualizações</span></div>
                  <div className="web-metric-box"><strong>08</strong> <span>Curtidas</span></div>
                </div>
              ) : (
                <div className="web-cta-box">
                  <h5>Questionário pendente</h5>
                  <p>Melhore seus matches em até 80% agora</p>
                </div>
              )}
            </div>
            
            <div className="web-footer-notes">
              <p>© 2026 nima plataforma pet.</p>
            </div>
          </aside>

        </div>
      </div>

      {/* Tabs Inferiores unificadas (Inspiradas no seu modelo de CSS) */}
      <nav className="bottom-tabs">
        <div className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <HomeIcon size={20} />
          <span>Início</span>
        </div>
        <div className={`tab-item ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>
          <Heart size={20} />
          <span>Matches</span>
        </div>
        <div className={`tab-item ${activeTab === 'adicionar' ? 'active' : ''}`} onClick={() => setActiveTab('adicionar')}>
          <PlusCircle size={20} />
          <span>Anunciar</span>
        </div>
        <div className={`tab-item ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveTab('chats')}>
          <MessageCircle size={20} />
          <span>Conversas</span>
        </div>
      </nav>
    </div>
  );
};

export default Home;