import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO';
import '../../styles/pages/category-page.css';

/* Generic placeholder for category pages that don't have programs
   wired up yet (Schools, Universities, Professionals, Industries).
   Renders the same visual treatment as the populated category pages
   so the navigation feels consistent. */
const ComingSoon = ({ category }) => (
  <>
    <SEO
      title={`${category} — Lab of Future`}
      description={`Programs for ${category.toLowerCase()} are launching soon.`}
    />

    <main className="cat-page">
      <div className="cat-page-stars" />
      <div className="cat-page-glow" />

      <div className="cat-page-inner container">
        <Link to="/" className="cat-page-back">&larr; Back to all paths</Link>

        <motion.div
          className="cat-page-head cat-page-head--centered"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="cat-page-eyebrow">FOR {category.toUpperCase()}</p>
          <h1 className="cat-page-title">COMING SOON</h1>
          <p className="cat-page-sub">
            Our programs for {category.toLowerCase()} are launching shortly.
            Check back, or reach out to us if you&apos;d like an early look.
          </p>
          <Link to="/" className="cat-page-cta">EXPLORE OTHER PATHS</Link>
        </motion.div>
      </div>
    </main>
  </>
);

export default ComingSoon;
