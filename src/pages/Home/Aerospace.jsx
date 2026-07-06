// Home.jsx

import { motion } from "framer-motion";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { NavLink } from "react-router-dom";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import SEO from "../../components/common/SEO";
import ScrollProgressBar from "../../components/common/ScrollProgressBar";
import BackToTopButton from "../../components/common/BackToTopButton";
import { siteConfig } from "../../data/siteConfig";
import { useEnquiryModal } from "../../context/EnquiryModalContext";

import droneCertImg from "../../assets/programs/aeromodelling/certificate.png";

import learnThinkCritically from "../../assets/programs/aeromodelling/students-learn/students-learn (2).webp";
import learnUnderstandWorld from "../../assets/programs/aeromodelling/students-learn/students-learn (6).webp";
import learnBuildModels from "../../assets/programs/aeromodelling/students-learn/students-learn (3).webp";
import learnUseTools from "../../assets/programs/aeromodelling/students-learn/students-learn (1).webp";
import learnCommunicate from "../../assets/programs/aeromodelling/students-learn/students-learn (5).webp";
import learnWorkTeams from "../../assets/programs/aeromodelling/students-learn/students-learn (8).webp";
import learnSolveProblems from "../../assets/programs/aeromodelling/students-learn/students-learn (9).webp";

import programImg1 from "../../assets/programs/space-robotics/program-1.png";
import programImg2 from "../../assets/programs/space-robotics/program-2.png";
import programImg3 from "../../assets/programs/space-robotics/program-3.png";
import programImg7 from "../../assets/programs/space-robotics/program-7.png";

import modeOnsiteImg from "../../assets/programs/aeromodelling/onsite.png";
import modeOnlineImg from "../../assets/modes-to-join/online.png";
import modeDiyImg from "../../assets/programs/aeromodelling/hybrid.png";
import modeInPersonImg from "../../assets/programs/aeromodelling/in-person.png";
import droneProjectImg from "../../assets/programs/drones/project-image-1.png";
import impactIcon1 from "../../assets/icons/project-impact-icon-1.png";
import impactIcon2 from "../../assets/icons/project-impact-icon-2.png";
import impactIcon3 from "../../assets/icons/project-impact-icon-3.png";

import calenderIcon from "../../assets/future-career/calender.svg";
import olympiadIcon from "../../assets/future-career/olympiad.svg";
import portfolioIcon from "../../assets/future-career/portfolio.svg";
import recognitionIcon from "../../assets/future-career/recognition.svg";

// Aeromodelling-specific assets

// Hero 3D model
import rcPlaneUrl from "../../assets/programs/aeromodelling/3d-models/rc_plane.glb?url";
// Lab-of-Future-Way section decoration
import planeSurfaceUrl from "../../assets/programs/aeromodelling/3d-models/plane_surface.glb?url";


import aeroCareerCoding  from "../../assets/programs/aeromodelling/future-careers/future-career-1.webp";
import aeroCareerAI      from "../../assets/programs/aeromodelling/future-careers/future-career-2.webp";
import aeroCareerElec    from "../../assets/programs/aeromodelling/future-careers/future-career-3.webp";
import aeroCareerEngD    from "../../assets/programs/aeromodelling/future-careers/future-career-4.webp";
import aeroCareerData    from "../../assets/programs/aeromodelling/future-careers/future-career-5.webp";


import aeroAssocBoxLight    from "../../assets/programs/aeromodelling/associated-box-light.svg";
import aeroLogo1  from "../../assets/programs/aeromodelling/logo-1.png";
import aeroLogo2  from "../../assets/programs/aeromodelling/logo-2.png";
import aeroLogo3  from "../../assets/programs/aeromodelling/logo-3.png";
import aeroLogo4  from "../../assets/programs/aeromodelling/logo-4.png";
import aeroLogo5  from "../../assets/programs/aeromodelling/logo-5.png";
import aeroLogo6  from "../../assets/programs/aeromodelling/logo-6.png";
import aeroLogo7  from "../../assets/programs/aeromodelling/logo-7.png";
import aeroTeam1  from "../../assets/programs/aeromodelling/team-1.png";
import aeroTeam2  from "../../assets/programs/aeromodelling/team-2.png";
import aeroTeam3  from "../../assets/programs/aeromodelling/team-3.png";
import aeroTeam4  from "../../assets/programs/aeromodelling/team-4.png";
import aeroVettedAircraft    from "../../assets/programs/aeromodelling/vetted-by-aircraft.png";
import aeroImpactAircraft   from "../../assets/programs/aeromodelling/project-impact-aircraft.png";

import lofLogo from "../../assets/Logo/log-header-logo.svg";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaXTwitter,
  FaYoutube,
  FaPlane,
  FaLightbulb,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaPlay,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";

/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhyAeromodelling = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="aero-why-section">
    <div className="aero-why-inner container">

      {/* Title — sits above the panel in the notch area */}
      <h2 className="aero-why-title prog-section-title">
        <span className="aero-why-title-outline">WHY</span>{" "}<br></br>
        <span className="aero-why-title-bold">AEROMODELLING</span>
      </h2>

      {/* Blue panel shape — why-aeromodeling-shape.png */}
      <div className="aero-why-shape">
        <div className="aero-why-content">

          {/* LEFT — text + bullets + CTAs */}
          <div className="aero-why-text">
            <p>The future needs students who can design, test, solve problems, and think like engineers. Aero modelling helps build creativity, critical thinking, and real-world engineering skills through<br/> ands-on learning. Students explore RC planes, model aircraft, aerodynamics, and drones while understanding lift, thrust, balance, and control. The real excitement? Not watching an aircraft fly — but seeing their own design take off.</p>
            <div className="aero-why-cta-row">
              <button type="button" onClick={openEnquiry} className="aero-why-btn aero-why-btn--dark">
                Enroll Now
              </button>
              <button type="button" onClick={openEnquiry} className="aero-why-btn aero-why-btn--light">
                Book a Demo
              </button>
            </div>
          </div>

          {/* RIGHT — landing zone for the scroll-driven RC plane */}
          <div className="aero-why-image" id="aero-plane-why-anchor" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
  );
};

/* =========================================================
   AEROMODELLING — WHY START YOUNG + AGE PROGRAMS + LEARN + CERTS
========================================================= */

const AeroWhyStartYoung = () => (
  <section className="aero-young-section">
    <div className="container">
      <div className="aero-young-grid">
        <div className="aero-young-block">
          <h2 className="aero-young-title prog-section-title">
            The Lab of {" "}
            <span className="aero-young-badge">Future Way?</span>
          </h2>
          <p className="aero-young-desc">
          At Lab of Future, aero modelling turns classroom science into real-world application. Through RC planes, model aircraft, aerodynamics, and drones, students apply physics, mathematics, engineering, and design to understand lift, thrust, drag, balance, and motion — building problem-solving skills used in aviation, aerospace, robotics, and future technologies.
          </p>
        </div>
        <div className="aero-young-block">
          <h2 className="aero-young-title prog-section-title">
            WHY START {" "}
            <span className="aero-young-badge">YOUNG?</span>
          </h2>
          <p className="aero-young-desc">
            Aviation for kids works best when curiosity is still fearless. Through model aircraft and hands-on children activities in Dubai, students build focus, confidence, problem-solving, and early STEM thinking.
          </p>
        </div>
      </div>
    </div>

    {/* plane_surface.glb — left-bottom decoration + RC plane landing pad */}
    <div className="aero-young-surface" id="aero-plane-young-anchor" aria-hidden="true">
      <SurfacePlaneCanvas />
    </div>
  </section>
);

const AeroAgePrograms = () => (
  <section className="aero-age-section">
    <div className="aero-age-grid container">
      {AGE_GROUPS.map((g) => (
        <article className="aero-age-card" key={g.label} aria-label={g.label}>
          <div className="aero-age-card-label">{g.label}</div>
          <ul className="aero-age-card-list">
            {g.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

const AeroStudentsLearn = () => (
  <section className="aero-learn-section">
    {/* invisible landing anchor for scroll-driven plane (bottom-left of section) */}
    <div id="aero-plane-learn-anchor" aria-hidden="true"
      style={{ position: "absolute", right: LEARN_ANCHOR_RIGHT, top: LEARN_ANCHOR_TOP, width: LEARN_ANCHOR_W, height: LEARN_ANCHOR_H, pointerEvents: "none" }} />
    <div className="container">
      <h2 className="aero-learn-title prog-section-title">
        WHAT WILL STUDENTS <span className="aero-learn-badge">LEARN?</span>
      </h2>
      <p className="aero-learn-sub">
        How to think — not just what to remember
      </p>
      <div className="aero-learn-grid">
        {LEARN_ITEMS.map((it) => (
          <article className="aero-learn-card" key={it.label}>
            <div className="aero-learn-card-img-wrap">
              <img src={it.img} alt={it.label} loading="lazy" />
              <span className="aero-learn-card-label">{it.label}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="aero-learn-foot">
         Every flight reveals what the design needs next.
      </p>
    </div>
  </section>
);

const AeroCertificates = () => (
  <section className="aero-cert-section">
    <div className="container">
      <div className="aero-cert-inner">

        {/* LEFT — title + bullets + aircraft at bottom */}
        <div className="aero-cert-text">
          <h2 className="aero-cert-title prog-section-title">CERTIFICATES</h2>
          <p>Students receive a certificate recognizing aviation Dubai learning, flight school Dubai exposure, and hands-on STEM education UAE skills.  </p>
        </div>

        {/* RIGHT — fanned certificates */}
        <div className="aero-cert-images">
          <div className="aero-cert-card aero-cert-card--0">
            <img src={droneCertImg} alt="LOF certificate" loading="lazy" draggable="false" />
          </div>
          <div className="aero-cert-card aero-cert-card--1">
            <img src={droneCertImg} alt="LOF certificate" loading="lazy" draggable="false" />
          </div>
          <div className="aero-cert-card aero-cert-card--2">
            <img src={droneCertImg} alt="LOF certificate" loading="lazy" draggable="false" />
          </div>
        </div>

      </div>
    </div>
  </section>
);

/* =========================================================
   WHAT LOF DOES + AGE PROGRAMS (section 3)
========================================================= */

const AGE_GROUPS = [
  {
    label: "Foundation",
    points: [
  "Introduction to the fundamentals of flight.",
  "Explore paper gliders and simple wing designs.",
  "Learn about balance, lift, and basic aerodynamics through playful model aircraft activities."
],
  },
  {
    label: "Explorer",
    points: [
        "Build and test model aircraft.",
  "Experiment with different wing shapes.",
  "Adjust weight for improved flight performance.",
  "Explore lift, drag, and flight stability.",
    ],
  },
  {
    label: "Innovator",
    points: [
   "Learn the fundamentals of RC aircraft.",
  "Understand flight controls and aerodynamics.",
  "Explore propulsion systems and flight mechanics.",
  "Improve designs using launch feedback."
    ],
  },
  {
    label: "Engineer",
    points: [
      "Build advanced RC aircraft.",
  "Explore model rocket concepts.",
  "Learn payload planning and integration.",
   "Optimize designs using engineering principles."
    ],
  },
  {
    label: "Researcher",
    points: [
       "Develop industry-level aircraft models.",
  "Master advanced design and testing methods.",
  "Build and evaluate model rocket systems.",
  "Create professional technical documentation.",
    ],
  },
];

/* =========================================================
   WHAT WILL STUDENTS LEARN (section 5)
========================================================= */

// add an `img` URL to any item to use a real photo; otherwise a
// placeholder gradient is shown

const LEARN_ITEMS = [
  { label: "Discover Aerodynamics", img: learnThinkCritically },
  { label: "Build Real Models", img: learnUnderstandWorld },
  { label: "Test Every Launch", img: learnBuildModels },
  { label: "Control RC Aircraft", img: learnUseTools },
  { label: "Fix Flight Problems", img: learnCommunicate },
  { label: "Think Like Engineers", img: learnWorkTeams },
  { label: "Complete Flight Challenges", img: learnSolveProblems },
];

/* =========================================================
   WHY SPACE FOR FUTURE CAREERS (section 7)
========================================================= */

const AERO_CAREER_SKILLS = [
  { label: "AEROSPACE THINKING",             img: aeroCareerCoding   },
  { label: "AVIATION BASICS",        img: aeroCareerAI       },
  { label: "AIRCRAFT DESIGN",        img: aeroCareerElec     },
  { label: "FLIGHT OPERATIONS", img: aeroCareerEngD     },
  { label: "PROBLEM SOLVING",      img: aeroCareerData     },
];

const AeroFutureCareers = () => (
  <section className="aero-career-section">
    <div className="container">
      <h2 className="aero-career-title prog-section-title">
        WHY AEROMODELLING FOR{" "}
        <span className="aero-career-badge">FUTURE CAREERS?</span>
      </h2>
      <p className="aero-career-sub">
        Aviation. Aerospace. Design. Engineering. These are the flight skills shaping future careers.
      </p>
      <div className="aero-career-grid">
        {AERO_CAREER_SKILLS.map((skill) => (
          <article className="aero-career-card" key={skill.label}>
            <img src={skill.img} alt={skill.label} loading="lazy" className="aero-career-card-img" />
            <span className="aero-career-card-label">{skill.label}</span>
          </article>
        ))}
      </div>
      <p className="aero-career-footer">
         Aero modelling builds the mindset behind tomorrow’s aviation innovators.
      </p>
    </div>
  </section>
);

const AeroCompetitions = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="aero-comp-section">
    <div className="competitions-inner container">
      <div className="competitions-left">
        <div className="competitions-heading">
          <h2 className="competitions-label-text">
            <span className="aero-comp-badge">COMPETITIONS</span>
          </h2>
          <p className="aero-comp-subtitle prog-section-subtitle">
            Showcase your aeromodelling skills. 
            Solve real-world challenges.
            Get recognised for what you build.
          </p>
          <button type="button" className="aero-comp-btn" onClick={openEnquiry}>
            ENROLL NOW
          </button>
        </div>
      </div>
      <div className="competitions-right">
        <div className="competitions-grid">
          {COMPETITION_ITEMS.map((item) => (
            <article className="aero-comp-card" key={item.title}>
              <div className="aero-comp-card-icon">
                <img src={item.icon} alt="" />
              </div>
              <div className="comp-card-inner">
                <h3 className="aero-comp-card-title">{item.title}</h3>
                <p className="aero-comp-card-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

/* =========================================================
   COMPETITIONS (section 8)
========================================================= */

const COMPETITION_ITEMS = [
  {
    icon: calenderIcon,
    title: "Monthly Aero Challenges",
    desc: "Practice flight, glider, RC aircraft, rocket, and aerospace missions through hands-on monthly challenges.",
  },
  {
    icon: olympiadIcon,
    title: "National & Regional Competitions",
    desc: "Prepare for India and regional aeromodelling, RC aircraft, model rocketry, and aerospace innovation events. ",
  },
  {
    icon: portfolioIcon,
    title: "Portfolio-Based Showcases",
    desc: "Turn aircraft builds, rocket launches, flight logs, test data, and design improvements into student portfolios.",
  },
  {
    icon: recognitionIcon,
    title: "Global Aero Competitions",
    desc: "Build readiness for international aircraft design, FAI aeromodelling, rocketry, and aerospace engineering competitions.",
  },
];

/* =========================================================
   CAREER PATHWAYS — FAQ ACCORDION (section 9)
========================================================= */

const FAQ_ITEMS = [
  {
    q: "Aerospace Engineer",
    a: "Design aircraft, spacecraft, drones, and future flying systems using principles of aerodynamics, structures, and performance. ",
  },
  {
    q: "Pilot & Flight Operations",
    a: "Explore the foundations of flight, navigation, aircraft control, and decision-making that support future flight school Dubai pathways.",
  },
  {
    q: "Aircraft Designer",
    a: "Create efficient wings, control surfaces, and aircraft structures that improve stability, performance, and safety.",
  },
  {
    q: "Aerodynamics Specialist",
    a: "Study how air interacts with moving aircraft to improve lift, reduce drag, and enhance flight efficiency.",
  },
  {
    q: "Aviation Technology",
    a: "Work with modern flight systems, testing methods, aircraft components, and emerging aerospace innovations.",
  },
  {
    q: "Research & Development",
    a: "Experiment with new aircraft concepts, materials, propulsion systems, and future aerospace technologies.",
  },
  {
    q: "Drone & UAV Systems",
    a: "Apply aviation principles to unmanned aircraft, autonomous flight systems, aerial mapping, and next-generation mobility solutions.",
  },
  {
    q: "Aerospace Innovation",
    a: "Combine engineering, creativity, and problem-solving to develop the aircraft and flying technologies of tomorrow.",
  },
];

/* =========================================================
   HOW TO CHOOSE THE RIGHT PATH (section 10)
========================================================= */

const CHOOSE_PATH_ITEMS = [
  {
    title: "Love building and designing?",
    points: ["Model aircraft", "RC plane building", "Design challenges"],
  },
  {
    title: "Love flying and real-world control systems?",
    points: ["Flight testing ", "Control systems", "Aviation-based missions"],
  },
  {
    title: "Love structured learning and hands-on summer experiences?",
    points: ["Aviation-themed summer camp Dubai", "Real flight projects", "Team engineering challenges"],
  },
  {
    title: "Love exploring ideas, solving problems, and innovating?",
    points: ["STEM innovation labs", "Design & experimentation projects", "Problem-solving challenges"],
  },
];

// positions are in the same 1044 x 470 coordinate space as the SVG below,
// expressed as % so boxes and connector lines line up exactly
const ASSOC_TOP_Y = 13.3; // % (frame centre)
const ASSOC_BOTTOM_Y = 84.3;

/* =========================================================
   AEROMODELLING — CAREER PATHWAYS
========================================================= */

const AeroCareerPathways = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);
  return (
    <section className="aero-pathway-section">
      <div className="container">
        <h2 className="aero-pathway-title prog-section-title">CAREER PATHWAYS</h2>
        <div className="aero-faq-list">
          <p>Aero modelling is often the first step into the world of flight. By building, testing, and improving model aircraft, students develop practical skills that connect directly to real aviation and aerospace careers.
</p>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={`aero-faq-item${openIdx === i ? " is-open" : ""}`}>
              <button
                className="aero-faq-q"
                type="button"
                aria-expanded={openIdx === i}
                onClick={() => toggle(i)}
              >
                <span className="aero-faq-q-text">{item.q}</span>
                <span className="aero-faq-q-arrow">▼</span>
              </button>
              <div className="aero-faq-answer">
                <div className="aero-faq-answer-body"><p>{item.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   AEROMODELLING — HOW TO CHOOSE THE RIGHT PATH
========================================================= */

const AeroChooseRightPath = () => (
  <section className="aero-right-path-section">
    <div className="container">
      <h2 className="aero-right-path-title prog-section-title">
        HOW TO CHOOSE THE <span className="aero-right-path-badge">RIGHT PATH</span>
      </h2>
      <div className="aero-right-path-grid">
        {CHOOSE_PATH_ITEMS.map((item) => (
          <article className="aero-right-path-card" key={item.title}>
            <h3 className="aero-right-path-card-title">{item.title}</h3>
            <span className="aero-right-path-consider">Consider</span>
            <ul className="aero-right-path-list">
              {item.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* =========================================================
   AEROMODELLING — ASSOCIATED WITH
========================================================= */

const AERO_ASSOC_TOP = [
  { logo: aeroLogo1, x: 15.8 },
  { logo: aeroLogo2, x: 39.3 },
  { logo: aeroLogo3, x: 60.9 },
  { logo: aeroLogo4, x: 84.3 },
];
const AERO_ASSOC_BOTTOM = [
  { logo: aeroLogo5, x: 27.8 },
  { logo: aeroLogo6, x: 50 },
  { logo: aeroLogo7, x: 72.3 },
];

const AeroAssocBox = ({ logo, x, y }) => (
  <div className="aero-assoc-box" style={{ left: `${x}%`, top: `${y}%` }}>
    <div className="aero-assoc-box-frame">
      <img className="aero-assoc-box-logo" src={logo} alt="Associated organisation" />
    </div>
    <img className="aero-assoc-box-light" src={aeroAssocBoxLight} alt="" aria-hidden="true" />
  </div>
);

const AeroAssociated = () => (
  <section className="aero-assoc-section">
    <h2 className="aero-assoc-title prog-section-title">
      WHO ARE WE <span className="aero-assoc-badge">ASSOCIATED</span> WITH
    </h2>
    <div className="assoc-tree">
      <svg
        className="assoc-lines"
        viewBox="0 0 1044 540"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M165 174 V210" />
        <path d="M410 174 V210" />
        <path d="M636 174 V210" />
        <path d="M880 174 V210" />
        <path d="M165 210 H880" />
        <path d="M522 210 V250" />
        <path d="M522 310 V360" />
        <path d="M290 360 H755" />
        <path d="M290 360 V412" />
        <path d="M522 360 V412" />
        <path d="M755 360 V412" />
      </svg>

      {AERO_ASSOC_TOP.map((b, i) => (
        <AeroAssocBox key={`t${i}`} logo={b.logo} x={b.x} y={ASSOC_TOP_Y} />
      ))}

      <div className="assoc-center-box" style={{ left: "50%", top: "51.8%" }}>
        <img src={lofLogo} alt="Lab of Future" />
      </div>

      {AERO_ASSOC_BOTTOM.map((b, i) => (
        <AeroAssocBox key={`b${i}`} logo={b.logo} x={b.x} y={ASSOC_BOTTOM_Y} />
      ))}
    </div>
  </section>
);

/* =========================================================
   AEROMODELLING — VETTED BY
========================================================= */

const AERO_VETTED = [
  { img: aeroTeam1, name: "George Salazar",    role: "Ex. NASA Engineer"     },
  { img: aeroTeam2, name: "Madison C. Feehan", role: "Ex. NASA Engineer"     },
  { img: aeroTeam3, name: "David A Barnhart",  role: "Ex. NASA Engineer"     },
  { img: aeroTeam4, name: "Vitali Braun",       role: "European Space Agency" },
];

const AeroVettedBy = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`aero-vetted-section${inView ? " vetted-section--in" : ""}`}
    >
      <div className="vetted-inner container">
        <div className="vetted-left-col">
          <h2 className="aero-vetted-title prog-section-title">VETTED BY</h2>
          <div className="aero-vetted-aircraft" aria-hidden="true"><p>Our aero modelling program is reviewed by STEM educators, aviation mentors, and industry advisors for safety, relevance, and real learning impact. 
</p>
            <img src={aeroVettedAircraft} alt="" loading="lazy" />
          </div>
        </div>

        <div className="vetted-grid">
          {AERO_VETTED.map((m) => (
            <article className="aero-vetted-card" key={m.name}>
              <div className="vetted-stage">
                <div className="vetted-photo">
                  <img src={m.img} alt={m.name} />
                </div>
              </div>
              <div className="aero-vetted-plate">
                <div className="vetted-info">
                  <span className="vetted-name">{m.name}</span>
                  <span className="vetted-role">{m.role}</span>
                </div>
                <a className="vetted-li" href="#" aria-label={`${m.name} on LinkedIn`}>
                  <FaLinkedin />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   MODES TO JOIN (section 12)
========================================================= */

const MODE_CARDS = [
  { label: "Aeromodelling Classes Dubai", img: modeOnsiteImg },
  { label: "Online Aeromodelling for Kids", img: modeOnlineImg },
  { label: "Hybrid Aeromodelling Dubai", img: modeDiyImg },
  { label: "In-Person Aeromodelling Classes Dubai", img: modeInPersonImg }
];

/* =========================================================
   AEROMODELLING — MODES TO JOIN
========================================================= */

const AeroModesToJoin = () => (
  <section className="aero-modes-section">
    <div className="container">
      <h2 className="aero-modes-title prog-section-title">MODES TO JOIN</h2>
      <p className="aero-modes-subtitle prog-section-subtitle">MORE THAN JUST SCIENCE</p>
      <p className="aero-modes-desc">
        Whether you&apos;re learning from home, joining a local hub, or diving in
        remotely, we&apos;ve got a mission path that works for you.
      </p>
      <div className="aero-modes-grid">
        {MODE_CARDS.map((c) => (
          <article className="aero-mode-card" key={c.label}>
            <img src={c.img} alt={c.label} loading="lazy" className="aero-mode-card-img" />
            <span className="aero-mode-card-label">{c.label}</span>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* =========================================================
   AEROMODELLING — STUDENT PROJECTS
========================================================= */

const AeroStudentProjects = () => (
  <section className="aero-projects-section">
    <div className="container">
      <h2 className="aero-projects-title prog-section-title">STUDENT PROJECTS</h2>
      <p className="aero-projects-subtitle prog-section-subtitle">REAL FLIGHTS. REAL BUILDS. REAL ACHIEVEMENTS.</p>
      <p className="aero-projects-desc">
        Students don't just study aviation—they build aircraft, test designs, and experience flight through real engineering projects.
      </p>

      <div className="aero-projects-slider">
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={1.2}
          spaceBetween={20}
          centeredSlides={false}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          breakpoints={{
            640:  { slidesPerView: 1.5, spaceBetween: 24 },
            900:  { slidesPerView: 2.1, spaceBetween: 28 },
            1100: { slidesPerView: 2.4, spaceBetween: 32 },
          }}
        >
          {PROJECTS.map((p, i) => (
            <SwiperSlide key={i} className="aero-project-slide">
              <article className="aero-project-card">
                <div className="aero-project-card-img-wrap">
                  <img src={droneProjectImg} alt={p.title} loading="lazy" />
                </div>
                <div className="aero-project-card-body">
                  <h3 className="aero-project-card-title">{p.title}</h3>
                  <p className="aero-project-card-desc">{p.desc}</p>
                  <div className="aero-project-card-student">
                    <span className="aero-project-card-name">{p.student}</span>
                    <span className="aero-project-card-meta">{p.meta}</span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p>(These project examples are based on aero modelling and aviation prototypes 
developed by the Lab of Future R&D team.) <br/>
Every aero modelling project at Lab of Future is a real flight challenge — not a demo. 
Students build, test, tune, launch, and improve aircraft that make aviation, 
aerodynamics, and engineering come alive. </p>

      <div className="aero-projects-stats">
        <div className="aero-projects-stat">
          <span className="aero-projects-stat-num">150+</span>
          <span className="aero-projects-stat-lbl">Projects Completed</span>
        </div>
        <div className="aero-projects-stat aero-projects-stat--divider">
          <span className="aero-projects-stat-num">50+</span>
          <span className="aero-projects-stat-lbl">Prototypes Built</span>
        </div>
        <div className="aero-projects-stat aero-projects-stat--divider">
          <span className="aero-projects-stat-num">100%</span>
          <span className="aero-projects-stat-lbl">Curiosity Powered</span>
        </div>
      </div>
    </div>
  </section>
);

/* =========================================================
   STUDENT PROJECTS (section 13) — sliding cards + stats
========================================================= */

const PROJECTS = [
  {
    title: "Catapult Glider",
    desc: "Designing, balancing, and launching a balsa wood glider using a catapult mechanism to explore lift, nose weight, stability, and flight distance.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "Auto-Stabilised Glider",
    desc: "Building a smart foam-board glider with Arduino, IMU sensor, servo motor, and control rods to understand automatic flight correction and stability.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "3-Channel RC Plane",
    desc: "Constructing a remote-control aircraft with motors, propellers, servos, receiver, transmitter, and control surfaces to learn real RC flight control.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "Seaplane Aircraft",
    desc: "Assembling a powered seaplane using foam-board parts, brushless motor, ESC, propeller, servos, and radio control for advanced flight testing.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "RC Aircraft with Autonomous Seed Dropping Mechanism",
    desc: "Student-built fixed-wing RC plane designed to carry and accurately drop seeds over target areas — applying aerospace engineering to real-world afforestation and agricultural challenges.",
    student: "Student Name",
    meta: "Class | Section",
  },
   {
    title: "F-22 Raptor-Inspired RC Fighter Aircraft",
    desc: "A scaled RC aircraft built from scratch, replicating the aerodynamic shaping, swept wings, and control surface configuration of the F-22 Raptor — bringing advanced aerodynamics and fighter jet design into hands-on student learning.",
    student: "Student Name",
    meta: "Class | Section",
  },
   {
    title: "4-Channel RC Plane",
    desc: "Build and fly a laser-cut foam-board RC aircraft using a brushless motor, servos, and radio-control systems.",
    student: "Student Name",
    meta: "Class | Section",
  },
];

/* =========================================================
   PROJECT IMPACT (section 14)
========================================================= */

const IMPACT_CARDS = [
  {
    icon: impactIcon1,
    title: "Real-World Engineering ",
    desc: "Students apply aerodynamics through hands-on aircraft builds, flight testing, and performance improvement challenges.",
  },
  {
    icon: impactIcon2,
    title: 'The Aviation Mindset',
    desc: "Every launch develops observation, problem-solving, resilience, and engineering thinking through continuous testing and refinement.",
  },
  {
    icon: impactIcon3,
    title: "Measurable Growth",
    desc: "Track progress beyond grades through confidence, technical skills, teamwork, flight performance, and STEM education UAE outcomes.",
  },
];

const AeroProjectImpact = () => (
  <section className="aero-impact-section">
    {/* Aircraft — top-right corner decoration */}
    <img src={aeroImpactAircraft} alt="" aria-hidden="true" className="aero-impact-aircraft" loading="lazy" />

    <div className="container">
      <div className="impact-head">
        <h2 className="aero-impact-title prog-section-title">
          <span className="aero-impact-badge">PROJECT</span> IMPACT
        </h2>
        <p className="aero-impact-subtitle prog-section-subtitle">What They Build Here, They Carry Forever.</p>
        <p className="aero-impact-desc">
          Flight is more than a launch. Every aircraft becomes a lesson in design, testing, and 
discovery.
        </p>
      </div>

      <div className="impact-grid">
        {IMPACT_CARDS.map((c) => (
          <article className="aero-impact-card" key={c.title}>
            <div className="aero-impact-card-icon">
              <img src={c.icon} alt="" loading="lazy" />
            </div>
            <h3 className="aero-impact-card-title">{c.title}</h3>
            <p className="aero-impact-card-desc">{c.desc}</p>
          </article>
        ))}
      </div>
      <p className="sec-bottom-content">THE FUTURE WON'T JUST BE IMAGINED. IT WILL TAKE FLIGHT. 
Every great aircraft begins with an idea. We provide the runway, tools, and guidance.</p>
    </div>
  </section>
);

/* =========================================================
   FAQ — Frequently Asked Questions (two-column accordion)
========================================================= */

const FAQ_ROBOTICS = [
  {
    q: "What is aero modelling and why does it matter?",
    a: "Aero modelling is the hands-on practice of designing, building, testing, and flying model aircraft. It helps students understand aerodynamics, balance, lift, drag, thrust, and real aircraft design.",
  },
  {
    q: "What is the Lab of Future Aero Modelling program?",
    a: "It is a hands-on aviation program where students build gliders, RC planes, and flight models while learning engineering, aerodynamics, testing, and design improvement.",
  },
  {
    q: "What is the right age to start aero modelling?",
    a: "Children can begin aero modelling from a young age through safe glider builds and guided launch activities. At Lab of Future, each level is designed age-wise.",
  },
  {
    q: "Is there a progression from gliders to RC aircraft?",
    a: "Yes. Students begin with simple gliders and balance testing, then progress to powered models, RC planes, control surfaces, propulsion, and advanced flight challenges.",
  },
  {
    q: "Will students learn aerodynamics?",
    a: "Yes. Students explore lift, drag, thrust, gravity, stability, wing design, balance, and control through real model aircraft builds and flight testing.",
  },
  {
    q: "Do students receive a certificate?",
    a: "Yes. Students receive a Lab of Future certificate recognizing their hands-on aviation learning, project work, flight testing, and STEM skill development.",
  },
  {
    q: "Can aero modelling lead to aerospace careers?",
    a: "Yes. Aero modelling builds early foundations for aerospace engineering, aviation, aircraft design, UAV engineering, flight testing, and future flight school pathways.",
  },
  {
    q: "Are there aero modelling competitions for students?",
    a: "Yes. Students can prepare for RC plane challenges, flight-distance contests, stability tests, model aircraft showcases, aviation events, and aerospace competitions.",
  },
  {
    q: "Can aero modelling skills lead to a pilot career?",
    a: "Aero modelling does not replace pilot training, but it builds useful early understanding of flight control, aircraft behavior, safety, and aviation thinking.",
  },
  {
    q: "What is the difference between aero modelling and drone flying?",
    a: "Aero modelling focuses on aircraft design, wings, balance, glide, and flight mechanics. Drone flying focuses more on multi-rotor control, sensors, and navigation.",
  },
  {
    q: "How do I know if aero modelling is right for my child?",
    a: "If your child enjoys building, flying, experimenting, fixing, or asking why aircraft stay in the air, aero modelling is a strong fit.",
  },
  {
    q: "What makes Lab of Future credible?",
    a: "Lab of Future offers structured curriculum, trained mentors, safe tools, real aircraft projects, guided testing, certificates, and measurable learning outcomes.",
  },
  {
    q: "How can my child join the program?",
    a: "Parents can contact Lab of Future, share the child’s age group, choose the suitable learning mode, confirm batch availability, and enrol.",
  },
  {
    q: "What projects will students build?",
    a: "Students build catapult gliders, auto-stabilised gliders, RC planes, seaplane aircraft, and other flight models based on age and skill level.",
  },
  {
    q: "How do aero modelling projects create impact?",
    a: "They help students think like engineers by testing ideas, solving flight problems, improving designs, and connecting science with real-world aviation.",
  },
  {
    q: "Is aero modelling safe for children?",
    a: "Yes. Students work with guided supervision, safe tools, age-appropriate materials, structured launch areas, and clear safety rules during every session.",
  },
  {
    q: "How is progress tracked?",
    a: "Progress is tracked through build quality, flight performance, testing records, mentor feedback, teamwork, confidence, and the ability to explain design improvements.",
  },
  {
    q: "What do parents say about the program?",
    a: "Parents value hands-on learning, visible confidence growth, real aircraft builds, mentor support, and the way students start thinking like young engineers.",
  },
];

const FaqRobotics = () => {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  const half = Math.ceil(FAQ_ROBOTICS.length / 2);
  const cols = [FAQ_ROBOTICS.slice(0, half), FAQ_ROBOTICS.slice(half)];

  return (
    <section className="faq-robotics-section">
      <div className="container">
        <h2 className="faq-robotics-title prog-section-title">
          FREQUENTLY ASKED <br />
          <span className="faq-robotics-title-badge">QUESTIONS</span>
        </h2>
        <div className="faq-robotics-grid">
          {cols.map((col, ci) => (
            <div className="faq-robotics-col" key={ci}>
              {col.map((item, i) => {
                const idx = ci * half + i;
                const isOpen = open === idx;
                return (
                  <div
                    key={item.q}
                    className={`faq-robotics-item${isOpen ? " is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-robotics-q"
                      aria-expanded={isOpen}
                      onClick={() => toggle(idx)}
                    >
                      <span className="faq-robotics-q-text">{item.q}</span>
                      <span
                        className="faq-robotics-q-arrow"
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </button>
                    <div className="faq-robotics-a">
                      <div className="faq-robotics-a-body">{item.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   CTA — "The future won't be taught, it will be built"
========================================================= */

const CtaRobotics = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="cta-robotics-section">
    <div className="cta-robotics-inner container">
      <div className="cta-robotics-stage" />


      {/* RIGHT — title + copy + buttons */}
      <div className="cta-robotics-text">
        <h2 className="cta-robotics-title prog-section-title">
          THE FUTURE WON'T JUST BE IMAGINED.
          <br />
          IT WILL TAKE FLIGHT.
        </h2>
        <p className="cta-robotics-desc">
          Every great aircraft begins with an idea. We provide the runway, tools, and guidance.
        </p>
        <div className="cta-robotics-actions">
          <button type="button" onClick={openEnquiry} className="cta-robotics-btn cta-robotics-btn--primary">
            Enroll Now
          </button>
          <button type="button" onClick={openEnquiry} className="cta-robotics-btn cta-robotics-btn--secondary">
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  </section>
  );
};

/* =========================================================
   EXPLORE PROGRAMS — autoplay card slider
========================================================= */

const PROGRAM_CARDS = [
  { label: "ROBOTICS", img: programImg1 },
  { label: "AI & DATA SCIENCE", img: programImg2 },
  { label: "DRONES", img: programImg3 },
  { label: "SPACE & ASTRONOMY", img: programImg7 },
];

const ExplorePrograms = () => (
  <section className="explore-section explore-section--robotics">
    <div className="container">
      <h2 className="explore-title prog-section-title">
        <span className="explore-title-badge">EXPLORE</span> our other programs
      </h2>
      <p className="prog-section-subtitle" style={{textAlign:"center"}}>Aero modelling is just one launch. There’s more.</p>
      <div className="explore-slider">
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={1.2}
          spaceBetween={24}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 28 },
            900: { slidesPerView: 3, spaceBetween: 32 },
            1200: { slidesPerView: 4, spaceBetween: 36 },
          }}
        >
          {PROGRAM_CARDS.map((c, i) => (
            <SwiperSlide key={i} className="explore-slide">
              <article className="explore-card">
                <div className="explore-card-imgwrap">
                  <img
                    className="explore-card-img"
                    src={c.img}
                    alt={c.label}
                    loading="lazy"
                  />
                </div>
                <span className="explore-card-label">{c.label}</span>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);

/* =========================================================
   SITE FOOTER
========================================================= */

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="site-footer-inner container">
      {/* horizontal row: logo + 4 named columns */}
      <div className="site-footer-row">
        {/* <div className="site-footer-brand">
          <img
            className="site-footer-logo"
            src={lofLogo}
            alt="Lab of Future"
          />
        </div> */}

        <div className="site-footer-col">
          <h4 className="site-footer-col-title">Quick Links</h4>
          <ul className="site-footer-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#innovation">Innovation Labs</a></li>
            <li><a href="#partnerships">Partnerships</a></li>
            <li><a href="#community">Join our community</a></li>
          </ul>
        </div>

        <div className="site-footer-col">
          <h4 className="site-footer-col-title">Explore</h4>
          <ul className="site-footer-list">
            <li><a href="#research">Research &amp; Projects</a></li>
            <li><a href="#events">Events / Competitions</a></li>
            <li><a href="#media">Media / Success Stories</a></li>
            <li><a href="#updates">Live Updates</a></li>
            <li><a href="#awards">Awards / Accreditations</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="site-footer-col">
          <h4 className="site-footer-col-title">Contact Us</h4>
          <ul className="site-footer-contact">
            <li>
              <MdEmail className="site-footer-icon" />
              <a href="mailto:contact@laboffuture.com">
                contact@laboffuture.com
              </a>
            </li>
            <li>
              <MdPhone className="site-footer-icon" />
              <span>
                UAE: +971 - 42 856 706
              </span>
            </li>
          </ul>
          <div className="site-footer-socials">
            <a href="#fb" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#x" aria-label="X / Twitter"><FaXTwitter /></a>
            <a href="#yt" aria-label="YouTube"><FaYoutube /></a>
            <a href="#ig" aria-label="Instagram"><FaInstagram /></a>
            <a href="#in" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div className="site-footer-col site-footer-stay">
          <h4 className="site-footer-col-title">Stay Connected</h4>
          <p className="site-footer-stay-desc">
            Subscribe to our newsletter for updates, news events and
            downloadables.
          </p>
          <form
            className="site-footer-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address..."
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p className="site-footer-copy">Copyright @2026 Lab of Future</p>
        <p className="site-footer-policy">
          <a href="#privacy">Privacy Policy</a> |{" "}
          <a href="#disclaimer">Disclaimer</a> |{" "}
          <a href="#terms">Terms</a> |{" "}
          <a href="#refund">Refund Policy</a>
        </p>
      </div>
    </div>
  </footer>
);

/* =========================================================
   AEROMODELLING — HERO 3D MODEL
   Adjust these to reposition / reorient the plane:
     PLANE_POSITION — [left/right,  up/down,  forward/back]
     PLANE_ROTATION — [tilt fwd/bk, spin L/R, roll] in radians
========================================================= */

/* The plane flies between two page anchors as you scroll:
     FLY_*  — pose while in the hero (start)
     LAND_* — pose once landed in the Why Aeromodelling section (end)
   Tweak these to change the takeoff / landing orientation. */
const FLY_POSITION  = [0, 0.3, 0];        // x=right, y=up, z=forward
const FLY_ROTATION  = [0.5, 2.6, 0];      // hero flying pose
const LAND_POSITION = [0, 0, 0];
const LAND_ROTATION = [Math.PI / -2 + 0.22, Math.PI, Math.PI]; // near-flat, slight perspective tilt
const REST_FRAC = 0.42;                   // viewport fraction where landing completes
const WHY_SCALE = 1.7;                     // plane size multiplier at the Why landing
const YOUNG_SCALE = 3;                   // plane size multiplier on the plane_surface
const YOUNG_REST_FRAC = 0.6;               // land earlier (pad higher in the viewport)
const YOUNG_LAND_ROTATION = [Math.PI / -1 + 0.22, Math.PI - -1.75, Math.PI]; // flat on surface, nose mirrored left
// ── "What Will Students Learn" plane – tweak everything here ──────────────────
const LEARN_SCALE        = 1.4;   // plane size (relative to anchor height); bigger = larger plane
const LEARN_REST_FRAC    = 0.55;  // 0–1: how far down the viewport landing completes (lower = lands higher on screen)
const LEARN_OPACITY      = 1.0;   // final opacity on touchdown (0 = invisible, 1 = fully opaque)

// Anchor position inside the .aero-learn-section (CSS values as strings)
const LEARN_ANCHOR_RIGHT = "5%";  // distance from right edge of section
const LEARN_ANCHOR_TOP   = "60%"; // distance from top of section  ← move up/down
const LEARN_ANCHOR_W     = "22%"; // width  of landing zone (affects centre-X)
const LEARN_ANCHOR_H     = "20%"; // height of landing zone (affects centre-Y)

// Entry point: plane starts off-screen bottom-right before gliding in
const LEARN_ENTRY_OVERSHOOT = 0.25; // 0.25 = starts 25 % beyond the right viewport edge
const LEARN_ENTRY_Y         = 0.95; // 0–1+ of viewport height (0.95 = near bottom, >1 = below fold)

// Rotation at the START of the approach (plane descending from bottom-right)
//   X: pitch  – negative tilts nose down; 0 = level
//   Y: yaw    – Math.PI faces left, 0 faces right
//   Z: roll   – positive banks left wing down
const LEARN_APPROACH_ROTATION = [-0.25, 0.2, Math.PI / 2 - 0.15];

// Rotation at TOUCHDOWN (what the plane looks like once fully landed)
//   X ≈ -1.35 (Math.PI/-2 + 0.22) lays the plane flat showing the top surface
//   Y = 0            nose points right
//   Z = Math.PI / 2  rotates 90° so plane is horizontal (nose left/right, not up/down)
const LEARN_LAND_ROTATION = [Math.PI / -2 + 0.5, 1, Math.PI / 2];
// ──────────────────────────────────────────────────────────────────────────────

const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// Soft radial shadow texture (built once) used for the plane's drop shadow.
let _shadowTex = null;
const getShadowTexture = () => {
  if (_shadowTex) return _shadowTex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  _shadowTex = new THREE.CanvasTexture(c);
  return _shadowTex;
};

const AeroPlaneModel = ({ screenRef }) => {
  const { scene } = useGLTF(rcPlaneUrl);
  const groupRef = useRef(null);
  const { camera, size } = useThree();

  const { model, maxDim, materials } = useMemo(() => {
    const root = scene.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const s = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    root.position.sub(center);
    const mats = [];
    root.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const ms = Array.isArray(obj.material) ? obj.material : [obj.material];
        ms.forEach((m) => { m.transparent = true; mats.push(m); });
      }
    });
    return { model: root, maxDim: Math.max(s.x, s.y, s.z) || 1, materials: mats };
  }, [scene]);

  // The canvas is full-viewport and never resizes; the tick computes the
  // whole choreography (viewport-pixel target + rotation + visibility) and
  // this just applies it, so the flight is continuous — no canvas jumps.
  useFrame(() => {
    const g = groupRef.current;
    const t = screenRef.current;
    if (!g) return;
    if (!t || !t.ready || t.visible === false || !t.rot) {
      g.visible = false;
      return;
    }
    g.visible = true;

    const visH = 2 * Math.tan(((camera.fov * Math.PI) / 180) / 2) * camera.position.z;
    const visW = visH * (size.width / size.height);

    const ndcX = (t.x / size.width) * 2 - 1;
    const ndcY = -((t.y / size.height) * 2 - 1);
    g.position.set((ndcX * visW) / 2, (ndcY * visH) / 2, 0);

    const worldH = (t.pxH / size.height) * visH;
    g.scale.setScalar(worldH / maxDim);

    g.rotation.set(t.rot[0], t.rot[1], t.rot[2]);
    const op = t.opacity ?? 1;
    materials.forEach((mat) => { mat.opacity = op; });
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
};

// Flat soft drop-shadow that fades in when the plane lands on the surface.
const PlaneShadow = ({ screenRef }) => {
  const meshRef = useRef(null);
  const { camera, size } = useThree();
  const tex = useMemo(getShadowTexture, []);

  useFrame(() => {
    const m = meshRef.current;
    const t = screenRef.current;
    if (!m) return;
    const shadow = t ? t.shadow || 0 : 0;
    if (!t || !t.ready || t.visible === false || shadow <= 0.02) {
      m.visible = false;
      return;
    }
    m.visible = true;

    const visH = 2 * Math.tan(((camera.fov * Math.PI) / 180) / 2) * camera.position.z;
    const visW = visH * (size.width / size.height);

    const yBelow = t.y + t.pxH * 0.34; // sit a little below the plane
    const ndcX = (t.x / size.width) * 2 - 1;
    const ndcY = -((yBelow / size.height) * 2 - 1);
    m.position.set((ndcX * visW) / 2, (ndcY * visH) / 2, -0.2);

    const worldH = (t.pxH / size.height) * visH;
    m.scale.set(worldH * 1.0, worldH * 0.42, 1);
    m.material.opacity = shadow * 0.55;
  });

  return (
    <mesh ref={meshRef} renderOrder={-1} visible={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} opacity={0} />
    </mesh>
  );
};

/* Single full-viewport canvas (never resized).  A rAF loop computes the
   plane's viewport-pixel target + progress from scroll; the plane is moved
   and scaled in 3D to follow it, so the flight from hero → Why-section is
   fully continuous (no canvas resize, no snapping). */
const PlaneJourney = () => {
  const progressRef = useRef(0);
  const prog2Ref = useRef(0);
  const prog3Ref = useRef(0);
  const screenRef = useRef({ ready: false });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const heroEl = document.getElementById("aero-plane-hero-anchor");
      const whyEl = document.getElementById("aero-plane-why-anchor");
      const youngEl = document.getElementById("aero-plane-young-anchor");
      const learnEl = document.getElementById("aero-plane-learn-anchor");
      if (heroEl && whyEl) {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const sy = window.scrollY || window.pageYOffset || 0;
        const hr = heroEl.getBoundingClientRect();
        const wr = whyEl.getBoundingClientRect();
        const yr = youngEl ? youngEl.getBoundingClientRect() : null;
        const lr = learnEl ? learnEl.getBoundingClientRect() : null;
        const restY = vh * REST_FRAC;

        if (wr.width < 1 || wr.height < 1) {
          // No landing target (e.g. mobile) — keep the plane hidden.
          screenRef.current = { ready: true, visible: false };
        } else {
          // Hero start (fixed viewport point) + Why landing.
          const startX = hr.left + hr.width / 2;
          const startY = hr.top + sy + hr.height / 2;
          const startH = hr.height;

          const whyX = wr.left + wr.width / 2;
          const whyLandingY = Math.min(restY, wr.top + wr.height / 2);
          const whyH = wr.height * WHY_SCALE;
          const whyLandScroll = Math.max(1, wr.top + sy + wr.height / 2 - restY);

          // Precompute young-section values so SEGMENT 3 can also reference them.
          const hasYoung = yr && yr.width > 1 && yr.height > 1;
          const youngRestY = vh * YOUNG_REST_FRAC;
          const youngX = hasYoung ? yr.left + yr.width / 2 : whyX;
          const youngLandingY = hasYoung ? Math.min(youngRestY, yr.top + yr.height / 2) : whyLandingY;
          const youngH = hasYoung ? yr.height * YOUNG_SCALE : whyH;
          const youngLandScroll = hasYoung
            ? Math.max(whyLandScroll + 1, yr.top + sy + yr.height / 2 - youngRestY)
            : Infinity;

          // Learn-section values for SEGMENT 3.
          const hasLearn = lr && lr.width > 1 && lr.height > 1;
          const learnRestY = vh * LEARN_REST_FRAC;
          const learnX = hasLearn ? lr.left + lr.width / 2 : 0;
          const learnLandingY = hasLearn ? Math.min(learnRestY, lr.top + lr.height / 2) : 0;
          const learnH = hasLearn ? lr.height * LEARN_SCALE : 0;
          const learnLandScroll = hasLearn
            ? Math.max(youngLandScroll + 1, lr.top + sy + lr.height / 2 - learnRestY)
            : Infinity;

          if (!hasYoung || sy <= whyLandScroll) {
            // SEGMENT 1 — hero → Why landing (top-down).
            const p = Math.min(1, Math.max(0, sy / whyLandScroll));
            progressRef.current += (p - progressRef.current) * 0.12;
            prog2Ref.current += (0 - prog2Ref.current) * 0.12;
            prog3Ref.current += (0 - prog3Ref.current) * 0.12;
            const e = easeInOut(progressRef.current);
            screenRef.current = {
              x: lerp(startX, whyX, e),
              y: lerp(startY, whyLandingY, e),
              pxH: lerp(startH, whyH, e),
              rot: [
                lerp(FLY_ROTATION[0], LAND_ROTATION[0], e),
                lerp(FLY_ROTATION[1], LAND_ROTATION[1], e),
                lerp(FLY_ROTATION[2], LAND_ROTATION[2], e),
              ],
              shadow: 0,
              visible: true,
              ready: true,
            };
          } else if (!hasLearn || sy <= youngLandScroll) {
            // SEGMENT 2 — Why → fly off right → in from left → land on the
            // plane_surface in the Lab-of-Future-Way section.
            const p2 = Math.min(
              1,
              Math.max(0, (sy - whyLandScroll) / (youngLandScroll - whyLandScroll)),
            );
            progressRef.current += (1 - progressRef.current) * 0.12;
            prog2Ref.current += (p2 - prog2Ref.current) * 0.12;
            prog3Ref.current += (0 - prog3Ref.current) * 0.12;
            const q = prog2Ref.current;

            const offRight = vw + vw * 0.5;
            const offLeft = -vw * 0.5;

            if (q < 0.5) {
              // Take off to the RIGHT, rotating back to a flying pose.
              const s = q / 0.5;
              const es = easeInOut(s);
              screenRef.current = {
                x: lerp(whyX, offRight, es),
                y: lerp(whyLandingY, whyLandingY - vh * 0.08, es),
                pxH: whyH,
                rot: [
                  lerp(LAND_ROTATION[0], FLY_ROTATION[0], es),
                  lerp(LAND_ROTATION[1], FLY_ROTATION[1], es),
                  lerp(LAND_ROTATION[2], FLY_ROTATION[2], es),
                ],
                opacity: lerp(1, 0.45, es),
                shadow: 0,
                visible: true,
                ready: true,
              };
            } else {
              // Come in from the LEFT and land on the plane_surface.
              const s = (q - 0.5) / 0.5;
              const es = easeInOut(s);
              screenRef.current = {
                x: lerp(offLeft, youngX, es),
                y: lerp(youngLandingY - vh * 0.28, youngLandingY, es),
                pxH: lerp(whyH, youngH, es),
                rot: [
                  lerp(FLY_ROTATION[0], YOUNG_LAND_ROTATION[0], es),
                  lerp(FLY_ROTATION[1], YOUNG_LAND_ROTATION[1], es),
                  lerp(FLY_ROTATION[2], YOUNG_LAND_ROTATION[2], es),
                ],
                opacity: 1,
                shadow: Math.max(0, (s - 0.55) / 0.45),
                visible: true,
                ready: true,
              };
            }
          } else {
            // SEGMENT 3 — young → slowly drift right off-screen → enter from
            // bottom-left → land smaller in "What Will Students Learn" section.
            const p3 = Math.min(
              1,
              Math.max(0, (sy - youngLandScroll) / (learnLandScroll - youngLandScroll)),
            );
            progressRef.current += (1 - progressRef.current) * 0.12;
            prog2Ref.current += (1 - prog2Ref.current) * 0.12;
            prog3Ref.current += (p3 - prog3Ref.current) * 0.12;
            const q3 = prog3Ref.current;

            if (q3 < 0.5) {
              // Phase 1 — slowly drift right and fade out off-screen.
              const s = q3 / 0.5;
              const es = easeInOut(s);
              screenRef.current = {
                x: lerp(youngX, vw + vw * 0.4, es),
                y: youngLandingY,
                pxH: youngH,
                rot: YOUNG_LAND_ROTATION,
                opacity: lerp(1, 0, es),
                shadow: 0,
                visible: true,
                ready: true,
              };
            } else {
              // Phase 2 — come in from bottom-right and land smaller.
              const s = (q3 - 0.5) / 0.5;
              const es = easeInOut(s);
              screenRef.current = {
                x: lerp(vw + vw * LEARN_ENTRY_OVERSHOOT, learnX, es),
                y: lerp(vh * LEARN_ENTRY_Y, learnLandingY, es),
                pxH: lerp(youngH * 0.4, learnH, es),
                rot: [
                  lerp(LEARN_APPROACH_ROTATION[0], LEARN_LAND_ROTATION[0], es), // X — tilt (pitch)
                  lerp(LEARN_APPROACH_ROTATION[1], LEARN_LAND_ROTATION[1], es), // Y — spin (yaw)
                  lerp(LEARN_APPROACH_ROTATION[2], LEARN_LAND_ROTATION[2], es), // Z — roll
                ],
                opacity: lerp(0, LEARN_OPACITY, es),
                shadow: Math.max(0, (s - 0.65) / 0.35),
                visible: true,
                ready: true,
              };
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="aero-plane-traveler"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 12,
      }}
    >
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMappingExposure = 1.25;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} color="#eaf3ff" />
          <hemisphereLight args={["#cfe6ff", "#20344a", 0.8]} />
          <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-4, 2, 2]} intensity={1.2} color="#bcd8ff" />
          <directionalLight position={[0, -4, 3]} intensity={0.7} color="#cfe6ff" />
          <PlaneShadow screenRef={screenRef} />
          <AeroPlaneModel screenRef={screenRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

/* Small static glb decoration for the "Lab of Future Way" section. */
const SurfacePlaneModel = () => {
  const { scene } = useGLTF(planeSurfaceUrl);
  const { model, fitScale } = useMemo(() => {
    const root = scene.clone(true);

    // Semi-transparent so the section background shows through.
    const blendMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
      toneMapped: false,
    });
    root.traverse((obj) => {
      if (obj.isMesh) obj.material = blendMat;
    });

    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    root.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { model: root, fitScale: 100 / maxDim };
  }, [scene]);

  return (
    <group scale={fitScale} rotation={[0.35, 90 + Math.PI, 0]}>
      <primitive object={model} />
    </group>
  );
};

const SurfacePlaneCanvas = () => (
  <Canvas
    dpr={[1, 1.5]}
    gl={{ alpha: true, antialias: true }}
    style={{ width: "100%", height: "100%" }}
    camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
    onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={1.0} color="#ffffff" />
      <directionalLight position={[4, 5, 3]} intensity={2} color="#ffffff" />
      <directionalLight position={[-4, 2, 2]} intensity={1} color="#bcd8ff" />
      <SurfacePlaneModel />
    </Suspense>
  </Canvas>
);

const HERO_FEATURES = [
  { icon: <FaPlane />,     title: "Hands-on Learning",   sub: "Build. Test. Fly." },
  { icon: <FaLightbulb />, title: "Innovative Thinking", sub: "Design. Experiment. Improve." },
  { icon: <FaUsers />,     title: "Expert Guidance",     sub: "Learn from Industry Mentors." },
  { icon: <FaStar />,      title: "Real-World Impact",   sub: "Skills for Tomorrow." },
];

const Aerospace = () => {
  const { openEnquiry } = useEnquiryModal();

  // Tag <body> so this page's header CTA can opt into the aeromodelling
  // light-btn.svg frame without affecting the global header on other pages.
  useEffect(() => {
    document.body.classList.add("aerospace-page");
    return () => document.body.classList.remove("aerospace-page");
  }, []);

  return (
    <div className="aerospace-page">
      <ScrollProgressBar />
      <BackToTopButton />

      {/* Scroll-driven RC plane — flies from the hero and lands in the
          Why Aeromodelling section (anchors below). */}
      <PlaneJourney />
      <SEO
        title={`Aeromodelling | ${siteConfig.title}`}
        description="Lab of Future — Aeromodelling: master aerodynamics, avionics and flight engineering. Build real flying aircraft from gliders to powered models."
        url={`${siteConfig.url}/students/aeromodelling`}
        image={siteConfig.socialImage}
        keywords={["Aeromodelling", "Aircraft", "Aerodynamics", "STEM", "Aviation"]}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="aero-hero">
        <div className="aero-hero-bg" aria-hidden="true" />
        <div className="aero-hero-overlay" aria-hidden="true" />
        <div className="aero-hero-hex" aria-hidden="true" />
        <div className="aero-hero-streak" aria-hidden="true" />

        {/* Hero anchor — the traveling plane parks here (right side) */}
        <div className="aero-hero-aircraft" id="aero-plane-hero-anchor" aria-hidden="true" />

        <div className="aero-hero-inner container">
          <motion.div
            className="aero-hero-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="aero-hero-eyebrow">DESIGN. BUILD. FLY.</span>
            <h1 className="aero-hero-title">
              <span className="aero-hero-title-accent">AERO</span>SPACE
            </h1>
            <span className="aero-hero-rule" aria-hidden="true" />
            <p className="aero-hero-desc">
              Explore the science of flight through hands-on design and
              real-world aeromodelling experiences.
            </p>
            <div className="aero-hero-actions">
              <NavLink to="/programs" className="aero-why-btn aero-why-btn--dark">
                Explore Programs
              </NavLink>
              <NavLink to="/contact" className="aero-why-btn aero-why-btn--light">
                Watch Video
              </NavLink>
            </div>
          </motion.div>
        </div>

        {/* Bottom feature strip */}
        <div className="aero-hero-features-wrap">
          <div className="aero-hero-features container">
            {HERO_FEATURES.map((f) => (
              <div className="aero-hero-feature" key={f.title}>
                <span className="aero-hero-feature-icon">{f.icon}</span>
                <span className="aero-hero-feature-text">
                  <span className="aero-hero-feature-title">{f.title}</span>
                  <span className="aero-hero-feature-sub">{f.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyAeromodelling />

      <div className="aero-start-age-wrapper">
        <AeroWhyStartYoung />
      </div>

              <AeroAgePrograms />

      <AeroStudentsLearn />

      <AeroCertificates />

      {/* BigAsteroid backdrop removed for Space Robotics — the careers
         + competitions sections each carry their own light background. */}
      <div className="aero-careers-comp-wrapper">
        <AeroFutureCareers />
        <AeroCompetitions />
      </div>

      {/* FAQ + Choose Path — shared animated background */}
      <div className="aero-career-pathway-wrapper">
        <AeroCareerPathways />
      </div>

      <div className="aero-right-path-assoc-wrapper">
        <AeroChooseRightPath />
        <AeroAssociated />
      </div>

      <div className="aero-vetted-wrapper">
        <AeroVettedBy />
      </div>

      {/* MODES TO JOIN — 3D moon backdrop removed; section now just
         shows its CSS background image */}
      <div className="aero-modes-projects-wrapper">
        <AeroModesToJoin />
        <AeroStudentProjects />
      </div>

      <AeroProjectImpact />

      {/* Community + Tracking sections removed for the robotics page. */}

      <FaqRobotics />

      <CtaRobotics />

      <ExplorePrograms />

      <SiteFooter />
    </div>
  );
};

export default Aerospace;
