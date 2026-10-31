import { useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/* ================================================================ */
/* Constantes e hooks de movimento da landing.                       */
/* ================================================================ */

export const EASE = [0.22, 1, 0.36, 1];

/* A margem é só vertical: margem negativa na horizontal encolhe a
   área de observação e trava reveals/contadores em telas estreitas. */
export const VIEWPORT = { once: true, margin: '-80px 0px' };

/* ---------------------------------------------------------------- */
/* Paralaxe — mola ANTES do transform, senão o elemento pula         */
/* ---------------------------------------------------------------- */

export function useParallaxSuave(ref, distancia = 60) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 });
  const y = useTransform(suave, [0, 1], [distancia, -distancia]);
  const parado = useMotionValue(0);

  return reduced ? parado : y;
}

/* ---------------------------------------------------------------- */
/* usePonteiro — 3D leve seguindo o mouse                            */
/* ---------------------------------------------------------------- */

export function usePonteiro(intensidade = 7) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(x, { stiffness: 140, damping: 18 });
  const rotY = useSpring(y, { stiffness: 140, damping: 18 });

  const onMouseMove = (e) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(-py * intensidade * 2);
    y.set(px * intensidade * 2);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    handlers: reduced ? {} : { onMouseMove, onMouseLeave },
    style: reduced
      ? undefined
      : { rotateX: rotX, rotateY: rotY, transformPerspective: 900, willChange: 'transform' },
  };
}
