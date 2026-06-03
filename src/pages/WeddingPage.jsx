import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import weddingData from '../data/wedding.json';
import { themes, defaultThemeKey } from '../theme/theme.js';
import { applyTheme } from '../utils/applyTheme.js';
import { resolveImage, resolveMusic } from '../utils/assets.js';

import Envelope from '../components/envelope/Envelope.jsx';
import Hero from '../components/sections/Hero.jsx';
import Couple from '../components/sections/Couple.jsx';
import Families from '../components/sections/Families.jsx';
import EventSection from '../components/sections/EventSection.jsx';
import Story from '../components/sections/Story.jsx';
import QuoteSection from '../components/sections/QuoteSection.jsx';
import Gallery from '../components/sections/Gallery.jsx';
import VideoSection from '../components/sections/VideoSection.jsx';
import MapSection from '../components/sections/MapSection.jsx';
import Gift from '../components/sections/Gift.jsx';
import FooterSection from '../components/sections/FooterSection.jsx';
import MusicPlayer from '../components/MusicPlayer.jsx';
import ThemeCatalog from '../components/ThemeCatalog.jsx';

const WeddingPage = () => {
  const data = weddingData;
  const pageBg = useMemo(() => resolveImage(data.hero.bgImage), [data.hero.bgImage]);

  const [themeKey, setThemeKey] = useState(defaultThemeKey);
  const theme = themes[themeKey] || themes[defaultThemeKey];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('scroll-lock', !opened);
    return () => document.body.classList.remove('scroll-lock');
  }, [opened]);

  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);

  const tracks = useMemo(
    () =>
      (data.music?.tracks || [])
        .map((t) => ({ ...t, url: resolveMusic(t.src) }))
        .filter((t) => t.url),
    [data.music]
  );

  const startMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a || tracks.length === 0) return;
    if (!a.paused && a.currentTime > 0) {
      setPlaying(true);
      return;
    }
    if (!a.src) a.src = tracks[trackIdx].url;
    a.volume = 0.55;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [tracks, trackIdx]);

  const toggleMusic = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      if (!a.src && tracks.length > 0) a.src = tracks[trackIdx].url;
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing, tracks, trackIdx]);

  const onTrackEnded = useCallback(() => {
    if (tracks.length === 0) return;
    const next = (trackIdx + 1) % tracks.length;
    setTrackIdx(next);
    const a = audioRef.current;
    if (a) {
      a.src = tracks[next].url;
      a.play().catch(() => {});
    }
  }, [trackIdx, tracks]);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  const handleUserGesture = useCallback(() => {
    if (data.music?.autoplay) startMusic();
  }, [data.music, startMusic]);

  const handleReopen = useCallback(() => {
    setOpened(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: 'var(--w-bg)',
        backgroundImage: pageBg
          ? `linear-gradient(180deg, rgba(0,0,0,0) 0vh, rgba(0,0,0,0) 70vh, var(--w-bg) 100vh, var(--w-bg) 100%), url(${pageBg})`
          : 'var(--w-gradient-hero)',
        backgroundSize: pageBg ? '100% 100%, 100% auto' : 'cover',
        backgroundPosition: pageBg ? 'top center, top center' : 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      <audio
        ref={audioRef}
        onEnded={onTrackEnded}
        loop={tracks.length === 1}
        preload="none"
      />

      <AnimatePresence mode="wait">
        {!opened && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Envelope
              data={data}
              onOpen={handleOpen}
              onUserGesture={handleUserGesture}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Hero data={data} onReopen={handleReopen} />
            <Couple data={data} />
            <Families data={data} />
            <EventSection data={data} />
            <Story data={data} />
            <QuoteSection data={data} />
            <Gallery data={data} />
            <VideoSection data={data} />
            <MapSection data={data} />
            <Gift data={data} />
            <FooterSection data={data} />
          </motion.main>
        )}
      </AnimatePresence>

      {opened && (
        <>
          <ThemeCatalog themeKey={themeKey} onPick={setThemeKey} />
          <MusicPlayer
            tracks={tracks}
            playing={playing}
            onToggle={toggleMusic}
          />
        </>
      )}
    </div>
  );
};

export default WeddingPage;
