import { motion } from 'framer-motion';
import { HiOutlineHeart } from 'react-icons/hi2';
import Particles from '../Particles.jsx';

const FooterSection = ({ data }) => (
  <footer className="relative pt-20 pb-12 overflow-hidden text-center">
    <div
      className="absolute inset-0"
      style={{ background: 'var(--w-gradient-hero)', opacity: 0.6 }}
    />
    <Particles count={14} />

    <div className="relative z-10 w-container max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9 }}
      >
        <HiOutlineHeart
          className="mx-auto text-4xl mb-5"
          style={{ color: 'var(--w-primary)' }}
        />
        <h3 className="w-heading text-3xl md:text-4xl font-light">
          {data.thanks.title}
        </h3>
        <p
          className="mt-4 italic text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--w-text-soft)' }}
        >
          {data.thanks.message}
        </p>
        <div className="w-script text-4xl md:text-5xl mt-6">
          {data.thanks.signature}
        </div>

        <div
          className="mt-10 pt-6 border-t text-xs tracking-widest uppercase"
          style={{ borderColor: 'var(--w-border)', color: 'var(--w-text-muted)' }}
        >
          {data.couple.groom.name} &amp; {data.couple.bride.name} ·{' '}
          {data.event.displayDate}
        </div>
      </motion.div>
    </div>
  </footer>
);

export default FooterSection;
