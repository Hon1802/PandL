import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlinePaintBrush, HiOutlineXMark } from 'react-icons/hi2';
import { themeList } from '../theme/theme.js';

const ThemeCatalog = ({ themeKey, onPick }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[60] rounded-full w-14 h-14 flex items-center justify-center"
        style={{
          background: 'var(--w-gradient-button)',
          boxShadow: 'var(--w-shadow-button)',
          color: 'var(--w-bg)',
        }}
        aria-label="Đổi giao diện thiệp"
      >
        <HiOutlinePaintBrush className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70]"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 240, damping: 30 }}
              className="absolute left-0 top-0 h-full w-full max-w-sm p-6 md:p-8 overflow-y-auto"
              style={{
                background: 'var(--w-bg)',
                borderRight: '1px solid var(--w-border)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="w-eyebrow">Catalog</div>
                  <h3 className="w-heading text-2xl font-light mt-1">
                    Kho giao diện thiệp
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-2xl"
                  style={{ color: 'var(--w-text)' }}
                >
                  <HiOutlineXMark />
                </button>
              </div>

              <div className="space-y-3">
                {themeList.map((t) => {
                  const active = t.key === themeKey;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => onPick(t.key)}
                      className="w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all duration-300"
                      style={{
                        border: active
                          ? `1px solid ${t.colors.primary}`
                          : '1px solid var(--w-border)',
                        background: active
                          ? 'var(--w-surface)'
                          : 'transparent',
                        boxShadow: active ? 'var(--w-shadow-glow)' : 'none',
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex-shrink-0"
                        style={{ background: t.colors.gradientButton }}
                      />
                      <div className="min-w-0">
                        <div
                          className="text-base font-medium"
                          style={{ color: 'var(--w-text)' }}
                        >
                          {t.label}
                        </div>
                        <div
                          className="text-xs mt-0.5 truncate"
                          style={{ color: 'var(--w-text-soft)' }}
                        >
                          {t.description}
                        </div>
                      </div>
                      <div className="ml-auto flex gap-1 flex-shrink-0">
                        {[
                          t.colors.primary,
                          t.colors.accent,
                          t.colors.bg,
                        ].map((c, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: c,
                              border: '1px solid rgba(255,255,255,0.15)',
                            }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p
                className="mt-8 text-xs"
                style={{ color: 'var(--w-text-muted)' }}
              >
                Đổi giao diện realtime — không reload trang. Mỗi style mang một
                phong cách cảm xúc khác nhau cho ngày trọng đại của bạn.
              </p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeCatalog;
