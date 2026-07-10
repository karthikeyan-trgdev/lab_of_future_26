import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaAward,
  FaGear,
  FaArrowRight,
  FaBullseye,
  FaRobot,
  FaBrain,
  FaHelicopter,
  FaCube,
  FaCode,
  FaSatelliteDish,
  FaMicrochip,
  FaVrCardboard,
  FaTrophy,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";

import SEO from "../../components/common/SEO";
import { useEnquiryModal } from "../../context/EnquiryModalContext";
import "../../styles/pages/category-page.css";
import "../../styles/pages/students.css";

import aeroCTABg from "../../assets/main_landing_pages/students/cta-bg-2.webp";
import aeroDarkBtn from "../../assets/programs/aeromodelling/dark-btn.svg";

import modeOnsiteImg from "../../assets/main_landing_pages/students/learning-1.png";
import modeOnlineImg from "../../assets/main_landing_pages/students/learning-2.png";
import modeDiyImg from "../../assets/main_landing_pages/students/learning-3.png";
import testimonialImg from "../../assets/projects/project-1.png";
import communityBg from "../../assets/Background-images/globe-bg.webp";

import studentCertImg from "../../assets/programs/ai-and-data-science/certificate.webp";
import studentCertBg from "../../assets/programs/ai-and-data-science/certificate-bg.webp";

/* Partnership section — bg, box frame, lighting halo, 12 logos. */
import partnershipBg from "../../assets/main_landing_pages/students/partnership-bg.webp";
import partnerFrame from "../../assets/main_landing_pages/students/partnership-box-frame.svg";
import partnerLight from "../../assets/main_landing_pages/students/partnership-box-frame-lighting.svg";
import partnerLogo1 from "../../assets/main_landing_pages/students/logo-1.png";
import partnerLogo2 from "../../assets/main_landing_pages/students/logo-2.png";
import partnerLogo3 from "../../assets/main_landing_pages/students/logo-3.png";
import partnerLogo4 from "../../assets/main_landing_pages/students/logo-4.png";
import partnerLogo5 from "../../assets/main_landing_pages/students/logo-5.png";
import partnerLogo6 from "../../assets/main_landing_pages/students/logo-6.png";
import partnerLogo7 from "../../assets/main_landing_pages/students/logo-7.png";
import partnerLogo8 from "../../assets/main_landing_pages/students/logo-8.png";
import partnerLogo9 from "../../assets/main_landing_pages/students/logo-9.png";
import partnerLogo10 from "../../assets/main_landing_pages/students/logo-10.png";
import partnerLogo11 from "../../assets/main_landing_pages/students/logo-11.png";
import partnerLogo12 from "../../assets/main_landing_pages/students/logo-12.png";
import lofMainLogo from "../../assets/students/logo.svg";
import missionBg from "../../assets/main_landing_pages/students/mission-bg.webp";
import missionFrame from "../../assets/programs/aeromodelling/future-career-box-frame.png";
import mission1 from "../../assets/main_landing_pages/students/mission-1.webp";
import mission2 from "../../assets/main_landing_pages/students/mission-2.webp";
import mission3 from "../../assets/main_landing_pages/students/mission-3.webp";
import mission4 from "../../assets/main_landing_pages/students/mission-4.webp";
import mission5 from "../../assets/main_landing_pages/students/mission-5.webp";
import mission6 from "../../assets/main_landing_pages/students/mission-6.webp";
import studentHeroBg from "../../assets/main_landing_pages/students/hero-bg-2.webp";
import studentWwdBg from "../../assets/main_landing_pages/students/what-we-do-bg-2.webp";
import programsBg from "../../assets/main_landing_pages/students/programs-bg.webp";
import programImg1 from "../../assets/main_landing_pages/students/program-1.webp";
import programImg2 from "../../assets/main_landing_pages/students/program-2.webp";
import programImg3 from "../../assets/main_landing_pages/students/program-3.webp";
import programImg4 from "../../assets/main_landing_pages/students/program-4.webp";
import programImg5 from "../../assets/main_landing_pages/students/program-5.webp";
import programImg6 from "../../assets/main_landing_pages/students/program-6.webp";
import programImg7 from "../../assets/main_landing_pages/students/program-7.webp";
import programImg8 from "../../assets/main_landing_pages/students/program-8.webp";
import programImg9 from "../../assets/main_landing_pages/students/program-9.webp";

/* Programs list for the Students category. Each "live" entry routes
   to its own program detail page; "soon" entries render as
   disabled placeholders. */
const STUDENT_PROGRAMS = [
  {
    slug: "space-science",
    label: "Space & Science",
    tagline:
      "A future-ready program covering astronomy, physics, robotics, AI and engineering design — for ages 8 to 18.",
    status: "live",
  },
  {
    slug: "space-robotics",
    label: "Space Robotics",
    tagline:
      "Design, program and command the autonomous machines that explore space — rovers, landers, robotic arms and AI control systems.",
    status: "live",
  },
  {
    slug: "drones",
    label: "Drones",
    tagline:
      "Design, build and fly autonomous aerial systems — from quadcopters to fixed-wing UAVs — with hands-on flight, electronics and control engineering.",
    status: "live",
  },
  {
    slug: "ai-and-data-science",
    label: "AI & Data Science",
    tagline:
      "Build the intelligent systems behind tomorrow — machine learning, neural networks, data analysis and the maths that power modern AI.",
    status: "live",
  },
  {
    slug: "aeromodelling",
    label: "Aeromodelling",
    tagline:
      "Explore the principles of flight, propulsion and orbital mechanics — design, prototype and test aerospace systems from the ground up.",
    status: "live",
  },
];

/* Hero feature pills — icon + label pairs that sit beneath the
   description.  Keep to 4; the grid is hard-wired to 4 cols. */
const HERO_FEATURES = [
  { icon: FaRocket, label: "Future-Ready\nSkills" },
  { icon: FaLightbulb, label: "Hands-On\nLearning" },
  { icon: FaUsers, label: "Global\nExposure" },
  { icon: FaAward, label: "Expert\nMentorship" },
];

/* Bottom stats strip — keep to 4 entries to match the layout. */
const HERO_STATS = [
  { icon: FaRocket, num: "500+", label: "Practical Activities" },
  { icon: FaAward, num: "95%", label: "Portfolio-Based Learning" },
  { icon: FaUsers, num: "10,000+", label: "Students Empowered" },
];

/* Lookup table — `img: N` in PROGRAMS_GRID maps to position
   N-1 here so each card pulls its own dedicated image. */
const PROGRAM_IMAGES = [
  programImg1,
  programImg2,
  programImg3,
  programImg4,
  programImg5,
  programImg6,
  programImg7,
  programImg8,
  programImg9,
];

/* "Programs" section — card grid.  Each entry maps to a live
   program detail page via `slug` → /students/{slug}. */
const PROGRAMS_GRID = [
  {
    icon: FaRocket,
    title: "Space & Science",
    desc: "Explore the universe, study celestial bodies, and build models.",
    img: 1,
    slug: "space-science",
  },
  {
    icon: FaRobot,
    title: "Space Robotics",
    desc: "Design, build, and program robots that solve real-world problems.",
    img: 2,
    slug: "space-robotics",
  },
  {
    icon: FaBrain,
    title: "AI & Data Science",
    desc: "Understand AI concepts and build intelligent systems.",
    img: 3,
    slug: "ai-and-data-science",
  },
  {
    icon: FaHelicopter,
    title: "Drones",
    desc: "Learn drone technology, flight systems, and applications.",
    img: 4,
    slug: "drones",
  },
  {
    icon: FaCube,
    title: "Aeromodelling",
    desc: "Design, prototype and fly your own aircraft — flight principles + builds.",
    img: 5,
    slug: "aeromodelling",
  },
];

/* Left-panel feature pills — 3 items. */
const PROGRAMS_FEATURES = [
  {
    icon: FaRocket,
    title: "Real-World Learning",
    desc: "Work on projects inspired by real-world challenges.",
  },
  {
    icon: FaUsers,
    title: "Expert Mentorship",
    desc: "Learn and grow with guidance from industry professionals.",
  },
];

const STUDENT_MODE_CARDS = [
  { label: "Innovation Community", img: modeOnsiteImg },
  { label: "Competitions & Events", img: modeOnlineImg },
  { label: "Leadership Development", img: modeDiyImg },
];

const LOREM =
  "Participating in Lab of Future transformed the way our students approach science and technology. The hands-on projects are inspiring and truly future-ready.";

/* Student testimonials — flat list (the section is students-only
   now; the previous School / Students / Interns tabs have been
   removed). */
const STUDENT_TESTIMONIALS = [
  { name: "Vishwanathan V", img: testimonialImg, desc: LOREM },
  { name: "Priyanka M", img: testimonialImg, desc: LOREM },
  { name: "Jeff Jacob", img: testimonialImg, desc: LOREM },
  { name: "Anika Sharma", img: testimonialImg, desc: LOREM },
  { name: "Rohan Kumar", img: testimonialImg, desc: LOREM },
  { name: "Lakshmi V", img: testimonialImg, desc: LOREM },
];

const StudentCommunity = () => (
  <section
    className="student-community-section"
    style={{ backgroundImage: `url(${communityBg})` }}
  >
    <div className="student-community-overlay" aria-hidden="true" />
    <div className="container student-community-grid">
      {/* LEFT — card slider with prev / next arrows */}
      <div className="student-community-slider-wrap">
        <button
          type="button"
          className="community-nav community-nav--prev"
          aria-label="Previous testimonial"
        >
          <FaChevronLeft />
        </button>

        <div className="student-community-slider community-slider">
          <Swiper
            direction="vertical"
            modules={[Autoplay, Navigation]}
            loop
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 2 },
              980: { slidesPerView: 3 },
            }}
            centeredSlides
            spaceBetween={10}
            speed={650}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".community-nav--prev",
              nextEl: ".community-nav--next",
            }}
            style={{ height: "100%" }}
          >
            {STUDENT_TESTIMONIALS.map((it, i) => (
              <SwiperSlide key={i} className="community-slide">
                <article className="community-card">
                  <div className="community-card-imgwrap">
                    <img
                      className="community-card-img"
                      src={it.img}
                      alt={it.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="community-card-body">
                    <h3 className="community-card-name">{it.name}</h3>
                    <p className="community-card-desc">{it.desc}</p>
                    <button type="button" className="community-card-btn">
                      Read more
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          type="button"
          className="community-nav community-nav--next"
          aria-label="Next testimonial"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* RIGHT — title + desc */}
      <div className="community-info">
        <h2 className="student-programs-title">
          What Our
          <span className="student-programs-title-accent">
            {" "}
            Comuunity Say's
          </span>
        </h2>
        <p className="community-desc pt-3">Hear directly from the students, parents, educators, and schools who have experienced the Lab of Future journey firsthand. Discover how our innovative programs have inspired curiosity, built confidence, and transformed learning through real stories and genuine experiences.</p>
      </div>
    </div>
  </section>
);

/* ─────────────────────── PARTNERSHIP SECTION ───────────────────────
   Adapted from Aerospace's `AeroAssociated` — a tree-style grid of
   partner logos with the central LAB OF FUTURE plate.  Uses the
   new student-folder assets (partnership-bg / frame / lighting +
   12 partner logos). */

const STUDENT_PARTNERS_TOP = [
  { logo: partnerLogo1, x: 9.5 },
  { logo: partnerLogo2, x: 25.5 },
  { logo: partnerLogo3, x: 41.5 },
  { logo: partnerLogo4, x: 58.5 },
  { logo: partnerLogo5, x: 74.5 },
  { logo: partnerLogo6, x: 90.5 },
];

const STUDENT_PARTNERS_BOTTOM = [
  { logo: partnerLogo7, x: 9.5 },
  { logo: partnerLogo8, x: 25.5 },
  { logo: partnerLogo9, x: 41.5 },
  { logo: partnerLogo10, x: 58.5 },
  { logo: partnerLogo11, x: 74.5 },
  { logo: partnerLogo12, x: 90.5 },
];

const STUDENT_PARTNER_TOP_Y = 17;
const STUDENT_PARTNER_BOTTOM_Y = 83;

const StudentPartnerBox = ({ logo, x, y }) => (
  <div className="student-partner-box" style={{ left: `${x}%`, top: `${y}%` }}>
    <div className="student-partner-frame">
      <img
        className="student-partner-logo"
        src={logo}
        alt="Partner organisation"
        loading="lazy"
      />
    </div>
    <img
      className="student-partner-light"
      src={partnerLight}
      alt=""
      aria-hidden="true"
    />
  </div>
);

const StudentPartnership = () => (
  <section className="student-partnership-section">
    <div className="student-partnership-bg" aria-hidden="true" />

    <h2 className="student-programs-title student-partnership-title pb-3 pt-5">
          Partner
          <span className="student-programs-title-accent">
            {" "}
            Network
          </span>
        </h2>
         <p className="student-missions-sub student-partnership-title pb-3">
            United by a shared vision for future-ready learning.
          </p>

    <div className="student-partnership-tree">
      {/* Connecting tree-line SVG.  Top boxes drop into a horizontal
         bus → vertical drop to centre LOF plate → vertical to bottom
         bus → bus drops into each bottom box. */}
      <svg
        className="student-partnership-lines"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M95 170 V215" />
        <path d="M255 170 V215" />
        <path d="M415 170 V215" />
        <path d="M585 170 V215" />
        <path d="M745 170 V215" />
        <path d="M905 170 V215" />
        <path d="M95 215 H905" />
        <path d="M500 215 V268" />
        <path d="M500 332 V385" />
        <path d="M95 385 H905" />
        <path d="M95 385 V430" />
        <path d="M255 385 V430" />
        <path d="M415 385 V430" />
        <path d="M585 385 V430" />
        <path d="M745 385 V430" />
        <path d="M905 385 V430" />
      </svg>

      {STUDENT_PARTNERS_TOP.map((b, i) => (
        <StudentPartnerBox
          key={`pt${i}`}
          logo={b.logo}
          x={b.x}
          y={STUDENT_PARTNER_TOP_Y}
        />
      ))}

      <div className="student-partnership-center">
        <img src={lofMainLogo} alt="Lab of Future" />
      </div>

      {STUDENT_PARTNERS_BOTTOM.map((b, i) => (
        <StudentPartnerBox
          key={`pb${i}`}
          logo={b.logo}
          x={b.x}
          y={STUDENT_PARTNER_BOTTOM_Y}
        />
      ))}
    </div>

    {/* Mobile-only — the tree doesn't fit on phones, so the partner
        logos play one-by-one in a swipeable slider (no centre plate). */}
    <div className="student-partnership-slider">
      <Swiper
        modules={[Autoplay]}
        loop
        spaceBetween={16}
        slidesPerView={1.6}
        centeredSlides
        autoplay={{ delay: 1800, disableOnInteraction: false }}
        breakpoints={{
          480: { slidesPerView: 2.2 },
        }}
      >
        {[...STUDENT_PARTNERS_TOP, ...STUDENT_PARTNERS_BOTTOM].map((b, i) => (
          <SwiperSlide key={`ps${i}`} className="student-partnership-slide">
            <div className="student-partner-frame">
              <img
                className="student-partner-logo"
                src={b.logo}
                alt="Partner organisation"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

const STUDENT_MISSIONS = [
  { label: "Mars Habitat Design", img: mission1 },
  { label: "Autonomous Rover Challenge", img: mission2 },
  { label: "Satellite Tracking Mission", img: mission3 },
  { label: "AI Innovation Challenge", img: mission4 },
  { label: "Drone Navigation Task", img: mission5 },
  { label: "Future City Design", img: mission6 },
];

const Students = () => {
  const { openEnquiry } = useEnquiryModal();

  // Tag <body> so this page's header CTA can match the hero buttons
  // without affecting the global header on other pages.
  useEffect(() => {
    document.body.classList.add("is-students-page");
    return () => document.body.classList.remove("is-students-page");
  }, []);

  return (
    <main
      className="students-page"
      style={{ ["--student-hero-bg"]: `url(${studentHeroBg})` }}
    >
      <SEO
        title="Students — Lab of Future"
        description="Future-ready programs for students aged 8 to 18 — space, science, AI, robotics and more."
      />

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="student-hero">
        <div class="container">
          <div className="student-hero-inner">
            <motion.span
              className="student-hero-eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              For Students
            </motion.span>

            <motion.h1
              className="student-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
            >
              Transform Curiosity into{" "}
              <span className="student-hero-title-accent">Capability</span>
            </motion.h1>

            <motion.p
              className="student-hero-desc"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
            >
              An immersive journey where science, technology, space exploration,
              robotics, AI, and innovation come together. Learn by building,
              experimenting, and solving real-world challenges.
            </motion.p>

            <motion.div
              className="student-hero-cta"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={openEnquiry}
                className="student-btn student-btn--primary"
              >
                Enroll Now
                <span className="student-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </span>
              </button>
              <a href="#programs" className="student-btn student-btn--ghost">
                Explore Programs
                <span className="student-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </span>
              </a>
            </motion.div>
            {/* Stats strip pinned to the bottom of the hero. */}
            <motion.div
              className="student-stats"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            >
              {HERO_STATS.map(({ icon: Icon, num, label }) => (
                <div className="student-stat" key={label}>
                  <span className="student-stat-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="student-stat-body">
                    <span className="student-stat-num">{num}</span>
                    <span className="student-stat-lbl">{label}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────── WHAT WE DO ─────────────────────────────
        Two-column layout: framed text panel on the left, full-bleed
        backdrop (kids + rocket) showing through on the right.
    */}
      <section
        className="student-what-we-do"
        style={{ ["--student-wwd-bg"]: `url(${studentWwdBg})` }}
      >
        <div className="student-wwd-bg" aria-hidden="true" />

        <div className="student-wwd-inner container">
          <motion.div
            className="student-wwd-panel"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Decorative corner dot grids */}
            <span
              className="student-wwd-corner student-wwd-corner--tr"
              aria-hidden="true"
            />
            <span
              className="student-wwd-corner student-wwd-corner--bl"
              aria-hidden="true"
            />

            <span className="student-wwd-eyebrow">
              Reimagining Education Through Experience
            </span>

            <h2 className="student-wwd-title">
              What <span className="student-wwd-title-accent">We Do?</span>
            </h2>

            <p className="student-wwd-desc">
              Reimagining Education Through Experience
            </p>

            <p className="student-wwd-desc">
              Lab of Future partners with schools to deliver immersive, hands-on
              STEM education through cutting-edge programs in Space Science,
              Robotics, Artificial Intelligence, Aerospace, IoT, and Future
              Technologies.
            </p>

            <p className="student-wwd-desc">
              The Student Program is designed to help learners develop critical
              thinking, creativity, problem-solving, and technical skills
              through hands-on projects and interactive missions. Every activity
              is built to inspire confidence and prepare students for tomorrow's
              opportunities.
            </p>

            <div className="student-wwd-cta">
              <button
                type="button"
                onClick={openEnquiry}
                className="student-btn student-btn--primary"
              >
                Enroll Now
                <span className="student-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </span>
              </button>
              <button
                type="button"
                onClick={openEnquiry}
                className="student-btn student-btn--ghost"
              >
                Book a Demo
                <span className="student-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────── PROGRAMS — 3x3 GRID ───────────────────
        Two-column layout: left text/feature panel, right 3x3
        program card grid.  Each card has a header image + icon
        badge, body with title / description / Explore link.
    */}
      <section
        className="student-programs"
        id="programs"
        style={{ ["--student-programs-bg"]: `url(${programsBg})` }}
      >
        <div className="student-programs-bg" aria-hidden="true" />

        <div className="student-programs-inner container">
          {/* LEFT — heading + features + CTA */}
          <motion.div
            className="student-programs-left"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="student-programs-eyebrow">
              Programs
              <span
                className="student-programs-eyebrow-line"
                aria-hidden="true"
              />
            </span>

            <h2 className="student-programs-title">
              Explore Programs.
              <br />
              <span className="student-programs-title-accent">
                Build the Future.
              </span>
            </h2>

            <p className="student-programs-desc">
              Hands-on learning experiences designed to inspire curiosity, build
              skills, and empower students to solve real-world challenges.
            </p>

            <span className="student-programs-divider" aria-hidden="true" />

            <ul className="student-programs-features">
              {PROGRAMS_FEATURES.map(({ icon: Icon, title, desc }) => (
                <li className="student-programs-feature" key={title}>
                  <span
                    className="student-programs-feature-icon"
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>
                  <span className="student-programs-feature-body">
                    <span className="student-programs-feature-title">
                      {title}
                    </span>
                    <span className="student-programs-feature-desc">
                      {desc}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to="/students#programs"
              className="student-btn student-btn--ghost student-programs-cta"
            >
              View All Programs
              <span className="student-btn-arrow" aria-hidden="true">
                <FaArrowRight />
              </span>
            </Link>
          </motion.div>

          {/* RIGHT — program card grid.  Each card routes to its
            corresponding program detail page via Link / slug. */}
          <div className="student-programs-grid">
            {PROGRAMS_GRID.map(({ icon: Icon, title, desc, img, slug }, i) => (
              <motion.article
                key={title}
                className="program-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.05 * (i % 3),
                }}
              >
                <Link to={`/students/${slug}`} className="program-card-link">
                  <div
                    className="program-card-image"
                    style={{
                      backgroundImage: `url(${PROGRAM_IMAGES[img - 1]})`,
                    }}
                  >
                    <span className="program-card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  </div>
                  <div className="program-card-body">
                    <h3 className="program-card-title">{title}</h3>
                    <p className="program-card-desc">{desc}</p>
                    <span className="program-card-cta">
                      Explore
                      <span aria-hidden="true">
                        <FaArrowRight />
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CTA ───────────────────────────────── */}
      <section
        className="student-cta-section"
        style={{ backgroundImage: `url(${aeroCTABg})` }}
      >
        <div className="student-cta-inner container">
          <div className="student-cta-text">
            <h2 className="student-programs-title">
              The Future Won't be Taught.
              <span className="student-programs-title-accent">
                {" "}
                It will be Built.
              </span>
            </h2>
            <p className="student-cta-desc">Give your child more than just knowledge—give them the confidence to explore, the skills to innovate, and the courage to dream bigger. At Lab of Future, we nurture curiosity, creativity, and critical thinking through hands-on learning experiences. Equip them with the tools to solve tomorrow's challenges and inspire them to shape a future that reaches far beyond our planet.</p>
            <div className="student-cta-actions">
              <button
                type="button"
                onClick={openEnquiry}
                className="student-btn student-btn--primary"
              >
                Enroll Now
                <span className="student-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </span>
              </button>
              <button
                type="button"
                onClick={openEnquiry}
                className="student-btn student-btn--ghost"
              >
                Book a Demo
                <span className="student-btn-arrow" aria-hidden="true">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── STUDENT MISSIONS & CHALLENGES ─────────── */}
      <section
        className="student-missions-section"
        style={{ backgroundImage: `url(${missionBg})` }}
      >
        <div className="student-missions-overlay" aria-hidden="true" />
        <div className="container">
          <h2 className="student-programs-title">
            Students Mission &
            <span className="student-programs-title-accent"> Challenges</span>
          </h2>
          <p className="student-missions-sub p-3">
            Build. Experiment. Achieve.
          </p>
          <p className="student-missions-desc">
            Participate in exciting missions inspired by real-world scientific
            and technological challenges.
          </p>

          <div className="student-missions-grid">
            {STUDENT_MISSIONS.map((m) => (
              <article
                className="student-mission-card"
                key={m.label}
                style={{ backgroundImage: `url(${missionFrame})` }}
              >
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  className="student-mission-card-img"
                />
                <span className="student-mission-card-label">{m.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── CERTIFICATES ──────────────────────── */}
      <section
        className="student-cert-section"
        style={{ backgroundImage: `url(${studentCertBg})` }}
      >
        <div className="student-cert-overlay" aria-hidden="true" />
        <div className="student-cert-inner container">
          {/* LEFT — title + bullet points */}
          <div className="student-cert-text">
            <h2 className="student-cert-title">Certificates</h2>
            <ul className="student-cert-list">
              <li>
                Level-based <strong>certification for students</strong> tied to
                real project performance.
              </li>
              <li>
                <strong>STEM certificates for students</strong> who build, not
                just attend.
              </li>
              <li>
                Recognised credentials that showcase skills to schools, colleges
                and employers.
              </li>
            </ul>
          </div>

          {/* RIGHT — fanned stack of 3 certificates */}
          <div className="student-cert-stage">
            <div className="student-cert-stack">
              <img
                className="student-cert-card student-cert-card--1"
                src={studentCertImg}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <img
                className="student-cert-card student-cert-card--2"
                src={studentCertImg}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <img
                className="student-cert-card student-cert-card--3"
                src={studentCertImg}
                alt="LOF certificate"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── MODES TO JOIN ─────────────────────── */}
      <section className="student-modes-section">
        <div className="container">
          <h2 className="student-programs-title">
            Beyond
            <span className="student-programs-title-accent"> Learning</span>
          </h2>
          <p className="student-missions-sub p-3">
            JOIN A COMMUNITY OF INNOVATORS
          </p>
          <div className="modes-grid" style={{ marginTop: "50px" }}>
            {STUDENT_MODE_CARDS.map((c) => (
              <article className="modes-card" key={c.label}>
                <div className="modes-card-imgwrap">
                  <img
                    className="modes-card-img"
                    src={c.img}
                    alt={c.label}
                    loading="lazy"
                  />
                </div>
                <span className="modes-card-label">{c.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────── WHAT OUR COMMUNITY SAYS ───────────────── */}
      <StudentCommunity />

      {/* ──────────────── PARTNERSHIP ─────────────────────────────── */}
      <StudentPartnership />

      {/* ──────────────── SITE FOOTER ─────────────────────────────── */}
    </main>
  );
};

export default Students;
