import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PawPrint, Syringe, MessageCircle, Phone, MapPin, AlertTriangle } from 'lucide-react';
import { petService } from '../../services/petService';
import { Spinner, Badge } from '../Panel/panelStyles';

const STATUS_TONE = { 'Disponível': 'green', 'Adotado': 'blue', 'Desaparecido': 'red' };

function waLink(num) {
  const d = String(num || '').replace(/\D/g, '');
  if (!d) return null;
  const full = d.length <= 11 ? `55${d}` : d;
  return `https://wa.me/${full}`;
}

export default function PetFicha() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setDados(await petService.getFicha(id));
      } catch (e) {
        setErro(e.message || 'Pet não encontrado.');
      } finally {
        setCarregando(false);
      }
    })();
  }, [id]);

  const page = { minHeight: '100vh', background: 'var(--sand)', color: 'var(--ink)', fontFamily: 'var(--body)' };
  const shell = { maxWidth: 640, margin: '0 auto', padding: '20px 18px 48px' };
  const card = { background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 24, boxShadow: '0 2px 10px rgba(12,35,64,0.05)' };

  if (carregando) {
    return <div style={{ ...page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spinner $size={34} /></div>;
  }

  if (erro || !dados) {
    return (
      <div style={{ ...page, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: 24 }}>
        <PawPrint size={40} style={{ color: 'var(--blue)' }} />
        <h1 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 24, margin: 0 }}>Pet não encontrado</h1>
        <p style={{ color: 'var(--ink-soft)', maxWidth: 400, margin: 0 }}>Este link pode estar incorreto ou o pet foi removido.</p>
        <Link to="/" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>Voltar ao Nima</Link>
      </div>
    );
  }

  const { animal, contato } = dados;
  const desaparecido = animal.status_posse === 'Desaparecido';
  const fotos = Array.isArray(animal.fotos) ? animal.fotos.filter(Boolean) : [];
  const wa = contato && waLink(contato.whatsapp);
  const selo = contato?.tipo === 'tutor' ? 'Tutor responsável' : 'ONG responsável';

  return (
    <div style={page}>
      <div style={shell}>
        {/* topo */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 20px' }}>
          <Link to="/"><img src="/nima-logo-trim.png" alt="Nima" style={{ height: 30 }} /></Link>
        </div>

        {desaparecido && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(229,72,77,0.12)', border: '1px solid rgba(229,72,77,0.4)', color: '#c0343a', padding: '12px 16px', borderRadius: 14, fontWeight: 700, marginBottom: 16 }}>
            <AlertTriangle size={18} /> Este pet está <strong>desaparecido</strong>. Se você o encontrou, entre em contato abaixo!
          </div>
        )}

        <div style={card}>
          {/* foto principal */}
          <div style={{ width: '100%', aspectRatio: '4 / 3', borderRadius: 16, overflow: 'hidden', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: fotos.length ? 12 : 0 }}>
            {fotos[0]
              ? <img src={fotos[0]} alt={animal.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <PawPrint size={56} style={{ color: 'var(--blue)', opacity: 0.5 }} />}
          </div>
          {fotos.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {fotos.slice(1, 5).map((f, i) => (
                <img key={i} src={f} alt="" style={{ width: 64, height: 64, borderRadius: 10, objectFit: 'cover' }} />
              ))}
            </div>
          )}

          {/* nome + badges */}
          <h1 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 30, margin: '8px 0 10px', letterSpacing: '-0.01em' }}>{animal.nome}</h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            <Badge $tone={STATUS_TONE[animal.status_posse] || 'gray'}>{animal.status_posse || 'Disponível'}</Badge>
            {animal.especie && <Badge $tone="navy">{animal.especie}</Badge>}
          </div>

          {/* infos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 18 }}>
            {[['Raça', animal.raca], ['Porte', animal.porte], ['Idade', animal.idade]].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--sand)', borderRadius: 12, padding: '10px 12px' }}>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{v || '—'}</div>
              </div>
            ))}
          </div>

          {animal.temperamento && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-soft)', marginBottom: 4 }}>Temperamento</div>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5 }}>{animal.temperamento}</p>
            </div>
          )}

          {/* carteira de vacinação */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Syringe size={16} style={{ color: 'var(--blue)' }} />
              <strong style={{ fontSize: 14 }}>Carteira de vacinação</strong>
            </div>
            <div style={{ background: 'var(--sand)', borderRadius: 12, padding: '12px 14px', fontSize: 14, color: animal.prontuario_vacinas ? 'var(--ink)' : 'var(--ink-soft)', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
              {animal.prontuario_vacinas || 'Sem registro de vacinação informado.'}
            </div>
          </div>

          {/* contato */}
          {contato && (contato.nome || contato.telefone || contato.whatsapp) ? (
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <MapPin size={16} style={{ color: 'var(--blue)' }} />
                <strong style={{ fontSize: 15 }}>Achou este pet? Fale com o responsável</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Badge $tone="gray">{selo}</Badge>
                {contato.nome && <span style={{ fontWeight: 700 }}>{contato.nome}</span>}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {wa && (
                  <a href={wa} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', fontWeight: 700, padding: '11px 18px', borderRadius: 12, textDecoration: 'none' }}>
                    <MessageCircle size={17} /> WhatsApp
                  </a>
                )}
                {contato.telefone && (
                  <a href={`tel:${String(contato.telefone).replace(/\s/g, '')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', fontWeight: 700, padding: '11px 18px', borderRadius: 12, textDecoration: 'none' }}>
                    <Phone size={17} /> {contato.telefone}
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18, color: 'var(--ink-soft)', fontSize: 14 }}>
              Contato do responsável não informado.
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link to="/" style={{ color: 'var(--ink-soft)', fontSize: 13.5, textDecoration: 'none' }}>
            🐾 <strong style={{ color: 'var(--blue)' }}>Nima</strong> — adoção com afinidade de verdade
          </Link>
        </div>
      </div>
    </div>
  );
}
