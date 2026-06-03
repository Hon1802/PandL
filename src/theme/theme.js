/**
 * THEME SYSTEM
 * ------------------------------------------------------------
 * Mỗi theme là một object chứa toàn bộ token UI:
 *  - colors   : palette chính (background, surface, primary, text, ...)
 *  - fonts    : font family cho display / body / script
 *  - radius   : border radius cho card / button
 *  - shadow   : box-shadow phần card / button
 *  - overlay  : màu / opacity dùng cho overlay & vignette
 *  - timing   : timing animation chung
 *  - mode     : 'dark' | 'light'  (dùng cho điều chỉnh text)
 *  - isSelect : true ở MỘT theme duy nhất — theme mặc định khi mở trang
 *
 * Cách thêm theme mới:
 *  1. Copy một preset bên dưới
 *  2. Đổi key (vd: 'myStyle') và label
 *  3. Tùy biến colors / fonts / overlay
 *  4. Thêm vào export `themes` cuối file
 *
 * Cách chọn theme mặc định:
 *  - Đặt `isSelect: true` ở theme muốn dùng (chỉ 1 theme).
 *  - Nếu không theme nào có `isSelect`, fallback về theme đầu tiên.
 */

const baseTiming = {
  fast: 0.35,
  normal: 0.7,
  slow: 1.4,
  cinematic: 2.2,
};

const baseFonts = {
  display: '"Cormorant", "Playfair Display", serif',
  serif: '"Cormorant Garamond", serif',
  script: '"Pinyon Script", cursive',
  sans: '"Inter", system-ui, sans-serif',
};

export const themes = {
  /* 1. LUXURY GOLD — đen sang + ánh kim vàng champagne */
  luxuryGold: {
    key: 'luxuryGold',
    label: 'Luxury Gold',
    description: 'Đen huyền bí — ánh kim vàng champagne',
    mode: 'dark',
    colors: {
      bg: '#0b0a08',
      bgSoft: '#15110d',
      surface: '#1c1813',
      surfaceAlt: '#241d15',
      border: 'rgba(212,163,115,0.22)',
      primary: '#d4a373',
      primarySoft: '#e8c79a',
      accent: '#f1d9a7',
      text: '#f5ecd9',
      textSoft: '#c8b896',
      textMuted: '#857252',
      danger: '#c75b5b',
      gradientHero:
        'radial-gradient(ellipse at top, rgba(212,163,115,0.18) 0%, transparent 60%), linear-gradient(180deg, #0b0a08 0%, #15110d 100%)',
      gradientButton: 'linear-gradient(135deg, #d4a373 0%, #f1d9a7 50%, #d4a373 100%)',
      gradientCard: 'linear-gradient(160deg, rgba(212,163,115,0.10) 0%, rgba(255,255,255,0.02) 100%)',
    },
    fonts: { ...baseFonts },
    radius: { card: '22px', button: '999px', image: '16px' },
    shadow: {
      card: '0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,163,115,0.12)',
      button: '0 14px 40px -10px rgba(212,163,115,0.5)',
      glow: '0 0 80px rgba(212,163,115,0.25)',
    },
    overlay: {
      vignette: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.75) 100%)',
      filmGrain: 'rgba(0,0,0,0.25)',
      heroDim: 'linear-gradient(180deg, rgba(11,10,8,0.5) 0%, rgba(11,10,8,0.92) 100%)',
    },
    timing: baseTiming,
  },

  /* 2. ROMANTIC FLORAL — kem ngọt + hồng đào pastel */
  romanticFloral: {
    key: 'romanticFloral',
    label: 'Romantic Floral',
    description: 'Kem ngọt ngào — hồng đào pastel lãng mạn',
    mode: 'light',
    isSelect: true,
    colors: {
      bg: '#fdf6ef',
      bgSoft: '#f8ead9',
      surface: '#ffffff',
      surfaceAlt: '#fbe9dd',
      border: 'rgba(199,108,118,0.20)',
      primary: '#c76c76',
      primarySoft: '#e89aa3',
      accent: '#a26769',
      text: '#3b2a26',
      textSoft: '#7a5b54',
      textMuted: '#a78e85',
      danger: '#b04848',
      gradientHero:
        'radial-gradient(ellipse at top, rgba(232,154,163,0.35) 0%, transparent 55%), linear-gradient(180deg, #fdf6ef 0%, #f5ddd0 100%)',
      gradientButton: 'linear-gradient(135deg, #c76c76 0%, #e89aa3 100%)',
      gradientCard: 'linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(251,233,221,0.65) 100%)',
    },
    fonts: { ...baseFonts },
    radius: { card: '28px', button: '999px', image: '20px' },
    shadow: {
      card: '0 30px 70px -25px rgba(199,108,118,0.35)',
      button: '0 14px 36px -10px rgba(199,108,118,0.5)',
      glow: '0 0 80px rgba(232,154,163,0.4)',
    },
    overlay: {
      vignette: 'radial-gradient(ellipse at center, transparent 0%, rgba(180,120,110,0.18) 100%)',
      filmGrain: 'rgba(0,0,0,0.05)',
      heroDim: 'linear-gradient(180deg, rgba(253,246,239,0.2) 0%, rgba(253,246,239,0.85) 100%)',
    },
    timing: baseTiming,
  },

  /* 3. MINIMAL WHITE — trắng tối giản kiểu Apple */
  minimalWhite: {
    key: 'minimalWhite',
    label: 'Minimal White',
    description: 'Trắng tinh khôi — tối giản tinh tế kiểu Apple',
    mode: 'light',
    colors: {
      bg: '#fafafa',
      bgSoft: '#f1f1f0',
      surface: '#ffffff',
      surfaceAlt: '#f4f4f3',
      border: 'rgba(0,0,0,0.08)',
      primary: '#111111',
      primarySoft: '#444444',
      accent: '#888888',
      text: '#0a0a0a',
      textSoft: '#5b5b5b',
      textMuted: '#a3a3a3',
      danger: '#b00020',
      gradientHero:
        'radial-gradient(ellipse at top, rgba(0,0,0,0.05) 0%, transparent 55%), linear-gradient(180deg, #ffffff 0%, #f1f1f0 100%)',
      gradientButton: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
      gradientCard: 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(244,244,243,0.8) 100%)',
    },
    fonts: { ...baseFonts },
    radius: { card: '18px', button: '999px', image: '12px' },
    shadow: {
      card: '0 25px 60px -25px rgba(0,0,0,0.18)',
      button: '0 10px 30px -10px rgba(0,0,0,0.35)',
      glow: '0 0 60px rgba(0,0,0,0.06)',
    },
    overlay: {
      vignette: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.08) 100%)',
      filmGrain: 'rgba(0,0,0,0.04)',
      heroDim: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(250,250,250,0.9) 100%)',
    },
    timing: baseTiming,
  },

  /* 4. TRADITIONAL RED — đỏ son đám cưới truyền thống */
  traditionalRed: {
    key: 'traditionalRed',
    label: 'Traditional Red',
    description: 'Đỏ son truyền thống — tinh thần Á Đông sang quý',
    mode: 'dark',
    colors: {
      bg: '#1a0606',
      bgSoft: '#2b0a0a',
      surface: '#350d0d',
      surfaceAlt: '#481111',
      border: 'rgba(241,196,15,0.28)',
      primary: '#e8c252',
      primarySoft: '#f5d97a',
      accent: '#ff6b6b',
      text: '#fbeec5',
      textSoft: '#d9b87a',
      textMuted: '#9c7a4a',
      danger: '#ff4d4d',
      gradientHero:
        'radial-gradient(ellipse at top, rgba(232,194,82,0.18) 0%, transparent 55%), linear-gradient(180deg, #1a0606 0%, #2b0a0a 100%)',
      gradientButton: 'linear-gradient(135deg, #c8102e 0%, #e8c252 100%)',
      gradientCard: 'linear-gradient(160deg, rgba(232,194,82,0.1) 0%, rgba(200,16,46,0.08) 100%)',
    },
    fonts: { ...baseFonts },
    radius: { card: '14px', button: '999px', image: '10px' },
    shadow: {
      card: '0 30px 70px -25px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,194,82,0.18)',
      button: '0 14px 40px -10px rgba(200,16,46,0.6)',
      glow: '0 0 80px rgba(232,194,82,0.3)',
    },
    overlay: {
      vignette: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.75) 100%)',
      filmGrain: 'rgba(0,0,0,0.3)',
      heroDim: 'linear-gradient(180deg, rgba(26,6,6,0.45) 0%, rgba(26,6,6,0.92) 100%)',
    },
    timing: baseTiming,
  },

  /* 5. MODERN DARK — xanh đêm + bạc lạnh hiện đại */
  modernDark: {
    key: 'modernDark',
    label: 'Modern Dark',
    description: 'Xanh đêm hiện đại — bạc lạnh, kiến trúc tối giản',
    mode: 'dark',
    colors: {
      bg: '#08101a',
      bgSoft: '#0d1726',
      surface: '#101c30',
      surfaceAlt: '#16263e',
      border: 'rgba(160,196,224,0.18)',
      primary: '#a0c4e0',
      primarySoft: '#d6e8f6',
      accent: '#5c8ec0',
      text: '#eaf2fb',
      textSoft: '#b8c8da',
      textMuted: '#7a8aa0',
      danger: '#ff7676',
      gradientHero:
        'radial-gradient(ellipse at top, rgba(160,196,224,0.15) 0%, transparent 55%), linear-gradient(180deg, #08101a 0%, #0d1726 100%)',
      gradientButton: 'linear-gradient(135deg, #a0c4e0 0%, #d6e8f6 100%)',
      gradientCard: 'linear-gradient(160deg, rgba(160,196,224,0.08) 0%, rgba(255,255,255,0.02) 100%)',
    },
    fonts: { ...baseFonts },
    radius: { card: '20px', button: '999px', image: '14px' },
    shadow: {
      card: '0 30px 80px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(160,196,224,0.10)',
      button: '0 14px 40px -10px rgba(160,196,224,0.45)',
      glow: '0 0 80px rgba(160,196,224,0.25)',
    },
    overlay: {
      vignette: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)',
      filmGrain: 'rgba(0,0,0,0.25)',
      heroDim: 'linear-gradient(180deg, rgba(8,16,26,0.45) 0%, rgba(8,16,26,0.92) 100%)',
    },
    timing: baseTiming,
  },

  /* 6. VIETNAMESE VINTAGE — vàng nâu mộc mạc, hoài cổ */
  vietnameseVintage: {
    key: 'vietnameseVintage',
    label: 'Vietnamese Vintage',
    description: 'Mộc mạc hoài cổ — vàng nâu giấy điệp Việt Nam',
    mode: 'light',
    colors: {
      bg: '#f3e6cf',
      bgSoft: '#e6d3ad',
      surface: '#fbf2dc',
      surfaceAlt: '#e8d4a8',
      border: 'rgba(139,69,19,0.22)',
      primary: '#8b4513',
      primarySoft: '#b9743e',
      accent: '#c0392b',
      text: '#3a2412',
      textSoft: '#6b4a2a',
      textMuted: '#9c8158',
      danger: '#a52a2a',
      gradientHero:
        'radial-gradient(ellipse at top, rgba(192,57,43,0.16) 0%, transparent 55%), linear-gradient(180deg, #f3e6cf 0%, #e6d3ad 100%)',
      gradientButton: 'linear-gradient(135deg, #8b4513 0%, #c0392b 100%)',
      gradientCard: 'linear-gradient(160deg, rgba(251,242,220,0.95) 0%, rgba(232,212,168,0.7) 100%)',
    },
    fonts: { ...baseFonts },
    radius: { card: '12px', button: '8px', image: '8px' },
    shadow: {
      card: '0 25px 60px -25px rgba(139,69,19,0.35)',
      button: '0 14px 36px -10px rgba(139,69,19,0.45)',
      glow: '0 0 80px rgba(192,57,43,0.25)',
    },
    overlay: {
      vignette: 'radial-gradient(ellipse at center, transparent 0%, rgba(60,30,10,0.22) 100%)',
      filmGrain: 'rgba(0,0,0,0.12)',
      heroDim: 'linear-gradient(180deg, rgba(243,230,207,0.25) 0%, rgba(243,230,207,0.88) 100%)',
    },
    timing: baseTiming,
  },
};

export const themeList = Object.values(themes);

export const defaultThemeKey =
  themeList.find((t) => t.isSelect)?.key || themeList[0].key;
