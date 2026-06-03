import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineXMark,
} from 'react-icons/hi2';
import SectionTitle from '../SectionTitle.jsx';
import SafeImage from '../SafeImage.jsx';

const Gallery = ({ data }) => {
  const [active, setActive] = useState(null);

  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % data.gallery.length));
  }, [data.gallery.length]);

  const prev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + data.gallery.length) % data.gallery.length
    );
  }, [data.gallery.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, next, prev]);

  return (
    <section id="gallery" className="w-section">
      <div className="w-container">
        <SectionTitle
          eyebrow="Pre-wedding"
          script="Memories"
          title="Khoảnh khắc của chúng mình"
        />

        <div className="masonry">
          {data.gallery.map((g, i) => (
            <motion.button
              type="button"
              key={g.src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -4 }}
              className="masonry-item block w-full group relative overflow-hidden focus:outline-none"
              style={{
                borderRadius: 'var(--w-radius-image)',
                boxShadow: 'var(--w-shadow-card)',
              }}
            >
              <SafeImage
                src={g.src}
                alt={g.alt}
                className="w-full h-auto object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)',
                }}
              >
                <span
                  className="w-script text-2xl"
                  style={{ color: '#fff' }}
                >
                  {g.caption}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-10"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute top-5 right-5 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              aria-label="Đóng"
            >
              <HiOutlineXMark />
            </button>
            <button
              type="button"
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white text-4xl p-3"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Trước"
            >
              <HiOutlineChevronLeft />
            </button>
            <button
              type="button"
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white text-4xl p-3"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Sau"
            >
              <HiOutlineChevronRight />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={data.gallery[active].src}
                alt={data.gallery[active].alt}
                className="max-h-[80vh] w-auto object-contain rounded-lg"
                loading="eager"
              />
              <div
                className="mt-4 w-script text-3xl"
                style={{ color: 'var(--w-primary)' }}
              >
                {data.gallery[active].caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
