import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle.jsx';
import SafeImage from '../SafeImage.jsx';

const Story = ({ data }) => (
  <section id="story" className="w-section">
    <div className="w-container">
      <SectionTitle
        eyebrow="Our story"
        script="Our Story"
        title={data.story.title}
        subtitle={data.story.subtitle}
      />

      <div className="relative max-w-4xl mx-auto">
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
          style={{ background: 'var(--w-border)' }}
        />

        <div className="space-y-12 md:space-y-16">
          {data.story.timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className={`relative md:flex ${
                  left ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8`}
              >
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: 'var(--w-primary)',
                    boxShadow: '0 0 0 6px var(--w-bg)',
                  }}
                />

                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className="w-card overflow-hidden">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto block transition-transform duration-[1.4s] hover:scale-105"
                    />
                  </div>
                </div>

                <div className="ml-12 mt-4 md:mt-0 md:ml-0 md:w-1/2 md:px-8">
                  <div
                    className="w-script text-3xl md:text-4xl"
                    style={{ color: 'var(--w-primary)' }}
                  >
                    {item.date}
                  </div>
                  <h3 className="w-heading mt-2 text-2xl md:text-3xl font-light">
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 text-base md:text-lg leading-relaxed"
                    style={{ color: 'var(--w-text-soft)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Story;
