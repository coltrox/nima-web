import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

import { EASE, VIEWPORT } from './motion';

/* ================================================================ */
/* Peças de movimento compartilhadas pela landing.                   */
/* Todas respeitam prefers-reduced-motion.                           */
/* ================================================================ */

/* ---------------------------------------------------------------- */
/* Reveal — entrada padrão de tudo que sobe na tela                  */
/* ---------------------------------------------------------------- */

export function Reveal({ children, delay = 0, y = 24, as = 'div', ...rest }) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag {...rest}>{children}</Tag>;
  }

  const Comp = motion[as] || motion.div;

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* Stagger de 0,08s por item — usado nas grades de cartões */
export function RevealStack({ children, step = 0.08, delay = 0, ...rest }) {
  return React.Children.map(children, (child, i) =>
    child ? (
      <Reveal key={i} delay={delay + i * step} {...rest}>
        {child}
      </Reveal>
    ) : null,
  );
}

/* ---------------------------------------------------------------- */
/* Contador — números que sobem quando entram na tela                */
/* ---------------------------------------------------------------- */

export function Contador({ to, duration = 1.6, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const reduced = useReducedMotion();
  const [valor, setValor] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return undefined;

    let frame;
    const inicio = performance.now();

    const passo = (agora) => {
      const t = Math.min((agora - inicio) / (duration * 1000), 1);
      /* easeOutCubic — desacelera no fim, como o resto da página */
      setValor(to * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(passo);
    };

    frame = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to, duration]);

  const texto = valor.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {prefix}
      {texto}
      {suffix}
    </span>
  );
}

/* ---------------------------------------------------------------- */
/* Manchas — borrões de cor no fundo das seções                      */
/* ---------------------------------------------------------------- */

const deriva = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, -26px, 0) scale(1.06); }
`;

const Mancha = styled.span`
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.5;
  pointer-events: none;
  will-change: transform;
  animation: ${deriva} ${(p) => p.$speed} ease-in-out infinite;
  animation-delay: ${(p) => p.$delay};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ManchasBox = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

export function Manchas({ pontos = [] }) {
  return (
    <ManchasBox aria-hidden="true">
      {pontos.map((p, i) => (
        <Mancha
          key={i}
          $speed={p.speed || '16s'}
          $delay={p.delay || `${i * 1.4}s`}
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
          }}
        />
      ))}
    </ManchasBox>
  );
}

/* ---------------------------------------------------------------- */
/* Esteira — faixa de chips deslizando sem fim                       */
/* ---------------------------------------------------------------- */

const desliza = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
`;

const EsteiraBox = styled.div`
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
`;

const EsteiraTrilha = styled.div`
  display: flex;
  width: max-content;
  gap: 14px;
  will-change: transform;
  animation: ${desliza} ${(p) => p.$speed} linear infinite;
  animation-direction: ${(p) => (p.$reverse ? 'reverse' : 'normal')};

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
`;

export function Esteira({ children, speed = '38s', reverse = false }) {
  const itens = React.Children.toArray(children);

  return (
    <EsteiraBox>
      {/* conteúdo duplicado: o translate de -50% cai num ponto idêntico */}
      <EsteiraTrilha $speed={speed} $reverse={reverse}>
        {itens}
        {itens.map((item, i) => (
          <React.Fragment key={`eco-${i}`}>{item}</React.Fragment>
        ))}
      </EsteiraTrilha>
    </EsteiraBox>
  );
}

/* Flutuação infinita — ciclos longos e atraso diferente por item */
export function Flutua({ children, distancia = 12, duration = 5, delay = 0, ...rest }) {
  const reduced = useReducedMotion();

  if (reduced) return <div {...rest}>{children}</div>;

  return (
    <motion.div
      animate={{ y: [0, -distancia, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ willChange: 'transform' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

