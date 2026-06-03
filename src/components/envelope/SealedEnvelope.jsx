import { motion } from 'framer-motion';
import { HiOutlineHeart, HiOutlineEnvelope } from 'react-icons/hi2';

const SealedEnvelope = ({ data, opening, onOpen }) => {
  return (
    <motion.div
      className="relative w-[88vw] max-w-md md:max-w-lg flex flex-col items-center"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1800 }}
    >
      <div
        className="relative w-full"
        style={{
          aspectRatio: '5/3.4',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, var(--w-surface) 0%, var(--w-surface-alt) 100%)',
            border: '1px solid var(--w-border)',
            borderRadius: '6px',
            boxShadow: 'var(--w-shadow-card)',
            zIndex: 1,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 60%)',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.12) 100%)',
            }}
          />
        </div>

        <motion.div
          className="absolute overflow-hidden"
          style={{
            top: 0,
            left: '5%',
            right: '5%',
            height: '100%',
            background:
              'linear-gradient(160deg, var(--w-bg-soft) 0%, var(--w-surface) 100%)',
            border: '1px solid var(--w-border)',
            borderRadius: 'var(--w-radius-card)',
            boxShadow: 'var(--w-shadow-card)',
            zIndex: 0,
          }}
          initial={{ y: '0%' }}
          animate={opening ? { y: '-92%' } : { y: '0%' }}
          transition={{
            duration: 1.4,
            delay: opening ? 0.55 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="absolute inset-0 grain pointer-events-none" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 py-5">
            <div className="w-eyebrow text-[10px] md:text-xs">
              {data.meta.title}
            </div>

            <div className="mt-3 mb-2 flex items-center justify-center">
              <div
                className="w-8 h-px"
                style={{ background: 'var(--w-primary)' }}
              />
              <HiOutlineHeart
                className="mx-2 text-lg"
                style={{ color: 'var(--w-primary)' }}
              />
              <div
                className="w-8 h-px"
                style={{ background: 'var(--w-primary)' }}
              />
            </div>

            <h2 className="w-script text-2xl md:text-3xl leading-none">
              {data.couple.groom.name}
            </h2>
            <div
              className="my-0.5 text-sm italic"
              style={{ color: 'var(--w-text-soft)' }}
            >
              &amp;
            </div>
            <h2 className="w-script text-2xl md:text-3xl leading-none">
              {data.couple.bride.name}
            </h2>

            <p
              className="mt-3 text-[9px] md:text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'var(--w-text-muted)' }}
            >
              {data.event.displayDate}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--w-gradient-button)',
            boxShadow: 'var(--w-shadow-button)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1 }}
          animate={{
            x: '-50%',
            y: '-50%',
            opacity: opening ? 0 : 1,
            scale: opening ? 0.3 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <HiOutlineHeart style={{ color: 'var(--w-bg)', fontSize: 22 }} />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            right: 0,
            height: '60%',
            background:
              'linear-gradient(160deg, var(--w-surface-alt) 0%, var(--w-surface) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: 4,
            backfaceVisibility: 'hidden',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
          }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: opening ? -178 : 0 }}
          transition={{ duration: 1.05, ease: [0.7, 0, 0.3, 1] }}
        />
      </div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? 16 : 0 }}
        transition={{ duration: 0.7, delay: opening ? 0 : 0.5 }}
      >
        <button
          type="button"
          onClick={onOpen}
          className="w-btn-primary"
          aria-label="Mở thiệp cưới"
          disabled={opening}
        >
          <span className="inline-flex items-center gap-2">
            <HiOutlineEnvelope className="text-base" />
            Mở thiệp
          </span>
        </button>
      </motion.div>

      <motion.div
        className="mt-5 text-center text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--w-text-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        Trân trọng kính mời
      </motion.div>
    </motion.div>
  );
};

export default SealedEnvelope;
