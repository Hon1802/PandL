import { motion } from 'framer-motion';
import { HiOutlineMapPin } from 'react-icons/hi2';
import SectionTitle from '../SectionTitle.jsx';

const Families = ({ data }) => {
  const families = data.families;
  if (!families) return null;

  const sides = [
    {
      key: 'groom',
      label: families.groom.label,
      father: data.couple.groom.father,
      mother: data.couple.groom.mother,
      childLabel: 'Trân trọng báo hỷ con trai',
      childName: data.couple.groom.fullName,
      address: families.groom.address,
    },
    {
      key: 'bride',
      label: families.bride.label,
      father: data.couple.bride.father,
      mother: data.couple.bride.mother,
      childLabel: 'Trân trọng báo hỷ con gái',
      childName: data.couple.bride.fullName,
      address: families.bride.address,
    },
  ];

  return (
    <section id="families" className="w-section">
      <div className="w-container">
        <SectionTitle
          eyebrow="Two families"
          script="Hai họ"
          title={families.title}
          subtitle={families.subtitle}
        />

        <div className="relative grid md:grid-cols-2 gap-8 lg:gap-14">
          {sides.map((side, idx) => (
            <motion.div
              key={side.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="w-card p-6 md:p-10 text-center"
            >
              <div className="w-eyebrow">{side.label}</div>
              <div
                className="mt-5 space-y-1 text-base md:text-lg"
                style={{ color: 'var(--w-text-soft)' }}
              >
                <div>{side.father}</div>
                <div>{side.mother}</div>
              </div>

              <div
                className="my-6 mx-auto w-12 border-t"
                style={{ borderColor: 'var(--w-border)' }}
              />

              <div
                className="text-xs md:text-sm tracking-widest uppercase"
                style={{ color: 'var(--w-text-muted)' }}
              >
                {side.childLabel}
              </div>
              <h3
                className="w-script text-3xl md:text-4xl mt-2"
                style={{ color: 'var(--w-primary)' }}
              >
                {side.childName}
              </h3>

              <div
                className="mt-6 pt-5 border-t flex items-start justify-center gap-2 text-sm md:text-base"
                style={{
                  borderColor: 'var(--w-border)',
                  color: 'var(--w-text-soft)',
                }}
              >
                <HiOutlineMapPin
                  className="text-lg mt-0.5 shrink-0"
                  style={{ color: 'var(--w-primary)' }}
                />
                <span className="text-left">{side.address}</span>
              </div>
            </motion.div>
          ))}

          {families.ornament && (
            <div
              className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center pointer-events-none select-none text-2xl"
              style={{ color: 'var(--w-primary)' }}
              aria-hidden
            >
              {families.ornament}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Families;
