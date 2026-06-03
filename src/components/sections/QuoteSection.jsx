import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiOutlineHeart } from 'react-icons/hi2';
import Particles from '../Particles.jsx';

const QuoteSection = ({ data }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center text-center"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div
          className="w-full h-full"
          style={{ background: 'var(--w-gradient-hero)' }}
        />
      </motion.div>
      <Particles count={18} />
      <div
        className="absolute inset-0"
        style={{ background: 'var(--w-overlay-vignette)' }}
      />

      <motion.div
        style={{ y }}
        className="relative z-10 w-container max-w-3xl"
      >
        <HiOutlineHeart
          className="mx-auto text-4xl mb-6"
          style={{ color: 'var(--w-primary)' }}
        />
        <p
          className="w-heading italic text-2xl md:text-4xl leading-snug"
          style={{ color: 'var(--w-text)' }}
        >
          “{data.quote.text}”
        </p>
        <p
          className="mt-6 tracking-widest uppercase text-sm"
          style={{ color: 'var(--w-primary)' }}
        >
          {data.quote.author}
        </p>
      </motion.div>
    </section>
  );
};

export default QuoteSection;
