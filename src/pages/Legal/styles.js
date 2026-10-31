import styled from 'styled-components';

export const Page = styled.div`
  position: relative;
  min-height: 100dvh;
  background: var(--sand);
  overflow-x: clip;
`;

export const Topo = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 243, 228, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
`;

export const TopoInner = styled.div`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const Marca = styled.img`
  height: 28px;
  width: auto;
  display: block;
`;

export const Voltar = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  font-weight: 600;
  color: var(--blue);

  &:hover {
    text-decoration: underline;
  }
`;

export const Conteudo = styled.main`
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 56px 24px 96px;

  h1 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(30px, 4vw, 42px);
    line-height: 1.12;
    letter-spacing: -0.6px;
    color: var(--ink);
    margin: 14px 0 12px;
  }

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(20px, 2.4vw, 25px);
    line-height: 1.2;
    color: var(--ink);
    margin: 44px 0 14px;
  }

  p,
  li {
    font-size: 16px;
    line-height: 1.7;
    color: var(--ink-soft);
  }

  p {
    margin: 0 0 16px;
  }

  ul {
    margin: 0 0 16px;
    padding-left: 22px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  strong {
    color: var(--ink);
  }

  a {
    color: var(--blue);
    font-weight: 600;
  }
`;

export const Atualizado = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 34px !important;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--paper);
  border: 1px solid var(--line);
  font-size: 13px !important;
  font-weight: 600;
  color: var(--ink-soft);
`;

export const Aviso = styled.div`
  margin-top: 48px;
  padding: 24px 22px;
  border-radius: 20px;
  background: var(--paper);
  border: 1px solid var(--line);

  p {
    margin: 0;
    font-size: 14.5px !important;
    line-height: 1.65;
  }
`;
