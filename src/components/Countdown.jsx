import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown.js';

const Countdown = ({ date, time }) => {
  const iso = `${date}T${time || '17:30'}:00`;
  const { days, hours, minutes, seconds } = useCountdown(iso);

  const items = [
    { label: 'Ngày', value: days },
    { label: 'Giờ', value: hours },
    { label: 'Phút', value: minutes },
    { label: 'Giây', value: seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: i * 0.08 }}
          className="w-card text-center py-5 md:py-7 px-2"
        >
          <div
            className="text-3xl md:text-5xl font-light w-heading"
            style={{ color: 'var(--w-primary)' }}
          >
            {String(it.value).padStart(2, '0')}
          </div>
          <div
            className="mt-2 uppercase tracking-[0.3em] text-[10px] md:text-xs"
            style={{ color: 'var(--w-text-soft)' }}
          >
            {it.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
