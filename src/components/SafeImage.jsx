import { useMemo } from 'react';
import { resolveImage } from '../utils/assets.js';

const SafeImage = ({ src, alt, className = '', loading = 'lazy' }) => {
  const url = useMemo(() => resolveImage(src), [src]);
  if (!url) {
    return (
      <div className={`img-placeholder ${className}`} role="img" aria-label={alt} />
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
    />
  );
};

export default SafeImage;
