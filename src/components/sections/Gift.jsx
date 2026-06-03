import { motion } from 'framer-motion';
import { HiOutlineGift } from 'react-icons/hi2';
import SectionTitle from '../SectionTitle.jsx';
import SafeImage from '../SafeImage.jsx';

const Gift = ({ data }) => (
  <section id="gift" className="w-section">
    <div className="w-container max-w-4xl">
      <SectionTitle
        eyebrow="Wedding gift"
        script="With love"
        title={data.gift.title}
        subtitle={data.gift.note}
      />

      <div className="grid md:grid-cols-2 gap-6">
        {data.gift.accounts.map((acc, i) => (
          <motion.div
            key={acc.owner}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="w-card p-6 md:p-8 text-center"
          >
            <HiOutlineGift
              className="mx-auto text-3xl mb-3"
              style={{ color: 'var(--w-primary)' }}
            />
            <div
              className="w-eyebrow"
              style={{ color: 'var(--w-primary)' }}
            >
              {acc.bank}
            </div>
            <h3 className="w-script text-3xl mt-1">{acc.owner}</h3>

            <div
              className="mt-4 rounded-lg p-4 inline-block w-full"
              style={{ background: 'var(--w-surface-alt)' }}
            >
              <div
                className="text-xs uppercase tracking-widest"
                style={{ color: 'var(--w-text-muted)' }}
              >
                Số tài khoản
              </div>
              <div
                className="font-mono text-xl md:text-2xl mt-1 tracking-wider"
                style={{ color: 'var(--w-primary)' }}
              >
                {acc.number}
              </div>
              <div
                className="mt-1 text-xs"
                style={{ color: 'var(--w-text-soft)' }}
              >
                {acc.branch}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <div
                className="w-40 h-40 rounded-xl overflow-hidden"
                style={{ background: 'var(--w-surface)' }}
              >
                <SafeImage
                  src={acc.qr}
                  alt={`QR ${acc.owner}`}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-btn-ghost mt-5"
              onClick={() => {
                navigator.clipboard?.writeText(acc.number.replace(/\s/g, ''));
              }}
            >
              Copy STK
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Gift;
