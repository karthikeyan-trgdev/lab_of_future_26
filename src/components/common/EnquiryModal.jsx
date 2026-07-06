import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { getProgramTheme } from '../../data/programThemes';
import '../../styles/components/enquiry-modal.css';

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' };

const EnquiryModal = ({ onClose }) => {
  const { pathname } = useLocation();
  const theme = getProgramTheme(pathname);

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No submission backend is wired up yet — swap this block for a
    // fetch()/API call once an enquiry endpoint exists.
    setSubmitted(true);
  };

  return createPortal(
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry form"
        style={{
          '--enquiry-primary': theme.primary,
          '--enquiry-accent': theme.accent,
          '--enquiry-glow': theme.glow,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="enquiry-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>

        {submitted ? (
          <div className="enquiry-modal-success">
            <p className="enquiry-modal-eyebrow">{theme.label}</p>
            <h3>Thanks — we&apos;ve got it!</h3>
            <p>Our team will reach out shortly to help with your enquiry.</p>
            <button type="button" className="enquiry-modal-submit" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="enquiry-modal-eyebrow">{theme.label}</p>
            <h3 className="enquiry-modal-title">Enquire Now</h3>
            <p className="enquiry-modal-sub">
              Tell us a little about you and we&apos;ll be in touch.
            </p>

            <form className="enquiry-modal-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                placeholder="+971 00 000 0000"
                value={form.phone}
                onChange={handleChange}
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="3"
                placeholder="What would you like to know?"
                value={form.message}
                onChange={handleChange}
              />

              <button type="submit" className="enquiry-modal-submit">
                Submit Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default EnquiryModal;
