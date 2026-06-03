import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMapPin } from 'react-icons/hi2';
import SectionTitle from '../SectionTitle.jsx';

const MapSection = ({ data }) => {
  const sides = [
    { key: 'groom', event: data.event.reception },
    { key: 'bride', event: data.event.ceremony },
  ];

  const [activeKey, setActiveKey] = useState('groom');
  const active = sides.find((s) => s.key === activeKey) || sides[0];
  const ev = active.event;

  return (
    <section id="map" className="w-section">
      <div className="w-container max-w-5xl">
        <SectionTitle
          eyebrow="Location"
          script="See you there"
          title="Hẹn gặp bạn tại"
          subtitle={ev.address}
        />

        <div className="flex justify-center mb-10">
          <div
            className="inline-flex p-1 rounded-full border"
            style={{
              borderColor: 'var(--w-border)',
              background: 'var(--w-surface, transparent)',
            }}
          >
            {sides.map((s) => {
              const isActive = s.key === activeKey;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActiveKey(s.key)}
                  className="px-5 md:px-7 py-2 md:py-2.5 text-xs md:text-sm tracking-[0.25em] uppercase rounded-full transition-colors"
                  style={{
                    background: isActive ? 'var(--w-primary)' : 'transparent',
                    color: isActive
                      ? 'var(--w-on-primary, #fff)'
                      : 'var(--w-text-soft)',
                  }}
                >
                  {s.event.sideLabel}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="w-card overflow-hidden"
          >
            <div className="aspect-[16/10] md:aspect-[16/8] w-full">
              <iframe
                title={`Wedding location map — ${ev.sideLabel}`}
                src={ev.mapEmbed}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="p-5 md:p-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="w-eyebrow mb-1">{ev.label}</div>
                <div
                  className="text-lg md:text-xl"
                  style={{ color: 'var(--w-text)' }}
                >
                  {ev.venue}
                </div>
                <div
                  className="mt-1 text-sm"
                  style={{ color: 'var(--w-text-soft)' }}
                >
                  {ev.address}
                </div>
              </div>
              <a
                href={ev.mapLink}
                target="_blank"
                rel="noreferrer"
                className="w-btn-primary"
              >
                <span className="inline-flex items-center gap-2">
                  <HiOutlineMapPin /> Chỉ đường
                </span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MapSection;
