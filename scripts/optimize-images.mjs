/**
 * Tối ưu ảnh trong src/assets/images
 * - Sao lưu ảnh GỐC ra _image_originals/ (ngoài thư mục bundle) — chạy 1 lần.
 * - Luôn tối ưu TỪ bản gốc -> chạy lại nhiều lần không làm ảnh xấu dần.
 * - Resize cạnh dài <= MAX_EDGE, nén JPEG mozjpeg, nén PNG.
 *
 * Dùng: npm run optimize:images
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'src', 'assets', 'images');
const BACKUP_DIR = path.join(ROOT, '_image_originals');

const MAX_EDGE = 2200; // đủ cho full-screen, kể cả màn retina
const JPEG_QUALITY = 80;
const PNG_MAX_EDGE = 1400; // QR/đồ hoạ không cần lớn

const exts = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

async function ensureBackup(file, rel) {
  const backupPath = path.join(BACKUP_DIR, rel);
  try {
    await fs.access(backupPath);
    return backupPath; // đã có bản gốc
  } catch {
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.copyFile(file, backupPath);
    return backupPath;
  }
}

async function main() {
  const files = await walk(SRC_DIR);
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of files) {
    const rel = path.relative(SRC_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const isPng = ext === '.png';

    // Tối ưu luôn từ bản gốc (backup), tạo backup nếu chưa có.
    const source = await ensureBackup(file, rel);
    const srcBytes = (await fs.stat(source)).size;

    const pipeline = sharp(source).rotate(); // auto-orient theo EXIF
    pipeline.resize({
      width: isPng ? PNG_MAX_EDGE : MAX_EDGE,
      height: isPng ? PNG_MAX_EDGE : MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    });

    const buf = isPng
      ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipeline
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
          .toBuffer();

    // Chỉ ghi nếu nhỏ hơn bản hiện tại (tránh phình ngược).
    const curBytes = (await fs.stat(file)).size;
    if (buf.length < curBytes) {
      await fs.writeFile(file, buf);
    }
    const finalBytes = (await fs.stat(file)).size;

    beforeTotal += srcBytes;
    afterTotal += finalBytes;

    const saved = srcBytes - finalBytes;
    const pct = srcBytes ? ((saved / srcBytes) * 100).toFixed(0) : '0';
    console.log(
      `${rel.padEnd(42)} ${kb(srcBytes).padStart(10)} -> ${kb(finalBytes).padStart(10)}  (-${pct}%)`
    );
  }

  console.log('\n────────────────────────────────────────');
  console.log(`Ảnh: ${files.length} file`);
  console.log(`Gốc:     ${mb(beforeTotal)}`);
  console.log(`Tối ưu:  ${mb(afterTotal)}`);
  const totalPct = beforeTotal
    ? (((beforeTotal - afterTotal) / beforeTotal) * 100).toFixed(1)
    : '0';
  console.log(`Giảm:    ${mb(beforeTotal - afterTotal)} (-${totalPct}%)`);
  console.log(`\nBản gốc đã lưu tại: ${path.relative(ROOT, BACKUP_DIR)}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
