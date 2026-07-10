import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

// ---- Select option lists (front-end demo values) --------------------
const GPA_OPTS = [
  "4.0",
  "3.5 – 3.9",
  "3.0 – 3.4",
  "2.5 – 2.9",
  "Below 2.5",
  "Not applicable / Do not recall",
];
const SAT_OPTS = [
  "1500 – 1600",
  "1400 – 1499",
  "1300 – 1399",
  "1200 – 1299",
  "Below 1200",
  "Not applicable / Do not recall",
];
const ACT_OPTS = [
  "33 – 36",
  "29 – 32",
  "25 – 28",
  "21 – 24",
  "Below 21",
  "Not applicable / Do not recall",
];
const GRE_OPTS = [
  "330 – 340",
  "320 – 329",
  "310 – 319",
  "300 – 309",
  "Below 300",
  "Not applicable / Do not recall",
];
const DEGREE_OPTS = [
  "High School",
  "Diploma",
  "Associate",
  "Bachelor's",
  "Master's",
  "Doctorate",
  "Other",
];
const SCHOOL_OPTS = [
  "United Arab Emirates University",
  "Khalifa University",
  "American University of Sharjah",
  "University of Dubai",
  "Other",
];
const DISCIPLINE_OPTS = [
  "Engineering",
  "Computer Science",
  "Physics / Astronomy",
  "Education",
  "Business",
  "Design",
  "Other",
];
const HEAR_OPTS = [
  "LinkedIn",
  "Job board",
  "Referral",
  "Company website",
  "Social media",
  "Event",
  "Other",
];
const CLEARANCE_OPTS = ["None", "Confidential", "Secret", "Top Secret", "Other"];
const EMPLOYMENT_OPTS = [
  "Never employed at Lab of Future",
  "Currently employed at Lab of Future",
  "Previously employed at Lab of Future",
];
const YESNO_OPTS = ["Yes", "No"];
const CITIZENSHIP_OPTS = [
  "UAE Citizen",
  "GCC Citizen",
  "Residency / Work Visa holder",
  "Other",
];
const COUNTRY_OPTS = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Bahrain",
  "Kuwait",
  "India",
  "United Kingdom",
  "United States",
  "Other",
];

const emptyEducation = () => ({ school: "", degree: "", discipline: "" });

// Module-level field components — MUST live outside the modal component,
// otherwise they'd be recreated every render and inputs would lose focus
// on each keystroke.
const Text = ({ label, value, onChange, required, type = "text", placeholder }) => (
  <div className="career-field">
    <label>
      {label}
      {required && <span className="req">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

const Select = ({ label, value, onChange, options, required, help }) => (
  <div className="career-field">
    <label>
      {label}
      {required && <span className="req">*</span>}
    </label>
    <select value={value} onChange={onChange} required={required}>
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {help && <p className="career-field-help">{help}</p>}
  </div>
);

/**
 * Apply Now → full application form for a role.
 * Field set mirrors a standard Greenhouse-style application.
 * No backend yet — submit shows a success state.
 */
const CareerApplyModal = ({ career, onClose }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    email: "",
    country: "",
    phone: "",
    city: "",
    resumeMode: "attach", // "attach" | "manual"
    resumeText: "",
    linkedin: "",
    hear: "",
    hearSpecify: "",
    gpaUndergrad: "",
    gpaGraduate: "",
    gpaDoctorate: "",
    sat: "",
    act: "",
    gre: "",
    clearance: "",
    employmentHistory: "",
    essentialFunctions: "",
    workAuthorized: "",
    citizenship: "",
    otherExplain: "",
  });
  const [educations, setEducations] = useState([emptyEducation()]);
  const [resumeName, setResumeName] = useState("");
  const [portfolioName, setPortfolioName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const resumeInputRef = useRef(null);
  const portfolioInputRef = useRef(null);
  const scrollRef = useRef(null);

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

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const setEducation = (index, key, value) =>
    setEducations((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );

  const addEducation = () =>
    setEducations((prev) => [...prev, emptyEducation()]);

  const removeEducation = (index) =>
    setEducations((prev) => prev.filter((_, i) => i !== index));

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setForm((prev) => ({
          ...prev,
          city: `${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`,
        })),
      () => {},
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No submission backend is wired up yet — swap for a fetch()/API
    // call once an applications endpoint exists.
    setSubmitted(true);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  return createPortal(
    <div className="career-modal-overlay" onClick={onClose} data-lenis-prevent>
      <div
        className="career-modal career-modal--apply"
        role="dialog"
        aria-modal="true"
        aria-label={`Apply for ${career?.title || "this role"}`}
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

        <div className="career-apply-scroll" ref={scrollRef}>
          {submitted ? (
            <div className="career-apply-success">
              <h2>Application received</h2>
              <p>
                Thanks for applying{form.firstName ? `, ${form.firstName}` : ""}!
                We&apos;ve got your application for{" "}
                <strong>{career?.title}</strong> and our team will be in touch.
              </p>
              <button
                type="button"
                className="career-btn career-btn--primary"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="career-apply-head">
                <h2>Apply for this job</h2>
                {career && <p className="career-apply-role">{career.title}</p>}
                <p className="career-apply-required">
                  <span className="req">*</span> indicates a required field
                </p>
              </div>

              <form className="career-apply-form" onSubmit={handleSubmit}>
                {/* ---- Personal ---- */}
                <Text label="First Name" value={form.firstName} onChange={set("firstName")} required />
                <Text label="Last Name" value={form.lastName} onChange={set("lastName")} required />
                <Text label="Preferred First Name" value={form.preferredName} onChange={set("preferredName")} />
                <Text label="Email" type="email" value={form.email} onChange={set("email")} required />

                <div className="career-field-row">
                  <Select label="Country" value={form.country} onChange={set("country")} options={COUNTRY_OPTS} required />
                  <Text label="Phone" type="tel" value={form.phone} onChange={set("phone")} required />
                </div>

                <Text label="Location (City)" value={form.city} onChange={set("city")} required />
                <button type="button" className="career-link-btn" onClick={handleLocateMe}>
                  Locate me
                </button>

                {/* ---- Resume ---- */}
                <div className="career-field">
                  <label>
                    Resume/CV<span className="req">*</span>
                  </label>
                  <div className="career-attach-row">
                    <button
                      type="button"
                      className={`career-btn career-btn--outline ${form.resumeMode === "attach" ? "is-active" : ""}`}
                      onClick={() => {
                        setForm((p) => ({ ...p, resumeMode: "attach" }));
                        resumeInputRef.current?.click();
                      }}
                    >
                      {resumeName || "Attach"}
                    </button>
                    <button
                      type="button"
                      className={`career-btn career-btn--outline ${form.resumeMode === "manual" ? "is-active" : ""}`}
                      onClick={() => setForm((p) => ({ ...p, resumeMode: "manual" }))}
                    >
                      Enter manually
                    </button>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.rtf"
                      hidden
                      onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")}
                    />
                  </div>
                  {form.resumeMode === "manual" && (
                    <textarea
                      className="career-manual-resume"
                      rows="5"
                      placeholder="Paste your resume / CV here…"
                      value={form.resumeText}
                      onChange={set("resumeText")}
                    />
                  )}
                  <p className="career-field-help">
                    Accepted file types: pdf, doc, docx, txt, rtf
                  </p>
                </div>

                {/* ---- Education (repeatable) ---- */}
                <div className="career-section-block">
                  <h3 className="career-section-title">Education</h3>
                  {educations.map((row, i) => (
                    <div className="career-education-row" key={i}>
                      <div className="career-field">
                        <label>
                          School<span className="req">*</span>
                        </label>
                        <select
                          value={row.school}
                          onChange={(e) => setEducation(i, "school", e.target.value)}
                          required
                        >
                          <option value="">Select...</option>
                          {SCHOOL_OPTS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div className="career-field">
                        <label>
                          Degree<span className="req">*</span>
                        </label>
                        <select
                          value={row.degree}
                          onChange={(e) => setEducation(i, "degree", e.target.value)}
                          required
                        >
                          <option value="">Select...</option>
                          {DEGREE_OPTS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div className="career-field">
                        <label>Discipline</label>
                        <select
                          value={row.discipline}
                          onChange={(e) => setEducation(i, "discipline", e.target.value)}
                        >
                          <option value="">Select...</option>
                          {DISCIPLINE_OPTS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                      {educations.length > 1 && (
                        <button
                          type="button"
                          className="career-link-btn career-link-btn--danger"
                          onClick={() => removeEducation(i)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="career-link-btn" onClick={addEducation}>
                    Add another
                  </button>
                </div>

                {/* ---- Links / extras ---- */}
                <Text label="LinkedIn Profile" value={form.linkedin} onChange={set("linkedin")} placeholder="https://linkedin.com/in/…" />

                <div className="career-field">
                  <label>Portfolio or Cover Letter</label>
                  <button
                    type="button"
                    className="career-btn career-btn--outline"
                    onClick={() => portfolioInputRef.current?.click()}
                  >
                    {portfolioName || "Attach"}
                  </button>
                  <input
                    ref={portfolioInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    hidden
                    onChange={(e) => setPortfolioName(e.target.files?.[0]?.name || "")}
                  />
                  <p className="career-field-help">
                    Accepted file types: pdf, doc, docx, txt, rtf
                  </p>
                </div>

                <Select
                  label="How did you hear about this job?"
                  value={form.hear}
                  onChange={set("hear")}
                  options={HEAR_OPTS}
                  required
                  help="If event or other, please specify below."
                />
                <Text label="Please specify" value={form.hearSpecify} onChange={set("hearSpecify")} />

                {/* ---- Scores ---- */}
                <Select label="GPA (Undergraduate)" value={form.gpaUndergrad} onChange={set("gpaUndergrad")} options={GPA_OPTS} required help='Convert to a 4.0 scale. Select "Not applicable / Do not recall" if unavailable.' />
                <Select label="GPA (Graduate)" value={form.gpaGraduate} onChange={set("gpaGraduate")} options={GPA_OPTS} required help='Convert to a 4.0 scale. Select "Not applicable / Do not recall" if unavailable.' />
                <Select label="GPA (Doctorate)" value={form.gpaDoctorate} onChange={set("gpaDoctorate")} options={GPA_OPTS} required help='Convert to a 4.0 scale. Select "Not applicable / Do not recall" if unavailable.' />
                <Select label="SAT Score" value={form.sat} onChange={set("sat")} options={SAT_OPTS} required />
                <Select label="ACT Score" value={form.act} onChange={set("act")} options={ACT_OPTS} required />
                <Select label="GRE Score" value={form.gre} onChange={set("gre")} options={GRE_OPTS} required />

                <Select label="Active Security Clearance(s)" value={form.clearance} onChange={set("clearance")} options={CLEARANCE_OPTS} required />
                <Select label="Lab of Future Employment History" value={form.employmentHistory} onChange={set("employmentHistory")} options={EMPLOYMENT_OPTS} required />
                <Select label="Can you perform all the essential functions of this role with or without reasonable accommodations?" value={form.essentialFunctions} onChange={set("essentialFunctions")} options={YESNO_OPTS} required />
                <Select label="Are you legally authorized to work in the UAE?" value={form.workAuthorized} onChange={set("workAuthorized")} options={YESNO_OPTS} required />
                <Select label="Citizenship Status" value={form.citizenship} onChange={set("citizenship")} options={CITIZENSHIP_OPTS} required />

                <div className="career-field">
                  <label>If (f) Other, please explain:</label>
                  <textarea rows="3" value={form.otherExplain} onChange={set("otherExplain")} />
                </div>

                <div className="career-apply-actions">
                  <button type="submit" className="career-btn career-btn--primary career-btn--block">
                    Submit Application
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CareerApplyModal;
