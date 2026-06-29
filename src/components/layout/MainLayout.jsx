import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LenisProvider from './LenisProvider';
import ScrollToTop from '../common/ScrollToTop';
import SplashCursor from '../common/SplashCursor';

// Per-page splash-cursor colors. Each program/page gets its own hue;
// anything not listed falls back to CURSOR_DEFAULT_COLOR.
const CURSOR_DEFAULT_COLOR = '#3B82F6';
const CURSOR_COLORS = {
  '/students': '#5EC8FF',                 // cyan — students landing
  '/students/space-science': '#3B82F6',   // blue
  '/students/space-robotics': '#17306e',  // amber/orange
  '/students/drones': '#ffffff',          // green
  '/students/ai-and-data-science': '#3B82F6', // purple
  '/students/aeromodelling': '#5EC8FF',   // orange-red
  '/schools': '#0EA5E9',
  '/universities': '#14B8A6',
  '/professionals': '#8B5CF6',
  '/industries': '#EAB308',
  '/about': '#E11D48',                     // rose
  '/services': '#10B981',                  // emerald
  '/projects': '#6366F1',                  // indigo
  '/contact': '#EC4899',                   // pink
};

const MainLayout = () => {
  const { pathname } = useLocation();
  const cursorColor = CURSOR_COLORS[pathname] || CURSOR_DEFAULT_COLOR;

  return (
    <LenisProvider>
      <ScrollToTop />
      {/* keyed by color so the WebGL sim re-initializes with the new hue
          when navigating to a page with a different cursor color */}
      <SplashCursor
        key={cursorColor}
        DENSITY_DISSIPATION={6}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR={cursorColor}
      />
      <Header />
      <main className="site-main" role="main">
        <Outlet />
      </main>
      <Footer />
    </LenisProvider>
  );
};

export default MainLayout;
