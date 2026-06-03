import { useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle.jsx';
import { resolveImage } from '../../utils/assets.js';

const isExternal = (src) => /^https?:\/\//i.test(src || '');

const VideoSection = ({ data }) => {
  const rawSrc = data.video?.src;
  const external = isExternal(rawSrc);
  const url = useMemo(
    () => (external ? rawSrc : resolveImage(rawSrc)),
    [external, rawSrc]
  );
  if (!data.video) return null;

  return (
    <section id="video" className="w-section">
      <div className="w-container max-w-5xl">
        <SectionTitle
          eyebrow="Film"
          script="Save the Date"
          title={data.video.title}
          subtitle={data.video.description}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="w-card overflow-hidden"
          style={{ borderRadius: 'var(--w-radius-card)' }}
        >
          {url ? (
            external ? (
              <iframe
                src={url}
                title={data.video.title}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="w-full aspect-video border-0"
              />
            ) : (
              <video
                src={url}
                poster={resolveImage(data.video.poster) || undefined}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto"
              />
            )
          ) : (
            <div className="aspect-video img-placeholder" />
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
