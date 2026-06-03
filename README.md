# Wedding Invitation — React + Vite + Tailwind + Framer Motion

Thiệp cưới online cao cấp — production-ready. Mở thiệp cinematic, parallax, gallery
lightbox, countdown realtime, 6 theme preset đổi giao diện realtime, nhạc nền autoplay,
QR mừng cưới, Google Maps, lời cảm ơn.

---

## 1. Cài đặt & chạy

```bash
# Cài deps
npm install

# Chạy dev
npm run dev

# Build production
npm run build

# Preview bản build
npm run preview
```

Sau khi `npm run dev`, mở [http://localhost:5173](http://localhost:5173).

---

## 2. Cấu trúc project

```
.
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── src/
    ├── App.jsx            ← Toàn bộ UI: envelope, hero, couple, countdown,
    │                          story, quote, gallery, video, map, gift, footer,
    │                          music player, theme catalog…
    ├── main.jsx           ← React entry
    ├── index.css          ← Tailwind + global CSS variables theme
    ├── theme/
    │   └── theme.js       ← 6 theme preset có thể custom dễ dàng
    ├── data/
    │   └── wedding.json   ← TOÀN BỘ nội dung cưới (text/ảnh/nhạc/QR/timeline…)
    └── assets/
        ├── images/        ← Đặt ảnh cưới vào đây
        └── music/         ← Đặt nhạc nền (.mp3) vào đây
```

Lưu ý: tất cả text, ảnh, link map, timeline, ngày cưới, STK… đều nằm trong
`src/data/wedding.json` — **KHÔNG hardcode trong component**.

---

## 3. Thêm ảnh vào project

1. Mở thư mục [src/assets/images/](src/assets/images/)
2. Thả file ảnh vào, đặt tên trùng với tên trong `wedding.json`. Ví dụ:
   - `hero.jpg` — ảnh nền hero section
   - `groom.jpg`, `bride.jpg` — chân dung
   - `story-1.jpg` … `story-5.jpg` — timeline tình yêu
   - `gallery-1.jpg` … `gallery-8.jpg` — album cưới
   - `qr-groom.png`, `qr-bride.png` — QR mừng cưới
3. Nếu muốn dùng tên khác, chỉ cần update tên file tương ứng trong
   [src/data/wedding.json](src/data/wedding.json).

> Ảnh được auto-resolve bằng `import.meta.glob` của Vite — bạn không cần import thủ công.  
> Nếu thiếu ảnh, UI sẽ render placeholder gradient có biểu tượng `♡` thay vì lỗi 404.

### Khuyến nghị tối ưu ảnh
- Format: `.jpg` cho ảnh chụp, `.png` cho QR / logo.
- Kích thước hero: 1920×1280 ~ 300–500 KB (đã nén).
- Kích thước gallery: 1200–1600 px chiều dài, ~150–300 KB.
- Có thể nén bằng [squoosh.app](https://squoosh.app) trước khi up.

---

## 4. Thêm nhạc nền

1. Đặt file `.mp3` vào [src/assets/music/](src/assets/music/).
2. Mở `wedding.json`, sửa mảng `music.tracks`:

```json
"music": {
  "autoplay": true,
  "tracks": [
    { "title": "Perfect (Instrumental)", "src": "/src/assets/music/perfect.mp3" },
    { "title": "A Thousand Years (Piano)", "src": "/src/assets/music/a-thousand-years.mp3" }
  ]
}
```

Nhạc bắt đầu phát **ngay khi user click "Mở thiệp"** (vì cần user-gesture
để bypass autoplay policy của browser). Sau khi mở, có thể bật/tắt bằng nút floating
góc dưới bên phải.

---

## 5. Đổi nội dung thiệp

Toàn bộ nội dung ở [src/data/wedding.json](src/data/wedding.json):

- `couple.groom` / `couple.bride` — tên, vai, bio, ảnh
- `event.date` / `event.time` — ngày & giờ (dùng cho countdown)
- `event.ceremony` / `event.reception` — lễ vu quy & tiệc cưới
- `event.mapEmbed` — link `<iframe>` Google Maps (lấy từ Google Maps → Share → Embed)
- `event.mapLink` — link chỉ đường
- `story.timeline` — timeline tình yêu (thêm/bớt tự do)
- `gallery` — album ảnh + caption
- `gift.accounts` — nhiều tài khoản ngân hàng
- `quote`, `thanks`, `hero.quote` — lời thoại
- `video` — (optional) Save the date film

Mọi thay đổi tự động hot-reload khi `npm run dev`.

---

## 6. Đổi theme

### 6.1. Đổi nhanh từ UI
Click vào icon cọ vẽ ở góc dưới bên trái — chọn 1 trong 6 style:
- **Luxury Gold** — đen sang + ánh kim vàng
- **Romantic Floral** — kem ngọt + hồng đào pastel
- **Minimal White** — trắng tinh khôi kiểu Apple
- **Traditional Red** — đỏ son truyền thống Á Đông
- **Modern Dark** — xanh đêm + bạc lạnh
- **Vietnamese Vintage** — vàng nâu giấy điệp hoài cổ

Lựa chọn được **lưu vào localStorage**, đổi realtime không reload.

### 6.2. Custom theme từ code
Mở [src/theme/theme.js](src/theme/theme.js). Copy một preset, đổi:
- `colors.primary`, `colors.bg`, `colors.text` — palette chính
- `colors.gradientButton`, `gradientHero`, `gradientCard` — gradient
- `fonts` — đổi font display/script/sans
- `radius` — bo tròn card/button/image
- `shadow` — đổ bóng
- `overlay.vignette`, `heroDim` — overlay cinematic
- `timing` — tốc độ animation

Thêm vào export `themes`. Theme sẽ tự động hiển thị trong catalog.

### 6.3. Đặt theme mặc định
Trong `theme.js`:

```js
export const defaultThemeKey = 'luxuryGold'; // ← đổi key tại đây
```

---

## 7. Deploy

### Vercel
1. Push repo lên GitHub.
2. Vào [vercel.com](https://vercel.com) → New Project → Import repo.
3. Framework preset: **Vite** (tự detect).
4. Build command: `npm run build` — Output: `dist`.
5. Deploy.

### Netlify
1. Push repo lên GitHub.
2. Vào [netlify.com](https://app.netlify.com) → Add new site → Import from Git.
3. Build command: `npm run build` — Publish directory: `dist`.
4. Deploy.

### Static hosting bất kỳ (Cloudflare Pages / S3 / Surge…)
Chỉ cần upload nội dung thư mục `dist/` sau khi `npm run build`.

> Project đã set `base: './'` trong `vite.config.js` nên chạy được trên mọi đường dẫn,
> kể cả subfolder như `username.github.io/wedding/`.

---

## 8. Tips premium

- **Mobile-first**: toàn bộ UI responsive, animation nhẹ trên mobile (Framer Motion
  tự respect `prefers-reduced-motion`).
- **Performance**: ảnh `loading="lazy"`, `decoding="async"`, music `preload="none"`,
  `import.meta.glob` chỉ bundle ảnh có dùng.
- **A11y**: button đều có `aria-label`, modal gallery hỗ trợ ESC / ←/→.
- **SEO**: chỉnh `<title>` và meta description trong [index.html](index.html).
- **Domain riêng**: mua domain dạng `khoi-chau.love` và point về Vercel/Netlify.

---

## 9. License
Free for personal use. Chúc bạn một đám cưới thật đẹp 💍
