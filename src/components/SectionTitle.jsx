const SectionTitle = ({ eyebrow, title, script, subtitle, align = 'center' }) => (
  <div
    className={`mb-12 md:mb-16 ${
      align === 'center' ? 'text-center' : 'text-left'
    }`}
  >
    {script && (
      <div
        className="w-script text-4xl md:text-5xl mb-2"
        style={{ color: 'var(--w-primary)' }}
      >
        {script}
      </div>
    )}
    {eyebrow && <div className="w-eyebrow mb-4">{eyebrow}</div>}
    <h2 className="w-heading text-3xl md:text-5xl font-light">{title}</h2>
    {subtitle && (
      <p
        className="mt-4 max-w-2xl mx-auto text-base md:text-lg"
        style={{ color: 'var(--w-text-soft)' }}
      >
        {subtitle}
      </p>
    )}
    <div className="w-divider mt-8" />
  </div>
);

export default SectionTitle;
