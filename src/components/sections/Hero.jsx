import { motion, useScroll, useTransform } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi2';
import Particles from '../Particles.jsx';

const Hero = ({ data, onReopen }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden flex items-center justify-center text-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--w-overlay-hero)' }}
      />
      <Particles count={24} />

      <motion.div className="relative z-10 px-5" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="w-eyebrow"
        >
          {data.hero.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.2 }}
          className="mt-6 w-script text-6xl md:text-8xl lg:text-9xl"
        >
          {data.couple.groom.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="my-2 text-2xl italic"
          style={{ color: 'var(--w-text-soft)' }}
        >
          &amp;
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1.2 }}
          className="w-script text-6xl md:text-8xl lg:text-9xl"
        >
          {data.couple.bride.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1 }}
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg italic"
          style={{ color: 'var(--w-text-soft)' }}
        >
          “{data.hero.quote}”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 1 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <button type="button" onClick={onReopen} className="w-btn-primary">
            <span className="inline-flex items-center gap-2">
              <HiOutlineSparkles /> Xem thiệp cưới
            </span>
          </button>

          <a
            href="#event"
            className="w-btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Khám phá
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--w-text-soft)' }}
        >
          Scroll
        </div>
        <div
          className="mt-2 w-px h-10"
          style={{ background: 'var(--w-primary)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
