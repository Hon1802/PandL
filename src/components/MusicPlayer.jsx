import { motion } from 'framer-motion';
import { HiOutlineMusicalNote } from 'react-icons/hi2';

const MusicPlayer = ({ tracks, playing, onToggle }) => {
  if (!tracks?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-3"
    >
      <motion.button
        type="button"
        onClick={onToggle}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="rounded-full w-14 h-14 flex items-center justify-center relative"
        style={{
          background: 'var(--w-gradient-button)',
          boxShadow: 'var(--w-shadow-button)',
          color: 'var(--w-bg)',
        }}
        aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {playing ? (
          <div className="flex items-end gap-[3px] h-5">
            <span className="viz-bar" />
            <span className="viz-bar" />
            <span className="viz-bar" />
            <span className="viz-bar" />
            <span className="viz-bar" />
          </div>
        ) : (
          <HiOutlineMusicalNote className="text-2xl" />
        )}

        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid var(--w-primary)' }}
            animate={{ scale: [1, 1.3], opacity: [0.7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default MusicPlayer;
