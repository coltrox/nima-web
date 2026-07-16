import styled, { css, keyframes } from 'styled-components';

/* ---------------------------------------------------------------- */
/* Base                                                              */
/* ---------------------------------------------------------------- */

export const Page = styled.div`
  background: var(--sand);
`;

export const Wrap = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const Section = styled.section`
  padding: 96px 0;
  background: ${(p) => (p.$paper ? 'var(--paper)' : 'transparent')};

  @media (max-width: 720px) {
    padding: 64px 0;
  }
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
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.2px;
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
  padding: 14px 26px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
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
  padding: 72px 0 120px;

  @media (max-width: 720px) {
    padding: 40px 0 96px;
  }
`;

export const HeroGrid = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 56px;

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
  position: absolute;
  top: ${(p) => p.$top || 'auto'};
  left: ${(p) => p.$left || 'auto'};
  bottom: ${(p) => p.$bottom || 'auto'};
  right: ${(p) => p.$right || 'auto'};
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
  animation: ${floatY} ${(p) => p.$speed || '6s'} ease-in-out infinite;
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
  left: 12px;
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

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Step = styled.div`
  counter-increment: step;
  padding: 28px 24px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 20px;

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

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  padding: 28px 24px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 20px;

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

export const TagShowcase = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: 56px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
`;

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

export const OngGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;

  h2 {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(26px, 3vw, 34px);
    line-height: 1.15;
    margin: 0 0 16px;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const OngList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 14px;
  }

  svg {
    flex-shrink: 0;
    color: var(--honey);
  }
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

export const FooterGrid = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 40px;

  p {
    margin: 16px 0 0;
    font-size: 14px;
    line-height: 1.6;
    max-width: 320px;
  }

  h4 {
    margin: 0 0 16px;
    font-size: 14px;
    color: #fff;
  }

  a {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.72);
    text-decoration: none;
  }

  a:hover {
    color: #fff;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
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

export const FooterBottom = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 48px auto 0;
  padding: 24px 24px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
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

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StatBand = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Stat = styled.div`
  padding: 28px 24px;
  border-radius: 20px;
  background: var(--navy);
  color: #fff;

  strong {
    display: block;
    font-family: var(--display);
    font-weight: 800;
    font-size: clamp(34px, 5vw, 48px);
    line-height: 1;
    color: #fff;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.75);
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
