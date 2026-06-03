/**
 * ASSET RESOLUTION
 * Tự động map file trong /src/assets/images & /src/assets/music
 * (kể cả subfolder) -> URL Vite.
 * Nếu thiếu file, trả về null (UI sẽ render placeholder).
 */

const imageModules = import.meta.glob('../assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const musicModules = import.meta.glob('../assets/music/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const buildMap = (modules, prefix) =>
  Object.entries(modules).reduce((acc, [path, url]) => {
    const key = path.replace(prefix, '');
    acc[key] = url;
    return acc;
  }, {});

const imageMap = buildMap(imageModules, '../assets/images/');
const musicMap = buildMap(musicModules, '../assets/music/');

const normalizeKey = (rawPath, folder) => {
  return rawPath
    .replace(new RegExp(`^/src/assets/${folder}/`), '')
    .replace(new RegExp(`^\\.\\.?/assets/${folder}/`), '');
};

export const resolveImage = (rawPath) => {
  if (!rawPath) return null;
  return imageMap[normalizeKey(rawPath, 'images')] || null;
};

export const resolveMusic = (rawPath) => {
  if (!rawPath) return null;
  return musicMap[normalizeKey(rawPath, 'music')] || null;
};
