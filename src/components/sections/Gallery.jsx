import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
} from 'swiper/modules';
import SectionTitle from '../SectionTitle.jsx';
import SafeImage from '../SafeImage.jsx';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
          subtitle="Lật qua từng trang để xem lại những khoảnh khắc của chúng mình."
        />

        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Keyboard, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.8,
            slideShadows: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="gallery-swiper"
          style={{
            '--swiper-navigation-color': 'var(--w-primary)',
            '--swiper-pagination-color': 'var(--w-primary)',
            '--swiper-navigation-size': '28px',
            paddingTop: '0.5rem',
            paddingBottom: '3.5rem',
          }}
        >
          {data.gallery.map((g, i) => (
            <SwiperSlide
              key={g.src}
              className="!w-[86%] sm:!w-[440px] md:!w-[520px] lg:!w-[600px] max-w-[92vw]"
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden focus:outline-none"
                style={{
                  borderRadius: 'var(--w-radius-image)',
                  boxShadow: 'var(--w-shadow-card)',
                  border: '1px solid var(--w-border)',
                }}
              >
                <SafeImage
                  src={g.src}
                  alt={g.alt}
                  className="w-full h-auto block transition-transform duration-[1.4s] group-hover:scale-105"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5 flex items-end"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 70%)',
                  }}
                >
                  <span
                    className="w-script text-2xl md:text-3xl"
                    style={{ color: '#fff' }}
                  >
                    {g.caption}
                  </span>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
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
