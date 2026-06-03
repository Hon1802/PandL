import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle.jsx';
import SafeImage from '../SafeImage.jsx';

const Couple = ({ data }) => (
  <section id="couple" className="w-section">
    <div className="w-container">
      <SectionTitle
        eyebrow="The couple"
        script="Anh & Em"
        title="Hai trái tim — một mái nhà"
        subtitle="Trong một thế giới rộng lớn, may mắn lớn nhất là tìm được nhau."
      />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
        {[data.couple.groom, data.couple.bride].map((p, idx) => (
          <motion.div
            key={p.fullName}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="w-card overflow-hidden"
          >
            <div className="aspect-[13/18] w-full overflow-hidden">
              <SafeImage
                src={p.avatar}
                alt={p.fullName}
                className="w-full h-full object-cover object-center transition-transform duration-[1.4s] ease-out hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 text-center">
              <div className="w-eyebrow mb-2">{p.role}</div>
              <h3 className="w-script text-4xl md:text-5xl">{p.name}</h3>
              <div
                className="mt-1 text-sm tracking-widest uppercase"
                style={{ color: 'var(--w-text-soft)' }}
              >
                {p.fullName}
              </div>
              <p
                className="mt-4 italic text-base md:text-lg"
                style={{ color: 'var(--w-text-soft)' }}
              >
                “{p.bio}”
              </p>
              <div
                className="mt-5 pt-5 border-t text-xs md:text-sm"
                style={{ borderColor: 'var(--w-border)', color: 'var(--w-text-muted)' }}
              >
                {p.father} <span className="mx-2">·</span> {p.mother}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Couple;
