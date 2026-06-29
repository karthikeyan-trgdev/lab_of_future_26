import { useContext, useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import SmoothScrollContext from '../../context/SmoothScrollContext';

const SHOW_AFTER_PX = 400;

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const lenis = useContext(SmoothScrollContext);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    if (lenis?.current?.scrollTo) {
      lenis.current.scrollTo('top', { lerp: 0.08 });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-to-top-btn${visible ? ' is-visible' : ''}`}
      onClick={handleClick}
      aria-label="Scroll back to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
