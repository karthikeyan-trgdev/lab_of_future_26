import { useEffect, useRef } from 'react';

/* Driven entirely via a ref + requestAnimationFrame, never React state —
   a setState-per-scroll-event re-render is what made this feel stuttery.
   transform:scaleX is compositor-only (no layout/paint), so sampling
   scrollY every frame stays smooth even on heavier pages. */
const ScrollProgressBar = () => {
  const fillRef = useRef(null);

  useEffect(() => {
    let raf;
    let lastPct = -1;

    const tick = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;

      if (pct !== lastPct && fillRef.current) {
        fillRef.current.style.transform = `scaleX(${pct})`;
        lastPct = pct;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={fillRef} className="scroll-progress-fill" />
    </div>
  );
};

export default ScrollProgressBar;
