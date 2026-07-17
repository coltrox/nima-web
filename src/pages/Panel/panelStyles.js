import styled, { keyframes } from 'styled-components';

/* Casca compartilhada dos painéis (ONG e DEV) — no design da landing Nima.
   Sidebar escura (--ink) com a logo branca; conteúdo no tom areia. */

export const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--sand);
  color: var(--ink);
  font-family: var(--body);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Aside = styled.aside`
  width: 264px;
  flex-shrink: 0;
  background: var(--ink);
  color: #fff;
  padding: 26px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    height: auto;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    overflow-x: auto;
    padding: 14px 16px;
  }
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px 18px;
  text-decoration: none;

  img {
    height: 30px;
    width: auto;
  }

  @media (max-width: 900px) {
    padding: 0 8px 0 0;
    img { height: 26px; }
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;

  @media (max-width: 900px) {
    flex-direction: row;
    flex: 1;
    gap: 4px;
  }
`;

export const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 11px 13px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.72);
  font-family: var(--body);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  &.active {
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
  }

  &.active svg {
    color: var(--honey);
  }

  @media (max-width: 900px) {
    width: auto;
    padding: 9px 12px;
    span { display: none; }
  }
`;

export const LogoutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 11px 13px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: rgba(255, 173, 173, 0.9);
  font-family: var(--body);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(229, 72, 77, 0.18);
    color: #ffd7d7;
  }

  @media (max-width: 900px) {
    width: auto;
    span { display: none; }
  }
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  padding: 36px 40px 56px;
  overflow-y: auto;

  @media (max-width: 900px) {
    padding: 24px 18px 40px;
  }
`;

export const PageHead = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 28px;

  h1 {
    font-family: var(--display);
    font-weight: 800;
    font-size: 30px;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin: 0 0 6px;
  }

  p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 14.5px;
    max-width: 640px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols || 3}, 1fr);
  gap: 18px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 1px 2px rgba(12, 35, 64, 0.04);
`;

export const StatCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .label {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--ink-soft);
  }
  .value {
    font-family: var(--display);
    font-weight: 800;
    font-size: 30px;
    color: var(--ink);
    line-height: 1.1;
  }
  .sub {
    font-size: 12.5px;
    color: var(--ink-soft);
  }
`;

export const SectionTitle = styled.h2`
  font-family: var(--display);
  font-weight: 800;
  font-size: 19px;
  color: var(--ink);
  margin: 0 0 16px;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead th {
    padding: 10px 12px;
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--ink-soft);
    border-bottom: 2px solid var(--line);
  }

  tbody td {
    padding: 14px 12px;
    font-size: 14px;
    border-bottom: 1px solid var(--line);
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const tone = {
  blue: ['rgba(1,81,200,0.12)', 'var(--blue)'],
  green: ['rgba(31,157,107,0.14)', 'var(--moss)'],
  amber: ['rgba(255,194,75,0.2)', '#8a5a00'],
  red: ['rgba(229,72,77,0.14)', '#c0343a'],
  gray: ['rgba(12,35,64,0.08)', 'var(--ink-soft)'],
  navy: ['rgba(11,30,69,0.1)', 'var(--navy)'],
};

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: ${(p) => (tone[p.$tone] || tone.gray)[0]};
  color: ${(p) => (tone[p.$tone] || tone.gray)[1]};
  white-space: nowrap;
`;

const variants = {
  primary: 'background: var(--blue); color:#fff; border-color: var(--blue);',
  honey: 'background: var(--honey); color: var(--ink); border-color: var(--honey);',
  danger: 'background: #e5484d; color:#fff; border-color:#e5484d;',
  ghost: 'background: transparent; color: var(--ink); border-color: var(--ink-line);',
  subtle: 'background: var(--sky); color: var(--blue); border-color: transparent;',
};

export const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${(p) => (p.$sm ? '7px 12px' : '10px 16px')};
  border: 1px solid transparent;
  border-radius: 11px;
  font-family: var(--body);
  font-size: ${(p) => (p.$sm ? '13px' : '14.5px')};
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  transition: filter 0.15s ease, background 0.15s ease;
  ${(p) => variants[p.$variant] || variants.primary}

  &:hover:not(:disabled) { filter: brightness(0.96); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 14px;
`;

const controlBase = `
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  color: var(--ink);
  border: 1px solid var(--ink-line);
  border-radius: 10px;
  padding: 10px 12px;
  font-family: var(--body);
  font-size: 14px;
  font-weight: 500;
  &:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px var(--blue-line); }
`;

export const Input = styled.input`${controlBase}`;
export const Select = styled.select`${controlBase} cursor: pointer;`;
export const Textarea = styled.textarea`${controlBase} resize: vertical; min-height: 84px;`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(12, 35, 64, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 16px;
  overflow-y: auto;
  z-index: 60;
`;

export const ModalCard = styled.div`
  background: var(--paper);
  border-radius: 18px;
  width: 100%;
  max-width: 520px;
  padding: 26px;
  box-shadow: 0 24px 60px rgba(12, 35, 64, 0.25);

  h3 {
    font-family: var(--display);
    font-weight: 800;
    font-size: 20px;
    color: var(--ink);
    margin: 0 0 4px;
  }
  .modal-sub {
    color: var(--ink-soft);
    font-size: 13.5px;
    margin: 0 0 18px;
  }
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
`;

export const Empty = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: var(--ink-soft);
  font-size: 14.5px;
  background: var(--paper);
  border: 1px dashed var(--ink-line);
  border-radius: 16px;
`;

export const Alert = styled.div`
  background: rgba(229, 72, 77, 0.1);
  border: 1px solid rgba(229, 72, 77, 0.35);
  color: #c0343a;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

export const Spinner = styled.div`
  width: ${(p) => p.$size || 26}px;
  height: ${(p) => p.$size || 26}px;
  border: 3px solid var(--blue-line);
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  margin: ${(p) => (p.$center ? '48px auto' : '0')};
`;
