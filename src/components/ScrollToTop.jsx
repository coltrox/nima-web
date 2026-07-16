import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// O React Router mantém a posição do scroll ao trocar de rota (SPA).
// Este componente rola pro topo a cada navegação — ex.: Landing → /ong.
// Âncoras na MESMA página (#ongs, #tag...) não passam por aqui, então seguem funcionando.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
