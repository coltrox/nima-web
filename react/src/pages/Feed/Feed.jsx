import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, ArrowRight, Dog, Cat } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import './feed.css';

const mockPets = [
  { id: 'p1', name: 'Rex', breed: 'Labrador', age: '2 anos', type: 'dog', status: 'Disponível', score: 95 },
  { id: 'p2', name: 'Mia', breed: 'Siamês', age: '1 ano', type: 'cat', status: 'Disponível', score: 88 },
  { id: 'p3', name: 'Max', breed: 'Pinscher', age: '4 anos', type: 'dog', status: 'Em Análise', score: 62 },
  { id: 'p4', name: 'Luna', breed: 'SRD', age: '3 meses', type: 'dog', status: 'Disponível', score: 75 },
];

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const getScoreColor = (score) => {
    if (score >= 90) return '#00BCD4';
    if (score >= 70) return '#FFEB3B';
    return '#FF5733';
  };

  return (
    <div className="pet-card" onClick={() => navigate(`/home/pet-detail/${pet.id}`)}>
      <div className="pet-card-image-wrapper">
        {pet.type === 'cat' ? <Cat size={40} color="#A8B3C4" /> : <Dog size={40} color="#A8B3C4" />}
      </div>
      
      <div className="pet-card-content">
        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-info">{pet.breed}, {pet.age}</p>
        <p className="pet-status">{pet.status}</p>
        
        <div className="score-pill" style={{ backgroundColor: getScoreColor(pet.score) }}>
          Match: {pet.score}%
        </div>
      </div>
    </div>
  );
};

const FeedScreen = () => {
  const navigate = useNavigate();
  const { compatibilityScore } = useUser();

  const isQuizDone = compatibilityScore > 0;
  const greetingText = isQuizDone 
    ? `Seu Score de Compatibilidade é: ${compatibilityScore}%`
    : 'Faça o Quiz para gerar seu Score de Compatibilidade.';
    
  const subtitleText = isQuizDone
    ? 'Baseado nas suas respostas, aqui estão os pets mais compatíveis!'
    : 'Acesse o Quiz no menu para começar sua análise.';

  return (
    <div className="feed-container">
      <header className="feed-header">
        <h1>PetLar Adoção</h1>
      </header>

      <div className="feed-scroll-content">
        {/* Card de Status do Quiz */}
        <section className="quiz-status-card">
          <h2 className="quiz-status-title">{greetingText}</h2>
          <p className="quiz-status-subtitle">{subtitleText}</p>
          
          {!isQuizDone && (
            <button className="quiz-button" onClick={() => navigate('/home/quiz')}>
              Fazer Quiz Agora
              <ArrowRight size={18} style={{ marginLeft: '5px' }} />
            </button>
          )}
        </section>

        <h2 className="feed-title">Pets Disponíveis</h2>
        
        <div className="pet-list">
          {mockPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedScreen;