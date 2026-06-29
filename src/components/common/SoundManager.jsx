import { useEffect, useRef } from 'react';
import bgMusicUrl from '../../assets/sounds/background-music.mp3';

/**
 * Site-wide audio:
 *  - Background music: looped, quiet ambient volume.
 *
 *  Browsers block unmuted audio autoplay until a user gesture, so the bg
 *  music re-attempts on every interaction until one actually succeeds.
 */
const SoundManager = () => {
  const startedRef = useRef(false);

  useEffect(() => {
    const bgMusic = new Audio(bgMusicUrl);
    bgMusic.loop = true;
    bgMusic.volume = 0.18; // quiet ambient
    bgMusic.preload = 'auto';

    const tryStartBg = () => {
      if (startedRef.current) return;
      const p = bgMusic.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          startedRef.current = true;
        }).catch(() => {
          /* still blocked — try again on the next interaction */
        });
      } else {
        startedRef.current = true;
      }
    };

    window.addEventListener('click', tryStartBg);
    window.addEventListener('keydown', tryStartBg);
    window.addEventListener('scroll', tryStartBg, { passive: true });
    window.addEventListener('wheel', tryStartBg, { passive: true });
    window.addEventListener('touchstart', tryStartBg, { passive: true });

    return () => {
      window.removeEventListener('click', tryStartBg);
      window.removeEventListener('keydown', tryStartBg);
      window.removeEventListener('scroll', tryStartBg);
      window.removeEventListener('wheel', tryStartBg);
      window.removeEventListener('touchstart', tryStartBg);
      try {
        bgMusic.pause();
        bgMusic.src = '';
      } catch {
        /* ignore */
      }
    };
  }, []);

  return null;
};

export default SoundManager;
