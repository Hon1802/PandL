import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineSparkles } from 'react-icons/hi2';
import { resolveImage } from '../../utils/assets.js';

const BookCard = ({ data, onEnter }) => {
  const reduce = useReducedMotion();
  const [unfolded, setUnfolded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setUnfolded(true), reduce ? 50 : 150);
    return () => clearTimeout(t);
  }, [reduce]);

  const photo = useMemo(
    () => resolveImage(data.couple.bride.avatar) || resolveImage(data.hero.bgImage),
    [data.couple.bride.avatar, data.hero.bgImage]
  );

  return (
    <div
      className="relative w-[92vw] max-w-3xl mx-auto"
      style={{ perspective: 2400 }}
    >
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden md:aspect-[3/2]"
        style={{
          transformStyle: 'preserve-3d',
          background: 'var(--w-surface)',
          borderRadius: 'var(--w-radius-card)',
          boxShadow: 'var(--w-shadow-card), 0 0 0 1px var(--w-border)',
        }}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none z-20"
          style={{
            background:
              'linear-gradient(to bottom, transparent, var(--w-border) 20%, var(--w-border) 80%, transparent)',
          }}
        />

        <motion.div
          className="relative overflow-hidden aspect-[16/10] md:aspect-auto"
          style={{
            transformOrigin: 'right center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          initial={{ rotateY: -170 }}
          animate={{ rotateY: unfolded ? 0 : -170 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {photo ? (
            <img
              src={photo}
              alt="Couple"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="img-placeholder w-full h-full" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
            <div
              className="text-[10px] md:text-xs tracking-[0.4em] uppercase opacity-80"
              style={{ color: 'var(--w-primary)' }}
            >
              {data.hero.tagline}
            </div>
            <div
              className="w-script text-3xl md:text-5xl mt-1 leading-none"
              style={{ color: '#fff' }}
            >
              Save the Date
            </div>
          </div>
        </motion.div>

        <div
          className="relative px-5 md:px-9 py-6 md:py-10 flex flex-col items-center justify-center text-center"
          style={{
            background:
              'linear-gradient(160deg, var(--w-surface) 0%, var(--w-surface-alt) 100%)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="w-eyebrow"
          >
            Trân trọng kính mời
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="mt-4 mb-2 flex items-center justify-center"
          >
            <div
              className="w-8 h-px"
              style={{ background: 'var(--w-primary)' }}
            />
            <HiOutlineHeart
              className="mx-2 text-xl"
              style={{ color: 'var(--w-primary)' }}
            />
            <div
              className="w-8 h-px"
              style={{ background: 'var(--w-primary)' }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 22 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="w-script text-4xl md:text-6xl leading-none"
          >
            {data.couple.groom.name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: unfolded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="my-1 text-xl italic"
            style={{ color: 'var(--w-text-soft)' }}
          >
            &amp;
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 22 }}
            transition={{ duration: 0.9, delay: 1.45 }}
            className="w-script text-4xl md:text-6xl leading-none"
          >
            {data.couple.bride.name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-5 text-xs md:text-sm tracking-[0.25em] uppercase"
            style={{ color: 'var(--w-text-muted)' }}
          >
            {data.event.displayDate}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-2 text-sm md:text-base"
            style={{ color: 'var(--w-text-soft)' }}
          >
            {data.event.reception.venue}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: unfolded ? 1 : 0, y: unfolded ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 1.85 }}
            className="mt-7"
          >
            <button
              type="button"
              onClick={onEnter}
              className="w-btn-primary"
              aria-label="Vào website thiệp cưới"
            >
              <span className="inline-flex items-center gap-2">
                <HiOutlineSparkles /> Vào website
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />
    </div>
  );
};

export default BookCard;
