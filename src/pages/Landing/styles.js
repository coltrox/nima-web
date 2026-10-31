import styled, { css, keyframes } from 'styled-components';

/* ---------------------------------------------------------------- */
/* Base                                                              */
/* ---------------------------------------------------------------- */

export const Page = styled.div`
  position: relative;
  background: var(--sand);
  /* clip, nunca hidden: hidden mata o position:sticky da navbar */
  overflow-x: clip;
`;

export const Wrap = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Section = styled.section`
  position: relative;
  scroll-margin-top: 88px;
  padding: 96px 0;
  background: ${(p) => (p.$paper ? 'var(--paper)' : 'transparent')};
  border-top: 1px solid ${(p) => (p.$paper ? 'var(--line)' : 'transparent')};
  border-bottom: 1px solid ${(p) => (p.$paper ? 'var(--line)' : 'transparent')};

  @media (max-width: 720px) {
    padding: 64px 0;
  }
`;

/* Conteúdo acima das manchas de fundo */
export const Layer = styled.div`
  position: relative;
  z-index: 1;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--sky);
  border: 1px solid var(--blue-line);
  color: var(--blue);
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  margin-bottom: 20px;
`;

export const H2 = styled.h2`
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin: 0 0 16px;
  color: var(--ink);

  em {
    font-style: normal;
    color: var(--blue);
  }
`;

export const Lead = styled.p`
  font-size: 17px;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 620px;
  margin: 0;
`;

export const SectionHead = styled.div`
  margin-bottom: 56px;
  ${(p) =>
    p.$center &&
    css`
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      ${Lead} {
        margin-inline: auto;
      }
    `}
`;

/* ---------------------------------------------------------------- */
/* Botões                                                            */
/* ---------------------------------------------------------------- */

const btnBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 26px;
  min-height: ${(p) => (p.$lg ? '56px' : '48px')};
  border-radius: 16px;
  font-weight: 600;
  font-size: ${(p) => (p.$lg ? '16px' : '15px')};
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const BtnPrimary = styled.a`
  ${btnBase}
  background: var(--blue);
  color: #fff;
  box-shadow: 0 10px 24px rgba(11, 79, 209, 0.28);

  &:hover {
    background: var(--blue-deep);
  }
`;

export const BtnGhost = styled.a`
  ${btnBase}
  background: transparent;
  color: var(--ink);
  border-color: var(--ink-line);

  &:hover {
    background: var(--paper);
    border-color: var(--ink);
  }
`;

export const BtnHoney = styled.a`
  ${btnBase}
  background: var(--honey);
  color: var(--ink);
  box-shadow: 0 10px 24px rgba(255, 194, 75, 0.35);

  &:hover {
    background: #ffb62c;
  }
`;

/* ---------------------------------------------------------------- */
/* Navbar                                                             */
/* ---------------------------------------------------------------- */

export const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 243, 228, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
`;

export const NavInner = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--display);
  font-weight: 700;
  font-size: 20px;
  color: var(--ink);
  text-decoration: none;
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-soft);
  text-decoration: none;

  &:hover {
    color: var(--ink);
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
`;

export const NavBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: background 0.15s ease;

  &:hover {
    background: var(--blue-deep);
  }
`;

/* ---------------------------------------------------------------- */
/* Hero                                                               */
/* ---------------------------------------------------------------- */

export const Hero = styled.section`
  position: relative;
  overflow: clip;
  padding: 72px 0 120px;

  @media (max-width: 720px) {
    padding: 40px 0 96px;
  }
`;

export const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 56px;

  > * {
    min-width: 0;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 72px;
  }
`;

export const HeroTitle = styled.h1`
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(34px, 4.6vw, 54px);
  line-height: 1.08;
  letter-spacing: -1px;
  color: var(--ink);
  margin: 0 0 20px;

  em {
    font-style: normal;
    color: var(--blue);
  }
`;

export const HeroText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 520px;
  margin: 0 0 32px;
`;

export const HeroCtas = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
`;

export const HeroNote = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 0;
  font-size: 14px;
  color: var(--ink-soft);

  svg {
    color: var(--honey);
    flex-shrink: 0;
  }
`;

export const HeroStage = styled.div`
  position: relative;
  z-index: 1;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 960px) {
    min-height: 380px;
  }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

export const FloatChip = styled.div`
  position: ${(p) => (p.$static ? 'static' : 'absolute')};
  top: ${(p) => (p.$static ? 'auto' : p.$top || 'auto')};
  left: ${(p) => (p.$static ? 'auto' : p.$left || 'auto')};
  bottom: ${(p) => (p.$static ? 'auto' : p.$bottom || 'auto')};
  right: ${(p) => (p.$static ? 'auto' : p.$right || 'auto')};
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 220px;
  padding: 12px 14px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 16px 32px rgba(12, 35, 64, 0.14);
  animation: ${(p) => (p.$static ? 'none' : floatY)} ${(p) => p.$speed || '6s'}
    ease-in-out infinite;
  animation-delay: ${(p) => p.$delay || '0s'};

  svg {
    flex-shrink: 0;
    color: var(--blue);
  }

  strong {
    display: block;
    font-size: 13px;
    color: var(--ink);
  }

  span {
    display: block;
    font-size: 12px;
    color: var(--ink-soft);
  }

  @media (max-width: 720px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Encaixe do chip "Quiz respondido": fica à esquerda do cartão e
   recolhe conforme a tela estreita, para não entrar no título. */
export const ChipSlot = styled.div`
  position: absolute;
  z-index: 2;
  top: -30px;
  left: calc(-70px + max(0px, (1280px - 100vw) * 0.3));

  @media (max-width: 960px) {
    left: -12px;
  }
`;

export const MatchCard = styled.div`
  position: relative;
  z-index: 1;
  width: min(360px, 100%);
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(12, 35, 64, 0.16);
`;

export const MatchPhoto = styled.div`
  position: relative;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, var(--sky), var(--sand));
  color: var(--blue);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MatchBadge = styled.span`
  position: absolute;
  top: 12px;
  /* à direita: o canto esquerdo é do chip "Quiz respondido" */
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--ink);
  font-size: 11px;
  font-weight: 600;
`;

export const MatchBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;

  h3 {
    margin: 0 0 4px;
    font-family: var(--display);
    font-size: 19px;
    color: var(--ink);
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--ink-soft);
  }
`;

export const Ring = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 84px;
  height: 84px;

  svg {
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: 7;
  }

  .track {
    stroke: var(--line);
  }

  .value {
    stroke: var(--moss);
    stroke-linecap: round;
    stroke-dasharray: ${(p) => p.$circumference};
    stroke-dashoffset: ${(p) => (p.$active ? p.$offset : p.$circumference)};
    transition: stroke-dashoffset 1.2s ease 0.2s;
  }

  @media (prefers-reduced-motion: reduce) {
    .value {
      transition: none;
      stroke-dashoffset: ${(p) => p.$offset};
    }
  }
`;

export const RingLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;

  strong {
    font-size: 16px;
    color: var(--ink);
  }

  span {
    font-size: 10px;
    color: var(--ink-soft);
  }
`;

export const MatchTraits = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0 20px 20px;

  li {
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--sky);
    color: var(--blue);
    font-size: 12px;
    font-weight: 600;
  }
`;

/* ---------------------------------------------------------------- */
/* Trilha de adoção                                                   */
/* ---------------------------------------------------------------- */

export const Steps = styled.div`
  counter-reset: step;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;

  > * {
    min-width: 0;
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Step = styled.div`
  counter-increment: step;
  height: 100%;
  padding: 28px 24px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 24px;

  .num {
    display: block;
    font-family: var(--display);
    font-weight: 800;
    font-size: 34px;
    color: var(--blue);
    margin-bottom: 14px;
  }

  .num::before {
    content: counter(step, decimal-leading-zero);
  }

  h3 {
    margin: 0 0 8px;
    font-size: 17px;
    color: var(--ink);
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--ink-soft);
  }
`;

/* ---------------------------------------------------------------- */
/* Cards genéricos (match, cuidado)                                   */
/* ---------------------------------------------------------------- */

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$cols || 3}, 1fr);
  gap: 24px;

  > * {
    min-width: 0;
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  height: 100%;
  padding: 28px 24px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 24px;

  h3 {
    margin: 0 0 8px;
    font-size: 17px;
    color: var(--ink);
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--ink-soft);
  }
`;

export const IconBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  margin-bottom: 16px;
  background: ${(p) =>
    p.$honey ? 'rgba(255, 194, 75, 0.24)' : p.$navy ? 'rgba(11, 30, 69, 0.1)' : 'var(--sky)'};
  color: ${(p) => (p.$honey ? '#b3760a' : p.$navy ? 'var(--navy)' : 'var(--blue)')};
`;

/* ---------------------------------------------------------------- */
/* Smart Tag                                                          */
/* ---------------------------------------------------------------- */

export const TagDisc = styled.div`
  width: 260px;
  height: 260px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  background: var(--paper);
  box-shadow: 0 30px 60px rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    width: 82%;
    height: 82%;
    object-fit: contain;
  }
`;

export const TagFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--honey);
`;

export const TagPoints = styled.ul`
  list-style: none;
  margin: 24px 0 32px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;

  li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--ink-soft);
  }

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: var(--moss);
  }

  strong {
    color: var(--ink);
  }

  @media (max-width: 900px) {
    text-align: left;
  }
`;

/* ---------------------------------------------------------------- */
/* ONGs                                                               */
/* ---------------------------------------------------------------- */

export const OngBox = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 56px 48px;
  background: var(--ink);
  border-radius: 28px;
  color: #fff;

  @media (max-width: 720px) {
    padding: 40px 24px;
    margin: 0 20px;
    width: auto;
  }
`;

export const OngTag = styled(Tag)`
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--honey);
`;

/* ---------------------------------------------------------------- */
/* CTA final                                                         */
/* ---------------------------------------------------------------- */

export const Cta = styled.section`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  padding: 96px 24px 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(28px, 3.6vw, 40px);
    line-height: 1.15;
    color: var(--ink);
    margin: 0 0 16px;
  }

  p {
    font-size: 17px;
    line-height: 1.6;
    color: var(--ink-soft);
    max-width: 520px;
    margin: 0 0 32px;
  }
`;

export const CtaButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

/* ---------------------------------------------------------------- */
/* Footer                                                             */
/* ---------------------------------------------------------------- */

export const Footer = styled.footer`
  background: var(--ink);
  color: rgba(255, 255, 255, 0.72);
  padding: 64px 0 32px;
`;

export const FooterBrand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--display);
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
`;

/* ---------------------------------------------------------------- */
/* Marca (logo)                                                       */
/* ---------------------------------------------------------------- */

export const BrandImg = styled.img`
  height: 30px;
  width: auto;
  display: block;
`;

export const FooterLogo = styled.img`
  height: 30px;
  width: auto;
  display: block;
  margin-bottom: 4px;
`;

/* ---------------------------------------------------------------- */
/* O Desafio                                                          */
/* ---------------------------------------------------------------- */

export const Pains = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;

  > * {
    min-width: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ---------------------------------------------------------------- */
/* Para ONGs — pilar central                                          */
/* ---------------------------------------------------------------- */

export const OngHead = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 32px;
  align-items: end;
  margin-bottom: 36px;

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(28px, 3.4vw, 40px);
    line-height: 1.12;
    margin: 12px 0 14px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.74);
    margin: 0;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

export const OngBenefits = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const OngBenefit = styled.li`
  padding: 22px 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;

  .ic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255, 194, 75, 0.16);
    color: var(--honey);
    margin-bottom: 14px;
  }

  strong {
    display: block;
    font-size: 15px;
    margin-bottom: 6px;
    color: #fff;
  }

  span {
    display: block;
    font-size: 13.5px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.7);
  }
`;

/* ---------------------------------------------------------------- */
/* Faixa "é um app" — a adoção acontece no celular                    */
/* ---------------------------------------------------------------- */

export const AppStrip = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 48px;
  background: var(--ink);
  border-radius: 28px;
  color: #fff;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 40px;

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(26px, 3vw, 36px);
    line-height: 1.15;
    margin: 12px 0 14px;

    em {
      font-style: normal;
      color: var(--honey);
    }
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.74);
    margin: 0;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 40px 24px;
    margin-inline: 20px;
    width: auto;
  }
`;

export const AppPhone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  .disc {
    width: 132px;
    height: 132px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--honey);
  }
`;

export const AppBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const AppBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 13px;
  font-weight: 600;
  color: #fff;

  span {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.55);
  }
`;

/* ---------------------------------------------------------------- */
/* Origem do nome — ANIMA                                             */
/* ---------------------------------------------------------------- */

export const AnimaPanel = styled.div`
  background: var(--navy);
  color: #fff;
  border-radius: 28px;
  padding: 72px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(28px, 3.6vw, 42px);
    line-height: 1.14;
    margin: 16px 0 14px;
    color: #fff;
  }

  em {
    font-style: normal;
    color: var(--honey);
  }

  p {
    font-size: 17px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.8);
    max-width: 640px;
    margin: 0;
  }

  @media (max-width: 720px) {
    padding: 48px 24px;
  }
`;

/* ---------------------------------------------------------------- */
/* Números do topo                                                    */
/* ---------------------------------------------------------------- */

export const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
  max-width: 520px;

  > * {
    min-width: 0;
  }

  strong {
    display: block;
    font-family: var(--display);
    font-weight: 800;
    font-size: clamp(20px, 2.4vw, 26px);
    line-height: 1;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
    /* número e unidade nunca quebram em linhas diferentes */
    white-space: nowrap;
  }

  /* filho direto: o <span> de dentro do contador não entra aqui */
  > div > span {
    display: block;
    margin-top: 10px;
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--ink-soft);
  }

  @media (max-width: 420px) {
    gap: 14px;
  }
`;

/* ---------------------------------------------------------------- */
/* Esteira — faixa de chips deslizando                                */
/* ---------------------------------------------------------------- */

export const Belt = styled.div`
  position: relative;
  padding: 26px 0;
  background: var(--paper);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
`;

export const BeltLabel = styled.p`
  margin: 0 0 18px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  color: var(--ink-soft);
`;

/* ---------------------------------------------------------------- */
/* Faixa escura com números subindo                                   */
/* ---------------------------------------------------------------- */

export const MetricBand = styled.section`
  position: relative;
  scroll-margin-top: 88px;
  padding: 72px 0;
  background: var(--ink);
  color: #fff;
  overflow: hidden;
`;

export const MetricGrid = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  > * {
    min-width: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Metric = styled.div`
  strong {
    display: block;
    font-family: var(--display);
    font-weight: 800;
    font-size: clamp(32px, 4.2vw, 46px);
    line-height: 1;
    color: var(--honey);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* filho direto: o <span> de dentro do contador não entra aqui */
  > span {
    display: block;
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.74);
  }
`;

/* ---------------------------------------------------------------- */
/* Interativa 1 — simulador de match                                  */
/* ---------------------------------------------------------------- */

export const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: start;
  gap: 40px;

  > * {
    min-width: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const QuizCard = styled.div`
  padding: 32px 28px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: 0 20px 44px rgba(12, 35, 64, 0.07);

  @media (max-width: 480px) {
    padding: 26px 20px;
  }
`;

export const QuizQuestion = styled.fieldset`
  border: 0;
  margin: 0 0 26px;
  padding: 0;

  &:last-of-type {
    margin-bottom: 24px;
  }

  legend {
    padding: 0;
    margin-bottom: 12px;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
  }
`;

export const QuizOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const QuizOption = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  background: ${(p) => (p.$on ? 'var(--blue)' : 'var(--sand)')};
  color: ${(p) => (p.$on ? '#fff' : 'var(--ink-soft)')};
  border: 1px solid ${(p) => (p.$on ? 'var(--blue)' : 'var(--line)')};
  transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--blue-line);
  }
`;

export const QuizReset = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--blue);

  &:hover {
    text-decoration: underline;
  }
`;

export const QuizResult = styled.div`
  padding: 28px 24px;
  background: var(--ink);
  color: #fff;
  border-radius: 24px;

  h3 {
    margin: 0 0 4px;
    font-family: var(--display);
    font-size: 21px;
    color: #fff;
  }

  > p {
    margin: 0;
    font-size: 13.5px;
    color: rgba(255, 255, 255, 0.68);
  }
`;

export const QuizResultHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;

  > div {
    min-width: 0;
  }
`;

export const QuizWhy = styled.ul`
  list-style: none;
  margin: 0;
  padding: 18px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  flex-direction: column;
  gap: 11px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 13.5px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.78);
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }

  li[data-kind='pro'] svg {
    color: var(--moss);
  }

  li[data-kind='atencao'] svg {
    color: var(--honey);
  }
`;

export const QuizPhoto = styled.div`
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--honey);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RingLight = styled(Ring)`
  .track {
    stroke: rgba(255, 255, 255, 0.16);
  }

  ${RingLabel} strong {
    color: #fff;
  }

  ${RingLabel} span {
    color: rgba(255, 255, 255, 0.6);
  }
`;

/* ---------------------------------------------------------------- */
/* Catálogo em abas                                                   */
/* ---------------------------------------------------------------- */

export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 7px;
  margin: 0 auto 36px;
  width: fit-content;
  max-width: 100%;
  background: var(--sand);
  border: 1px solid var(--line);
  border-radius: 999px;

  @media (max-width: 600px) {
    border-radius: 20px;
    justify-content: center;
  }
`;

export const TabBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 20px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  background: ${(p) => (p.$on ? 'var(--paper)' : 'transparent')};
  color: ${(p) => (p.$on ? 'var(--ink)' : 'var(--ink-soft)')};
  box-shadow: ${(p) => (p.$on ? '0 6px 16px rgba(12, 35, 64, 0.1)' : 'none')};
  transition: background 0.18s ease, color 0.18s ease;

  svg {
    color: ${(p) => (p.$on ? 'var(--blue)' : 'var(--ink-soft)')};
  }

  &:hover {
    color: var(--ink);
  }
`;

export const TabPanel = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 40px;
  align-items: center;

  > * {
    min-width: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const TabIntro = styled.div`
  h3 {
    margin: 18px 0 12px;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(22px, 2.6vw, 30px);
    line-height: 1.16;
    color: var(--ink);
  }

  p {
    margin: 0;
    font-size: 16px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

export const TabItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  > * {
    min-width: 0;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    padding: 18px 18px;
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 18px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink-soft);
  }

  li svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--blue);
  }

  strong {
    display: block;
    margin-bottom: 3px;
    color: var(--ink);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

/* ---------------------------------------------------------------- */
/* Interativa 2 — leitura da Patinha                                  */
/* ---------------------------------------------------------------- */

export const ScanGrid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: 48px;

  > * {
    min-width: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

export const Phone = styled.div`
  position: relative;
  width: min(300px, 100%);
  margin: 0 auto;
  aspect-ratio: 9 / 17.5;
  padding: 12px;
  background: var(--ink);
  border-radius: 40px;
  box-shadow: 0 34px 64px rgba(12, 35, 64, 0.26);

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 72px;
    height: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.22);
    z-index: 2;
  }
`;

export const PhoneScreen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 30px;
  background: var(--sand);
  display: flex;
  flex-direction: column;
`;

export const ScanIdle = styled.button`
  width: 100%;
  height: 100%;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  background: radial-gradient(circle at 50% 38%, var(--sky), var(--sand) 72%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 24px;
  text-align: center;

  .alvo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 112px;
    height: 112px;
    border-radius: 50%;
    background: var(--paper);
    border: 1px solid var(--blue-line);
    color: var(--blue);
    box-shadow: 0 0 0 10px rgba(1, 81, 200, 0.07);
  }

  strong {
    font-size: 15px;
    color: var(--ink);
  }

  span {
    font-size: 13px;
    line-height: 1.45;
    color: var(--ink-soft);
  }
`;

export const ScanSheet = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ScanTop = styled.div`
  position: relative;
  height: 118px;
  flex-shrink: 0;
  background: linear-gradient(160deg, var(--sky), var(--sand));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blue);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ScanBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 16px 18px;

  h4 {
    margin: 0 0 2px;
    font-family: var(--display);
    font-size: 17px;
    color: var(--ink);
  }

  > p {
    margin: 0 0 14px;
    font-size: 12px;
    color: var(--ink-soft);
  }
`;

export const ScanRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 10px 0;
  border-top: 1px solid var(--line);
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--ink-soft);

  svg {
    flex-shrink: 0;
    margin-top: 1px;
    color: var(--blue);
  }

  strong {
    display: block;
    color: var(--ink);
    font-size: 12.5px;
  }
`;

export const ScanAlert = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;
  padding: 11px 12px;
  border-radius: 14px;
  background: rgba(31, 157, 107, 0.12);
  color: #137a51;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.35;

  svg {
    flex-shrink: 0;
  }
`;

export const ScanAgain = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--blue);

  &:hover {
    text-decoration: underline;
  }
`;

/* ---------------------------------------------------------------- */
/* Faz / Não faz                                                      */
/* ---------------------------------------------------------------- */

export const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  > * {
    min-width: 0;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const CompareCol = styled.div`
  height: 100%;
  padding: 30px 26px;
  border-radius: 24px;
  background: ${(p) => (p.$no ? 'var(--sand)' : 'var(--paper)')};
  border: 1px solid ${(p) => (p.$no ? 'var(--line)' : 'var(--blue-line)')};

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 20px;
    font-family: var(--display);
    font-size: 20px;
    color: var(--ink);
  }

  h3 .ic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background: ${(p) => (p.$no ? 'rgba(12, 35, 64, 0.08)' : 'rgba(31, 157, 107, 0.14)')};
    color: ${(p) => (p.$no ? 'var(--ink-soft)' : 'var(--moss)')};
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  li {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--ink-soft);
  }

  li svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${(p) => (p.$no ? 'var(--ink-line)' : 'var(--moss)')};
  }

  @media (max-width: 480px) {
    padding: 26px 20px;
  }
`;

/* ---------------------------------------------------------------- */
/* Perguntas — sanfona                                                */
/* ---------------------------------------------------------------- */

export const FaqList = styled.div`
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FaqItem = styled.div`
  background: var(--paper);
  border: 1px solid ${(p) => (p.$on ? 'var(--blue-line)' : 'var(--line)')};
  border-radius: 20px;
  overflow: hidden;
  transition: border-color 0.2s ease;
`;

export const FaqQ = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  border: 0;
  background: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  font-size: 15.5px;
  font-weight: 600;
  color: var(--ink);

  svg {
    flex-shrink: 0;
    color: var(--blue);
    transition: transform 0.25s ease;
    transform: rotate(${(p) => (p.$on ? '180deg' : '0deg')});
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`;

export const FaqA = styled.div`
  overflow: hidden;

  p {
    margin: 0;
    padding: 0 22px 22px;
    font-size: 14.5px;
    line-height: 1.65;
    color: var(--ink-soft);
  }
`;

/* Chip da esteira deslizante */
export const EsteiraChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 11px 18px;
  border-radius: 999px;
  background: var(--paper);
  border: 1px solid var(--line);
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;

  svg {
    color: var(--blue);
    flex-shrink: 0;
  }
`;

/* ---------------------------------------------------------------- */
/* Rodapé                                                            */
/* ---------------------------------------------------------------- */

export const FooterGrid = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.6fr 0.9fr 0.9fr 0.9fr 1.5fr;
  gap: 40px 32px;

  > * {
    min-width: 0;
  }

  @media (max-width: 1040px) {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 40px 32px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterCol = styled.div`
  h4 {
    margin: 0 0 18px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.9px;
    color: #fff;
  }

  h4:not(:first-child) {
    margin-top: 30px;
  }

  a {
    display: block;
    margin-bottom: 11px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.72);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  a:hover {
    color: #fff;
  }
`;

export const FooterSobre = styled.div`
  p {
    margin: 16px 0 0;
    font-size: 14px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.72);
    max-width: 330px;
  }
`;

export const FooterSelos = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 20px;
`;

export const FooterSelo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.84);

  svg {
    flex-shrink: 0;
    color: var(--honey);
  }
`;

export const FooterEmpresa = styled.p`
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.72);

  strong {
    color: #fff;
    font-weight: 600;
  }
`;

export const FooterContato = styled.a`
  display: flex !important;
  align-items: flex-start;
  gap: 9px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  overflow-wrap: break-word;
  min-width: 0;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--honey);
  }

  &:hover {
    color: #fff;
  }
`;

export const FooterDado = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--honey);
  }
`;

export const FooterAviso = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 56px auto 0;
  padding: 0 24px;

  > div {
    padding: 22px 24px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.72);
  }

  strong {
    color: #fff;
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 40px auto 0;
  padding: 24px 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);

  nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 22px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.72);
    text-decoration: none;
  }

  a:hover {
    color: #fff;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const AoTopo = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);

  &:hover {
    color: #fff;
  }
`;
