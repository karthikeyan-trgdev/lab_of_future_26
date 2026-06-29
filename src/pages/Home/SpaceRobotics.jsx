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

import certificateUrl from "../../assets/programs/space-robotics/certificate.png";

import learnThinkCritically from "../../assets/programs/space-robotics/what-students-learn/image-1.png";
import learnUnderstandWorld from "../../assets/programs/space-robotics/what-students-learn/image-2.png";
import learnBuildModels from "../../assets/programs/space-robotics/what-students-learn/image-3.png";
import learnUseTools from "../../assets/programs/space-robotics/what-students-learn/image-4.png";
import learnCommunicate from "../../assets/programs/space-robotics/what-students-learn/image-5.png";
import learnWorkTeams from "../../assets/programs/space-robotics/what-students-learn/image-6.png";
import learnSolveProblems from "../../assets/programs/space-robotics/what-students-learn/image-7.png";

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

import modeOnsiteImg from "../../assets/modes-to-join/onsite.png";
import modeOnlineImg from "../../assets/modes-to-join/online.png";
import modeDiyImg from "../../assets/modes-to-join/diy.png";
import projectImg from "../../assets/projects/project-1.png";
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

  return (
    <group scale={fitScale} position={[0, -3.5, 0]}>
      <primitive object={centeredScene} />
    </group>
  );
};

/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhySpaceScience = () => (
  <section className="why-section why-section--robotics">
    <div className="why-container container">
      <div className="why-left">
        <h2 className="why-title prog-section-title">
          <span className="why-badge">WHY</span>
          <span className="why-title-bold">SPACE ROBOTICS</span>
        </h2>
        <p className="why-desc">
          Space is no longer the final frontier &mdash; it&apos;s the next
          workplace. Rovers explore Mars. Robotic arms repair satellites.
          Autonomous systems go where humans can&apos;t.
        </p>
        <p className="why-desc">
          At Lab of Future, the space robotics program don&apos;t just teach
          technology, they run missions. Every class is hands-on. Every
          project is real. The benefits of robotics for kids go far beyond
          screens &mdash; logic, resilience, creativity and the confidence
          to build what comes next.
        </p>
        <div className="why-cta-row">
          <NavLink to="/student-portal" className="why-btn why-btn--primary">
            Enroll Now
          </NavLink>
          <NavLink to="/contact" className="why-btn why-btn--secondary">
            Book a Demo
          </NavLink>
        </div>
      </div>

      {/* Right column — kept for grid layout.  Zeb is rendered
          in the page-wide fixed canvas (#zeb-travel-layer) and
          positioned here via scroll-driven DOM rect sampling. */}
      <div className="why-right" />
    </div>
  </section>
);

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
        tx = sx2wx(wr.left + wr.width  / 2);
        ty = sy2wy(wr.top  + wr.height / 2);
        targetScale = fs * 0.72;
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
            Early <strong>STEM education in Dubai</strong> gives children a head
            start. Robotics for young children builds{" "}
            <strong>logic, patience and courage</strong> — the earlier they
            start, the further they go.
          </p>
        </div>

        <div className="hands-col">
          <h2 className="hands-title prog-section-title">
            WHAT DOES LOF <span className="hands-badge">DO?</span>
          </h2>
          <p className="hands-desc">
            LOF transforms curiosity into capability. Students move from
            consuming facts to building models, asking questions,
            experimenting, presenting ideas.
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
    label: "Ages 6–7",
    points: [
      "First contact with robots. Kids explore movement, motors, wheels and lights.",
      "These age-based robotics classes in Dubai build curiosity, observation and early problem-solving from day one.",
    ],
  },
  {
    label: "Ages 8–10",
    points: [
      "Working models, visual programming, circuits and sensors.",
      "They start testing, debugging and tackling real creative challenges with growing confidence.",
    ],
  },
  {
    label: "Ages 11–14",
    points: [
      "Advanced sensors, actuators, robotic arms and autonomous systems.",
      "Text-based coding begins. Data drives every decision.",
      "This is where the robotics curriculum for kids gets serious.",
    ],
  },
  {
    label: "Ages 15–18",
    points: [
      "AI-integrated robotics, embedded programming and IoT.",
      "Competition-ready builds, portfolio projects and engineering thinking that prepares them for what comes next.",
    ],
  },
  {
    label: "Ages 18+",
    points: [
      "Research-led prototyping with industry tools.",
      "Advanced automation, AI robotics and product development for students heading into higher education, internships or startups.",
    ],
  },
];

// Section 3 — pinned while scrolling: the Earth box (and the astronaut
// inside it) zoom up to fill the screen, then it scrolls away into the
// age-cards section.
const LofProgram = () => {
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

            <NavLink
              to="/programs"
              className="glass-btn glass-btn--light header-btn"
              style={{ marginTop: "var(--space-s)" }}
            >
              ENROLL NOW
            </NavLink>
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
  { label: "Think critically", img: learnThinkCritically },
  { label: "Understand how the world works", img: learnUnderstandWorld },
  { label: "Build scientific models", img: learnBuildModels },
  { label: "Use tools and technology", img: learnUseTools },
  { label: "Communicate ideas clearly", img: learnCommunicate },
  { label: "Work in teams", img: learnWorkTeams },
  { label: "Solve unfamiliar problems", img: learnSolveProblems },
];

const StudentsLearn = () => (
  <section className="learn-section">
    <div className="container">
      <h2 className="learn-title prog-section-title">
        WHAT WILL STUDENTS <span className="learn-badge">LEARN?</span>
      </h2>
      <p className="learn-sub">How to think &mdash; not just what to remember.</p>

      <div className="learn-grid">
        {LEARN_ITEMS.map((it) => (
          <article className="learn-card" key={it.label}>
            <img className="learn-card-img" src={it.img} alt={it.label} />
            <span className="learn-card-label">{it.label}</span>
          </article>
        ))}
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam illo ea blanditiis distinctio quis magni enim quisquam laudantium quam eligendi? Accusamus fuga distinctio, quo rem laboriosam eum enim, aspernatur, pariatur quasi tempora aut blanditiis architecto! Excepturi expedita.</p>
        <ul className="cert-robotics-list">
          <li>
            Level-based <strong>robotics certification for kids</strong> tied to
            real project performance.
          </li>
          <li>
            <strong>STEM certificates for children</strong> who build, not just
            attend.
          </li>
        </ul>
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
        Robotics teaches the future workforce skills.
        <br />
        Even if students never become engineers, they gain:
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
        <br />
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
    desc: "This builds participation before external contests.",
  },
  {
    icon: olympiadIcon,
    title: "Olympiad & National Competition Readiness",
    desc: "This builds participation before external contests.",
  },
  {
    icon: portfolioIcon,
    title: "Portfolio-Based Competitions",
    desc: "Students submit projects, prototypes, coding tools, research posters",
  },
  {
    icon: recognitionIcon,
    title: "Recognition Ecosystem",
    desc: "Children will get visible progress",
  },
];

const Competitions = () => (
  <section className="competitions-section competitions-section--robotics">
    <div className="competitions-inner container">
      <div className="competitions-left">
        <div className="competitions-heading">
          <h2 className="competitions-label-text">
            <span className="competitions-label-badge">COMPETITIONS</span>
          </h2>
          <p className="competitions-subtitle prog-section-subtitle">
            Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build. Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build. Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build.Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build.Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build.
          </p>
          <NavLink
          to="/programs"
          className="glass-btn glass-btn--light header-btn"
          style={{ marginTop: "var(--space-s)" }}
        >
          ENROLL NOW
        </NavLink>
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

/* =========================================================
   CAREER PATHWAYS — FAQ ACCORDION (section 9)
========================================================= */

const FAQ_ITEMS = [
  {
    q: "Core Science & Research Pathways",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
  },
  {
    q: "Engineering & Technology Pathways",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis.",
  },
  {
    q: "Data, AI & Simulation Pathways",
    a: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim.",
  },
  {
    q: "Emerging & Interdisciplinary Pathways",
    a: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident similique sunt.",
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
    points: ["Astrophysics", "Aerospace", "Astrodynamics"],
  },
  {
    title: "Love coding & AI?",
    points: ["Space Data Science", "Simulation"],
  },
  {
    title: "Love building things?",
    points: ["Robotics", "Satellite Engineering"],
  },
  {
    title: "Love people & impact?",
    points: ["Policy", "Education", "Communication"],
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
const ASSOC_TOP = [
  { logo: assocLogo1, x: 15.8 },
  { logo: assocLogo2, x: 39.3 },
  { logo: assocLogo3, x: 60.9 },
  { logo: assocLogo4, x: 84.3 },
];
const ASSOC_BOTTOM = [
  { logo: assocLogo5, x: 27.8 },
  { logo: assocLogo6, x: 50 },
  { logo: assocLogo7, x: 72.3 },
];

const AssocBox = ({ logo, x, y }) => (
  <div className="assoc-box" style={{ left: `${x}%`, top: `${y}%` }}>
    <div className="assoc-box-frame">
      <img
        className="assoc-box-logo"
        src={logo}
        alt="Associated organisation"
      />
    </div>
    <img
      className="assoc-box-light"
      src={assocLightRobotics}
      alt=""
      aria-hidden="true"
    />
  </div>
);

const Associated = () => (
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
        <AssocBox key={`t${i}`} logo={b.logo} x={b.x} y={ASSOC_TOP_Y} />
      ))}

      <div className="assoc-center-box" style={{ left: "50%", top: "51.8%" }}>
        <img src={lofLogo} alt="Lab of Future" />
      </div>

      {ASSOC_BOTTOM.map((b, i) => (
        <AssocBox key={`b${i}`} logo={b.logo} x={b.x} y={ASSOC_BOTTOM_Y} />
      ))}
    </div>
  </section>
);

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
    title: "Project 1",
    desc: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "Project 2",
    desc: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "Project 3",
    desc: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    student: "Student Name",
    meta: "Class | Section",
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
        for kids &mdash; not textbook exercises.
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
                    src={projectImg}
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
    desc: "You won't just learn theory; you'll tackle challenges like Mars habitat design, satellite communication, and climate modeling.",
  },
  {
    icon: impactIcon2,
    title: 'The "Maker"\nMindset',
    desc: "Gain mastery over tools like AI-driven simulation, robotic engineering, and 3D prototyping.",
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
        <p className="impact-subtitle prog-section-subtitle">From Curiosity to Capability</p>
        <p className="impact-desc">
          Science isn&apos;t just about reading; it&apos;s about doing. Every
          project at Lab of Future is designed to take you from a curious
          observer to an active builder.
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
    a: "Robotics builds logic, patience and confidence at an age when children's brains are most adaptive. Hands-on building turns abstract concepts into intuition, and the earlier they start, the sooner they can tackle real projects.",
  },
  {
    q: "What makes Lab of Future different from other robotics programs?",
    a: "Every class is project-led, not lecture-led. Students don't just learn parts — they design, build and present working systems. Our curriculum is mentor-driven, age-staged, and aligned with real industry skills.",
  },
  {
    q: "What is the right age to start robotics for kids?",
    a: "Curiosity-led play can begin from age 6 with simple builds and observation activities. Structured robotics with sensors and code typically begins around age 8, with deeper engineering tracks from age 11 onward.",
  },
  {
    q: "Is there an age-based STEM robotics learning path?",
    a: "Yes. Our curriculum is split into four age bands (6–7, 8–10, 11–14, 15–18). Each band has its own concepts, tools and project complexity so progress always matches the child's stage of development.",
  },
  {
    q: "What skills does robotics teach children?",
    a: "Logical thinking, design thinking, mechanical reasoning, basic electronics and code, teamwork, presenting ideas, and the resilience to debug something that didn't work the first time.",
  },
  {
    q: "Do children get a certificate after completing the robotics course?",
    a: "Yes. Students earn level-based completion certificates and skill badges tied to real project performance — recognised across the Lab of Future learning ecosystem.",
  },
  {
    q: "Why are robotics skills important for future jobs?",
    a: "Most future roles — even outside engineering — will involve interpreting data from machines, working alongside automation, or designing intelligent systems. Robotics is the most hands-on way to build the underlying instincts.",
  },
  {
    q: "What are the benefits of robotics competitions for students?",
    a: "Competitions push children to ship — to a deadline, against constraints, in front of judges. They build pressure tolerance, teamwork under stress, and a portfolio of real outcomes they can show schools and mentors.",
  },
  {
    q: "What career paths are available after learning robotics?",
    a: "Robotics opens the door to mechatronics, AI/ML, autonomous systems, aerospace, biomedical devices, space robotics, simulation engineering, and design — and adjacent fields like product management and industrial design.",
  },
  {
    q: "How do I know if robotics is right for my child?",
    a: "If your child likes building, taking things apart, asking how things work, or solving puzzles — robotics will give them a structured outlet for all of it. Most parents notice a step-change in confidence within a few months.",
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

const CtaRobotics = () => (
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
          Give your child more than knowledge. Give them direction, confidence,
          and capability &mdash; and the tools to shape the world beyond our
          planet.
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
   SITE FOOTER
========================================================= */

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="site-footer-inner container">
      {/* horizontal row: logo + 4 named columns */}
      <div className="site-footer-row">
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

      {/* Fixed full-page Zeb layer — pointerEvents:none so it never
          intercepts page clicks. Drag interaction is handled by the
          separate <ZebHitArea /> div rendered below. */}
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

      <SiteFooter />
    </div>
  );
};

// Hero-critical models — load immediately so the first viewport renders fast.
useGLTF.preload(robotCharacterUrl);
useGLTF.preload(zebUrl);

// CTA small robot — defer so it doesn't compete with hero assets.
setTimeout(() => useGLTF.preload(smallRobotUrl), 1500);

export default SpaceRobotics;
