import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Particles from '../Particles.jsx';
import SealedEnvelope from './SealedEnvelope.jsx';
import BookCard from './BookCard.jsx';
const envelopeBg =
  'https://images.unsplash.com/photo-1750584346229-c8fcd96323cf?fm=jpg&q=80&w=2400&auto=format&fit=crop';

const Envelope = ({ data, onOpen, onUserGesture }) => {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState('sealed');

  const handleSealedClick = () => {
    if (stage !== 'sealed') return;
    onUserGesture?.();
    setStage('opening');
    setTimeout(() => setStage('unfolded'), reduce ? 200 : 1900);
  };

  const handleEnterSite = () => {
    if (stage !== 'unfolded') return;
    setStage('exiting');
    setTimeout(onOpen, reduce ? 100 : 650);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-5 py-10 overflow-hidden"
      style={{
        backgroundImage: envelopeBg
          ? `url(${envelopeBg})`
          : 'var(--w-gradient-hero)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Particles count={36} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'var(--w-overlay-vignette)' }}
      />

      <AnimatePresence mode="wait">
        {(stage === 'sealed' || stage === 'opening') && (
          <motion.div
            key="sealed"
            exit={{
              opacity: 0,
              scale: 0.85,
              y: -30,
              transition: { duration: 0.55, ease: [0.7, 0, 0.84, 0] },
            }}
            className="relative"
          >
            <SealedEnvelope
              data={data}
              opening={stage === 'opening'}
              onOpen={handleSealedClick}
            />
          </motion.div>
        )}

        {(stage === 'unfolded' || stage === 'exiting') && (
          <motion.div
            key="book"
            exit={{
              opacity: 0,
              scale: 1.08,
              y: -40,
              transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] },
            }}
            className="relative"
          >
            <BookCard data={data} onEnter={handleEnterSite} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
