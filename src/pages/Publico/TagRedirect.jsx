import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { petService } from '../../services/petService';
import { Spinner } from '../Panel/panelStyles';

// /tag/:codigo — lê a Patinha (com geo, se permitido) e redireciona pra ficha do pet.
export default function TagRedirect() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState('carregando'); // 'carregando' | 'naovinculada' | 'erro'
  const jaRodou = useRef(false);

  useEffect(() => {
    if (jaRodou.current) return; // evita duplo disparo (StrictMode)
    jaRodou.current = true;

    const ir = async (coords) => {
      try {
        const res = await petService.lerTag(codigo, coords);
        if (res?.animal?.id) navigate(`/pets/${res.animal.id}`, { replace: true });
        else setEstado('erro');
      } catch (e) {
        setEstado(e.status === 404 ? 'naovinculada' : 'erro');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => ir({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => ir(null), // permissão negada / erro: segue sem coords
        { timeout: 6000, maximumAge: 60000 },
      );
    } else {
      ir(null);
    }
  }, [codigo, navigate]);

  const wrap = { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, background: 'var(--sand)', color: 'var(--ink)', fontFamily: 'var(--body)', textAlign: 'center', padding: 24 };

  if (estado === 'carregando') {
    return (
      <div style={wrap}>
        <Spinner $size={34} />
        <p style={{ color: 'var(--ink-soft)', fontSize: 15 }}>Localizando o pet desta Patinha…</p>
      </div>
    );
  }

  if (estado === 'naovinculada') {
    return (
      <div style={wrap}>
        <PawPrint size={40} style={{ color: 'var(--blue)' }} />
        <h1 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 24, margin: 0 }}>Patinha ainda não vinculada</h1>
        <p style={{ color: 'var(--ink-soft)', maxWidth: 440, margin: 0 }}>
          Esta Patinha ainda não está ligada a nenhum pet. Se você é a ONG, entre no painel para relacioná-la a um animal.
        </p>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, padding: '12px 20px' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 600 }}>Código da Patinha</div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontWeight: 800, fontSize: 22, color: 'var(--ink)', letterSpacing: '0.06em' }}>{codigo}</div>
        </div>
        <a href="/ong/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', fontWeight: 700, padding: '11px 20px', borderRadius: 12, textDecoration: 'none', marginTop: 4 }}>
          Sou a ONG — vincular a um pet
        </a>
        <Link to="/" style={{ color: 'var(--ink-soft)', fontSize: 13.5, textDecoration: 'none' }}>Voltar ao Nima</Link>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <PawPrint size={40} style={{ color: 'var(--blue)' }} />
      <h1 style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 24, margin: 0 }}>Não foi possível ler a Patinha</h1>
      <p style={{ color: 'var(--ink-soft)', maxWidth: 420, margin: 0 }}>
        Tente novamente em instantes. Se o problema continuar, a Patinha pode estar com um código inválido.
      </p>
      <Link to="/" style={{ color: 'var(--blue)', fontWeight: 700, textDecoration: 'none' }}>Voltar ao Nima</Link>
    </div>
  );
}
