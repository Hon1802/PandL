import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Particles = React.memo(function Particles({ count = 28 }) {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
      })),
    [count]
  );

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: 'var(--w-primary)',
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
});

export default Particles;
