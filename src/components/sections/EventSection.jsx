import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineMapPin,
} from 'react-icons/hi2';
import SectionTitle from '../SectionTitle.jsx';
import Countdown from '../Countdown.jsx';

const EventSection = ({ data }) => {
  const sides = [
    { key: 'groom', event: data.event.reception },
    { key: 'bride', event: data.event.ceremony },
  ];

  const [activeKey, setActiveKey] = useState('groom');
  const active = sides.find((s) => s.key === activeKey) || sides[0];
  const ev = active.event;

  return (
    <section id="event" className="w-section">
      <div className="w-container">
        <SectionTitle
          eyebrow="Save the date"
          script="Save the Date"
          title="Ngày trọng đại của chúng mình"
          subtitle="Trân trọng kính mời bạn đến chia vui cùng chúng mình trong ngày trọng đại."
        />

        <div
          className="mx-auto mb-10 inline-flex p-1 rounded-full"
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
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
          >
            <div
              className="text-center mb-8 text-base md:text-lg"
              style={{ color: 'var(--w-text-soft)' }}
            >
              {ev.label} <span className="mx-2">·</span> {ev.displayDate}
            </div>

            <Countdown date={ev.date} time={ev.time} />

            <div className="mt-10 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-card p-6 md:p-8"
              >
                <div className="w-eyebrow">{ev.label}</div>
                <h3 className="w-heading mt-3 text-2xl md:text-3xl font-light">
                  {ev.venue}
                </h3>

                <div className="mt-5 space-y-3 text-sm md:text-base">
                  <div className="flex items-start gap-3">
                    <HiOutlineCalendarDays
                      className="text-xl mt-0.5"
                      style={{ color: 'var(--w-primary)' }}
                    />
                    <span style={{ color: 'var(--w-text-soft)' }}>
                      {ev.displayDate}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineClock
                      className="text-xl mt-0.5"
                      style={{ color: 'var(--w-primary)' }}
                    />
                    <span style={{ color: 'var(--w-text-soft)' }}>
                      {ev.time}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <HiOutlineMapPin
                      className="text-xl mt-0.5"
                      style={{ color: 'var(--w-primary)' }}
                    />
                    <span style={{ color: 'var(--w-text-soft)' }}>
                      {ev.address}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EventSection;
