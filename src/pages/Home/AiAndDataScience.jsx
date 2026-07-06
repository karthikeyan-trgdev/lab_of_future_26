// Home.jsx

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  useFBX,
  OrbitControls,
} from "@react-three/drei";

import { motion } from "framer-motion";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import * as THREE from "three";

import SEO from "../../components/common/SEO";
import ScrollProgressBar from "../../components/common/ScrollProgressBar";
import BackToTopButton from "../../components/common/BackToTopButton";
import { siteConfig } from "../../data/siteConfig";
import { canvasPerf } from "../../hooks/useDevicePerformance";
import { useEnquiryModal } from "../../context/EnquiryModalContext";

import aiCertificateImg from "../../assets/programs/ai-and-data-science/certificate.webp";

// AI & Data Science assets — hero / age / learn backdrops + frame
// PNGs are referenced via CSS (background-image url(...)) only, so
// no JS imports needed for them.  Below: the assets the JSX itself
// renders via <img src={...}>.
import aiLearnImg1 from "../../assets/programs/ai-and-data-science/students-learn-1.webp";
import aiLearnImg2 from "../../assets/programs/ai-and-data-science/students-learn-2.webp";
import aiLearnImg3 from "../../assets/programs/ai-and-data-science/students-learn-3.webp";
import aiLearnImg4 from "../../assets/programs/ai-and-data-science/students-learn-4.webp";
import aiLearnImg5 from "../../assets/programs/ai-and-data-science/students-learn-5.webp";
import aiLearnImg6 from "../../assets/programs/ai-and-data-science/students-learn-6.webp";
import aiLearnImg7 from "../../assets/programs/ai-and-data-science/students-learn-7.webp";
import ai123FbxUrl from "../../assets/programs/ai-and-data-science/123.fbx?url";

import abstractGlbUrl from "../../assets/programs/ai-and-data-science/abstract.glb?url";
import programImg1 from "../../assets/programs/ai-and-data-science/program-1.png";
import programImg2 from "../../assets/programs/ai-and-data-science/program-2.png";
import programImg3 from "../../assets/programs/ai-and-data-science/program-3.png";
import programImg4 from "../../assets/programs/ai-and-data-science/program-4.png";
import programImg5 from "../../assets/programs/ai-and-data-science/program-5.png";
import programImg6 from "../../assets/programs/ai-and-data-science/program-6.png";
import programImg7 from "../../assets/programs/ai-and-data-science/program-7.png";
import programImg8 from "../../assets/programs/ai-and-data-science/program-8.png";
import modeOnsiteImg from "../../assets/modes-to-join/onsite.png";
import modeOnlineImg from "../../assets/modes-to-join/online.png";
import modeDiyImg from "../../assets/modes-to-join/diy.png";
import projectImg from "../../assets/projects/project-1.png";
import aiProject1 from "../../assets/programs/ai-and-data-science/projects/projects-2.webp";
import aiProject2 from "../../assets/programs/ai-and-data-science/projects/students-learn-2.webp";
import aiProject3 from "../../assets/programs/ai-and-data-science/projects/students-learn-3.webp";
import impactIcon1 from "../../assets/icons/project-impact-icon-1.png";
import impactIcon2 from "../../assets/icons/project-impact-icon-2.png";
import impactIcon3 from "../../assets/icons/project-impact-icon-3.png";

import codingImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-1.webp";
import aiImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-2.webp";
import electronicsImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-3.webp";
import engineeringImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-4.webp";
import dataImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-5.webp";
import designingImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-6.webp";
import researchImg from "../../assets/programs/ai-and-data-science/future-careers/future-career-7.webp";
import futureWayImg from "../../assets/programs/ai-and-data-science/future-way.webp";

import calenderIcon from "../../assets/future-career/calender.svg";
import olympiadIcon from "../../assets/future-career/olympiad.svg";
import portfolioIcon from "../../assets/future-career/portfolio.svg";
import recognitionIcon from "../../assets/future-career/recognition.svg";
import skullIcon from "../../assets/future-career/skull.svg";

import assocLightRobotics from "../../assets/programs/ai-and-data-science/associated-client-frame-lighting.svg";
import lofLogo from "../../assets/Logo/log-header-logo.svg";
import assocLogo1 from "../../assets/programs/ai-and-data-science/logo-1.png";
import assocLogo2 from "../../assets/programs/ai-and-data-science/logo-2.png";
import assocLogo3 from "../../assets/programs/ai-and-data-science/logo-3.png";
import assocLogo4 from "../../assets/programs/ai-and-data-science/logo-4.png";
import assocLogo5 from "../../assets/programs/ai-and-data-science/logo-5.png";
import assocLogo6 from "../../assets/programs/ai-and-data-science/logo-6.png";
import assocLogo7 from "../../assets/programs/ai-and-data-science/logo-7.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaXTwitter,
  FaYoutube,
  FaRocket,
  FaUsers,
  FaGlobe,
  FaXmark,
  FaLocationDot,
  FaCalendarDays,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import vettedGeorge from "../../assets/programs/ai-and-data-science/team-1.png";
import vettedMadison from "../../assets/programs/ai-and-data-science/team-2.png";
import vettedDavid from "../../assets/programs/ai-and-data-science/team-3.png";
import vettedVitali from "../../assets/programs/ai-and-data-science/team-4.png";

/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhySpaceScience = () => (
  <section className="ai-why-section">
    <div className="ai-section-fade-top" aria-hidden="true" />
    <div className="ai-section-fade-bot" aria-hidden="true" />
    {/* Background HUD/tech artwork — sits behind everything. */}
    <div className="ai-why-bg" aria-hidden="true" />

    <div className="ai-why-inner container">
      {/* LEFT — title + descriptive copy + bullet list. */}
      <div className="ai-why-text">
        <h2 className="ai-why-title prog-section-title">
          WHY <span className="ai-why-title-accent">AI & DATA SCIENCE?</span>
        </h2>
        <p className="ai-why-desc">AI is not coming. It is already here — inside the apps you use, the recommendations you
scroll past, and the systems powering cities, hospitals, and businesses across the UAE
every single day. The people building those systems did not start with a degree. They started
with curiosity. At Lab of Future, students train real AI models, build intelligent projects, and
develop the problem-solving instincts that every future career will demand.</p>
      </div>
      {/* RIGHT — landing zone for the traveling particle swarm.
          The actual canvas is rendered once by <AiParticleTraveler/>
          (mounted at the page level) and repositions itself here as
          the user scrolls past the hero. */}
      <div className="ai-why-stage" aria-hidden="true" />
    </div>
  </section>
);


/* =========================================================
   AI START-YOUNG + AGE GROUPS — single combined section.
   Background: why-start-young-bg.webp (covers the whole
   section, no per-block boxing).
   Layout:
     - TOP HALF: empty .ai-start-stage on the LEFT (the
       page-level <HologramTraveler /> lands here) and a
       text column on the RIGHT with two titles + copy.
     - BOTTOM HALF: 5 age cards in a row, each painted with
       age-shape.svg as its frame.
========================================================= */
const AI_START_AGE_GROUPS = [
  {
    label: "Foundation",
    points: [
      "Discover what artificial intelligence is through fun, play-based activities.",
      "Explore how machines recognize patterns and make simple decisions.",
      "Build curiosity and confidence with age-appropriate AI experiences.",
    ],
  },
  {
    label: "Explorer",
    points: [
      "Learn the basics of machine learning and data patterns.",
      "Experiment with beginner AI tools through guided activities.",
      "Strengthen logical thinking with classification and prediction challenges.",
    ],
  },
  {
    label: "Innovator",
    points: [
      "Understand neural networks and AI model training fundamentals.",
      "Explore how AI analyzes data to identify meaningful patterns.",
      "Apply AI concepts to solve practical real-world challenges.",
    ],
  },
  {
    label: "Engineer",
    points: [
      "Build advanced AI projects using modern development tools.",
      "Learn generative AI concepts along with responsible AI ethics.",
      "Create innovation-driven solutions for real-world applications.",
    ],
  },
  {
    label: "Researcher",
    points: [
      "Develop portfolio-ready AI projects for higher education and careers.",
      "Explore automation, deep learning foundations, and applied AI.",
      "Gain industry-focused skills for emerging AI opportunities in the UAE.",
    ],
  },
];

const AiStartYoungAgeSection = () => (
  <section className="ai-start-section">
    <div className="ai-section-fade-top" aria-hidden="true" />
    <div className="ai-section-fade-bot" aria-hidden="true" />
    <div className="ai-start-bg" aria-hidden="true" />

    <div className="ai-start-inner container">
      {/* Top half — hologram landing pad on the left, dual-title
          copy column on the right. */}
      <div className="ai-start-top">
        <div className="ai-start-visual">
          <img className="ai-start-img" src={futureWayImg} alt="" />
          {/* particle landing zone — now small in the top-left corner */}
          <div className="ai-start-stage" aria-hidden="true" />
        </div>

        <div className="ai-start-text">
          <h2 className="ai-start-title prog-section-title">
           THE LAB OF <span className="ai-start-title-accent">FUTURE WAY?</span>
          </h2>
          <p className="ai-start-desc">Hands-on artificial intelligence program where students build, train, and explore real AI
systems and technology.</p>

          <h2 className="ai-start-title ai-start-title--secondary prog-section-title">
           WHY START <span className="ai-start-title-accent">YOUNG?</span>
          </h2>
          <p className="ai-start-desc">The earlier students engage with AI, the deeper their understanding. Our AI classes for
kids build logical thinking and machine learning foundations through hands-on experiences
for young learners in Dubai.</p>
        </div>
      </div>
    </div>
      {/* Bottom half — five age cards, each framed with age-shape.svg */}
      <div className="ai-start-ages">
        {AI_START_AGE_GROUPS.map((g) => (
          <article className="ai-age-card" key={g.label} aria-label={g.label}>
            <div className="ai-age-card-label">{g.label}</div>
            <ul className="ai-age-card-list">
              {g.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
  </section>
);


/* =========================================================
   AI STUDENTS LEARN — full-bleed bg + box-frame cards.
   Same grid logic as the SpaceRobotics Learn section but with
   the AI background, AI box-frame artwork, AI palette and
   AI-relevant copy.
========================================================= */
const AI_LEARN_ITEMS = [
  {
    label: "AI Foundations",
    img: aiLearnImg1,
    title: "Understand How AI Works",
    desc: "Explore how machines learn, recognise patterns, and make intelligent decisions.",
  },
  {
    label: "Machine Learning",
    img: aiLearnImg2,
    title: "Train Real AI Models",
    desc: "Build, train, and test machine learning models using real data and tools.",
  },
  {
    label: "Creative AI",
    img: aiLearnImg3,
    title: "Explore Generative AI",
    desc: "Discover generative AI for kids — create, prompt, and work with intelligent systems.",
  },
  {
    label: "Data Science",
    img: aiLearnImg4,
    title: "Work With Data",
    desc: "Learn how data is collected, cleaned, and used to teach machines to think.",
  },
  {
    label: "AI Development",
    img: aiLearnImg5,
    title: "Learn AI Coding",
    desc: "Write real code to build AI logic, automate tasks, and control intelligent systems.",
  },
  {
    label: "AI Innovation",
    img: aiLearnImg6,
    title: "Complete AI Missions",
    desc: "Plan, build, and present AI projects that solve genuine real-world challenges.",
  },
  {
    label: "Responsible AI",
    img: aiLearnImg7,
    title: "Explore AI Ethics",
    desc: "Understand responsibility, bias, and what it means to build AI that is fair.",
  },
];

const AiStudentsLearn = () => (
  <section className="ai-learn-section">
    <div className="ai-learn-stage" aria-hidden="true" />
    <div className="ai-section-fade-top" aria-hidden="true" />
    <div className="ai-section-fade-bot" aria-hidden="true" />
    <div className="ai-learn-bg" aria-hidden="true" />

    <div className="ai-learn-inner container">
      <h2 className="ai-learn-title prog-section-title">
        WHAT WILL STUDENTS{" "}
        <span className="ai-learn-title-accent">LEARN?</span>
      </h2>
      <p className="ai-learn-sub">
        Learn to think, build, and create like an AI innovator.
      </p>

      <p className="ai-learn-sub">
        From understanding how machines learn to building and training real AI models, students
develop genuine skills through every session. Each project is hands-on, challenge-driven,
and built around real artificial intelligence applications. Students leave knowing not just
what AI is — but exactly how to use it to solve problems that matter.
      </p>


      <div className="ai-learn-grid">
        {AI_LEARN_ITEMS.map((it) => (
          <article className="ai-learn-card" key={it.label}>
            <div className="ai-learn-card-imgwrap">
              <img className="ai-learn-card-img" src={it.img} alt={it.label} loading="lazy" />
              <div className="ai-learn-card-overlay">
                <h3 className="ai-learn-card-overlay-title">{it.title}</h3>
                <p className="ai-learn-card-overlay-desc">{it.desc}</p>
              </div>
            </div>
            <span className="ai-learn-card-label">{it.label}</span>
          </article>
        ))}
      </div>

      <p className="ai-learn-foot">
        Every model trained is a skill earned. Every project completed is a future built.
      </p>
    </div>
  </section>
);

/* =========================================================
   TRAVEL PARTICLES V2 — multi-section 8-waypoint journey.
   Shape per waypoint is computed procedurally in the vertex
   shader from per-instance seeds baked into instanceMatrix
   (no per-segment GPU uploads needed).

   Shape IDs (only the ones actually used in WP_SHAPES are kept):
     0  = column        (animated falling stream)
     1  = disc          (flat filled circle)
     5  = starburst     (6-arm radial burst)
     15 = cube          (particles on the 6 faces of a cube)
     19 = tesseract     (4D-hypercube wireframe — outer + inner cube)
     22 = petal4        (four-petal flower at 0/90/180/270)
     23 = trophy        (cup + stem + base + handles silhouette)
     24 = growthBars    (3 stepped bars + pole + pennant flag)
     25 = qmark         (question mark — curved top, stem, dot)
     26 = hourglass     (two semicircles meeting at centre line)
     28 = spikyStar     (7-pointed sharp star with concave valleys)
     29 = lightTrail    (sparse vertical drift — light-trail effect)

   uShapeA / uShapeB select which shape to render at the
   current segment's start/end; uMorphT (0→1) blends between
   them.  The outer AiParticleTraveler RAF loop drives a
   continuous global progress 0→8 from scroll position —
   bidirectional by construction.
========================================================= */
const TRAVEL_V2_VERT = `
  uniform float uHover;
  uniform vec3  uMousePos;
  uniform float uTime;
  uniform float uColHeight;
  uniform float uFallSpeed;
  uniform float uColRadius;
  uniform int   uShapeA;
  uniform int   uShapeB;
  uniform float uSizeA;
  uniform float uSizeB;
  uniform float uMorphT;
  uniform float uScatter; // 0 = particles on shape; 1 = flown leftward off-canvas

  varying vec3  vNormalW;
  varying float vFade;
  varying float vEdgeFade;

  float ss(float t) { return t * t * (3.0 - 2.0 * t); }

  vec3 shapePos(int shape, float sx, float sy, float sz, float size) {
    float PI2   = 6.28318;
    float angle  = sz * PI2;
    float angle2 = sx * PI2;

    if (shape == 1) {
      float r = size * sqrt(sy);
      return vec3(r * cos(angle), r * sin(angle), (sx - 0.5) * 0.28);
    }
    if (shape == 5) {
      float arm      = floor(sz * 6.0);
      float armAngle = arm * 6.28318 / 6.0 + sx * 0.45;
      float dist     = sy * size;
      return vec3(dist * cos(armAngle), dist * sin(armAngle), (sx - 0.5) * 0.45);
    }
    if (shape == 22) {
      // 4-PETAL FLOWER — four elongated petals at 0/90/180/270.
      // sx picks petal (×4) + offset along it, sy is the
      // perpendicular position within the petal (sin-fattened
      // toward the petal middle).
      float petalIdx = floor(sx * 4.0);
      float petalAng = petalIdx * 1.5707963;
      float along    = (sx - petalIdx / 4.0) * 4.0; // 0..1 along petal
      float width    = sin(along * 3.14159) * size * 0.32; // widest at middle
      float perp     = (sy - 0.5) * width * 2.0;
      float dist     = along * size * 0.7;
      float ca = cos(petalAng), sa = sin(petalAng);
      return vec3(dist * ca - perp * sa,
                  dist * sa + perp * ca,
                  (sz - 0.5) * 0.10);
    }
    if (shape == 23) {
      // TROPHY (matches reference image silhouette):
      //   region [0.0 .. 0.45)  CUP   — filled U-shape, wide top
      //   region [0.45.. 0.65)  HANDLES — two large outward C-arcs
      //   region [0.65.. 0.75)  STEM  — narrow connector
      //   region [0.75.. 0.92)  BASE  — trapezoid (wider at bottom)
      //   region [0.92.. 1.00]  PLATE — thin rectangle under base
      float region = sz;
      if (region < 0.45) {
        // CUP body — filled region, width grows quickly with v then
        // plateaus near the top.  Top edge sits near y = +0.58,
        // bottom curves into a V at y ≈ +0.02.
        float v = sy;
        float w = size * 0.42 * pow(max(v, 0.001), 0.35);
        float x = (sx - 0.5) * 2.0 * w;
        float y = v * size * 0.56 + size * 0.02;
        return vec3(x, y, (sz - 0.5) * 0.06);
      } else if (region < 0.65) {
        // HANDLES — two C-arcs bulging out from the cup sides.
        // sx < 0.5 → left handle, sx >= 0.5 → right handle.
        float side = sx < 0.5 ? -1.0 : 1.0;
        float t    = sx < 0.5 ? sx * 2.0 : (sx - 0.5) * 2.0;
        float ang  = mix(1.5708, -1.5708, t); // 90° → -90° sweep
        float thick = (sy - 0.5) * size * 0.05;
        float r    = size * 0.18 + thick;
        float cx   = size * 0.38;             // canonical right
        float cy   = size * 0.30;
        float hx   = cx + r * cos(ang);
        float hy   = cy + r * sin(ang);
        return vec3(side * hx, hy, (sz - 0.5) * 0.04);
      } else if (region < 0.75) {
        // STEM — narrow vertical connector from cup-bottom to base.
        float x = (sx - 0.5) * size * 0.11;
        float y = size * 0.02 - sy * size * 0.22;
        return vec3(x, y, (sz - 0.5) * 0.05);
      } else if (region < 0.92) {
        // BASE — trapezoidal pedestal, wider at the bottom.
        float v = sy; // 0 = top of base, 1 = bottom
        float w = mix(size * 0.18, size * 0.32, v);
        float x = (sx - 0.5) * 2.0 * w;
        float y = -size * 0.20 - v * size * 0.18;
        return vec3(x, y, (sz - 0.5) * 0.06);
      } else {
        // PLATE — thin rectangle under base.
        float x = (sx - 0.5) * size * 0.70;
        float y = -size * 0.40 - sy * size * 0.05;
        return vec3(x, y, (sz - 0.5) * 0.05);
      }
    }
    if (shape == 24) {
      // GROWTH BARS + FLAG (matches reference):
      //   3 rectangular bars getting taller left → right
      //   thin base platform under all 3
      //   vertical pole rising from the tallest (right) bar
      //   pennant flag with right-side V-notch atop the pole
      float region = sz;
      if (region < 0.20) {
        // BAR 1 — leftmost, shortest
        float x = -size * 0.42 + (sx - 0.5) * size * 0.20;
        float y = -size * 0.42 + sy * size * 0.28;
        return vec3(x, y, (sz - 0.5) * 0.05);
      } else if (region < 0.46) {
        // BAR 2 — middle, medium
        float x = (sx - 0.5) * size * 0.20;
        float y = -size * 0.42 + sy * size * 0.50;
        return vec3(x, y, (sz - 0.5) * 0.05);
      } else if (region < 0.76) {
        // BAR 3 — rightmost, tallest
        float x = size * 0.42 + (sx - 0.5) * size * 0.20;
        float y = -size * 0.42 + sy * size * 0.70;
        return vec3(x, y, (sz - 0.5) * 0.05);
      } else if (region < 0.80) {
        // BASE PLATFORM — thin strip beneath all bars
        float x = (sx - 0.5) * size * 1.05;
        float y = -size * 0.46 - sy * size * 0.03;
        return vec3(x, y, (sz - 0.5) * 0.04);
      } else if (region < 0.86) {
        // FLAG POLE — vertical line rising from top of bar 3
        float x = size * 0.42 + (sx - 0.5) * size * 0.025;
        float y = size * 0.28 + sy * size * 0.22;
        return vec3(x, y, (sz - 0.5) * 0.04);
      } else {
        // PENNANT FLAG with right-side V-notch.  Flag rectangle
        // attaches to the pole on its left side and extends right;
        // the right edge has a triangular notch cut from the middle.
        float u = sx; // 0..1 across flag
        float v = sy; // 0..1 up flag
        // Width at vertical position v — notch is wider in the middle.
        float vCentered = abs(v - 0.5) * 2.0; // 0 at middle, 1 at top/bottom
        float maxU = 0.55 + 0.45 * vCentered; // notch depth = 0.45
        float uClamp = u * maxU;
        float x = size * 0.42 + uClamp * size * 0.26;
        float y = size * 0.36 + v * size * 0.16;
        return vec3(x, y, (sz - 0.5) * 0.04);
      }
    }
    if (shape == 25) {
      // QUESTION MARK — curved top (3/4 circle), stem, dot.
      float region = sx;
      if (region < 0.62) {
        float t   = region / 0.62;
        float ang = -1.57 + t * 4.5;            // sweep top, right, bottom
        float r   = size * 0.32;
        float cx  = 0.0;
        float cy  = size * 0.18;
        float thick = (sy - 0.5) * 0.06;
        return vec3(cx + (r + thick) * cos(ang),
                    cy + (r + thick) * sin(ang),
                    (sz - 0.5) * 0.05);
      } else if (region < 0.85) {
        // Stem coming straight down from the curve end into centre.
        float t = (region - 0.62) / 0.23;
        return vec3((sy - 0.5) * size * 0.05,
                    size * 0.18 - size * 0.32 - t * size * 0.18,
                    (sz - 0.5) * 0.05);
      } else {
        // Dot at the bottom.
        float t   = (region - 0.85) / 0.15;
        float ang = t * 6.28318;
        float r   = size * 0.06 * sqrt(sy);
        return vec3(r * cos(ang),
                    -size * 0.42 + r * sin(ang),
                    (sz - 0.5) * 0.05);
      }
    }
    if (shape == 29) {
      // LIGHT TRAIL — particles spread across a tall, narrow
      // vertical column with per-particle drift, reading as a
      // faint trail traveling through.  Combined with low alpha
      // (uVisibility, set from the waypoint's visibility field)
      // this gives the "few light particles in a trail" look.
      float vY      = (sy - 0.5) * size * 2.2;
      float t       = uTime * 0.14;
      float jitterX = sin(sx * 31.0 + sz * 17.0) * size * 0.06;
      float driftY  = sin(t + sx * 6.28) * size * 0.10;
      float driftX  = sin(t * 0.7 + sz * 6.28) * size * 0.04;
      return vec3(jitterX + driftX,
                  vY + driftY,
                  (sz - 0.5) * size * 0.20);
    }
    if (shape == 28) {
      // 7-POINTED SPIKY STAR — sharp points with concave curved
      // valleys between them.  Matches the reference image: a
      // "ninja-star" / heptagon-burst silhouette.
      //   sx → angle around the star (0..2π)
      //   sy → radial fill ratio (0 at centre, 1 at outline)
      //   sz → small Z jitter
      float angle = sx * 6.28318;
      // 7-cycle pulse — radius peaks at 7 angles, dips between.
      // peak = (cos(7θ) + 1)/2 ∈ [0,1]; pow(peak, 2.5) sharpens
      // the points while keeping the valleys smoothly concave.
      float peak     = 0.5 + 0.5 * cos(7.0 * angle);
      float outlineR = size * (0.30 + 0.70 * pow(peak, 2.5));
      float fillR    = outlineR * sqrt(sy); // uniform-area fill
      return vec3(fillR * cos(angle),
                  fillR * sin(angle),
                  (sz - 0.5) * 0.10);
    }
    if (shape == 26) {
      // HOURGLASS — two semicircles meeting at centre line.
      // Upper one curved up, lower one curved down; together they
      // form the silhouette from the 2nd reference image.
      if (sx < 0.5) {
        float t   = sx * 2.0;
        float ang = t * 3.14159;
        float r   = size * 0.42 * (0.7 + sy * 0.3);
        return vec3(r * cos(ang),
                    size * 0.18 + r * sin(ang) * 0.9,
                    (sz - 0.5) * 0.08);
      } else {
        float t   = (sx - 0.5) * 2.0;
        float ang = -t * 3.14159;
        float r   = size * 0.42 * (0.7 + sy * 0.3);
        return vec3(r * cos(ang),
                    -size * 0.18 + r * sin(ang) * 0.9,
                    (sz - 0.5) * 0.08);
      }
    }
    if (shape == 19) {
      // TESSERACT — true 4D hypercube continuously rotating in
      // 4D space, perspective-projected back to 3D.  Produces
      // the iconic "cube turning inside out" animation where the
      // inner cube swells outward and the outer cube shrinks
      // inward, then they swap.  Two 4D rotation planes (XW + YZ)
      // give a tumbling 4D feel that never repeats trivially.
      //   16 vertices · 32 edges (8 per axis, 4 axes)
      //   sz → which of 32 edges; sx → position along edge
      int edgeIdx = int(sz * 32.0);
      float along = sx;

      // Edges grouped by which axis they SPAN (8 per axis).
      int axis = edgeIdx / 8;
      int v    = edgeIdx - axis * 8;

      // Three ± signs from v's bits → fix the 3 non-axis coords.
      float s0 = (v - 2 * (v / 2)) == 0 ? -1.0 : 1.0;
      int   v2 = v / 2;
      float s1 = (v2 - 2 * (v2 / 2)) == 0 ? -1.0 : 1.0;
      float s2 = (v / 4) == 0 ? -1.0 : 1.0;

      // Build the two 4D endpoints — the axis dim swings -1 → 1.
      vec4 A4, B4;
      if      (axis == 0) { A4 = vec4(-1.0, s0, s1, s2);  B4 = vec4( 1.0, s0, s1, s2); }
      else if (axis == 1) { A4 = vec4(s0, -1.0, s1, s2);  B4 = vec4(s0,  1.0, s1, s2); }
      else if (axis == 2) { A4 = vec4(s0, s1, -1.0, s2);  B4 = vec4(s0, s1,  1.0, s2); }
      else                { A4 = vec4(s0, s1, s2, -1.0);  B4 = vec4(s0, s1, s2,  1.0); }

      vec4 p4 = mix(A4, B4, along);

      // 4D rotation in the XW plane — primary tesseract motion.
      float ang1 = uTime * 0.45;
      float c1 = cos(ang1), n1 = sin(ang1);
      float xN = c1 * p4.x - n1 * p4.w;
      float wN = n1 * p4.x + c1 * p4.w;
      p4.x = xN;
      p4.w = wN;

      // Secondary 4D rotation in the YZ plane — adds tumble so
      // the projection never repeats too quickly.
      float ang2 = uTime * 0.22;
      float c2 = cos(ang2), n2 = sin(ang2);
      float yN = c2 * p4.y - n2 * p4.z;
      float zN = n2 * p4.y + c2 * p4.z;
      p4.y = yN;
      p4.z = zN;

      // Perspective-project 4D → 3D.  As w → +d the projection
      // shrinks (inner cube); as w → -d it swells (outer cube).
      float d      = 3.0;
      float factor = d / (d - p4.w);
      vec3  pos    = p4.xyz * factor;

      // Final scale into world units + subtle thickness jitter.
      pos *= size * 0.40;
      pos += (sy - 0.5) * 0.04;
      return pos;
    }
    if (shape == 15) {
      // 3D CUBE — particles on the 6 faces of a cube.  sz picks
      // which face (0..5 via floor(sz*6)); sx/sy parametrise the
      // 2D position on that face (-1..1 → ±size).  Each face gets
      // ~count/6 particles, producing a clearly-readable hollow
      // box silhouette that tumbles in 3D (see useFrame).
      int face = int(sz * 6.0);
      float u  = sx * 2.0 - 1.0;
      float v  = sy * 2.0 - 1.0;
      float s  = size;
      vec3 pos;
      if      (face == 0) pos = vec3( s,   u*s, v*s); // +X
      else if (face == 1) pos = vec3(-s,   u*s, v*s); // -X
      else if (face == 2) pos = vec3(u*s,  s,   v*s); // +Y
      else if (face == 3) pos = vec3(u*s, -s,   v*s); // -Y
      else if (face == 4) pos = vec3(u*s,  v*s,  s);  // +Z
      else                pos = vec3(u*s,  v*s, -s);  // -Z
      return pos;
    }
    return vec3(0.0);
  }

  void main() {
    mat3 instRotScale   = mat3(instanceMatrix[0].xyz,
                               instanceMatrix[1].xyz,
                               instanceMatrix[2].xyz);
    vec3 instTranslation = instanceMatrix[3].xyz;

    float origY    = instTranslation.y;
    float wrappedY = mod(origY - uTime * uFallSpeed + uColHeight * 0.5,
                         uColHeight) - uColHeight * 0.5;
    vec3  colPos   = vec3(instTranslation.x, wrappedY, instTranslation.z);
    float FADE_DIST = 1.2;
    float dTop      = uColHeight * 0.5 - wrappedY;
    float dBot      = wrappedY + uColHeight * 0.5;
    float colFade   = clamp(min(dTop, dBot) / FADE_DIST, 0.0, 1.0);

    float diam  = uColRadius * 2.0;
    float seedX = (instTranslation.x + uColRadius) / diam;
    float seedY = (instTranslation.y + uColHeight * 0.5) / uColHeight;
    float seedZ = (instTranslation.z + uColRadius) / diam;

    vec3  posA;
    float fadeA;
    if (uShapeA == 0) { posA = colPos; fadeA = colFade; }
    else { posA = shapePos(uShapeA, seedX, seedY, seedZ, uSizeA); fadeA = 1.0; }

    vec3  posB;
    float fadeB;
    if (uShapeB == 0) { posB = colPos; fadeB = colFade; }
    else { posB = shapePos(uShapeB, seedX, seedY, seedZ, uSizeB); fadeB = 1.0; }

    float k         = ss(uMorphT);
    vec3  finalPos  = mix(posA, posB, k);
    float edgeFade  = mix(fadeA, fadeB, k);
    vEdgeFade = edgeFade;

    // ── PER-PARTICLE SCATTER (cube → star transition) ──────
    // When uScatter > 0 each particle flies off LEFT on its own
    // per-instance trajectory (seedY drives the X distance →
    // earlier ones outrun later ones; seedZ drives the vertical
    // spread; seedX drives a small Z depth spread).  The shape
    // morph (uMorphT) still progresses in the background — by
    // the time uScatter returns to 0 the particles snap back to
    // their new home-shape position (the star).  Result: cube
    // dismantles, particles drift left off-screen, then
    // individual particles return and assemble into the star.
    if (uScatter > 0.001) {
      vec3 scatterDir = vec3(
        -7.0 - seedY * 9.0,         // X: strongly negative, varies per-instance
        (seedZ - 0.5) * 4.5,        // Y: vertical spread
        (seedX - 0.5) * 1.6         // Z: small depth spread
      );
      finalPos += scatterDir * uScatter;
    }


    vec3 finalCentreWorld = (modelMatrix * vec4(finalPos, 1.0)).xyz;
    vec3 toCenter = finalCentreWorld - uMousePos;
    float d       = length(toCenter);
    float falloff = exp(-d * d * 0.8);
    float strength = falloff * uHover;
    vec3 push  = normalize(toCenter + vec3(1e-4)) * strength * 2.5;
    push.z    += strength * 0.9;

    vec3 vertexLocal   = instRotScale * position;
    vec3 finalModelPos = vertexLocal + finalPos;
    vec4 worldPos      = modelMatrix * vec4(finalModelPos, 1.0);
    worldPos.xyz      += push;

    vNormalW = normalize(mat3(modelMatrix) * instRotScale * normal);
    vFade    = 1.0 + strength * 0.7;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;
const TRAVEL_INSTANCE_FRAG = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormalW;
  uniform float uVisibility; // 0 = particles hidden (per-waypoint flag)
  varying float vFade;
  varying float vEdgeFade;

  void main() {
    // Two-light Lambert + a small ambient term — fakes shading
    // cheaply so the FBX silhouettes read as 3D instead of flat.
    vec3 L1 = normalize(vec3( 0.4,  0.9,  0.6));
    vec3 L2 = normalize(vec3(-0.5, -0.3,  0.8));
    float k1 = max(0.0, dot(vNormalW, L1)) * 0.75;
    float k2 = max(0.0, dot(vNormalW, L2)) * 0.35;
    float ambient = 0.35;
    vec3 col = uColor * (ambient + k1 + k2) * vFade;
    // Final alpha = base × edge fade × per-waypoint visibility.
    // uVisibility lerps to 0 at any waypoint flagged hidden:true
    // (currently the Students Learn waypoint — particles only
    // become visible again as the user scrolls into Cert).
    gl_FragColor = vec4(col, uOpacity * vEdgeFade * uVisibility);
  }
`;

/* Per-waypoint shape + size — indices match TRAVEL_WAYPOINTS order. */
const WP_SHAPES = [
  { id: 0,  size: 2.6 }, //  0 Hero               column
  { id: 1,  size: 2.4 }, //  1 Why AI              disc
  { id: 15, size: 0.7 }, //  2 Start Young         3D cube (small, top-left)
  { id: 22, size: 2.2 }, //  3 Students Learn      4-petal flower
  { id: 1, size: 0.5, hidden: true }, //  4 Certificates  (hidden — just travels through)
  { id: 5,  size: 1.5 }, //  5 Future Careers      starburst (smaller still)
  { id: 23, size: 2.2 }, //  6 Competitions        trophy
  { id: 24, size: 2.2 }, //  7 Career Pathway      growth arrow w/ steps
  // 8 Associated — minimal LIGHT TRAIL travelling through.
  // Tall sparse vertical column + visibility:0.35 so the few
  // particles read as a faint trail rather than a solid shape.
  { id: 29, size: 1.4, visibility: 0.35 },
  // 9 Vetted By — disc sized to fill the bg HUD ring.  wMul/hMul
  // grow the canvas wrap so the 3.2-radius disc isn't clipped at
  // the wrap edges (default 460×800 was too narrow).
  { id: 1, size: 3.2, wMul: 1.6, hMul: 1.1 },
  { id: 28, size: 1.8 }, // 10 Modes to Join       7-pt spiky star (top-right)
  { id: 26, size: 1.8 }, // 11 Student Projects    hourglass (top-left)
  { id: 19, size: 1.6 }, // 12 Project Impact      tesseract (top-right)
  { id: 25, size: 2.4 }, // 13 FAQ                 question mark
  { id: 1, size: 0.5, hidden: true }, // 14 CTA               (hidden)
  { id: 1, size: 0.5, hidden: true }, // 15 Other Programs    (hidden)
];

const AiTravelParticles = ({ count = 1800, progressRef }) => {
  const meshRef      = useRef(null);
  const groupRef     = useRef(null);
  const hoverTarget  = useRef(0);
  const hoverCurrent = useRef(0);
  const mouseTarget  = useRef(new THREE.Vector3(99, 99, 99));
  const mouseCurrent = useRef(new THREE.Vector3(99, 99, 99));
  const morphCurrent = useRef(0); // smoothed global progress 0→(N-1)
  const spinZ        = useRef(0);
  // Cube tumble — Y rotation + X tilt, only active while shape
  // 15 is the dominant waypoint shape.  Decays back to 0 on
  // either side so neighbour shapes sit upright.
  const cubeYaw      = useRef(0);
  const cubeTilt     = useRef(0);
  // Per-waypoint visibility — lerps to 0 at any WP_SHAPES entry
  // flagged hidden:true (e.g. Students Learn).  Drives uVisibility.
  const visCurrent   = useRef(1);

  const COL_R      = 2.6;
  const COL_H      = 13.5;
  const FALL_SPEED = 0.95;

  const fbxScene = useFBX(ai123FbxUrl);
  const baseGeometry = useMemo(() => {
    let geom = null;
    fbxScene.traverse((obj) => {
      if (obj.isMesh && obj.geometry && !geom) geom = obj.geometry.clone();
    });
    if (!geom) return new THREE.IcosahedronGeometry(0.09, 0);
    geom.computeBoundingBox();
    const size = new THREE.Vector3();
    geom.boundingBox.getSize(size);
    const s = 0.10 / (Math.max(size.x, size.y, size.z) || 1);
    geom.scale(s, s, s);
    geom.computeBoundingBox();
    const c = new THREE.Vector3();
    geom.boundingBox.getCenter(c);
    geom.translate(-c.x, -c.y, -c.z);
    return geom;
  }, [fbxScene]);

  const matrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    const arr   = new Float32Array(count * 16);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r     = COL_R * Math.sqrt(Math.random());
      dummy.position.set(
        r * Math.cos(angle),
        (Math.random() - 0.5) * COL_H,
        r * Math.sin(angle),
      );
      dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );
      dummy.updateMatrix();
      dummy.matrix.toArray(arr, i * 16);
    }
    return arr;
  }, [count, COL_R, COL_H]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uHover:     { value: 0 },
          uMousePos:  { value: new THREE.Vector3(99, 99, 99) },
          uColor:     { value: new THREE.Color("#5EC8FF") },
          uOpacity:   { value: 0.55 },
          uTime:      { value: 0 },
          uColHeight: { value: COL_H },
          uFallSpeed: { value: FALL_SPEED },
          uColRadius: { value: COL_R },
          uShapeA:    { value: 0 },
          uShapeB:    { value: 1 },
          uSizeA:     { value: 2.6 },
          uSizeB:     { value: 2.4 },
          uMorphT:    { value: 0 },
          uScatter:   { value: 0 },
          uVisibility:{ value: 1 },
        },
        vertexShader:   TRAVEL_V2_VERT,
        fragmentShader: TRAVEL_INSTANCE_FRAG,
        transparent: true,
        depthWrite:  false,
        depthTest:   true,
      }),
    [COL_H, FALL_SPEED, COL_R],
  );

  useEffect(() => {
    const im = meshRef.current;
    if (!im) return;
    const tmp = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      tmp.fromArray(matrices, i * 16);
      im.setMatrixAt(i, tmp);
    }
    im.instanceMatrix.needsUpdate = true;
  }, [matrices, count]);

  const { gl, camera } = useThree();
  useEffect(() => {
    const dom  = gl.domElement;
    const ndc  = new THREE.Vector2();
    const orig = new THREE.Vector3();
    const dir  = new THREE.Vector3();

    const onMove = (e) => {
      const rect = dom.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width)  *  2 - 1;
      ndc.y = ((e.clientY - rect.top)  / rect.height) * -2 + 1;
      orig.setFromMatrixPosition(camera.matrixWorld);
      dir.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(orig).normalize();
      if (Math.abs(dir.z) < 1e-4) return;
      const t = -orig.z / dir.z;
      if (t < 0) { hoverTarget.current = 0; return; }
      const hx = orig.x + dir.x * t;
      const hy = orig.y + dir.y * t;
      if (Math.abs(hx) > COL_R + 0.9) { hoverTarget.current = 0; return; }
      mouseTarget.current.set(hx, hy, 0);
      hoverTarget.current = 1;
    };
    const release = () => {
      hoverTarget.current = 0;
      mouseTarget.current.set(99, 99, 99);
    };
    dom.addEventListener("pointermove",  onMove);
    dom.addEventListener("pointerleave", release);
    dom.addEventListener("pointerout",   release);
    return () => {
      dom.removeEventListener("pointermove",  onMove);
      dom.removeEventListener("pointerleave", release);
      dom.removeEventListener("pointerout",   release);
    };
  }, [gl, camera]);

  useFrame((state, delta) => {
    const rawP = progressRef?.current ?? 0;
    // Bumped 0.065 → 0.11 so the shape morph keeps up with the
    // canvas-position lerp (was 0.16).  Matching lerp rates
    // prevent the shape from "lagging behind" the canvas during
    // fast scrolls, which read as a stutter at the seams.
    morphCurrent.current += (rawP - morphCurrent.current) * 0.11;

    const N       = WP_SHAPES.length;
    const clamped = Math.max(0, Math.min(N - 1.001, morphCurrent.current));
    const segIdx  = Math.floor(clamped);
    const segT    = clamped - segIdx;

    const shA = WP_SHAPES[Math.min(segIdx,     N - 1)];
    const shB = WP_SHAPES[Math.min(segIdx + 1, N - 1)];

    material.uniforms.uShapeA.value = shA.id;
    material.uniforms.uShapeB.value = shB.id;
    material.uniforms.uSizeA.value  = shA.size;
    material.uniforms.uSizeB.value  = shB.size;
    material.uniforms.uMorphT.value = segT;
    material.uniforms.uTime.value   = state.clock.elapsedTime;

    // Scatter pulse — only active on the Start-Young → Learn
    // segment (segIdx === 2).  sin(segT·π) is 0 at the two
    // anchors and 1 at the midpoint, so the cube dismantles, the
    // particles fly off left individually, then reassemble as
    // the star at the Students Learn anchor.  Pow(…, 1.6)
    // shapes the curve so the particles spend MORE time fully
    // dispersed and less time arcing through the morph.
    const scatterRaw = segIdx === 2 ? Math.sin(segT * Math.PI) : 0;
    material.uniforms.uScatter.value = Math.pow(scatterRaw, 1.6);

    // Per-waypoint visibility — hidden:true → 0 alpha; a numeric
    // `visibility` value (0..1) gives partial transparency
    // (e.g. 0.35 for the Associated light-trail).  Default 1.0.
    const visA = shA.hidden ? 0 : (shA.visibility ?? 1);
    const visB = shB.hidden ? 0 : (shB.visibility ?? 1);
    const targetVis = visA * (1 - segT) + visB * segT;
    visCurrent.current += (targetVis - visCurrent.current) * delta * 4.0;
    material.uniforms.uVisibility.value = visCurrent.current;

    // Shapes that look good rotating around Z:
    //   1  disc           8  ring          10  DNA helix
    // Column / blob / brain / neural-net / chip stay upright —
    // the blob (14) has its own noise-driven motion, the chip
    // (16) reads as a static tech silhouette, and cube (15) is
    // tumbled separately below.
    // 1 disc · 8 ring · 10 DNA · 11 star spin around Z.
    // Nerves (18) + tesseract (19) stay group-still — both
    // already animate per-particle via uTime in their own shape
    // code (strand pulses / 4D rotation respectively).
    // Shapes that rotate slowly around Z while we sit on them.
    //   1 disc · 22 4-petal flower
    const SPIN = new Set([1, 22]);
    const spinW = (SPIN.has(shA.id) ? 1 - segT : 0) + (SPIN.has(shB.id) ? segT : 0);
    // Spin while a spinning shape is dominant; decay back toward 0
    // while a non-spinning shape is dominant.  Without the decay
    // the accumulated rotation persists and the column reads as
    // slanted when the user scrolls back up into the hero.
    spinZ.current += delta * 0.18 * spinW;
    spinZ.current *= Math.pow(0.06, delta * (1.0 - spinW));

    // Cube tumble (shape 15) — slow Y yaw + a fixed X tilt so we
    // can see top, front, and side faces simultaneously.  Y yaw
    // is cube-only (the tesseract spins on Z via the SPIN block).
    const CUBE = new Set([15]);
    const cubeW = (CUBE.has(shA.id) ? 1 - segT : 0) + (CUBE.has(shB.id) ? segT : 0);
    cubeYaw.current  += delta * 0.30 * cubeW;
    cubeYaw.current  *= Math.pow(0.10, delta * (1.0 - cubeW));

    // Per-shape X-tilt — cube (15) tilts 0.45 rad to show 3 faces,
    // tesseract (19) tilts 0.5 rad so the outer / inner cubes read
    // as nested in depth rather than as concentric squares.  Other
    // shapes target 0 (the lerp pulls cubeTilt back to flat).
    const TILT_X = { 15: 0.45, 19: 0.28 };
    const tA = TILT_X[shA.id] ?? 0;
    const tB = TILT_X[shB.id] ?? 0;
    const targetTiltX = tA * (1 - segT) + tB * segT;
    cubeTilt.current += (targetTiltX - cubeTilt.current) * delta * 4.0;

    if (groupRef.current) {
      groupRef.current.rotation.z = spinZ.current;
      groupRef.current.rotation.y = cubeYaw.current;
      groupRef.current.rotation.x = cubeTilt.current;
    }

    hoverCurrent.current += (hoverTarget.current - hoverCurrent.current) * 0.10;
    mouseCurrent.current.lerp(mouseTarget.current, 0.16);
    material.uniforms.uHover.value = hoverCurrent.current;
    material.uniforms.uMousePos.value.copy(mouseCurrent.current);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[baseGeometry, material, count]}
        frustumCulled={false}
      />
    </group>
  );
};

/* =========================================================
   AI PARTICLE TRAVELER — fixed canvas that journeys through
   9 section waypoints as the user scrolls.  A RAF loop reads
   every anchor's viewport position each frame and derives a
   continuous global progress 0→8; the same value feeds the
   particle shader so shape and position are always in sync.
   Bidirectional: scrolling back up retraces the exact path.
   Canvas position follows a Catmull-Rom spline through the
   anchor centres for naturally curvy travel between sections.
========================================================= */
const TRAVEL_WAYPOINTS = [
  ".ai-hero-stage",     //  0 Hero
  ".ai-why-stage",      //  1 Why AI
  ".ai-start-stage",    //  2 Start Young
  ".ai-learn-stage",    //  3 Students Learn
  ".ai-cert-stage",     //  4 Certificates (hidden)
  ".ai-careers-stage",  //  5 Future Careers
  ".ai-comp-stage",     //  6 Competitions
  ".ai-pathway-stage",  //  7 Career Pathway
  ".ai-assoc-stage",    //  8 Associated (hidden)
  ".ai-vetted-stage",   //  9 Vetted By
  ".ai-modes-stage",    // 10 Modes to Join
  ".ai-projects-stage", // 11 Student Projects (hidden)
  ".ai-impact-stage",   // 12 Project Impact
  ".ai-faq-stage",      // 13 FAQ
  ".ai-cta-stage",      // 14 CTA (hidden)
  ".ai-explore-stage",  // 15 Other Programs (hidden)
];

const AiParticleTraveler = () => {
  const wrapRef     = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let curX = null, curY = null;
    const N = TRAVEL_WAYPOINTS.length;

    const lerp  = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    // Catmull-Rom interpolation for smooth curvy canvas path.
    const cmr = (p0, p1, p2, p3, t) => {
      const t2 = t * t, t3 = t2 * t;
      return 0.5 * (2*p1 + (-p0+p2)*t + (2*p0-5*p1+4*p2-p3)*t2 + (-p0+3*p1-3*p2+p3)*t3);
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const wrap = wrapRef.current;
      if (!wrap) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Base wrap size — most waypoints use this verbatim.  The
      // hero anchor offset just below uses baseW (resolution
      // independent — same alignment on 1080p and 4K).  W/H are
      // derived per-waypoint AFTER we know segIdx/segT so each
      // waypoint can request a wider or taller canvas via its
      // own wMul/hMul in WP_SHAPES (e.g. Cert opens it up wide
      // so the asteroid float fills the entire section).
      const baseW = Math.min(460, vw * 0.36);
      const baseH = Math.min(800, vh * 0.95);
      let W = baseW;
      let H = baseH;

      const pts = TRAVEL_WAYPOINTS.map((sel, i) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        let cx = r.left + r.width * 0.5;
        let cy = r.top + r.height * 0.5;
        // Hero (index 0) — nudge right so the falling column sits
        // OVER the background lighting beam (which prints slightly
        // right of the canvas centre).  Catmull-Rom will feather
        // this offset back to 0 as we transition to waypoint 1.
        if (i === 0) cx += baseW * 0.18;
        return { x: cx, y: cy };
      });

      if (!pts[0]) return;

      // Global progress 0→(N-1): progress = i when anchor[i] is at
      // vh/2 (viewport centre).  Natural bidirectional — scrolling up
      // moves anchors down → progress decreases automatically.
      const mid = vh * 0.5;
      let rawP = 0;

      if (pts[0] && pts[0].y >= mid) {
        rawP = 0;
      } else if (pts[N-1] && pts[N-1].y <= mid) {
        rawP = N - 1;
      } else {
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          if (!a || !b) continue;
          if (a.y <= mid && b.y >= mid) {
            const span = b.y - a.y;
            rawP = i + (span > 0 ? clamp((mid - a.y) / span, 0, 1) : 0);
            break;
          }
        }
      }
      // (Deadzone snap removed — it was causing a "stuck" feel
      // when scrolling slowly near a waypoint.  rawP now stays a
      // continuous float; the Catmull-Rom + smooth-follow lerp
      // below handle position interpolation seamlessly without
      // any abrupt locks.  Slight off-anchor hover on stop is
      // accepted as the trade-off for buttery travel.)
      progressRef.current = rawP;

      // Canvas target via Catmull-Rom through waypoint centres.
      const segIdx = Math.floor(clamp(rawP, 0, N - 1.001));
      const segT   = rawP - segIdx;

      // Per-waypoint wrap-size lerp.  WP_SHAPES entries can carry
      // optional wMul / hMul; missing ones default to 1.  Capped
      // to viewport so the wrap can't overflow horizontally.
      const wA = WP_SHAPES[Math.min(segIdx,     N - 1)];
      const wB = WP_SHAPES[Math.min(segIdx + 1, N - 1)];
      const wMul = (wA.wMul ?? 1) * (1 - segT) + (wB.wMul ?? 1) * segT;
      const hMul = (wA.hMul ?? 1) * (1 - segT) + (wB.hMul ?? 1) * segT;
      W = Math.min(baseW * wMul, vw * 0.96);
      H = Math.min(baseH * hMul, vh * 0.92);

      const p1 = pts[segIdx];
      const p2 = pts[Math.min(segIdx + 1, N - 1)];
      const p0 = pts[Math.max(segIdx - 1, 0)];
      const p3 = pts[Math.min(segIdx + 2, N - 1)];

      let tx, ty;
      if (p0 && p1 && p2 && p3) {
        tx = cmr(p0.x, p1.x, p2.x, p3.x, segT);
        ty = cmr(p0.y, p1.y, p2.y, p3.y, segT);
      } else if (p1 && p2) {
        tx = lerp(p1.x, p2.x, segT);
        ty = lerp(p1.y, p2.y, segT);
      } else {
        tx = p1?.x ?? 0;
        ty = p1?.y ?? 0;
      }

      // ── Start Young (2) → Students Learn (3) PATH OVERRIDE ──
      // The canvas must NOT arc downward toward the Learn anchor
      // mid-transition (that'd drag the dismantled cube into the
      // Learn section's cards behind the content stack).  Instead:
      //   • first half:  Y locked at Start Young's anchor Y;
      //                  X slides LEFT to off-screen
      //   • second half: Y snaps to Learn's anchor Y while the
      //                  canvas is OFF-screen-left (invisible);
      //                  X slides BACK in from off-screen-left
      //                  to land at the Learn anchor
      // The curX/curY lerp below then smooths each phase further.
      if (segIdx === 2 && pts[2] && pts[3]) {
        const startX = pts[2].x;
        const startY = pts[2].y;
        const learnX = pts[3].x;
        const learnY = pts[3].y;
        const offX   = -W * 0.6; // canvas left edge at screen-left

        if (segT < 0.5) {
          // EXIT phase — Y pinned, X slides left to off-screen
          tx = lerp(startX, offX, segT * 2);
          ty = startY;
        } else {
          // ARRIVAL phase — Y is now Learn, X slides in from
          // off-screen left.  Y change happens at segT = 0.5
          // when canvas is off-screen left (hidden), so the
          // jump is invisible.
          tx = lerp(offX, learnX, (segT - 0.5) * 2);
          ty = learnY;
        }
      }

      if (curX === null) { curX = tx; curY = ty; }
      // Smooth-follow lerp bumped 0.10 → 0.16 so the canvas keeps
      // pace with even fast scrolls — eliminates the brief "lag"
      // that read as a stutter when transitioning between waypoints.
      curX = lerp(curX, tx, 0.16);
      curY = lerp(curY, ty, 0.16);

      // W / H already computed at the top of tick for the
      // per-waypoint offsets above.
      wrap.style.width  = `${W}px`;
      wrap.style.height = `${H}px`;
      wrap.style.left   = `${curX - W / 2}px`;
      wrap.style.top    = `${curY - H / 2}px`;
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="ai-particle-traveler"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 0, height: 0,
        pointerEvents: "none",
        zIndex: 12,
      }}
    >
      <Canvas
        {...canvasPerf}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        camera={{ position: [0, 0, 15], fov: 38, near: 0.1, far: 100 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <AiTravelParticles progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

/* =========================================================
   CERTIFICATES (section 6)
========================================================= */

const Certificates = () => (
  <section className="cert-section cert-section--robotics cert-section--ai">
    <div className="ai-cert-stage" aria-hidden="true" />
    <div className="ai-section-fade-top" aria-hidden="true" />
    <div className="ai-section-fade-bot" aria-hidden="true" />
    <div className="cert-robotics-inner container">
      {/* LEFT — title + bulleted points (white on the dark hand backdrop) */}
      <div className="cert-robotics-text">
        <h2 className="cert-robotics-title prog-section-title">CERTIFICATES</h2>
        <p>Students receive an artificial intelligence certificate recognising hands-on skills, learning progress, and AI course completion.</p>
      </div>

      {/* RIGHT — static fanned stack of 3 certificates floating above
          the glowing data-hand baked into the section background. */}
      <div className="cert-robotics-stage cert-ai-stage">
        <div className="cert-ai-stack">
          <img className="cert-ai-card cert-ai-card--1" src={aiCertificateImg} alt="" aria-hidden="true" loading="lazy" />
          <img className="cert-ai-card cert-ai-card--2" src={aiCertificateImg} alt="" aria-hidden="true" loading="lazy" />
          <img className="cert-ai-card cert-ai-card--3" src={aiCertificateImg} alt="LOF AI certificate" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);


/* =========================================================
   WHY SPACE FOR FUTURE CAREERS (section 7)
========================================================= */

const CAREER_SKILLS = [
  { label: "AI Engineering", img: codingImg },
  { label: "Data Science", img: aiImg },
  { label: "Machine Learning", img: electronicsImg },
  { label: "AI Product Management", img: engineeringImg },
  { label: "AI Research", img: dataImg },
  { label: "Robotics & AI", img: designingImg },
  { label: "Generative AI", img: researchImg },
];

const WhySpaceForCareers = () => (
  <section className="careers-section careers-section--robotics">
    <div className="ai-careers-stage" aria-hidden="true" />
    <div className="ai-section-fade-top" aria-hidden="true" />
    <div className="ai-section-fade-bot" aria-hidden="true" />
    <div className="container">
      <h2 className="careers-title prog-section-title">
        WHY AI FOR{" "}
        <span className="careers-title-badge">FUTURE CAREERS?</span>
      </h2>
      <p className="careers-sub">Healthcare. Finance. Robotics. Defence. Education. These are the industries where AI skills for future jobs are not optional — they are essential. Across the UAE, demand for AI professionals is growing faster than any other technology sector. Strong AI education today is direct career preparation for the world that already exists.</p>
      <p className="projects-desc">AI education builds the skills powering the next generation of technology careers.</p>

      <div className="careers-skills-grid">
        {/* Row 1 — 4 cards */}
        <div className="careers-row">
          {CAREER_SKILLS.slice(0, 4).map((skill) => (
            <article className="careers-skill-card" key={skill.label}>
              <img
                className="careers-skill-img"
                src={skill.img}
                alt={skill.label}
              />
              <span className="careers-skill-label">{skill.label}</span>
            </article>
          ))}
        </div>

        {/* Row 2 — 3 cards, centered */}
        <div className="careers-row">
          {CAREER_SKILLS.slice(4).map((skill) => (
            <article className="careers-skill-card" key={skill.label}>
              <img
                className="careers-skill-img"
                src={skill.img}
                alt={skill.label}
              />
              <span className="careers-skill-label">{skill.label}</span>
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
    title: "AI Olympiads",
    desc: "AI Olympiad Events testing logic, model building, and problem-solving.",
  },
  {
    icon: olympiadIcon,
    title: "Dubai Tech Competitions",
    desc: "Dubai Youth Tech Represent your school at Dubai tech competitions with AI.",
  },
  {
    icon: portfolioIcon,
    title: "UAE AI Challenges",
    desc: "UAE AI Challenges Compete in national UAE AI innovation challenges.",
  },
  {
    icon: recognitionIcon,
    title: "Global AI Competitions",
    desc: "International Events Qualify and compete on global AI stages.",
  },
];

const Competitions = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="competitions-section competitions-section--robotics">
    <div className="ai-comp-stage" aria-hidden="true" />
    <div className="competitions-inner container">
      <div className="competitions-left">
        <div className="competitions-heading">
          <h2 className="competitions-label-text">
            <span className="competitions-label-badge">COMPETITIONS</span>
          </h2>
          <p className="competitions-subtitle prog-section-subtitle">
            Showcase Your AI & Data Science Skills By Building Intelligent Models, Analyzing Real-World Data, And Solving Meaningful Challenges. Apply Your Knowledge Through Hands-On Projects, Develop Critical Analytical And Problem-Solving Abilities, And Gain Recognition For Your Innovation, Technical Expertise, And Data-Driven Solutions Demonstrated In Every Project You Complete.
          </p>
          <button
          type="button"
          className="glass-btn glass-btn--light header-btn"
          style={{ marginTop: "var(--space-s)" }}
          onClick={openEnquiry}
        >
          ENROLL NOW
        </button>
        </div>
      </div>
      <div className="competitions-right">
        <div className="competitions-grid">
          {COMPETITION_ITEMS.map((item) => (
            <article
              className="comp-card-outer"
              key={item.title}
            >
              <div className="comp-card-icon">
                <img src={item.icon} alt="" />
              </div>
              <div className="comp-card-inner">
                <h3 className="comp-card-title">{item.title}</h3>
                <p className="comp-card-desc">{item.desc}</p>
              </div>
            </article>
          ))}
          {/* <div className="comp-skull-center">
            <img src={skullIcon} alt="" />
          </div> */}
        </div>
      </div>
    </div>
  </section>
  );
};

/* =========================================================
   CAREER PATHWAYS — FAQ ACCORDION (section 9)
========================================================= */


const FAQ_ITEMS = [
  {
    q: "AI Engineer",
    a: "AI engineers design, build, and optimise intelligent systems across healthcare, logistics, finance, and smart city infrastructure. Across the UAE, demand for AI engineering talent is accelerating, making this one of the most future-proof AI career paths for students today.",
  },
  {
    q: "Data Scientist",
    a: "Data scientists analyse large datasets to help organisations make smarter decisions. From predicting consumer behaviour to identifying patterns in medical research, data science sits at the intersection of AI, mathematics, and real-world problem-solving — and the UAE is actively investing in this talent.",
  },
  {
    q: "AI Product Manager",
    a: "AI product managers bridge technical AI development and real-world business application. They define how AI systems are built, what problems they solve, and how they reach the market, making this one of the most strategic and well-compensated roles in the technology industry today.",
  },
  {
    q: "AI Researcher",
    a: "AI researchers push the boundaries of what intelligent systems can achieve. From advancing natural language processing to developing computer vision and autonomous decision-making, research roles exist across universities, government bodies, and leading technology companies throughout the UAE and globally.",
  },
  {
    q: "AI & Robotics Engineer",
    a: "AI and robotics engineers combine artificial intelligence with physical systems to build autonomous machines used in manufacturing, healthcare, defence, and space exploration. This pathway merges two of the most powerful technologies of our time into one deeply rewarding career direction.",
  },
];



const CareerPathways = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="career-pathways-section career-pathways-section--robotics">
      <div className="ai-pathway-stage" aria-hidden="true" />
      <div className="container">
        <h2 className="career-pathways-title">
          <span className="career-pathways-badge">CAREER</span> PATHWAYS
        </h2>
                  <p>AI learning opens pathways into engineering, data science, research, product development, robotics, and the AI careers defining the next decade.</p>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`faq-item${openIdx === i ? " is-open" : ""}`}
            >
              <button
                className="faq-q-outer"
                type="button"
                aria-expanded={openIdx === i}
                onClick={() => toggle(i)}
              >
                <div className="faq-q-inner">
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-q-arrow">▼</span>
                </div>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-body">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   WHO ARE WE ASSOCIATED WITH
========================================================= */

// positions are in the same 1044 x 470 coordinate space as the SVG below,
// expressed as % so boxes and connector lines line up exactly
const ASSOC_TOP_Y = 13.3; // % (frame centre)
const ASSOC_BOTTOM_Y = 84.3;
// Partner detail data — drives the click-to-open modal.
const ASSOC_TOP = [
  {
    logo: assocLogo1,
    x: 15.8,
    name: "ISRO",
    fullName: "Indian Space Research Organisation",
    location: "Bengaluru, India",
    website: "https://www.isro.gov.in",
    websiteLabel: "www.isro.gov.in",
    established: "1969",
    description:
      "India's national space agency, building satellites, launch vehicles, and landmark planetary missions like Chandrayaan and Mangalyaan.",
    stats: [
      { icon: FaRocket, label: "Missions", value: "120+", sub: "Spacecraft Missions" },
      { icon: FaUsers, label: "Team", value: "16K+", sub: "Scientists & Engineers" },
      { icon: FaGlobe, label: "Focus Areas", value: "5+", sub: "Launch, Satellites, Planetary & More" },
    ],
  },
  {
    logo: assocLogo2,
    x: 39.3,
    name: "Azercosmos",
    fullName: "Azerbaijan's National Space Agency",
    location: "Baku, Azerbaijan",
    website: "https://azercosmos.az",
    websiteLabel: "azercosmos.az",
    established: "2010",
    description:
      "The first satellite operator in the South Caucasus, delivering telecommunications and Earth-observation services through its Azerspace and Azersky satellites.",
    stats: [
      { icon: FaRocket, label: "Satellites", value: "3+", sub: "In-orbit Satellites" },
      { icon: FaUsers, label: "Coverage", value: "Global", sub: "Telecom & Imagery" },
      { icon: FaGlobe, label: "Focus Areas", value: "2+", sub: "Telecom & Earth Observation" },
    ],
  },
  {
    logo: assocLogo3,
    x: 60.9,
    name: "AIAA",
    fullName: "American Institute of Aeronautics and Astronautics",
    location: "Reston, Virginia, USA",
    website: "https://www.aiaa.org",
    websiteLabel: "www.aiaa.org",
    established: "1963",
    description:
      "The world's largest aerospace technical society — \"The World's Forum for Aerospace Leadership\" — advancing the profession through events, publications, and standards.",
    stats: [
      { icon: FaUsers, label: "Members", value: "30K+", sub: "Aerospace Professionals" },
      { icon: FaGlobe, label: "Countries", value: "90+", sub: "Members Worldwide" },
      { icon: FaRocket, label: "Focus Areas", value: "8+", sub: "Aeronautics, Astronautics & More" },
    ],
  },
  {
    logo: assocLogo4,
    x: 84.3,
    name: "Roscosmos",
    fullName: "State Space Corporation Roscosmos",
    location: "Moscow, Russia",
    website: "https://www.roscosmos.ru",
    websiteLabel: "www.roscosmos.ru",
    established: "1992",
    description:
      "Russia's state space corporation — leading human spaceflight, launch services, and deep-space exploration, and a key partner on the International Space Station.",
    stats: [
      { icon: FaRocket, label: "Launches", value: "150+", sub: "Orbital Launches" },
      { icon: FaUsers, label: "Team", value: "12K+", sub: "Engineers & Cosmonauts" },
      { icon: FaGlobe, label: "Focus Areas", value: "4+", sub: "Launch, ISS, Research & More" },
    ],
  },
];
const ASSOC_BOTTOM = [
  {
    logo: assocLogo5,
    x: 27.8,
    name: "NASA",
    fullName: "National Aeronautics and Space Administration",
    location: "Washington, D.C., USA",
    website: "https://www.nasa.gov",
    websiteLabel: "www.nasa.gov",
    established: "1958",
    description:
      "NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.",
    stats: [
      { icon: FaRocket, label: "Missions", value: "300+", sub: "Successful Missions" },
      { icon: FaUsers, label: "Team", value: "18K+", sub: "Scientists & Engineers" },
      { icon: FaGlobe, label: "Focus Areas", value: "5+", sub: "Space, Earth, Science, Tech & More" },
    ],
  },
  {
    logo: assocLogo6,
    x: 50,
    name: "Aero Club of India",
    fullName: "The Aero Club of India",
    location: "New Delhi, India",
    website: "https://aeroclubofindia.in",
    websiteLabel: "aeroclubofindia.in",
    established: "1927",
    description:
      "The apex body for sport aviation and flying clubs across India, promoting aviation, pilot training, and aeromodelling since 1927.",
    stats: [
      { icon: FaUsers, label: "Flying Clubs", value: "30+", sub: "Across India" },
      { icon: FaRocket, label: "Since", value: "1927", sub: "Apex Aviation Body" },
      { icon: FaGlobe, label: "Focus Areas", value: "3+", sub: "Aviation, Training & Sport Flying" },
    ],
  },
  {
    logo: assocLogo7,
    x: 72.3,
    name: "ALTEC",
    fullName: "Aerospace Logistics Technology Engineering Company",
    location: "Turin, Italy",
    website: "https://www.altecspace.it",
    websiteLabel: "www.altecspace.it",
    established: "2001",
    description:
      "Provides engineering and logistics services supporting International Space Station operations and planetary exploration, including Mars rover mission support.",
    stats: [
      { icon: FaRocket, label: "Programs", value: "20+", sub: "Space Programs" },
      { icon: FaUsers, label: "Team", value: "150+", sub: "Engineers & Specialists" },
      { icon: FaGlobe, label: "Focus Areas", value: "3+", sub: "ISS, Mars & Operations" },
    ],
  },
];

const AssocBox = ({ partner, y, onSelect }) => (
  <button
    type="button"
    className="assoc-box"
    style={{ left: `${partner.x}%`, top: `${y}%` }}
    onClick={() => onSelect(partner)}
    aria-label={`View details for ${partner.name}`}
  >
    <div className="assoc-box-frame">
      <img
        className="assoc-box-logo"
        src={partner.logo}
        alt={partner.name || "Associated organisation"}
      />
    </div>
    <img
      className="assoc-box-light"
      src={assocLightRobotics}
      alt=""
      aria-hidden="true"
    />
  </button>
);

/* Partner detail modal — same layout as the other program pages, AI-themed
   via the .assoc-modal--ai modifier (it's portaled to <body>). */
const AssocPartnerModal = ({ partner, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!partner) return null;

  return createPortal(
    <div className="assoc-modal-overlay" onClick={onClose}>
      <div
        className="assoc-modal assoc-modal--ai"
        role="dialog"
        aria-modal="true"
        aria-label={partner.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="assoc-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FaXmark />
        </button>

        <div className="assoc-modal-grid">
          <div className="assoc-modal-left">
            <h3 className="assoc-modal-name">{partner.name}</h3>
            <p className="assoc-modal-fullname">{partner.fullName}</p>

            <span className="assoc-modal-divider" aria-hidden="true" />

            <ul className="assoc-modal-meta">
              <li>
                <FaLocationDot aria-hidden="true" />
                <span>{partner.location}</span>
              </li>
              <li>
                <FaGlobe aria-hidden="true" />
                <a href={partner.website} target="_blank" rel="noreferrer">
                  {partner.websiteLabel}
                </a>
              </li>
              <li>
                <FaCalendarDays aria-hidden="true" />
                <span>Established: {partner.established}</span>
              </li>
            </ul>

            <p className="assoc-modal-desc">{partner.description}</p>

            <a
              className="assoc-modal-btn"
              href={partner.website}
              target="_blank"
              rel="noreferrer"
            >
              <FaRocket aria-hidden="true" />
              Visit Website
            </a>
          </div>

          <div className="assoc-modal-right">
            <div className="assoc-modal-image">
              {partner.image ? (
                <img src={partner.image} alt={partner.name} />
              ) : (
                <img
                  className="assoc-modal-image-logo"
                  src={partner.logo}
                  alt=""
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="assoc-modal-stats">
              {partner.stats?.map((s) => {
                const Icon = s.icon;
                return (
                  <div className="assoc-modal-stat" key={s.label}>
                    <span className="assoc-modal-stat-head">
                      <Icon aria-hidden="true" />
                      {s.label}
                    </span>
                    <span className="assoc-modal-stat-value">{s.value}</span>
                    <span className="assoc-modal-stat-sub">{s.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const Associated = () => {
  const [active, setActive] = useState(null);

  return (
  <section className="assoc-section assoc-section--robotics">
    <div className="ai-assoc-stage" aria-hidden="true" />
    <div className="ai-section-fade-top" aria-hidden="true" />
    <div className="ai-section-fade-bot" aria-hidden="true" />
    {/* scattered blinking star dots in the backdrop */}
    <div className="assoc-blink-stars" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <i key={i} />
      ))}
    </div>

    <h2 className="assoc-title prog-section-title">
      WHO ARE WE{" "}
      <span className="assoc-title-badge">ASSOCIATED</span> WITH
    </h2>
    <p className="prog-section-subtitle">Backed by the Best. Trusted by Thousands.</p>

    <div className="assoc-tree">
      {/* connector lines — same 1044 x 470 space as the box positions */}
      <svg
        className="assoc-lines"
        viewBox="0 0 1044 540"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* top: drop from below each box's glow → horizontal bus → centre */}
        <path d="M165 174 V210" />
        <path d="M410 174 V210" />
        <path d="M636 174 V210" />
        <path d="M880 174 V210" />
        <path d="M165 210 H880" />
        <path d="M522 210 V250" />
        {/* bottom: centre → bus → up into each box */}
        <path d="M522 310 V360" />
        <path d="M290 360 H755" />
        <path d="M290 360 V412" />
        <path d="M522 360 V412" />
        <path d="M755 360 V412" />
      </svg>

      {ASSOC_TOP.map((b, i) => (
        <AssocBox key={`t${i}`} partner={b} y={ASSOC_TOP_Y} onSelect={setActive} />
      ))}

      <div className="assoc-center-box" style={{ left: "50%", top: "51.8%" }}>
        <img src={lofLogo} alt="Lab of Future" />
      </div>

      {ASSOC_BOTTOM.map((b, i) => (
        <AssocBox key={`b${i}`} partner={b} y={ASSOC_BOTTOM_Y} onSelect={setActive} />
      ))}
    </div>

    {active && (
      <AssocPartnerModal partner={active} onClose={() => setActive(null)} />
    )}
  </section>
  );
};

/* =========================================================
   VETTED BY
========================================================= */

const VETTED = [
  {
    img: vettedGeorge,
    name: "George Salazar",
    role: "Ex. NASA Engineer",
  },
  {
    img: vettedMadison,
    name: "Madison C. Feehan",
    role: "Ex. NASA Engineer",
  },
  {
    img: vettedDavid,
    name: "David A Barnhart",
    role: "Ex. NASA Engineer",
  },
  {
    img: vettedVitali,
    name: "Vitali Braun",
    role: "European Space Agency",
  },
];

const VettedBy = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`vetted-section vetted-section--robotics${
        inView ? " vetted-section--in" : ""
      }`}
    >
      <div className="ai-vetted-stage" aria-hidden="true" />
      <div className="ai-section-fade-top" aria-hidden="true" />
      <div className="ai-section-fade-bot" aria-hidden="true" />
        {/* Title badge — right column, floats over the ring artwork */}
        <div className="vetted-right">
          <h2 className="vetted-title prog-section-title">
            <span className="vetted-title-badge">VETTED</span> BY
          </h2>
        </div>
      <div className="vetted-inner container">
        {/* 2×2 team grid — left column */}
        <div className="vetted-grid">
          {VETTED.map((m) => (
            <article className="vetted-card" key={m.name}>
              <div className="vetted-stage">
                <div className="vetted-photo">
                  <img src={m.img} alt={m.name} />
                </div>
              </div>
              <div className="vetted-plate">
                <div className="vetted-info">
                  <span className="vetted-name">{m.name}</span>
                  <span className="vetted-role">{m.role}</span>
                </div>
                <a
                  className="vetted-li"
                  href="#"
                  aria-label={`${m.name} on LinkedIn`}
                >
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
   HOME
========================================================= */

/* =========================================================
   SAND-SMOKE PUFFS — fire when the astronaut lands in / takes
   off from the certificates section. Re-mounted via key bumps
   to replay the CSS animation each time the scroll enters the
   relevant band.
========================================================= */

/* =========================================================
   MODES TO JOIN (section 12)
========================================================= */

const MODE_CARDS = [
  { label: "ONSITE", img: modeOnsiteImg },
  { label: "ONLINE", img: modeOnlineImg },
  { label: "Hybrid", img: modeDiyImg },
];

const ModesToJoin = () => (
  <section className="modes-section modes-section--robotics">
    <div className="ai-modes-stage" aria-hidden="true" />
    <div className="container">
      <h2 className="modes-title prog-section-title">
        <span className="modes-title-badge">MODES</span> TO JOIN
      </h2>
      <p className="modes-subtitle prog-section-subtitle">Learn AI Your Way</p>
      <p className="modes-desc">
        Whether you're learning from home, joining a local hub, or diving in
        remotely, we&apos;ve got a mission path that works for you.
      </p>

      <div className="modes-grid">
        {MODE_CARDS.map((c) => (
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
);

/* =========================================================
   STUDENT PROJECTS (section 13) — sliding cards + stats
========================================================= */

const PROJECTS = [
  {
    title: "Predictive Air Quality Sentinel",
    desc: "Using machine learning to calibrate low-cost chemical sensors and accurately predict real-world air pollutant concentrations — the same challenge faced by environmental scientists globally.",
    student: "Arsh",
    meta: "AI Research & Machine Learning Track",
    img: aiProject1,
  },
  {
    title: "Credit Card Fraud Detection System",
    desc: "Building a Random Forest AI model that analyses thousands of transactions in real time to instantly detect fraudulent activity — protecting consumers from cybercrime using intelligent pattern recognition.",
    student: "Arsh",
    meta: "AI Research & Machine Learning Track",
    img: aiProject2,
  },
    {
    title: "Real-Time Sign Language Translator",
    desc: "Developing a computer vision system using MediaPipe that tracks hand landmarks in real time and translates sign language gestures into digital text — breaking communication barriers through AI.",
    student: "Hrishikesh & Aayan",
    meta: "AI & Computer Vision Track",
    img: aiProject3,
  },
];

const StudentProjects = () => (
  <section className="projects-section projects-section--robotics">
    <div className="ai-projects-stage" aria-hidden="true" />
    <div className="container">
      <h2 className="projects-title prog-section-title">
        <span className="projects-title-badge">STUDENT</span> PROJECTS
      </h2>
      <p className="projects-subtitle prog-section-subtitle">Real Projects. Real AI. Real Pride.</p>
      <p className="projects-desc">These aren't school assignments. These are real AI projects built by real students using actual datasets, real machine learning tools, and genuine scientific methods. Every project solves a problem that exists in the real world.
</p>
 <p className="projects-desc">Every AI project at Lab of Future is a real challenge — not a demo, not a template. Students plan, train, test, and improve until their model works. That process builds the kind of thinking that lasts.
</p>

      <div className="projects-slider">
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={1.2}
          spaceBetween={20}
          centeredSlides={false}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 28 },
            1100: { slidesPerView: 2, spaceBetween: 32 },
          }}
        >
          {PROJECTS.map((p, i) => (
            <SwiperSlide key={i} className="projects-slide">
              <article className="projects-card">
                <div className="projects-card-imgwrap">
                  <img
                    className="projects-card-img"
                    src={p.img || projectImg}
                    alt={p.title}
                    loading="lazy"
                  />
                </div>
                <div className="projects-card-body">
                  <h3 className="projects-card-title">{p.title}</h3>
                  <p className="projects-card-desc">{p.desc}</p>
                  <div className="projects-card-student">
                    <span className="projects-card-name">{p.student}</span>
                    <span className="projects-card-meta">{p.meta}</span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="projects-stats">
        <div className="projects-stat">
          <span className="projects-stat-num">100+</span>
          <span className="projects-stat-lbl">AI Models Trained</span>
        </div>
        <div className="projects-stat">
          <span className="projects-stat-num">50+</span>
          <span className="projects-stat-lbl">Student AI Projects</span>
        </div>
        <div className="projects-stat">
          <span className="projects-stat-num">100%</span>
          <span className="projects-stat-lbl">Hands-On Learning</span>
        </div>
      </div>
    </div>
  </section>
);

/* =========================================================
   PROJECT IMPACT (section 14)
========================================================= */

const IMPACT_CARDS = [
  {
    icon: impactIcon1,
    title: "Real-World Impact",
    desc: "Real-World Problem Solving Students explore AI applications across healthcare, environment, smart cities, and social impact — seeing how artificial intelligence creates measurable change in communities.",
  },
  {
    icon: impactIcon2,
    title: 'Builder Mindset',
    desc: "The Builder Mindset Every project develops AI skills through iteration, testing, ethical thinking, and continuous improvement in a hands-on environment.",
  },
  {
    icon: impactIcon3,
    title: "Measurable Growth",
    desc: "Measurable Growth Progress is tracked in model accuracy, project complexity, critical thinking, and the ability to apply AI to entirely new challenges.",
  },
];

const ProjectImpact = () => (
  <section className="impact-section impact-section--robotics">
    <div className="ai-impact-stage" aria-hidden="true" />
    <div className="container">
      <div className="impact-head">
        <h2 className="impact-title prog-section-title">
          <span className="impact-title-badge">PROJECT</span> IMPACT
        </h2>
        <p className="impact-subtitle prog-section-subtitle">From Curiosity to Capability</p>
        <p className="impact-desc">What They Build Here, They Carry Forever. AI learning is about more than technology —<br />
it is about developing thinking patterns that solve real problems.<br />
<br />
THE FUTURE WON'T JUST BE PREDICTED. IT WILL BE BUILT. Every great innovator
starts with curiosity. <br />We provide the models, tools, and guidance to help students think at the frontier.</p>
      </div>

      <div className="impact-grid">
        {IMPACT_CARDS.map((c) => (
          <article className="impact-card" key={c.title}>
            <div className="impact-card-icon">
              <img src={c.icon} alt="" loading="lazy" />
            </div>
            <h3 className="impact-card-title">{c.title}</h3>
            <p className="impact-card-desc">{c.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);


/* =========================================================
   FAQ — Frequently Asked Questions (two-column accordion)
========================================================= */


const FAQ_ROBOTICS = [
{
q: "What is Artificial Intelligence, and why is everyone talking about it?",
a: "Artificial intelligence is the ability of machines to learn, reason, and make decisions. It is transforming every industry—from healthcare and finance to education and logistics—making it one of the most important technologies of our time.",
},
{
q: "How is AI changing the world right now?",
a: "AI is already being used to detect diseases, recommend content, power smart city systems, automate logistics, and make financial decisions. In the UAE, AI is central to the national strategy for innovation and future-readiness.",
},
{
q: "Why is AI considered the most important skill of the future?",
a: "Nearly every industry is integrating AI. Students who understand how AI works—not just how to use it—will have a significant advantage in university admissions, career opportunities, and innovation leadership.",
},
{
q: "What is the difference between AI, machine learning, and deep learning?",
a: "AI is the broad field of building machines that can think. Machine learning is a method where machines learn from data. Deep learning is a specialised form using layered neural networks. Each builds on the last.",
},
{
q: "What is the right age to start learning AI?",
a: "Students can begin from as young as six through age-appropriate, play-based activities. The AI curriculum is tailored by age group so every learner starts at exactly the right level.",
},
{
q: "How do I learn Artificial Intelligence?",
a: "The most effective way is through structured, hands-on practice—building real AI models, working with real data, and completing real projects. Lab of Future's AI program is built around exactly this.",
},
{
q: "Is an AI certification worth it?",
a: "An AI certification from Lab of Future demonstrates hands-on capability—not just theory. For university applications, scholarships, and competition portfolios, it carries genuine weight.",
},
{
q: "Is there an AI course for beginners?",
a: "Yes. Lab of Future offers structured beginner AI classes that start from the very foundations—no prior knowledge required.",
},
{
q: "How much does an AI course cost in Dubai?",
a: "AI course fees vary by level, format, and duration. Contact Lab of Future directly for current pricing, batch availability, and package options.",
},
{
q: "What careers are available after learning AI?",
a: "AI opens direct pathways into engineering, data science, research, product management, AI and robotics, and almost every technology-driven field across the UAE and globally.",
},
{
q: "What is machine learning for kids?",
a: "Machine learning for kids is an age-appropriate introduction to how computers learn from data to make decisions—taught through games, visual tools, and real hands-on projects at Lab of Future.",
},
{
q: "Should my child learn AI or coding first?",
a: "Both build on each other. Many students begin with coding and progress naturally into AI, while others start with AI and develop coding skills along the way. Lab of Future offers structured paths for both.",
},
{
q: "What is the difference between AI and robotics?",
a: "Robotics focuses on building physical machines. AI gives those machines—and software systems—the ability to learn, decide, and improve. The two fields increasingly overlap.",
},
{
q: "Does the certificate help with university admissions?",
a: "Yes. An AI certification combined with a strong project portfolio demonstrates initiative and technical capability—qualities that strengthen university applications.",
},
{
q: "What kind of AI projects will students build?",
a: "Projects include image recognition models, sentiment analysis engines, predictive AI systems, generative AI applications, AI chatbots, and ethics-focused design challenges—all built with real tools and real data.",
},
{
q: "Is AI suitable for students who are not strong in mathematics?",
a: "Yes. Beginner AI classes focus on logical thinking, pattern recognition, and hands-on model building, making them accessible to students from all academic backgrounds.",
},
{
q: "What makes Lab of Future a credible AI education provider in Dubai?",
a: "Structured AI curriculum, trained mentors, hands-on real projects, progress tracking, verifiable AI certification, and documented student project outcomes across multiple programs.",
},
{
q: "How do I enrol in the Lab of Future AI program?",
a: "Contact Lab of Future, confirm your age group and level, choose between on-site, online, or hybrid learning formats, and complete the registration process.",
},
];


const FaqRobotics = () => {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  const half = Math.ceil(FAQ_ROBOTICS.length / 2);
  const cols = [FAQ_ROBOTICS.slice(0, half), FAQ_ROBOTICS.slice(half)];

  return (
    <section className="faq-robotics-section">
      <div className="ai-faq-stage" aria-hidden="true" />
      <div className="container">
        <h2 className="faq-robotics-title prog-section-title">FREQUENTLY ASKED <br></br>QUESTIONS</h2>
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
   CTA ABSTRACT GLB — interactive 3D abstract sculpture for
   the CTA left stage.  Replaces the previous small robot.
   Auto-rotates slowly; drag inside the canvas to rotate
   freely with damped momentum.  Lit with cyan + violet
   directional fills to match the page's AI colour theme.
========================================================= */

const AbstractCtaModel = () => {
  const { scene } = useGLTF(abstractGlbUrl);
  const cloned = useMemo(() => scene.clone(), [scene]);

  const { centeredScene, fitScale } = useMemo(() => {
    const box    = new THREE.Box3().setFromObject(cloned);
    const size   = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { centeredScene: cloned, fitScale: 3.6 / maxDim };
  }, [cloned]);

  return (
    <group scale={fitScale}>
      <primitive object={centeredScene} />
    </group>
  );
};

// Wrapper kept under the legacy export name so the CTA section's
// JSX (<SmallRobotCanvas/>) doesn't need to change.
const SmallRobotCanvas = () => (
  <Canvas
    gl={{ alpha: true, antialias: true }}
    style={{ width: "100%", height: "100%" }}
    camera={{ position: [0, 0, 5.5], fov: 38, near: 0.1, far: 100 }}
    onCreated={({ gl }) => {
      gl.setClearColor(0x000000, 0);
      // Tone-mapping exposure bumped > 1 so the lit colour reads
      // brighter without blowing out the cyan + violet hues.
      gl.toneMappingExposure = 1.6;
    }}
  >
    <Suspense fallback={null}>
      {/* Light-coloured AI palette — every term ~2× boosted so
          the abstract sits in a bright, evenly-lit pool of cyan
          + violet light.  Extra hemisphere fill + low fill light
          eliminate dark underside shadows. */}
      <ambientLight intensity={1.1} color="#eef5ff" />
      <hemisphereLight args={["#9bd8ff", "#A66BFF", 0.9]} />
      <directionalLight position={[ 4,  5,  3]} intensity={2.4} color="#5EC8FF" />
      <directionalLight position={[-4,  2,  2]} intensity={1.6} color="#A66BFF" />
      <directionalLight position={[ 0,  6, -2]} intensity={1.2} color="#ffffff" />
      {/* Bottom fill kills the dark belly so the model reads as
          floating in light, not standing on a dark floor. */}
      <directionalLight position={[ 0, -4,  3]} intensity={0.9} color="#cfe6ff" />
      <Environment preset="city" background={false} environmentIntensity={1.0} />
      <AbstractCtaModel />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.9}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Suspense>
  </Canvas>
);

/* =========================================================
   CTA — "The future won't be taught, it will be built"
========================================================= */

const CtaRobotics = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="cta-robotics-section">
    <div className="ai-cta-stage" aria-hidden="true" />
    <div className="cta-robotics-inner container">
      {/* LEFT — interactive small-robot.glb */}
      <div className="cta-robotics-stage">
        <SmallRobotCanvas />
      </div>

      {/* RIGHT — title + copy + buttons */}
      <div className="cta-robotics-text">
        <h2 className="cta-robotics-title prog-section-title">
          THE FUTURE WON&apos;T BE TAUGHT
          <br />
          IT WILL BE BUILT
        </h2>
        <p className="cta-robotics-desc">
          Every great innovator starts with curiosity. We provide the models, tools, and guidance to help students think at the frontier.
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
  { label: "ARTIFICIAL INTELLIGENCE", img: programImg2 },
  { label: "DRONES", img: programImg3 },
  { label: "3D DESIGNS", img: programImg4 },
  { label: "AEROMODELING", img: programImg5 },
  { label: "CODING", img: programImg6 },
  { label: "ASTRONOMY", img: programImg7 },
  { label: "ELECTRONICS / IOT", img: programImg8 },
];

const ExplorePrograms = () => (
  <section className="explore-section explore-section--robotics">
    <div className="ai-explore-stage" aria-hidden="true" />
    <div className="container">
      <h2 className="explore-title prog-section-title">
        <span className="explore-title-badge">EXPLORE</span> our other programs
      </h2>

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

const AiAndDataScience = () => {
  const { openEnquiry } = useEnquiryModal();

  return (
    <div className="ai-data-science-page">
      <ScrollProgressBar />
      <BackToTopButton />
      <SEO
        title={`AI & Data Science | ${siteConfig.title}`}
        description="Lab of Future — AI & Data Science: explore machine learning, neural networks, data analysis, and the mathematics powering modern intelligent systems."
        url={`${siteConfig.url}/students/ai-and-data-science`}
        image={siteConfig.socialImage}
        keywords={["AI", "Data Science", "Machine Learning", "Neural Networks", "STEM"]}
      />

      {/* Fixed particle swarm that travels from the hero stage to the
          why-section stage as the user scrolls — see AiParticleTraveler
          above for the column→line→circle shape morph. */}
      <AiParticleTraveler />

      {/* (Astronaut layer removed — Space Robotics uses the interactive
         robot character inside the hero canvas instead.) */}

      {/* Hero section — same design pattern as Drones page (dark
          backdrop + vignette + left text column + right 3D stage)
          but with AI/Data Science content and the hologram orb in
          place of the drone. */}
      <section className="hero ai-hero">
        <div className="ai-section-fade-top" aria-hidden="true" />
        <div className="ai-section-fade-bot" aria-hidden="true" />
        <div className="ai-hero-bg" aria-hidden="true" />
        <div className="ai-hero-vignette" aria-hidden="true" />

        <div className="ai-hero-grid container">
          {/* LEFT — title + tagline + description + CTA */}
          <div className="ai-hero-text">
            <motion.h1
              className="ai-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              AI &amp; DATA <br></br>SCIENCE
            </motion.h1>
            <motion.p
              className="ai-hero-tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              INTELLIGENCE. INSIGHT. INNOVATION.
            </motion.p>
            <motion.p
              className="ai-hero-desc"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              From machine learning to neural networks and data analysis,
              our AI &amp; Data Science program equips students with
              real-world skills in algorithms.</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            >
              <NavLink to="/students/ai-and-data-science" className="ai-hero-cta">
                ENROLL NOW
                <span aria-hidden="true" className="ai-hero-cta-arrow">
                  &rarr;
                </span>
              </NavLink>
            </motion.div>
          </div>

          {/* RIGHT — landing zone for the traveling particle swarm.
              Idle (pre-scroll) state renders here; see
              <AiParticleTraveler/> mounted at the page level. */}
          <div className="ai-hero-stage" aria-hidden="true" />
        </div>
      </section>

      <WhySpaceScience />

      <AiStartYoungAgeSection />

      <AiStudentsLearn />

      <Certificates />

      {/* BigAsteroid backdrop removed for Space Robotics — the careers
         + competitions sections each carry their own light background. */}
      <div className="space-careers-wrapper space-careers-wrapper--robotics">
        <div className="space-careers-content">
          <WhySpaceForCareers />
          <Competitions />
        </div>
      </div>

      {/* Career Pathways — shared animated background wrapper retained
          for its dark theme even though it now only holds one section. */}
      <div className="faq-section-wrapper">
        <div className="faq-bg-anim" />
        <div className="faq-bg-overlay" />
        <div className="faq-section-content">
          <CareerPathways />

        </div>
      </div>

      <Associated />

      <VettedBy />

      {/* MODES TO JOIN — 3D moon backdrop removed; section now just
         shows its CSS background image */}
      <div className="modes-stage-wrapper">
        <div className="modes-stage-content">
          <ModesToJoin />
        </div>
      </div>

      <StudentProjects />

      <ProjectImpact />

      {/* Community + Tracking sections removed for the robotics page. */}

      <FaqRobotics />

      <CtaRobotics />

      <ExplorePrograms />

      <SiteFooter />
    </div>
  );
};

// CTA abstract model — defer so it doesn't compete with hero assets.
setTimeout(() => useGLTF.preload(abstractGlbUrl), 1500);

export default AiAndDataScience;
