// Home.jsx

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useAnimations,
  useGLTF,
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
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

import SEO from "../../components/common/SEO";
import ScrollProgressBar from "../../components/common/ScrollProgressBar";
import BackToTopButton from "../../components/common/BackToTopButton";
import { siteConfig } from "../../data/siteConfig";
import { canvasPerf } from "../../hooks/useDevicePerformance";
import { useEnquiryModal } from "../../context/EnquiryModalContext";

import certificateUrl from "../../assets/programs/space-robotics/certificate.png";

import learnThinkCritically from "../../assets/programs/space-robotics/what-students-learn/image-1.png";
import learnUnderstandWorld from "../../assets/programs/space-robotics/what-students-learn/image-2.png";
import learnBuildModels from "../../assets/programs/space-robotics/what-students-learn/image-3.png";
import learnUseTools from "../../assets/programs/space-robotics/what-students-learn/image-4.png";
import learnCommunicate from "../../assets/programs/space-robotics/what-students-learn/image-5.png";
import learnWorkTeams from "../../assets/programs/space-robotics/what-students-learn/image-6.png";
import learnSolveProblems from "../../assets/programs/space-robotics/what-students-learn/image-7.png";

// Gallery images for the learn-card sliders (3 per card; #22-25 unused).
import roboLearn1 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (1).webp";
import roboLearn2 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (2).webp";
import roboLearn3 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (3).webp";
import roboLearn4 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (4).webp";
import roboLearn5 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (5).webp";
import roboLearn6 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (6).webp";
import roboLearn7 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (7).webp";
import roboLearn8 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (8).webp";
import roboLearn9 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (9).webp";
import roboLearn10 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (10).webp";
import roboLearn11 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (11).webp";
import roboLearn12 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (12).webp";
import roboLearn13 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (13).webp";
import roboLearn14 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (14).webp";
import roboLearn15 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (15).webp";
import roboLearn16 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (16).webp";
import roboLearn17 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (17).webp";
import roboLearn18 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (18).webp";
import roboLearn19 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (19).webp";
import roboLearn20 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (20).webp";
import roboLearn21 from "../../assets/programs/space-robotics/what-students-learn/new/students-learn (21).webp";

// Space Robotics specific assets — replaces the astronaut/earth/satellite
// trio in the hero with a single interactive robot character.
import robotCharacterUrl from "../../assets/programs/space-robotics/robot_hero.glb?url";
import zebUrl from "../../assets/programs/space-robotics/zeb-new.glb?url";
import smallRobotUrl from "../../assets/programs/space-robotics/small-robot.glb?url";
import robotHandImg from "../../assets/programs/space-robotics/robot_hand.png";
import programImg1 from "../../assets/programs/space-robotics/program-1.png";
import programImg2 from "../../assets/programs/space-robotics/program-2.png";
import programImg3 from "../../assets/programs/space-robotics/program-3.png";
import programImg4 from "../../assets/programs/space-robotics/program-4.png";
import programImg5 from "../../assets/programs/space-robotics/program-5.png";
import programImg6 from "../../assets/programs/space-robotics/program-6.png";
import programImg7 from "../../assets/programs/space-robotics/program-7.png";
import programImg8 from "../../assets/programs/space-robotics/program-8.png";
import aiHandImg from "../../assets/programs/space-robotics/ai_hand.webp";
import humanHandImg from "../../assets/programs/space-robotics/human_hand.webp";
import whySpaceRoboticsRight from "../../assets/programs/space-robotics/why_space_right.webp";

import modeOnsiteImg from "../../assets/modes-to-join/onsite.png";
import modeOnlineImg from "../../assets/modes-to-join/online.png";
import modeDiyImg from "../../assets/modes-to-join/diy.png";
import projectImg from "../../assets/projects/project-1.png";
import roboProject1 from "../../assets/programs/space-robotics/projects/projects (1).webp";
import roboProject2 from "../../assets/programs/space-robotics/projects/projects (2).webp";
import roboProject3 from "../../assets/programs/space-robotics/projects/projects (3).webp";
import roboProject4 from "../../assets/programs/space-robotics/projects/projects (4).webp";
import roboProject5 from "../../assets/programs/space-robotics/projects/projects (5).webp";
import roboProject6 from "../../assets/programs/space-robotics/projects/projects (6).webp";
import impactIcon1 from "../../assets/icons/project-impact-icon-1.png";
import impactIcon2 from "../../assets/icons/project-impact-icon-2.png";
import impactIcon3 from "../../assets/icons/project-impact-icon-3.png";
import codingImg from "../../assets/future-career/coding.png";
import aiImg from "../../assets/future-career/ai.png";
import electronicsImg from "../../assets/future-career/electronics.png";
import engineeringImg from "../../assets/future-career/engineering-design.png";
import dataImg from "../../assets/future-career/data-analysis.png";
import designingImg from "../../assets/future-career/3d-designing.png";
import researchImg from "../../assets/future-career/research-mindset.png";

import calenderIcon from "../../assets/future-career/calender.svg";
import olympiadIcon from "../../assets/future-career/olympiad.svg";
import portfolioIcon from "../../assets/future-career/portfolio.svg";
import recognitionIcon from "../../assets/future-career/recognition.svg";
import assocLightRobotics from "../../assets/programs/space-robotics/associated-client-frame-lighting.svg";
import lofLogo from "../../assets/Logo/log-header-logo.svg";
import assocLogo1 from "../../assets/programs/space-robotics/logo-1.png";
import assocLogo2 from "../../assets/programs/space-robotics/logo-2.png";
import assocLogo3 from "../../assets/programs/space-robotics/logo-3.png";
import assocLogo4 from "../../assets/programs/space-robotics/logo-4.png";
import assocLogo5 from "../../assets/programs/space-robotics/logo-5.png";
import assocLogo6 from "../../assets/programs/space-robotics/logo-6.png";
import assocLogo7 from "../../assets/programs/space-robotics/logo-7.png";

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
import vettedGeorge from "../../assets/programs/space-robotics/george.png";
import vettedMadison from "../../assets/programs/space-robotics/madison.png";
import vettedDavid from "../../assets/programs/space-robotics/david.png";
import vettedVitali from "../../assets/programs/space-robotics/vitali.png";

/* =========================================================
   HERO TEXT
========================================================= */

const HeroText = () => {
  return (
    <div className="hero-text-wrap">
      <motion.h1
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="hero-heading"
      >
        <span className="hero-word">SPACE</span>
        <span className="hero-word">ROBOTICS</span>
      </motion.h1>
    </div>
  );
};

/* =========================================================
   ROBOTICS ROBOT — interactive hero character.
   - Loads robot_character.glb
   - Recolours every material to a black/white theme
     (bright surfaces → white, dark surfaces → near-black,
      metallic sheen kept so highlights still pop)
   - OrbitControls outside provide: butter-smooth drag-to-rotate
     plus slow continuous auto-rotation around Y.
========================================================= */

const RoboticsRobot = () => {
  const { scene } = useGLTF(robotCharacterUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  useMemo(() => {
    cloned.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];
      const themed = mats.map((m) => {
        if (!m) return m;
        const cm = m.clone();
        if (cm.color) {
          const hsl = { h: 0, s: 0, l: 0 };
          cm.color.getHSL(hsl);
          // Binarise to white / near-black so the model reads
          // immediately as a monochrome character.
          if (hsl.l > 0.42) {
            cm.color.setRGB(0.94, 0.94, 0.96); // soft white
          } else {
            cm.color.setRGB(0.06, 0.06, 0.07); // near-black
          }
        }
        // Slight sheen so studio lighting catches the panels.
        cm.metalness = Math.max(cm.metalness ?? 0, 0.55);
        cm.roughness = Math.min(cm.roughness ?? 1, 0.4);
        cm.needsUpdate = true;
        return cm;
      });
      obj.material = Array.isArray(obj.material) ? themed : themed[0];
    });
  }, [cloned]);

  // Centre the model on its bounding box so OrbitControls rotates
  // around the visual centre rather than the (often offset) origin.
  const { centeredScene, fitScale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    // Normalise scale so the largest dimension is ~4.6 units —
    // bigger than the previous 3 so the robot fills the hero better.
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { centeredScene: cloned, fitScale: 10.6 / maxDim };
  }, [cloned]);

  // On narrow (mobile) canvases the fixed vertical FOV otherwise reads
  // as an extreme, cropped close-up of the head — zoom the robot out
  // and settle it lower so the shorter mobile hero shows more of it.
  const { size: viewportSize } = useThree();
  const isMobileCanvas = viewportSize.width < 640;
  const mobileScale = isMobileCanvas ? 0.62 : 1;

  return (
    <group
      scale={fitScale * mobileScale}
      position={[0, isMobileCanvas ? -2.1 : -3.5, 0]}
    >
      <primitive object={centeredScene} />
    </group>
  );
};

/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhySpaceScience = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="why-section why-section--robotics">
    <div className="why-container container">
      <div className="why-left">
        <h2 className="why-title prog-section-title">
          <span className="why-badge">WHY</span>
          <span className="why-title-bold">SPACE ROBOTICS</span>
        </h2>
        <p className="why-desc">
          Space is no longer the final frontier — it's the next workplace. Rovers explore Mars. Robotic arms repair satellites. Autonomous systems go where humans can't. At Lab of Future, the space robotics program doesn't just teach technology, they run missions. Every class is hands-on. Every project is real. The benefits of robotics for kids go far beyond screens — logic, resilience, creativity and the confidence to build what comes next.
        </p>
        <div className="why-cta-row">
          <button type="button" onClick={openEnquiry} className="why-btn why-btn--primary">
            Enroll Now
          </button>
          <button type="button" onClick={openEnquiry} className="why-btn why-btn--secondary">
            Book a Demo
          </button>
        </div>
      </div>

      {/* Right column — kept for grid layout.  Zeb is rendered
          in the page-wide fixed canvas (#zeb-travel-layer) and
          positioned here via scroll-driven DOM rect sampling. */}
      <div className="why-right">
        <img src={whySpaceRoboticsRight} alt="" aria-hidden="true" draggable="false" />
      </div>
    </div>
  </section>
  );
};

/* =========================================================
   ZEB ROBOT — used inside the "Why Space Robotics" panel.
   Loads zeb.glb, centres + scales it to fit, and lets the
   parent canvas spin it via OrbitControls.
========================================================= */

const ZebRobot = () => {
  const groupRef = useRef();
  const { scene, animations } = useGLTF(zebUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, mixer } = useAnimations(animations, groupRef);

  // Play every baked clip on infinite loop — Zeb's GLB ships with
  // an idle/hover clip that holds the proper pose; without it the
  // rest pose can render at a weird offset.
  useEffect(() => {
    for (const action of Object.values(actions)) {
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play();
      action.clampWhenFinished = false;
    }
    return () => mixer?.stopAllAction();
  }, [actions, mixer, animations]);

  // Compute bounds from MESH NODES ONLY. Box3.setFromObject on the
  // root scene also picks up cameras, lights, empty bones and other
  // helper transforms — those can sit far from the visible geometry
  // and inflate the box, which is why Zeb's fitScale was huge and he
  // rendered as a giant black mass filling the camera. Walking the
  // tree and unioning each mesh's box gives the true visible bounds.
  const fitScale = useMemo(() => {
    const box = new THREE.Box3();
    const tmp = new THREE.Box3();
    let foundMesh = false;
    cloned.updateMatrixWorld(true);
    cloned.traverse((obj) => {
      if (!obj.isMesh || obj.visible === false || !obj.geometry) return;
      obj.geometry.computeBoundingBox?.();
      tmp.setFromObject(obj);
      if (Number.isFinite(tmp.min.x) && Number.isFinite(tmp.max.x)) {
        box.union(tmp);
        foundMesh = true;
      }
    });
    if (!foundMesh) return 1;
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 3.2 / maxDim;
  }, [cloned]);

  // Gentle floating animation — sine-wave Y bob + tiny pitch sway so
  // the model feels alive in addition to OrbitControls' auto-rotate.
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
    groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={groupRef} scale={fitScale}>
      <primitive object={cloned} />
    </group>
  );
};

/* =========================================================
   ZEB TRAVELER — single Zeb instance in the page-wide fixed
   canvas (#zeb-travel-layer).  Reads DOM positions via
   getBoundingClientRect each frame, then smoothly moves
   between the WhySpaceScience right column and the centre
   of HandsRevealSection as the user scrolls.
========================================================= */

const ZebTraveler = () => {
  const groupRef    = useRef();
  const { camera, size } = useThree();
  const { scene, animations } = useGLTF(zebUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions, mixer } = useAnimations(animations, groupRef);
  const fitScaleRef = useRef(1);

  // Drag-rotation state — driven externally by ZebHitArea via window refs
  const yawRef      = useRef(0);   // accumulated yaw angle (radians)
  const pitchRef    = useRef(0);   // accumulated pitch angle (radians)
  const yawVelRef   = useRef(0);   // momentum after pointer release
  const pitchVelRef = useRef(0);

  useEffect(() => {
    // Expose so ZebHitArea (outside the Canvas) can write drag deltas
    window.__zebYaw      = yawRef;
    window.__zebPitch    = pitchRef;
    window.__zebYawVel   = yawVelRef;
    window.__zebPitchVel = pitchVelRef;
  }, []);

  useEffect(() => {
    for (const action of Object.values(actions)) {
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play();
      action.clampWhenFinished = false;
    }
    return () => mixer?.stopAllAction();
  }, [actions, mixer, animations]);

  // Bounds — centres the clone and stores the normalised fit-scale
  useMemo(() => {
    const box = new THREE.Box3();
    const tmp = new THREE.Box3();
    cloned.updateMatrixWorld(true);
    cloned.traverse((obj) => {
      if (!obj.isMesh || obj.visible === false || !obj.geometry) return;
      obj.geometry.computeBoundingBox?.();
      tmp.setFromObject(obj);
      if (Number.isFinite(tmp.min.x) && Number.isFinite(tmp.max.x)) box.union(tmp);
    });
    if (box.isEmpty()) return;
    const sz     = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    fitScaleRef.current = 3.0 / (Math.max(sz.x, sz.y, sz.z) || 1);
  }, [cloned]);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    const t  = state.clock.elapsedTime;
    const vw = size.width;
    const vh = size.height;

    // Screen-px → Three.js world-unit helpers (Zeb sits at z = 0)
    const dist  = camera.position.z;
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
    const halfW = halfH * (vw / vh);
    const sx2wx = (sx) => ((sx / vw) * 2 - 1) * halfW;
    const sy2wy = (sy) => -((sy / vh) * 2 - 1) * halfH;

    const fs = fitScaleRef.current;
    let tx = g.position.x;
    let ty = g.position.y;
    let targetScale = fs * 0.72;
    let vis = 0;

    // ── Target A: WhySpaceScience right column ──────────────────
    const whySec   = document.querySelector('.why-section--robotics');
    const whyRight = document.querySelector('.why-section--robotics .why-right');
    if (whySec && whyRight) {
      const ws = whySec.getBoundingClientRect();
      const wr = whyRight.getBoundingClientRect();
      const enter = Math.max(0, Math.min(1, (vh * 0.9 - ws.top) / (vh * 0.55)));
      const exit  = Math.max(0, Math.min(1, ws.bottom / (vh * 0.35)));
      const pWhyS = (() => { const p = Math.min(enter, exit); return p * p * (3 - 2 * p); })();
      if (pWhyS > 0) {
        // smaller, parked in the TOP-LEFT corner of the section
        tx = sx2wx(ws.left + ws.width * 0.06);
        ty = sy2wy(wr.top  + wr.height * 0.18);
        targetScale = fs * 0.22;
        vis = pWhyS;
      }
    }

    // ── Target B: HandsRevealSection centre (.hands-zeb sentinel) ──
    const handsSec = document.querySelector('.hands-reveal-section');
    const handsZeb = document.querySelector('.hands-zeb');
    if (handsSec && handsZeb) {
      const hs    = handsSec.getBoundingClientRect();
      const hz    = handsZeb.getBoundingClientRect();
      const rawP  = Math.max(0, Math.min(1, (vh - hs.top) / (vh * 0.82)));
      const pHands = rawP * rawP * (3 - 2 * rawP);
      const zebRaw = Math.max(0, (pHands - 0.42) / 0.58);
      const pZeb   = zebRaw * zebRaw * (3 - 2 * zebRaw);
      if (pZeb > 0) {
        // Land Zeb slightly RIGHT of the sentinel's horizontal centre
        // (60% across instead of 50%) so the right-side hand reads as
        // the one extending toward him.
        const htx = sx2wx(hz.left + hz.width  * 0.70);
        // Land Zeb HIGHER inside the sentinel (28% from the top of
        // the sentinel rect instead of the centre) so the two hands
        // visually reach UP toward him and appear to touch.
        const hty = sy2wy(hz.top  + hz.height * 0.05);
        tx = tx + (htx - tx) * pZeb;
        ty = ty + (hty - ty) * pZeb;
        // Smaller landing scale (was 0.38) so Zeb reads as a small
        // character cradled between the hands instead of overwhelming
        // the frame.
        targetScale = targetScale + (fs * 0.16 - targetScale) * pZeb;
        vis = Math.max(vis, pZeb);
      }
    }

    // ── Target D: StudentsLearn section — TOP-RIGHT landing. ─────
    // Zeb travels rightward from the Why section and lands in the
    // top-right corner of the Students Learn section.
    const learnSecEl = document.querySelector('.learn-section');
    if (learnSecEl) {
      const ls = learnSecEl.getBoundingClientRect();
      const enter = Math.max(0, Math.min(1, (vh * 0.85 - ls.top) / (vh * 0.55)));
      const exit  = Math.max(0, Math.min(1, ls.bottom / (vh * 0.40)));
      const p     = Math.min(enter, exit);
      const pLearn = p * p * (3 - 2 * p);
      if (pLearn > 0) {
        // Top-right corner — 90% across, 14% from the top so Zeb sits
        // clearly in the upper-right without clipping the section edge.
        const ltx = sx2wx(ls.left + ls.width  * 0.90);
        const lty = sy2wy(ls.top  + ls.height * 0.14);
        tx = tx + (ltx - tx) * pLearn;
        ty = ty + (lty - ty) * pLearn;
        targetScale = targetScale + (fs * 0.34 - targetScale) * pLearn;
        vis = Math.max(vis, pLearn);
      }
    }

    // ── Generic helper for the remaining 10 section landings ─────
    // Each target queries a section, computes a smoothstep progress
    // (0 → 1 → 0 as the section traverses the viewport), and blends
    // a landing position + scale into the running tx / ty / scale.
    // Some targets also drive the yaw (rotation) for in-flight spin.
    let yawTarget = null;       // when not null, overrides yawRef
    const landAtSection = (selector, opts) => {
      const el = document.querySelector(selector);
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const enter = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.55)));
      const exit  = Math.max(0, Math.min(1, r.bottom / (vh * 0.40)));
      const raw   = Math.min(enter, exit);
      const p     = raw * raw * (3 - 2 * raw);
      if (p > 0) {
        const px = r.left + r.width  * opts.fx;
        const py = r.top  + r.height * opts.fy;
        const wx = sx2wx(px);
        const wy = sy2wy(py);
        tx = tx + (wx - tx) * p;
        ty = ty + (wy - ty) * p;
        targetScale = targetScale + (fs * opts.scale - targetScale) * p;
        vis = Math.max(vis, p);
        // If this target requests a spin during travel, hand the
        // current rotation progress (raw 0→1) up to the rotation block.
        if (opts.spinTurns) {
          yawTarget = raw * Math.PI * 2 * opts.spinTurns;
        }
      }
      return p;
    };

    // 1. Certificates — top-left landing, scaled up, rotating en route.
    landAtSection('.cert-section--robotics', {
      fx: 0.16, fy: 0.10, scale: 0.30, spinTurns: 1,
    });

    // 2. Why Robotics For Future Careers — bottom-right, larger.
    landAtSection('.careers-section--robotics', {
      fx: 0.92, fy: 0.78, scale: 0.34,
    });

    // 3. Competitions — mid-left, scaled up.
    landAtSection('.competitions-section--robotics', {
      fx: 0.35, fy: 0.62, scale: 0.34,
    });

    // 4. Career-pathways FAQ — further left, bigger.
    landAtSection('.career-pathways-section--robotics', {
      fx: 0.08, fy: 0.50, scale: 0.34,
    });

    // 5. How To Choose The Right Path — skipped, Zeb stays in career pathway.

    // 6. Who Are We Associated With — left side, upper position.
    landAtSection('.assoc-section--robotics', {
      fx: 0.16, fy: 0.60, scale: 0.32,
    });

    // 7. Vetted By — skipped, Zeb travels directly to Modes To Join.

    // 8. Modes To Join — further left, scaled up.
    landAtSection('.modes-section--robotics', {
      fx: 0.08, fy: 0.50, scale: 0.28,
    });

    // 9. Student Projects — skipped, Zeb stays in previous section.

    // 10. Project Impact — top-right landing.
    landAtSection('.impact-section--robotics', {
      fx: 0.88, fy: 0.12, scale: 0.30,
    });

    // 11. Footer — bottom-right, small size.
    // landAtSection's exit fade doesn't work for the last element on the
    // page (it can never scroll past the viewport), so use a custom block
    // with no exit condition.
    const footerEl = document.querySelector('.site-footer');
    if (footerEl) {
      const fr = footerEl.getBoundingClientRect();
      const enter = Math.max(0, Math.min(1, (vh - fr.top) / (fr.height * 0.7 || 1)));
      const p = enter * enter * (3 - 2 * enter);
      if (p > 0) {
        const ftx = sx2wx(fr.left + fr.width  * 0.90);
        const fty = sy2wy(fr.top  + fr.height * 0.62);
        tx = tx + (ftx - tx) * p;
        ty = ty + (fty - ty) * p;
        targetScale = targetScale + (fs * 0.16 - targetScale) * p;
        vis = Math.max(vis, p);
      }
    }

    // ── Position: smooth tracking + gentle Y bob ──────────────────
    const bobY = Math.sin(t * 1.1) * 0.1;
    g.position.x += (tx        - g.position.x) * 0.09;
    g.position.y += (ty + bobY - g.position.y) * 0.09;
    g.position.z  = 0;

    // ── Rotation: horizontal drag only (yaw), no vertical (pitch) ───
    yawRef.current  += yawVelRef.current;
    yawVelRef.current *= 0.90;
    // Keep pitch locked at 0 — lerp back so any residual angle fades out
    pitchRef.current += (0 - pitchRef.current) * 0.12;
    // If a section landing requested a rotation (yawTarget set by
    // landAtSection), blend toward it.  Otherwise the existing momentum
    // system runs untouched.
    if (yawTarget !== null) {
      yawRef.current += (yawTarget - yawRef.current) * 0.12;
    }
    // Soft lerp so the mesh catches up smoothly (no snap on large delta)
    g.rotation.y += (yawRef.current   - g.rotation.y) * 0.14;
    g.rotation.x += (pitchRef.current - g.rotation.x) * 0.14;

    // ── Scale lerp ────────────────────────────────────────────────
    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * 0.09);

    // ── Layer visibility ──────────────────────────────────────────
    const layer = document.getElementById('zeb-travel-layer');
    if (layer) layer.style.opacity = vis;

    // ── Expose screen-space position so ZebHitArea can follow Zeb ─
    const worldPos = g.position.clone().project(camera);
    const screenX  = (worldPos.x  *  0.5 + 0.5) * vw;
    const screenY  = (worldPos.y  * -0.5 + 0.5) * vh;
    // Estimate apparent pixel height for hit-area sizing
    const worldH   = g.scale.x / fs * 3.0;
    const pxPerUnit = vh / (2 * halfH);
    if (!window.__zebScreen) window.__zebScreen = {};
    window.__zebScreen.x       = screenX;
    window.__zebScreen.y       = screenY;
    window.__zebScreen.pxH     = worldH * pxPerUnit;
    window.__zebScreen.visible = vis > 0.05;
  });

  return (
    <group ref={groupRef} scale={fitScaleRef.current * 0.72} position={[0, 0, 0]}>
      <primitive object={cloned} />
    </group>
  );
};

/* =========================================================
   ZEB HIT-AREA — transparent DOM overlay that tracks Zeb's
   screen position and forwards pointer-drag deltas to
   ZebTraveler via window refs.  Lives outside the Canvas so
   it can receive normal DOM events without blocking the page.
========================================================= */

const ZebHitArea = () => {
  const divRef    = useRef(null);
  const dragState = useRef({ active: false, x: 0, y: 0 });

  // rAF loop — moves the hit-area to wherever Zeb is on screen
  useEffect(() => {
    let raf;
    const tick = () => {
      const div    = divRef.current;
      const screen = window.__zebScreen;
      if (div && screen) {
        if (screen.visible) {
          const w = Math.max(80, screen.pxH * 0.6);
          const h = Math.max(120, screen.pxH);
          div.style.left    = `${screen.x - w / 2}px`;
          div.style.top     = `${screen.y - h / 2}px`;
          div.style.width   = `${w}px`;
          div.style.height  = `${h}px`;
          div.style.display = 'block';
        } else {
          div.style.display = 'none';
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e) => {
    dragState.current = { active: true, x: e.clientX, y: e.clientY };
    try { e.target.setPointerCapture(e.pointerId); } catch {}
    divRef.current.style.cursor = 'grabbing';
  };

  const onPointerMove = (e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.x;
    const dy = e.clientY - dragState.current.y;
    dragState.current.x = e.clientX;
    dragState.current.y = e.clientY;
    // Horizontal-only drag — yaw only, no vertical (pitch) rotation
    if (window.__zebYawVel) window.__zebYawVel.current = dx * 0.012;
  };

  const onPointerUp = (e) => {
    dragState.current.active = false;
    try { e.target.releasePointerCapture(e.pointerId); } catch {}
    divRef.current.style.cursor = 'grab';
  };

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        display: 'none',
        cursor: 'grab',
        zIndex: 51,         // sits above the Zeb canvas layer (z-index 50)
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
};

/* =========================================================
   HANDS REVEAL SECTION — scroll-triggered cinematic reveal:
   robot arm slides in from LEFT, human hand from RIGHT.
   The Zeb robot is NOT rendered here — it travels from the
   WhySpaceScience section via the fixed #zeb-travel-layer.
   The empty .hands-zeb div acts as a DOM position sentinel
   that ZebTraveler reads to know where to go.
========================================================= */

const HandsRevealSection = () => {
  const sectionRef = useRef(null);
  const robotRef   = useRef(null);
  const humanRef   = useRef(null);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    let raf;
    const tick = () => {
      // Smooth mouse lerp
      mouseOffset.current.x += (targetMouse.current.x - mouseOffset.current.x) * 0.055;
      mouseOffset.current.y += (targetMouse.current.y - mouseOffset.current.y) * 0.055;

      const sec   = sectionRef.current;
      const robot = robotRef.current;
      const human = humanRef.current;

      if (!sec) { raf = requestAnimationFrame(tick); return; }

      const vh   = window.innerHeight;
      const rect = sec.getBoundingClientRect();

      // Scroll progress: 0 when section enters viewport, 1 when fully settled
      const rawP = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.82)));
      const p    = rawP * rawP * (3 - 2 * rawP);

      const mx = mouseOffset.current.x;
      const my = mouseOffset.current.y;

      if (robot) {
        // Slower = feels further back (parallax depth layer 1)
        const txPct  = -112 + p * 109;
        const rotY   = (-14 + p * 14) + mx * 2.5;
        const scaleV = 0.87 + p * 0.13;
        robot.style.transform =
          `translateX(calc(${txPct}% + ${mx * 9}px)) translateY(${my * 5}px) rotateY(${rotY}deg) scale(${scaleV})`;
      }

      if (human) {
        // Faster = feels closer (parallax depth layer 2)
        const txPct  = 112 - p * 109;
        const rotY   = (14 - p * 14) + mx * (-2.5);
        const scaleV = 0.90 + p * 0.10;
        human.style.transform =
          `translateX(calc(${txPct}% + ${mx * 15}px)) translateY(${my * 8}px) rotateY(${rotY}deg) scale(${scaleV})`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hands-reveal-section" ref={sectionRef}>
      {/* ── Text content — two columns mirroring the attached reference ── */}
      <div className="hands-content container">
        <div className="hands-col">
          <h2 className="hands-title prog-section-title">
            WHY START <span className="hands-badge">YOUNG?</span>
          </h2>
          <p className="hands-desc">
            No one becomes a space scientist at university. It begins much earlier, when a child is given the right tools to build logic, patience, and courage.

          </p>
        </div>

        <div className="hands-col">
          <h2 className="hands-title prog-section-title">
            WHAT DOES LOF <span className="hands-badge">DO?</span>
          </h2>
          <p className="hands-desc">
            Real tools. Real builds. Real engineers. The most immersive robotics and STEM program Dubai has seen.

          </p>
        </div>
      </div>

      {/* ── Hands visual — fills the lower portion of the section ── */}
      <div className="hands-reveal-inner">
        {/* Robot / AI arm — enters from LEFT */}
        <div className="hands-robot" ref={robotRef}>
          <img src={aiHandImg} alt="" aria-hidden="true" draggable="false" />
        </div>

        {/* Position sentinel — ZebTraveler reads this rect to land here */}
        <div className="hands-zeb" aria-hidden="true" />

        {/* Human hand — enters from RIGHT */}
        <div className="hands-human" ref={humanRef}>
          <img src={humanHandImg} alt="" aria-hidden="true" draggable="false" />
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   WHAT LOF DOES + AGE PROGRAMS (section 3)
========================================================= */

const AGE_GROUPS = [
  {
    label: "Foundation",
    points: [
      "Discover the basics of robotics.",
  "Explore movement, motors, wheels, and lights.",
  "Develop observation and problem-solving skills.",
  "Build curiosity through hands-on activities.",
  "Learn through fun, age-appropriate projects."
    ],
  },
  {
    label: "Explorer",
    points: [
      "Build interactive robotic models.",
  "Learn visual programming fundamentals.",
  "Experiment with circuits and sensors.",
  "Practice testing and debugging.",
  "Solve creative engineering challenges."
    ],
  },
  {
    label: "Innovator",
    points: [
     "Work with advanced sensors and actuators.",
  "Build robotic arms and autonomous systems.",
  "Begin text-based programming.",
  "Use data to improve robot performance.",
  "Develop real-world robotics skills."
    ],
  },
  {
    label: "Engineer",
    points: [
       "Build AI-powered robotic systems.",
  "Learn embedded programming and IoT.",
  "Create competition-ready robotics projects.",
  "Develop a professional engineering portfolio.",
  "Strengthen problem-solving and design thinking."
    ],
  },
  {
    label: "Researcher",
    points: [
      "Prototype using industry-standard tools.",
  "Explore advanced automation and AI robotics.",
  "Develop innovative robotic products.",
  "Gain experience with research-driven projects.",
  "Prepare for higher education, internships, and startups."
    ],
  },
];

// Section 3 — pinned while scrolling: the Earth box (and the astronaut
// inside it) zoom up to fill the screen, then it scrolls away into the
// age-cards section.
const LofProgram = () => {
  const { openEnquiry } = useEnquiryModal();
  const sectionRef = useRef(null);
  const topRef = useRef(null);
  const cellRef = useRef(null);
  const boxRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const sec = sectionRef.current;
      const top = topRef.current;
      const cell = cellRef.current;
      const box = boxRef.current;
      const text = textRef.current;

      if (sec && top && cell && box) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const total = sec.offsetHeight - vh;
        const p =
          total > 0
            ? Math.min(Math.max(-sec.getBoundingClientRect().top / total, 0), 1)
            : 0;

        if (p <= 0) {
          // resting layout
          top.style.transform = "";
          box.style.borderWidth = "";
          box.style.borderRadius = "";
          if (text) text.style.opacity = "";
        } else {
          // reset to read natural (un-transformed) metrics, then re-apply.
          // zooms the WHOLE row anchored on the box centre.
          top.style.transform = "none";
          const cr = cell.getBoundingClientRect();
          const topR = top.getBoundingClientRect();
          const boxCX = cr.left + cr.width / 2;
          const boxCY = cr.top + cr.height / 2;
          const scaleTarget = Math.max(vw / cr.width, vh / cr.height) * 1.12;
          const scale = 1 + (scaleTarget - 1) * p;
          const tX = (vw / 2 - boxCX) * p;
          const tY = (vh / 2 - boxCY) * p;

          top.style.transformOrigin = `${boxCX - topR.left}px ${boxCY - topR.top}px`;
          top.style.transform = `translate(${tX}px, ${tY}px) scale(${scale})`;

          box.style.borderWidth = `${(1 - p) * 2}px`;
          box.style.borderRadius = `${(1 - p) * 1.5}rem`;
          if (text) {
            text.style.opacity = `${Math.max(0, 1 - p / 0.4)}`;
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="lof-section" data-astro-target ref={sectionRef}>
      <div className="lof-sticky">
        <div className="lof-top container" ref={topRef}>
          {/* cell = natural metrics; box = the framed Earth panel that zooms */}
          <div className="lof-astro-col" ref={cellRef}>
            <div className="lof-astro-box" ref={boxRef} />
          </div>

          <div className="lof-text-col" ref={textRef}>
            <h2 className="lof-title">
              WHAT DOES <span className="lof-title-bold">LOF</span> DO?
            </h2>
            <p className="lof-desc">
              LOF transforms curiosity into capability. Students move from
              consuming facts to building models, asking questions,
              experimenting, and presenting ideas.
            </p>

            <h2 className="lof-title">WHY START YOUNG?</h2>
            <p className="lof-desc">
              Scientific thinking is strongest when built early. Children
              naturally observe patterns, ask bold questions, and imagine
              possibilities.
            </p>
            <p className="lof-desc">
              The mindset needed in research begins in childhood: asking why,
              testing ideas, and not fearing difficult questions.
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
      </div>
    </section>
  );
};

const AgePrograms = () => (
  <section className="age-section">
    <div className="age-grid container">
      {AGE_GROUPS.map((g) => (
        <article className="age-card" key={g.label} aria-label={g.label}>
          <div className="age-card-label">{g.label}</div>
          <ul className="age-card-list">
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
   WHAT WILL STUDENTS LEARN (section 5)
========================================================= */

// add an `img` URL to any item to use a real photo; otherwise a
// placeholder gradient is shown
const LEARN_ITEMS = [
  { label: "Think critically", img: learnThinkCritically, imgs: [roboLearn1, roboLearn2, roboLearn3] },
  { label: "Understand How Robots Workld", img: learnUnderstandWorld, imgs: [roboLearn4, roboLearn5, roboLearn6] },
  { label: "Build Working Robotic Models", img: learnBuildModels, imgs: [roboLearn7, roboLearn8, roboLearn9] },
  { label: "Use tools and technology", img: learnUseTools, imgs: [roboLearn10, roboLearn11, roboLearn12] },
  { label: "Communicate ideas clearly", img: learnCommunicate, imgs: [roboLearn13, roboLearn14, roboLearn15] },
  { label: "Work in teams", img: learnWorkTeams, imgs: [roboLearn16, roboLearn17, roboLearn18] },
  { label: "Solve unfamiliar problems", img: learnSolveProblems, imgs: [roboLearn19, roboLearn20, roboLearn21] },
];

const StudentsLearn = () => (
  <section className="learn-section">
    <div className="container">
      <h2 className="learn-title prog-section-title">
        WHAT WILL STUDENTS <span className="learn-badge">LEARN?</span>
      </h2>
      <p className="learn-sub">How to think &mdash; not just what to remember.</p>

      <div className="learn-grid">
        {LEARN_ITEMS.map((it) => {
          const imgs = it.imgs && it.imgs.length ? it.imgs : [it.img];
          return (
            <article className="learn-card" key={it.label}>
              <Swiper
                className="learn-card-slider"
                modules={[Autoplay]}
                loop
                slidesPerView={1}
                speed={700}
                grabCursor
                autoplay={{ delay: 2200, disableOnInteraction: false }}
              >
                {imgs.map((src, j) => (
                  <SwiperSlide key={j}>
                    <img className="learn-card-img" src={src} alt={it.label} loading="lazy" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <span className="learn-card-label">{it.label}</span>
            </article>
          );
        })}
      </div>
      <p className="learn-foot">
        In robotics, every challenge creates a new possibility.
      </p>
    </div>
  </section>
);

/* =========================================================
   CERTIFICATES (section 6)
========================================================= */

const Certificates = () => (
  <section className="cert-section cert-section--robotics">
    {/* Robot hand — anchored to the SECTION (not the inner container) so
        it can bleed out of the corner and look like it's reaching in
        from off-screen. */}
    <div className="cert-robot-hand cert-robot-hand--corner" aria-hidden="true">
      <img src={robotHandImg} alt="" />
    </div>

    <div className="cert-robotics-inner container">
      {/* LEFT — title + bulleted points (blue highlights) */}
      <div className="cert-robotics-text">
        <h2 className="cert-robotics-title prog-section-title">CERTIFICATES</h2>
        <p>Level-based robotics certification designed to recognise real learning, hands-on skills, and project achievement. Unlike traditional participation certificates, our STEM certifications are earned through practical application, problem-solving, innovation, and successful project completion. Children progress through structured levels, demonstrating their understanding of robotics, engineering, coding, and design thinking at each stage. Every certificate reflects genuine capability, giving students a credible record of their growth while building confidence, technical expertise, and a strong foundation for future STEM education and careers.</p>
        
      </div>

      {/* RIGHT — coverflow slider sitting above the robot hand.
          Self-contained — does NOT use the cert-slider class so that
          home.css's `.cert-slider { overflow: hidden }` rule can stay
          as-is for Space Science without affecting this page. */}
      <div className="cert-robotics-stage">
        <Swiper
          className="cert-robotics-swiper"
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={1.6}
          /* Explicit drag config — defaults are true, but spelling them
             out guarantees nothing in the build/env disables them. */
          allowTouchMove
          simulateTouch
          touchEventsTarget="container"
          touchStartPreventDefault={false}
          touchRatio={1}
          threshold={0}
          longSwipes
          shortSwipes
          autoplay={{
            delay: 2200,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 220,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide
              key={i}
              className="cert-robotics-slide"
            >
              <img
                src={certificateUrl}
                alt="LOF certificate"
                loading="lazy"
                draggable="false"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);


/* =========================================================
   WHY SPACE FOR FUTURE CAREERS (section 7)
========================================================= */

const CAREER_SKILLS = [
  { label: "CODING", img: codingImg },
  { label: "AI THINKING", img: aiImg },
  { label: "ELECTRONICS", img: electronicsImg },
  { label: "ENGINEERING DESIGN", img: engineeringImg },
  { label: "DATA ANALYSIS", img: dataImg },
  { label: "3D DESIGNING", img: designingImg },
  { label: "RESEARCH MINDSET", img: researchImg },
];

const WhySpaceForCareers = () => (
  <section className="careers-section careers-section--robotics">
    <div className="container">
      <h2 className="careers-title prog-section-title">
        WHY ROBOTICS FOR{" "}
        <span className="careers-title-badge">FUTURE CAREERS?</span>
      </h2>
      <p className="careers-sub">
       Aerospace. Healthcare. Defence. AI. Manufacturing. These are the robotics skills for future jobs that actually matter.
      </p>

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

      <p className="careers-footer">
        The robotics field is not only about machines. It is where coding,
        electronics, design and AI all meet.
        
        Learning robotics prepares students for many careers.
      </p>
    </div>
  </section>
);

/* =========================================================
   COMPETITIONS (section 8)
========================================================= */

const COMPETITION_ITEMS = [
  {
    icon: calenderIcon,
    title: "Monthly Themed Competitions",
    desc: "Build routine practice and keep skills sharp all year. ",
  },
  {
    icon: olympiadIcon,
    title: "Olympiad & National Competition Readiness",
    desc: " Prepare for the best robotics competitions for kids in Dubai.",
  },
  {
    icon: portfolioIcon,
    title: "Portfolio-Based Competitions",
    desc: "Prototypes, code logs and research posters become real robotics contest Dubai entries.",
  },
  {
    icon: recognitionIcon,
    title: "Recognition Ecosystem",
    desc: "Celebrate progress, resilience, teamwork and confidence at every level.",

  },
];

const Competitions = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="competitions-section competitions-section--robotics">
    <div className="competitions-inner container">
      <div className="competitions-left">
        <div className="competitions-heading">
          <h2 className="competitions-label-text">
            <span className="competitions-label-badge">COMPETITIONS</span>
          </h2>
          <p className="competitions-subtitle prog-section-subtitle">
           Showcase your creativity, technical expertise, and problem-solving abilities by building innovative robotic solutions that address real-world challenges. Collaborate with like-minded innovators, test your engineering skills under pressure, and compete with the brightest minds. Turn your ideas into intelligent machines that make a meaningful impact on the future.</p>
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
    q: "Core Science & Research Pathways",
    a: " For students who love discovery. Space robotics opens routes into planetary research, mission science, materials testing and exploration systems. They learn to ask sharper questions, design machines for extreme environments and work at the edge of what's known.",
  },
  {
    q: "Engineering & Technology Pathways",
    a: "This is where the robotics engineer career path begins. Students design and build automated systems, rovers, robotic arms, drones and aerospace hardware. These pathways connect directly to manufacturing, defence, healthcare technology, satellites and advanced engineering.",
  },
  {
    q: "Data, AI & Simulation Pathways",
    a: "For the ones who love to code. Machine learning, computer vision, autonomous navigation, digital twins and intelligent software — these are the AI and robotics careers redefining every industry. Students who start here learn to make physical robots think, adapt and act.",
  },
  {
    q: "Emerging & Interdisciplinary Pathways",
    a: "STEM careers for students expand when robotics meets people and impact. Biomedical engineering, assistive devices, smart cities, education technology and sustainability all need builders who can turn real problems into working solutions.",
  },
];

const CareerPathways = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="career-pathways-section career-pathways-section--robotics">
      <div className="container">
        <h2 className="career-pathways-title prog-section-title">
          <span className="career-pathways-badge">CAREER</span> PATHWAYS
        </h2>
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
   HOW TO CHOOSE THE RIGHT PATH (section 10)
========================================================= */

const CHOOSE_PATH_ITEMS = [
  {
    title: "Love Physics & Math?",
    points: ["Space research, Mission planning, Space systems"],
  },
  {
    title: "Love coding & AI?",
    points: ["Robot programming, AI robotics, Automation"],
  },
  {
    title: "Love building things?",
    points: ["Robotics engineering, Mechatronics, Aerospace robotics"],
  },
  {
    title: "Love people & impact?",
    points: ["Biomedical robotics, Assistive technology, STEM education"],
  },
];

const ChooseRightPath = () => (
  <section className="choose-path-section choose-path-section--robotics">
    <div className="container">
      <h2 className="choose-path-title prog-section-title">
        HOW TO <span className="choose-path-badge">CHOOSE</span> THE RIGHT PATH
      </h2>
      <div className="choose-path-grid">
        {CHOOSE_PATH_ITEMS.map((item) => (
          <article className="choose-card" key={item.title}>
            <h3 className="choose-card-title">{item.title}</h3>
            <span className="choose-card-consider">Consider</span>
            <ul className="choose-card-list">
              {item.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* =========================================================
   WHO ARE WE ASSOCIATED WITH
========================================================= */

// positions are in the same 1044 x 470 coordinate space as the SVG below,
// expressed as % so boxes and connector lines line up exactly
const ASSOC_TOP_Y = 13.3; // % (frame centre)
const ASSOC_BOTTOM_Y = 84.3;
// Partner detail data — drives the click-to-open modal. NOTE: logo-1
// (ISRO) and logo-5 (NASA) match the Space Science page; logos 2,3,4,6,7
// are different organisations here — verify the names/details below.
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
    name: "Partner 2",
    fullName: "Update this organisation's full name",
    location: "City, Country",
    website: "https://example.com",
    websiteLabel: "example.com",
    established: "—",
    description:
      "Add a short description for this robotics partner.",
    stats: [
      { icon: FaRocket, label: "Projects", value: "—", sub: "Update" },
      { icon: FaUsers, label: "Team", value: "—", sub: "Update" },
      { icon: FaGlobe, label: "Focus Areas", value: "—", sub: "Update" },
    ],
  },
  {
    logo: assocLogo3,
    x: 60.9,
    name: "Partner 3",
    fullName: "Update this organisation's full name",
    location: "City, Country",
    website: "https://example.com",
    websiteLabel: "example.com",
    established: "—",
    description:
      "Add a short description for this robotics partner.",
    stats: [
      { icon: FaRocket, label: "Projects", value: "—", sub: "Update" },
      { icon: FaUsers, label: "Team", value: "—", sub: "Update" },
      { icon: FaGlobe, label: "Focus Areas", value: "—", sub: "Update" },
    ],
  },
  {
    logo: assocLogo4,
    x: 84.3,
    name: "Partner 4",
    fullName: "Update this organisation's full name",
    location: "City, Country",
    website: "https://example.com",
    websiteLabel: "example.com",
    established: "—",
    description:
      "Add a short description for this robotics partner.",
    stats: [
      { icon: FaRocket, label: "Projects", value: "—", sub: "Update" },
      { icon: FaUsers, label: "Team", value: "—", sub: "Update" },
      { icon: FaGlobe, label: "Focus Areas", value: "—", sub: "Update" },
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
    name: "Partner 6",
    fullName: "Update this organisation's full name",
    location: "City, Country",
    website: "https://example.com",
    websiteLabel: "example.com",
    established: "—",
    description:
      "Add a short description for this robotics partner.",
    stats: [
      { icon: FaRocket, label: "Projects", value: "—", sub: "Update" },
      { icon: FaUsers, label: "Team", value: "—", sub: "Update" },
      { icon: FaGlobe, label: "Focus Areas", value: "—", sub: "Update" },
    ],
  },
  {
    logo: assocLogo7,
    x: 72.3,
    name: "Partner 7",
    fullName: "Update this organisation's full name",
    location: "City, Country",
    website: "https://example.com",
    websiteLabel: "example.com",
    established: "—",
    description:
      "Add a short description for this robotics partner.",
    stats: [
      { icon: FaRocket, label: "Projects", value: "—", sub: "Update" },
      { icon: FaUsers, label: "Team", value: "—", sub: "Update" },
      { icon: FaGlobe, label: "Focus Areas", value: "—", sub: "Update" },
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

/* Partner detail modal — identical layout to the Space Science page. */
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
        className="assoc-modal assoc-modal--robotics"
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
            {/* <img
              className="assoc-modal-logo"
              src={partner.logo}
              alt={partner.name}
            /> */}
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
    img: vettedMadison,
    name: "Madison C. Feehan",
    role: "Ex. NASA Engineer",
  },
  {
    img: vettedGeorge,
    name: "George Salazar",
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
      <div className="vetted-inner container">
        {/* Title at the TOP of the section */}
        <div className="vetted-right">
          <h2 className="vetted-title prog-section-title">
            <span className="vetted-title-badge">VETTED</span> BY
          </h2>
        </div>

        <div className="vetted-grid">
          {VETTED.map((m) => (
            <article className="vetted-card" key={m.name}>
              <div className="vetted-stage">
                <span
                  className="vetted-beam vetted-beam--left"
                  aria-hidden="true"
                />
                <span
                  className="vetted-beam vetted-beam--right"
                  aria-hidden="true"
                />
                <div
                  className="vetted-photo"
                  style={{ "--vetted-mask": `url(${m.img})` }}
                >
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
  { label: "DIY", img: modeDiyImg },
];

const ModesToJoin = () => (
  <section className="modes-section modes-section--robotics">
    <div className="container">
      <h2 className="modes-title prog-section-title">
        <span className="modes-title-badge">MODES</span> TO JOIN
      </h2>
      <p className="modes-subtitle prog-section-subtitle">More Than Just Robotics</p>
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
    title: "SPARC: Solar Panel Autonomous Robotic Cleaner",
    desc: "A semi-autonomous robot that cleans Mars-environment solar panels using microfiber cleaning and adaptive airflow. Energy-aware, fault-tolerant and mission-ready.",
    student: "Ansh, Areeba, Radhika & Iddhant",
    meta: "Class | Section",
    img: roboProject1,
  },
  {
    title: "Mars Solar Panel Cleaning Rover",
    desc: "An autonomous rover that navigates solar panel surfaces, removing Martian dust using a rotating brush — minimal power, zero surface damage.",
    student: " Leon, Oleg, Rasesh & Iniyan",
    meta: "Class | Section",
    img: roboProject2,
  },
  {
    title: "OSCAR: Autonomous Routing Cart",
    desc: "A cost-effective indoor navigation robot using sensor fusion — no camera, no LiDAR. One of the most ambitious real-world robotics projects for school students in Dubai.",
    student: "Saptaparna & Josh ",
    meta: "Class | Section",
    img: roboProject3,
  },
    {
    title: "Smart Line-Following Robot",
    desc: "Infrared sensors. Arduino programming. Autonomous movement. A standout among student robotics projects that shows what focused engineering looks like. ",
    student: "Ishaan",
    meta: "Class | Section",
    img: roboProject4,
  },
  {
    title: "Smart Space Helmet",
    desc: "3D-designed in Tinkercad, fitted with real temperature and humidity sensors. A wearable prototype that bridges design, electronics and space science.",
    student: "Yatika Kesari",
    meta: "Class | Section",
    img: roboProject5,
  },
  {
    title: "Sumo Fighting Robot",
    desc: "ESP32-powered. Mobile-controlled. Competition-ready. Built from scratch — a real engineering challenge that proves robotics projects for kids can be seriously impressive.",
    student: "Ashirwad",
    meta: "Class | Section",
    img: roboProject6,
  },
];

const StudentProjects = () => (
  <section className="projects-section projects-section--robotics">
    <div className="container">
      <h2 className="projects-title prog-section-title">
        <span className="projects-title-badge">STUDENT</span> PROJECTS
      </h2>
      <p className="projects-subtitle prog-section-subtitle">They don&apos;t just learn. They build.</p>
      <p className="projects-desc">
        Whether you&apos;re learning from home or inside our lab, every
        student follows a mission path built around real robotics projects
        for kids &mdash; <br/>not textbook exercises.
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
          <span className="projects-stat-num">150+</span>
          <span className="projects-stat-lbl">Projects Completed</span>
        </div>
        <div className="projects-stat">
          <span className="projects-stat-num">50+</span>
          <span className="projects-stat-lbl">Prototypes Built</span>
        </div>
        <div className="projects-stat">
          <span className="projects-stat-num">100%</span>
          <span className="projects-stat-lbl">Curiosity Powered</span>
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
    title: "Real-World\nProblem Solving",
    desc: "The benefits of robotics education become real when students build solutions for safety, water, energy, accessibility and exploration. You'll tackle challenges the world actually needs solved.",
  },
  {
    icon: impactIcon2,
    title: 'The "Maker"\nMindset',
    desc: "Every discovery over tools like this STEM learning outcomes ecosystem and maker methodology prototyping.",
  },
  {
    icon: impactIcon3,
    title: "Measurable\nGrowth",
    desc: "Walk away with more than just a certificate—you'll have a portfolio of working prototypes that prove your skills to the world.",
  },
];

const ProjectImpact = () => (
  <section className="impact-section impact-section--robotics">
    <div className="container">
      <div className="impact-head">
        <h2 className="impact-title prog-section-title">
          <span className="impact-title-badge">PROJECT</span> IMPACT
        </h2>
        <p className="impact-subtitle prog-section-subtitle"> What They Build Here, They Carry Forever.</p>
        <p className="impact-desc">
          Science isn't just about reading, it's about living it. Every project at Lab of Future is a new chance for a student's curiosity to discover.

        </p>
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

/* =========================================================
   FAQ — Frequently Asked Questions (two-column accordion)
========================================================= */

const FAQ_ROBOTICS = [
  {
    q: "Why should kids learn robotics early?",
    a: "Kids should learn robotics early because it turns curiosity into creation. They do not just use technology; they build it, test it, improve it, and understand how machines solve real-world problems. ",
  },
  {
    q: "What makes Lab of Future different from other robotics programs?",
    a: "We combine robotics, space missions, coding, engineering, teamwork, and project-based learning. Students build real prototypes instead of only following theory, making every class feel like a mission. ",
  },
  {
    q: "What is the right age to start robotics for kids?",
    a: " Children can begin robotics from age 6. We support age groups 6–7, 8–10, 11–14, 15–18, and 18+, with each level designed for the learner’s stage. ",
  },
  {
    q: "Is there an age-based STEM robotics learning path?",
    a: "Yes. The programme follows an age-wise pathway where students move from simple machines and visual logic to sensors, coding, autonomous systems, AI integration, and advanced robotics portfolios. ",
  },
  {
    q: "What skills does robotics teach children?",
    a: "Robotics teaches critical thinking, coding, electronics, design, teamwork, communication, debugging, creativity, and problem-solving. Students learn how to build, test, fail, improve, and explain their ideas clearly. ",
  },
  {
    q: "Do children get a certificate after completing the robotics course?",
    a: "Yes. Students receive certificates that recognise participation, project work, skill growth, and course completion. These certificates help showcase progress and learning outcomes. ",
  },
  {
    q: "Why are robotics skills important for future jobs?",
    a: "Robotics skills are important because future industries will depend on automation, AI, smart machines, sensors, drones, space systems, and intelligent devices. Students who learn robotics early gain a strong future-ready foundation.",
  },
  {
    q: "What are the benefits of robotics competitions for students?",
    a: "Robotics competitions build confidence, teamwork, quick thinking, resilience, technical discipline, and presentation skills. Students learn to solve challenges under pressure and improve their ideas through real testing. ",
  },
  {
    q: "What career paths are available after learning robotics?",
    a: "Robotics can lead to careers in robotics engineering, aerospace, AI, automation, software engineering, electronics, drones, IoT, biomedical engineering, research, entrepreneurship, and space technology. ",
  },
  {
    q: "How do I know if robotics is right for my child?",
    a: "Robotics may be right for a child who enjoys building, experimenting, solving puzzles, asking how things work, coding, designing, or creating models. Curiosity is the best starting point. ",
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
   SMALL ROBOT — interactive GLB for the CTA left stage.
   Auto-rotates slowly; drag to spin freely.
========================================================= */

const SmallRobotModel = () => {
  const { scene } = useGLTF(smallRobotUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { centeredScene, fitScale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { centeredScene: cloned, fitScale: 4.0 / maxDim };
  }, [cloned]);

  return (
    <group scale={fitScale}>
      <primitive object={centeredScene} />
    </group>
  );
};

const SmallRobotCanvas = () => (
  <Canvas
    gl={{ alpha: true, antialias: true }}
    style={{ width: "100%", height: "100%" }}
    camera={{ position: [0, 0, 6], fov: 38, near: 0.1, far: 100 }}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.35} color="#dce8ff" />
      <directionalLight position={[4, 6, 4]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, 3, 2]} intensity={0.4} color="#c8d8f0" />
      <Environment preset="city" background={false} environmentIntensity={0.45} />
      <SmallRobotModel />
      {/* Ground contact shadow — blurred disc beneath the robot's feet */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.45}
        scale={4}
        blur={2.2}
        far={2.5}
        color="#1d3b8a"
      />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.9}
        autoRotate
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
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
          Every great engineer started somewhere. We set up the foundation — and the tools to shape the world.
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
   ASTRONAUT HIT AREA
   Small fixed-position div that follows the floating astronaut's screen
   coords. The astro-layer Canvas has pointerEvents:'none' (so the hero
   asteroids/Earth still receive clicks), and this div takes the pointer
   drag events instead and writes into __astroUserYaw / __astroUserPitch.
========================================================= */

const AstroHitArea = () => {
  const ref = useRef();
  const dragState = useRef({ active: false, x: 0, y: 0 });

  useEffect(() => {
    if (!window.__astroScreen) {
      window.__astroScreen = { x: -9999, y: -9999, visible: false };
    }
    let raf;
    const SIZE = 160;
    const loop = () => {
      const el = ref.current;
      const s = window.__astroScreen;
      if (el && s) {
        const x = s.x - SIZE / 2;
        const y = s.y - SIZE / 2;
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.opacity = s.visible ? "1" : "0";
        el.style.pointerEvents = s.visible ? "auto" : "none";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const FACTOR = 0.0035;

  const onPointerDown = (e) => {
    e.stopPropagation();
    dragState.current.active = true;
    dragState.current.x = e.clientX;
    dragState.current.y = e.clientY;
    try { e.target.setPointerCapture?.(e.pointerId); } catch {}
    document.body.style.cursor = "grabbing";
  };
  const onPointerMove = (e) => {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.x;
    const dy = e.clientY - dragState.current.y;
    dragState.current.x = e.clientX;
    dragState.current.y = e.clientY;
    if (window.__astroUserYaw) window.__astroUserYaw.current += dx * FACTOR;
    if (window.__astroUserPitch) window.__astroUserPitch.current += dy * FACTOR;
  };
  const onPointerUp = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    try { e?.target?.releasePointerCapture?.(e.pointerId); } catch {}
    document.body.style.cursor = "";
  };

  return (
    <div
      ref={ref}
      className="astro-hit-area"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerOver={() => {
        if (!dragState.current.active) document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        if (!dragState.current.active) document.body.style.cursor = "";
      }}
    />
  );
};

const SpaceRobotics = () => {
  const { openEnquiry } = useEnquiryModal();

  // Tag <body> so the shared header CTA can use this page's dark-btn.svg
  // (the global .header-btn class otherwise gets overridden by whichever
  // program-page CSS loads last in the bundle).
  useEffect(() => {
    document.body.classList.add("space-robotics");
    return () => document.body.classList.remove("space-robotics");
  }, []);

  // Zeb is a page-wide travelling robot choreographed for wide desktop
  // layouts — on mobile/tablet/laptop widths his landing spots collide
  // with section content (age cards, headings, etc.), so he's dropped
  // from the DOM entirely at or below the laptop breakpoint.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 1280
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1280);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="space-robotics-page">
      <ScrollProgressBar />
      <BackToTopButton />
      <SEO
        title={`Space Robotics | ${siteConfig.title}`}
        description="Lab of Future — Space Robotics: build, program, and command the autonomous machines that explore space."
        url={`${siteConfig.url}/students/space-robotics`}
        image={siteConfig.socialImage}
        keywords={["Space Robotics", "Robotics", "AI", "STEM"]}
      />

      {!isMobile && (
        <>
          {/* Fixed full-page Zeb layer — pointerEvents:none so it never
              intercepts page clicks. Drag interaction is handled by the
              separate <ZebHitArea /> div rendered below.*/}

          <div
            id="zeb-travel-layer"
            style={{
              position: "fixed",
              inset: 0,
              pointerEvents: "none",
              zIndex: 50,
              opacity: 0,
            }}
          >
            <Canvas
              gl={{ alpha: true, antialias: true }}
              style={{
                background: "transparent",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
              camera={{ position: [0, 0, 7], fov: 32, near: 0.1, far: 100 }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.42} color="#2a4fa8" />
                <directionalLight position={[3, 5, 4]} intensity={0.65} color="#ffffff" />
                <directionalLight position={[-4, 2, 2]} intensity={0.5} color="#3060c8" />
                <pointLight position={[-2, -1, -3]} intensity={1.0} distance={10} decay={2} color="#1d3b8a" />
                <Environment preset="apartment" background={false} environmentIntensity={0.6} />
                <ZebTraveler />
              </Suspense>
            </Canvas>
          </div>

          {/* Transparent hit-area that tracks Zeb's screen position and
              forwards horizontal drag deltas for yaw rotation. Rendered
              outside the canvas layer so it receives normal DOM events. */}
          <ZebHitArea />
        </>
      )}

      {/* (Astronaut layer removed — Space Robotics uses the interactive
         robot character inside the hero canvas instead.) */}

      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-flare" />

        <HeroText />

        <Canvas
          className="hero-canvas"
          {...canvasPerf}
          camera={{
            position: [0, 0.2, 6.5],
            fov: 42,
            near: 0.1,
            far: 100,
          }}
        >
          <Suspense fallback={null}>
            {/* Bright studio lighting — multiple direct lights + the
                studio HDRI together brighten the robot and give it
                crisp highlights without washing out the panel detail. */}
            <ambientLight intensity={0.95} color="#ffffff" />
            <directionalLight
              position={[5, 6, 5]}
              intensity={3.0}
              color="#ffffff"
            />
            <directionalLight
              position={[-6, 4, 3]}
              intensity={2.2}
              color="#e8eef7"
            />
            <directionalLight
              position={[0, -3, -6]}
              intensity={1.4}
              color="#c8d4e6"
            />
            <pointLight
              position={[0, 2, 4]}
              intensity={2.6}
              distance={16}
              decay={2}
              color="#ffffff"
            />
            <pointLight
              position={[3, -1, 4]}
              intensity={1.6}
              distance={12}
              decay={2}
              color="#cfe0ff"
            />

            {/* Studio HDRI for image-based lighting + rich reflections
               on the robot's metallic surfaces. */}
            <Environment preset="studio" background={false} />

            <RoboticsRobot />

            {/* Butter-smooth drag-to-rotate + slow auto-rotation. */}
            <OrbitControls
              makeDefault
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.9}
              autoRotate
              autoRotateSpeed={0.6}
              minPolarAngle={Math.PI / 2.6}
              maxPolarAngle={Math.PI / 1.8}
            />
          </Suspense>
        </Canvas>

        <div className="hero-vignette" />

        <div className="hero-bottom-fade" />
      </section>

      <WhySpaceScience />

      <HandsRevealSection />



      <AgePrograms />

      <StudentsLearn />

      <Certificates />

      <div className="space-careers-wrapper space-careers-wrapper--robotics">
        <div className="space-careers-content">
          <WhySpaceForCareers />
          <Competitions />
        </div>
      </div>

      {/* FAQ + Choose Path — shared animated background */}
      <div className="faq-section-wrapper">
        <div className="faq-bg-anim" />
        <div className="faq-bg-overlay" />
        <div className="faq-section-content">
          <CareerPathways />
          <ChooseRightPath />
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

      <FaqRobotics />

      <CtaRobotics />

      <ExplorePrograms />

    </div>
  );
};

// Hero-critical models — load immediately so the first viewport renders fast.
useGLTF.preload(robotCharacterUrl);
useGLTF.preload(zebUrl);

// CTA small robot — defer so it doesn't compete with hero assets.
setTimeout(() => useGLTF.preload(smallRobotUrl), 1500);

export default SpaceRobotics;
