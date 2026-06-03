export const applyTheme = (theme) => {
  const root = document.documentElement;
  const c = theme.colors;
  const s = theme.shadow;
  const r = theme.radius;
  const o = theme.overlay;

  root.style.setProperty('--w-bg', c.bg);
  root.style.setProperty('--w-bg-soft', c.bgSoft);
  root.style.setProperty('--w-surface', c.surface);
  root.style.setProperty('--w-surface-alt', c.surfaceAlt);
  root.style.setProperty('--w-border', c.border);
  root.style.setProperty('--w-primary', c.primary);
  root.style.setProperty('--w-primary-soft', c.primarySoft);
  root.style.setProperty('--w-accent', c.accent);
  root.style.setProperty('--w-text', c.text);
  root.style.setProperty('--w-text-soft', c.textSoft);
  root.style.setProperty('--w-text-muted', c.textMuted);
  root.style.setProperty('--w-gradient-hero', c.gradientHero);
  root.style.setProperty('--w-gradient-button', c.gradientButton);
  root.style.setProperty('--w-gradient-card', c.gradientCard);
  root.style.setProperty('--w-shadow-card', s.card);
  root.style.setProperty('--w-shadow-button', s.button);
  root.style.setProperty('--w-shadow-glow', s.glow);
  root.style.setProperty('--w-radius-card', r.card);
  root.style.setProperty('--w-radius-button', r.button);
  root.style.setProperty('--w-radius-image', r.image);
  root.style.setProperty('--w-overlay-vignette', o.vignette);
  root.style.setProperty('--w-overlay-hero', o.heroDim);
  root.style.setProperty('--w-overlay-grain', o.filmGrain);

  document.body.style.background = c.bg;
  document.body.style.color = c.text;
  document.body.dataset.themeMode = theme.mode;
};
