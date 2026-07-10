import { useState } from "react";
import {
  FaAtom,
  FaBrain,
  FaChalkboardTeacher,
  FaRocket,
  FaPlay,
  FaRobot,
  FaUsers,
  FaSatellite,
  FaMicrochip,
  FaLayerGroup,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";
import { FiArrowRight, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import SEO from "../../components/common/SEO";
import { siteConfig } from "../../data/siteConfig";
import heroBg from "../../assets/projects-page/research-bg.webp";
import enquiryBg from "../../assets/media-and-stories/enquiry-bg.webp";
import projectImg from "../../assets/projects-page/project-1.webp";
import "../../styles/pages/media-stories.css";
import "../../styles/pages/research-projects.css";

/* =============================================================
   1 · HERO
============================================================= */
const HERO_FEATURES = [
  { icon: FaAtom, label: "Hands-on\nLearning" },
  { icon: FaBrain, label: "Real World\nApplications" },
  { icon: FaChalkboardTeacher, label: "Expert\nGuidance" },
  { icon: FaRocket, label: "Future Ready\nInnovations" },
];

const ResearchHero = () => (
  <section className="ms-hero" style={{ backgroundImage: `url(${heroBg})` }}>
    <div className="ms-hero-overlay" aria-hidden="true" />
    <div className="container ms-hero-inner">
      <p className="ms-eyebrow">
        <span className="ms-eyebrow-line" /> RESEARCH &amp; PROJECTS
      </p>

     <h1 className="ms-hero-title">
  Turning Ideas
  <br />
  <span className="ms-grad">Into Reality</span>
  </h1>

      <p className="ms-hero-desc">
        From concept to creation, our students transform imagination into
        reality through immersive research and project-based learning —
        exploring engineering, innovation and emerging technologies to solve
        real-world challenges.
      </p>

      <div className="ms-hero-actions">
        <a className="ms-btn ms-btn--primary" href="#enquiry">
          Start a Project <FiArrowRight />
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

    </div>
  </section>
);

/* =============================================================
   2 · PROJECTS
============================================================= */
const LOREM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.";

const makeProjects = (category, Icon) =>
  Array.from({ length: 6 }, (_, i) => ({
    id: `${category}-${i}`,
    name: "Project Name",
    desc: LOREM,
    status: i % 3 === 2 ? "Completed" : "Ongoing",
    category,
    team: 3 + (i % 4),
    Icon,
  }));

// Shared pool of projects across categories; tabs filter it by status.
const ALL_PROJECTS = [
  ...makeProjects("Robotics", FaRobot),
  ...makeProjects("Space Science", FaSatellite),
  ...makeProjects("AI & Data Science", FaMicrochip),
];

const PROJECT_TABS = [
  { id: "all", label: "All Projects", icon: FaLayerGroup },
  { id: "ongoing", label: "Ongoing Projects", icon: FaHourglassHalf },
  { id: "completed", label: "Completed Projects", icon: FaCheckCircle },
];

const Projects = () => {
  const [active, setActive] = useState("all");
  const filtered =
    active === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.status.toLowerCase() === active);

  return (
    <section className="ms-testimonials">
      <div className="container">
        <p className="ms-pill">PROJECTS &amp; RESEARCH</p>
        
        <h2 className="ms-section-title">
          Research &amp; <span className="ms-grad">Projects</span>
        </h2>

        <p className="ms-section-sub">
          Explore the real-world projects and research our students build —
          from robotics and space science to AI — turning bold ideas into
          working prototypes that solve tomorrow&apos;s challenges.
        </p>

        <div className="ms-tabs" role="tablist">
          {PROJECT_TABS.map(({ id, label, icon: Icon }) => (
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

        <div className="rp-grid">
          {filtered.map((p) => (
            <article className="rp-card" key={p.id}>
              <div className="rp-card-media">
                <img src={projectImg} alt={p.name} />
                <span
                  className={`rp-badge ${
                    p.status === "Completed" ? "rp-badge--done" : ""
                  }`}
                >
                  {p.status}
                </span>
                <span className="rp-media-icon">
                  <p.Icon />
                </span>
              </div>

              <div className="rp-card-body">
                <h3 className="rp-card-title">{p.name}</h3>
                <p className="rp-card-desc">{p.desc}</p>

                <div className="rp-card-meta">
                  <span className="rp-meta-item">
                    <p.Icon /> {p.category}
                  </span>
                  <span className="rp-meta-div" />
                  <span className="rp-meta-item">
                    <FaUsers /> Team of {p.team}
                  </span>
                </div>

                <a className="rp-card-link" href="#enquiry">
                  View Details <FiArrowRight />
                </a>
                
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
const ResearchProjects = () => (
  <div className="ms-page">
    <SEO
      title={`Research & Projects | ${siteConfig.title}`}
      description="Explore real-world research and student projects at Lab of Future — robotics, space science, AI and more."
      url={`${siteConfig.url}/research-and-projects`}
      image={siteConfig.socialImage}
    />
    <ResearchHero />
    <Projects />
    <EnquirySection />
  </div>
);

export default ResearchProjects;
