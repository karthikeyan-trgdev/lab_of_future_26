import { useState } from "react";
import {
  FaAtom,
  FaBrain,
  FaChalkboardTeacher,
  FaRocket,
  FaPlay,
  FaQuoteRight,
  FaStar,
  FaSchool,
  FaBriefcase,
  FaUserGraduate,
} from "react-icons/fa";
import { FiArrowRight, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import SEO from "../../components/common/SEO";
import { siteConfig } from "../../data/siteConfig";
import heroBg from "../../assets/media-and-stories/hero-bg.webp";
import enquiryBg from "../../assets/media-and-stories/enquiry-bg.webp";
import avatarImg from "../../assets/media-and-stories/person.png";
import "../../styles/pages/media-stories.css";

/* =============================================================
   1 · HERO
============================================================= */
const HERO_FEATURES = [
  { icon: FaAtom, label: "Hands-on\nLearning" },
  { icon: FaBrain, label: "Real World\nApplications" },
  { icon: FaChalkboardTeacher, label: "Expert\nGuidance" },
  { icon: FaRocket, label: "Future Ready\nInnovations" },
];

const MediaHero = () => (
  <section
    className="ms-hero"
    style={{ backgroundImage: `url(${heroBg})` }}
  >
    <div className="ms-hero-overlay" aria-hidden="true" />
    <div className="container ms-hero-inner">
      <p className="ms-eyebrow">
        <span className="ms-eyebrow-line" /> From Learners to Creators</p>

      <h1 className="ms-hero-title">
        BUILDING FUTURE,{" "}
        <span className="ms-grad">CREATING SUCCESS</span>
      </h1>

      <p className="ms-hero-desc">
        From concept to creation, our students transform imagination into
        reality through immersive research and project-based learning.</p>

      <div className="ms-hero-actions">
        <a className="ms-btn ms-btn--primary" href="#enquiry">
          Enroll Now <FiArrowRight />
        </a>
        <a className="ms-btn ms-btn--ghost" href="#enquiry">
          Book a Demo <FiArrowRight />
        </a>
      </div>

      <ul className="ms-hero-features">
        {HERO_FEATURES.map(({ icon: Icon, label }) => (
          <li key={label}>
            <Icon className="ms-hero-feature-icon" />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <a className="ms-hero-play" href="#enquiry">
        <span className="ms-hero-play-btn">
          <FaPlay />
        </span>
        See Our Students
        <br />
        In Action
      </a>
    </div>
  </section>
);

/* =============================================================
   2 · TESTIMONIALS — "Voices of Our Community"
============================================================= */
const LOREM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1960s.";

const makeCards = (name) =>
  Array.from({ length: 6 }, (_, i) => ({
    id: `${name}-${i}`,
    name: `${name} Name`,
    rating: "5.0",
    text: LOREM,
    rep: `${name} Representative`,
    designation: "Designation",
    initials: name.slice(0, 2).toUpperCase(),
  }));

const TESTIMONIAL_TABS = [
  { id: "school", label: "School Testimonials", icon: FaSchool, cards: makeCards("School") },
  { id: "interns", label: "Interns Testimonials", icon: FaBriefcase, cards: makeCards("Intern") },
  { id: "students", label: "Students Testimonials", icon: FaUserGraduate, cards: makeCards("Student") },
];

const Testimonials = () => {
  const [active, setActive] = useState("school");
  const current = TESTIMONIAL_TABS.find((t) => t.id === active);

  return (
    <section className="ms-testimonials">
      <div className="container">
        <p className="ms-pill">TESTIMONIALS</p>
        <h2 className="ms-section-title">
          Voices of Our <span className="ms-grad">Community</span>
        </h2>
        <p className="ms-section-sub">
          Hear from schools, interns, and students who are experiencing real
          growth and building future-ready skills with us.
        </p>

        <div className="ms-tabs" role="tablist">
          {TESTIMONIAL_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              className={`ms-tab ${active === id ? "is-active" : ""}`}
              onClick={() => setActive(id)}
            >
              <Icon className="ms-tab-icon" />
              {label}
            </button>
          ))}
        </div>

        <div className="ms-testimonial-grid">
          {current.cards.map((c) => (
            <article className="ms-tcard" key={c.id}>
              <FaQuoteRight className="ms-tcard-quote" />
              <div className="ms-tcard-head">
                <span className="ms-tcard-avatar">
                  <img src={avatarImg} alt={c.name} />
                </span>
                <div>
                  <h3 className="ms-tcard-name">{c.name}</h3>
                  <p className="ms-tcard-rating">
                    <span className="ms-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </span>
                    {c.rating}
                  </p>
                </div>
              </div>

              <p className="ms-tcard-text">{c.text}</p>

              <div className="ms-tcard-rep">
                <div>
                  <p className="ms-tcard-rep-name">{c.rep}</p>
                  <p className="ms-tcard-rep-role">{c.designation}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================================================
   3 · ENQUIRY — "Get in touch with Us"
============================================================= */
const OFFICES = [
  {
    city: "Dubai (UAE)",
    address:
      "Ground Floor, Office Land Building Block 2, Sheikh Rashid Street, Opp. Dubai Frame",
    phones: ["+971-42856706 / +971 50 511 4769", "+971 4 285 6706"],
    email: "contact@laboffuture.com",
  },
  {
    city: "Jaipur (India)",
    address:
      "C-3/217, F Block, Chitrakoot Yozna, Vaishali Nagar, Jaipur, Rajasthan 302021, India",
    phones: ["+91 81078 15275"],
    email: "frontdesk@laboffuture.com",
  },
  {
    city: "Chennai (India)",
    address:
      "6/2, Willingdon Crescent, 2nd floor, Pycrofts garden road, Nungambakkam, Chennai",
    phones: ["+91 44 69226868"],
    email: "contact@laboffuture.com",
  },
];

const EMPTY = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  program: "",
  question: "",
};

const EnquirySection = () => {
  const [form, setForm] = useState(EMPTY);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired yet — swap for an API call when available.
    setSubmitted(true);
  };

  return (
    <section
      className="ms-enquiry"
      id="enquiry"
      style={{ backgroundImage: `url(${enquiryBg})` }}
    >
      <div className="ms-enquiry-overlay" aria-hidden="true" />
      <div className="container ms-enquiry-inner">
        {/* Left — office cards */}
        <div className="ms-offices">
          {OFFICES.map((o) => (
            <div className="ms-office" key={o.city}>
              <h4 className="ms-office-city">{o.city}</h4>
              <p className="ms-office-row">
                <FiMapPin /> <span>{o.address}</span>
              </p>
              {o.phones.map((p) => (
                <p className="ms-office-row" key={p}>
                  <FiPhone /> <span>{p}</span>
                </p>
              ))}
              <p className="ms-office-row">
                <FiMail /> <span>{o.email}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Right — form */}
        <div className="ms-enquiry-form-wrap">
          <h2 className="ms-enquiry-title">Get in touch with Us</h2>
          <p className="ms-enquiry-sub">
            Have any questions?
            <br />
            Or ready to transform your child&apos;s future.
          </p>

          {submitted ? (
            <div className="ms-enquiry-success">
              <h3>Thank you!</h3>
              <p>We&apos;ve received your message and will be in touch soon.</p>
            </div>
          ) : (
            <form className="ms-enquiry-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Student Name"
                value={form.name}
                onChange={set("name")}
                required
              />
              <div className="ms-form-row">
                <select value={form.age} onChange={set("age")} required>
                  <option value="">Age</option>
                  {Array.from({ length: 15 }, (_, i) => i + 5).map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <select value={form.gender} onChange={set("gender")} required>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={set("phone")}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={set("email")}
                required
              />
              <select value={form.program} onChange={set("program")} required>
                <option value="">I want to Join a program</option>
                <option>Space Science</option>
                <option>Space Robotics</option>
                <option>Drones</option>
                <option>AI &amp; Data Science</option>
                <option>Aeromodelling</option>
              </select>
              <textarea
                rows="4"
                placeholder="Ask your question here"
                value={form.question}
                onChange={set("question")}
              />

              <div className="ms-upload-row">
                <label className="ms-upload-field">
                  <span>{fileName || "Upload document here"}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    hidden
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                  />
                  <span className="ms-upload-btn">Upload</span>
                </label>
              </div>

              <button type="submit" className="ms-submit-btn">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

/* =============================================================
   PAGE
============================================================= */
const MediaStories = () => (
  <div className="ms-page">
    <SEO
      title={`Media & Success Stories | ${siteConfig.title}`}
      description="Projects, research and voices from the Lab of Future community — success stories, testimonials and more."
      url={`${siteConfig.url}/media`}
      image={siteConfig.socialImage}
    />
    <MediaHero />
    <Testimonials />
    <EnquirySection />
  </div>
);

export default MediaStories;
