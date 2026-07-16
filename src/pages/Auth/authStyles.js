import styled, { keyframes } from 'styled-components';

// Estilos das telas de auth (login / cadastro) alinhados ao design da landing:
// mesmas cores (--sand/--paper/--ink/--blue/--navy/--honey) e tipografia (Bricolage + Figtree).

const spin = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
`;

export const Page = styled.div`
  min-height: 100svh;
  background: var(--sand);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  font-family: var(--body);
`;

export const Shell = styled.div`
  width: 100%;
  max-width: ${(p) => (p.$wide ? '640px' : '920px')};
  display: grid;
  grid-template-columns: ${(p) => (p.$wide ? '1fr' : '0.85fr 1.15fr')};
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(12, 35, 64, 0.14);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
`;

export const BrandSide = styled.div`
  background: var(--ink);
  color: #fff;
  padding: 44px 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 28px;

  img {
    height: 28px;
    width: auto;
    display: block;
  }

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: 25px;
    line-height: 1.2;
    margin: 22px 0 12px;
  }

  p {
    color: rgba(255, 255, 255, 0.72);
    font-size: 14.5px;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

export const BrandPoints = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 13px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.86);
  }

  svg {
    flex-shrink: 0;
    color: var(--honey);
    margin-top: 1px;
  }
`;

export const FormSide = styled.div`
  padding: 44px 40px;

  @media (max-width: 480px) {
    padding: 32px 22px;
  }
`;

export const MobileBrand = styled.div`
  display: none;
  margin-bottom: 18px;

  img {
    height: 28px;
    width: auto;
  }

  @media (max-width: 860px) {
    display: block;
  }
`;

export const Back = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-soft);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 14px;

  &:hover {
    color: var(--ink);
  }
`;

export const Title = styled.h1`
  font-family: var(--display);
  font-weight: 700;
  font-size: 27px;
  color: var(--ink);
  margin: 0 0 8px;
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0 0 26px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${(p) => (p.$two ? '1fr 1fr' : '1fr')};
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const Label = styled.label`
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ink);
`;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg.ic {
    position: absolute;
    left: 14px;
    color: var(--ink-soft);
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${(p) => (p.$icon ? '13px 14px 13px 42px' : '13px 14px')};
  border-radius: 12px;
  border: 1.5px solid var(--ink-line);
  background: var(--paper);
  font-family: var(--body);
  font-size: 15px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 4px rgba(1, 81, 200, 0.1);
  }

  &:disabled {
    background: var(--sand);
    color: var(--ink-soft);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 13px 14px;
  min-height: 84px;
  resize: vertical;
  border-radius: 12px;
  border: 1.5px solid var(--ink-line);
  background: var(--paper);
  font-family: var(--body);
  font-size: 15px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: var(--blue);
    box-shadow: 0 0 0 4px rgba(1, 81, 200, 0.1);
  }

  &:disabled {
    background: var(--sand);
  }
`;

export const Eye = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 8px;

  &:hover {
    color: var(--ink);
    background: var(--sand);
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background: var(--blue);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  font-family: var(--body);
  text-decoration: none;
  box-shadow: 0 10px 24px rgba(1, 81, 200, 0.28);
  transition: transform 0.15s, background 0.15s;
  margin-top: 4px;

  &:hover:not(:disabled) {
    background: var(--blue-deep);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .spin {
    animation: ${spin} 0.8s linear infinite;
  }
`;

export const ErrorBox = styled.div`
  background: #fff2f2;
  border: 1px solid rgba(220, 38, 38, 0.22);
  color: #b91c1c;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

export const Foot = styled.p`
  text-align: center;
  font-size: 14px;
  color: var(--ink-soft);
  margin: 4px 0 0;

  a {
    color: var(--blue);
    font-weight: 600;
    text-decoration: none;
  }
`;

export const Success = styled.div`
  text-align: center;
  padding: 12px 0;

  svg {
    color: var(--moss);
    margin: 0 auto 14px;
    display: block;
  }
`;
