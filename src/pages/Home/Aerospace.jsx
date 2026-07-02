// Home.jsx

import { motion } from "framer-motion";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { NavLink } from "react-router-dom";

import { Canvas } from "@react-three/fiber";
import { useFBX, useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import SEO from "../../components/common/SEO";
import ScrollProgressBar from "../../components/common/ScrollProgressBar";
import BackToTopButton from "../../components/common/BackToTopButton";
import { siteConfig } from "../../data/siteConfig";

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
import aeroWhyRight      from "../../assets/programs/aeromodelling/why-aeromodelling-right.png";

// Hero 3D model — RC plane FBX + its PBR texture set.  Two materials:
//   "Plane_1"     → 123_Plane_* maps (fuselage / wings)
//   "Parts_Motor" → 123_Parts_* maps (motor / small parts)
import rcPlaneFbxUrl from "../../assets/programs/aeromodelling/3d-models/rc_plane.fbx?url";

import planeBaseColorTex from "../../assets/programs/aeromodelling/3d-models/Texture/123_Plane_BaseColor.png";
import planeNormalTex    from "../../assets/programs/aeromodelling/3d-models/Texture/123_Plane_Normal.png";
import planeRoughTex     from "../../assets/programs/aeromodelling/3d-models/Texture/123_Plane_Roughness.png";
import planeMetalTex     from "../../assets/programs/aeromodelling/3d-models/Texture/123_Plane_Metalness.png";
import planeAoTex        from "../../assets/programs/aeromodelling/3d-models/Texture/123_Plane_AO.png";
import planeEmissiveTex  from "../../assets/programs/aeromodelling/3d-models/Texture/123_Plane_Emissive.png";

import partsBaseColorTex from "../../assets/programs/aeromodelling/3d-models/Texture/123_Parts_BaseColor.png";
import partsNormalTex    from "../../assets/programs/aeromodelling/3d-models/Texture/123_Parts_Normal.png";
import partsRoughTex     from "../../assets/programs/aeromodelling/3d-models/Texture/123_Parts_Roughness.png";
import partsMetalTex     from "../../assets/programs/aeromodelling/3d-models/Texture/123_Parts_Metalness.png";
import partsAoTex        from "../../assets/programs/aeromodelling/3d-models/Texture/123_Parts_AO.png";
import partsEmissiveTex  from "../../assets/programs/aeromodelling/3d-models/Texture/123_Parts_Emissive.png";


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
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";

/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhyAeromodelling = () => (
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
              <NavLink to="/programs" className="aero-why-btn aero-why-btn--dark">
                Enroll Now
              </NavLink>
              <NavLink to="/contact" className="aero-why-btn aero-why-btn--light">
                Book a Demo
              </NavLink>
            </div>
          </div>

          {/* RIGHT — exploded aeromodelling kit image */}
          <div className="aero-why-image">
            <img src={aeroWhyRight} alt="Aeromodelling kit components" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

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

const AeroCompetitions = () => (
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
          <NavLink to="/programs" className="aero-comp-btn">
            ENROLL NOW
          </NavLink>
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

const CtaRobotics = () => (
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
          <NavLink to="/student-portal" className="cta-robotics-btn cta-robotics-btn--primary">
            Enroll Now
          </NavLink>
          <NavLink to="/contact" className="cta-robotics-btn cta-robotics-btn--secondary">
            Book a Demo
          </NavLink>
        </div>
      </div>
    </div>
  </section>
);

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
      <p>Aero modelling is just one launch. There’s more.</p>
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
   Loads rc_plane.fbx and applies its baked PBR texture set.
   The FBX ships two materials — "Plane_1" (fuselage/wings) and
   "Parts_Motor" (motor/small parts) — each mapped to its own
   123_Plane_* / 123_Parts_* texture group.  Rendered static (no
   animation) as a backdrop behind the hero title.
========================================================= */

const AeroPlaneModel = () => {
  const fbx = useFBX(rcPlaneFbxUrl);

  // Load every PBR map for both material groups in one call.
  const tex = useTexture({
    planeBase: planeBaseColorTex,
    planeNormal: planeNormalTex,
    planeRough: planeRoughTex,
    planeMetal: planeMetalTex,
    planeAo: planeAoTex,
    planeEmissive: planeEmissiveTex,
    partsBase: partsBaseColorTex,
    partsNormal: partsNormalTex,
    partsRough: partsRoughTex,
    partsMetal: partsMetalTex,
    partsAo: partsAoTex,
    partsEmissive: partsEmissiveTex,
  });

  const { model, fitScale } = useMemo(() => {
    // Colour maps are sRGB; data maps (normal/rough/metal/ao) stay linear.
    tex.planeBase.colorSpace = THREE.SRGBColorSpace;
    tex.planeEmissive.colorSpace = THREE.SRGBColorSpace;
    tex.partsBase.colorSpace = THREE.SRGBColorSpace;
    tex.partsEmissive.colorSpace = THREE.SRGBColorSpace;

    const makeMaterial = (set) =>
      new THREE.MeshStandardMaterial({
        map: set.base,
        normalMap: set.normal,
        roughnessMap: set.rough,
        metalnessMap: set.metal,
        aoMap: set.ao,
        emissiveMap: set.emissive,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.6,
        metalness: 1,
        roughness: 1,
      });

    const planeSet = {
      base: tex.planeBase, normal: tex.planeNormal, rough: tex.planeRough,
      metal: tex.planeMetal, ao: tex.planeAo, emissive: tex.planeEmissive,
    };
    const partsSet = {
      base: tex.partsBase, normal: tex.partsNormal, rough: tex.partsRough,
      metal: tex.partsMetal, ao: tex.partsAo, emissive: tex.partsEmissive,
    };

    const root = fbx.clone(true);
    const pickSet = (name = "") =>
      /part|motor/i.test(name) ? partsSet : planeSet;

    root.traverse((obj) => {
      if (!obj.isMesh) return;
      // aoMap samples the 2nd UV set — reuse uv0 if there isn't one.
      const geo = obj.geometry;
      if (geo?.attributes.uv && !geo.attributes.uv2) {
        geo.setAttribute("uv2", geo.attributes.uv);
      }
      if (Array.isArray(obj.material)) {
        obj.material = obj.material.map((m) => makeMaterial(pickSet(m?.name)));
      } else {
        obj.material = makeMaterial(pickSet(obj.material?.name || obj.name));
      }
    });

    // Centre the model on the origin (in its own space) — the scale is
    // applied on the wrapping <group> so this offset scales with it.
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    root.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { model: root, fitScale: 4.6 / maxDim };
  }, [fbx, tex]);

  return (
    <group scale={fitScale} rotation={[0, 650, -50]}>
      <primitive object={model} />
    </group>
  );
};

const AeroHeroCanvas = () => (
  <Canvas
    gl={{ alpha: true, antialias: true }}
    style={{ width: "100%", height: "100%" }}
    camera={{ position: [0, 0.4, 6], fov: 42, near: 0.1, far: 100 }}
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
      <Environment preset="city" background={false} environmentIntensity={1.0} />
      <AeroPlaneModel />
    </Suspense>
  </Canvas>
);

const Aerospace = () => {
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
      <SEO
        title={`Aeromodelling | ${siteConfig.title}`}
        description="Lab of Future — Aeromodelling: master aerodynamics, avionics and flight engineering. Build real flying aircraft from gliders to powered models."
        url={`${siteConfig.url}/students/aeromodelling`}
        image={siteConfig.socialImage}
        keywords={["Aeromodelling", "Aircraft", "Aerodynamics", "STEM", "Aviation"]}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="aero-hero">
        {/* Sky/mountain background */}
        <div className="aero-hero-bg" aria-hidden="true" />

        {/* Aircraft 3D model — RC plane FBX with PBR textures,
            static backdrop sitting behind the hero title */}
        <div className="aero-hero-aircraft" aria-hidden="true">
          <AeroHeroCanvas />
        </div>

        {/* Bottom fade — blends into the dark sections below */}
        <div className="aero-hero-fade" aria-hidden="true" />

        {/* Text + CTA — bottom-left area */}
        <div className="aero-hero-content">
          <motion.h1
            className="aero-hero-title"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            AEROMODELLING
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46, ease: "easeOut" }}
          >
            <NavLink to="/programs" className="glass-btn glass-btn--dark header-btn">
              ENROLL NOW
            </NavLink>
          </motion.div>
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
