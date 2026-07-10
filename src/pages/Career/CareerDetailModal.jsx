import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX, FiMapPin, FiBriefcase } from "react-icons/fi";

/**
 * Read More → full job description for a single role.
 * `career` is one entry from src/data/careers.js.
 */
const CareerDetailModal = ({ career, onClose, onApply }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!career) return null;

  return createPortal(
    <div className="career-modal-overlay" onClick={onClose} data-lenis-prevent>
      <div
        className="career-modal career-modal--jd"
        role="dialog"
        aria-modal="true"
        aria-label={`${career.title} job description`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="career-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>

        <div className="career-jd-head">
          <h2 className="career-jd-title">{career.title}</h2>
          <ul className="career-jd-meta">
            <li>
              <FiMapPin /> {career.location}
            </li>
            <li>
              <FiBriefcase /> {career.type}
            </li>
            <li className="career-jd-tag">{career.discipline}</li>
          </ul>
        </div>

        <div className="career-jd-body">
          <section>
            <h3>Overview</h3>
            <p>{career.overview}</p>
          </section>

          {career.responsibilities?.length > 0 && (
            <section>
              <h3>What you&apos;ll do</h3>
              <ul>
                {career.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {career.requirements?.length > 0 && (
            <section>
              <h3>What you&apos;ll need</h3>
              <ul>
                {career.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {career.niceToHave?.length > 0 && (
            <section>
              <h3>Nice to have</h3>
              <ul>
                {career.niceToHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="career-jd-actions">
          <button
            type="button"
            className="career-btn career-btn--primary"
            onClick={() => onApply(career)}
          >
            Apply Now
          </button>
          <button
            type="button"
            className="career-btn career-btn--ghost"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CareerDetailModal;
