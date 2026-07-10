// Home.jsx

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Clone,
  Environment,
  Stars,
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import { motion } from "framer-motion";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
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

import certificateUrl from "../../assets/certificate.png";

import learnThinkCritically from "../../assets/students/students-learn/think-critically.png";
import learnUnderstandWorld from "../../assets/students/students-learn/understand-how-the-world-works.png";
import learnBuildModels from "../../assets/students/students-learn/build-scientific-models.png";
import learnUseTools from "../../assets/students/students-learn/use-tools-and-technology.png";
import learnCommunicate from "../../assets/students/students-learn/communicate-ideas-clearly.png";
import learnWorkTeams from "../../assets/students/students-learn/work-in-teams.png";
import learnSolveProblems from "../../assets/students/students-learn/solve-unfamilliere-problems.png";

// Gallery images for the learn-card sliders (2 per card; #15 unused).
import learnGallery1 from "../../assets/students/students-learn/space-astronomy-learning-gallery-1.webp";
import learnGallery2 from "../../assets/students/students-learn/space-astronomy-learning-gallery-2.webp";
import learnGallery3 from "../../assets/students/students-learn/space-astronomy-learning-gallery-3.webp";
import learnGallery4 from "../../assets/students/students-learn/space-astronomy-learning-gallery-4.webp";
import learnGallery5 from "../../assets/students/students-learn/space-astronomy-learning-gallery-5.webp";
import learnGallery6 from "../../assets/students/students-learn/space-astronomy-learning-gallery-6.webp";
import learnGallery7 from "../../assets/students/students-learn/space-astronomy-learning-gallery-7.webp";
import learnGallery8 from "../../assets/students/students-learn/space-astronomy-learning-gallery-8.webp";
import learnGallery9 from "../../assets/students/students-learn/space-astronomy-learning-gallery-9.webp";
import learnGallery10 from "../../assets/students/students-learn/space-astronomy-learning-gallery-10.webp";
import learnGallery11 from "../../assets/students/students-learn/space-astronomy-learning-gallery-11.webp";
import learnGallery12 from "../../assets/students/students-learn/space-astronomy-learning-gallery-12.webp";
import learnGallery13 from "../../assets/students/students-learn/space-astronomy-learning-gallery-13.webp";
import learnGallery14 from "../../assets/students/students-learn/space-astronomy-learning-gallery-14.webp";

import astronautUrl from "./models/astronaut.glb?url";
import earthUrl from "./models/neptune.glb?url";
import satelliteUrl from "./models/satellite.glb?url";
import asteroidsUrl from "./models/astroids.glb?url";
import bigAsteroidUrl from "./models/big-asteroid.glb?url";
// earth3.glb ships without embedded diffuse textures (renders as a flat
// white sphere). Use the same model the main scene uses — it has proper
// textures baked in.
import earth3Url from "./models/earth-new.glb?url";
import moonSmallUrl from "./models/moon_small.glb?url";
import marsUrl from "./models/mars.glb?url";

import modeOnsiteImg from "../../assets/modes-to-join/onsite.png";
import modeOnlineImg from "../../assets/modes-to-join/online.png";
import modeDiyImg from "../../assets/modes-to-join/diy.png";
import projectImg from "../../assets/projects/project-1.png";
import impactIcon1 from "../../assets/icons/project-impact-icon-1.png";
import impactIcon2 from "../../assets/icons/project-impact-icon-2.png";
import impactIcon3 from "../../assets/icons/project-impact-icon-3.png";
import futureVideoUrl from "../../assets/astronaut-video.mp4";

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
import skullIcon from "../../assets/future-career/skull.svg";
import competitionFrame from "../../assets/comp-frame.png";

import assocLight from "../../assets/assocoated-section/associated-client-frame-lighting.svg";
import lofLogo from "../../assets/Logo/log-header-logo.svg";
import assocLogo1 from "../../assets/assocoated-section/logo-1.png";
import assocLogo2 from "../../assets/assocoated-section/logo-2.png";
import assocLogo3 from "../../assets/assocoated-section/logo-3.png";
import assocLogo4 from "../../assets/assocoated-section/logo-4.png";
import assocLogo5 from "../../assets/assocoated-section/logo-5.png";
import assocLogo6 from "../../assets/assocoated-section/logo-6.png";
import assocLogo7 from "../../assets/assocoated-section/logo-7.png";

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
import vettedGeorge from "../../assets/vetted-team/george.png";
import vettedMadison from "../../assets/vetted-team/madison.png";
import vettedDavid from "../../assets/vetted-team/david.png";
import vettedVitali from "../../assets/vetted-team/vitali.png";

const EARTH_URL = earthUrl;
const ASTRONAUT_URL = astronautUrl;
const SATELLITE_URL = satelliteUrl;
const ASTEROIDS_URL = asteroidsUrl;
const BIG_ASTEROID_URL = bigAsteroidUrl;
const EARTH3_URL = earth3Url;
const MOON_SMALL_URL = moonSmallUrl;
const MARS_URL = marsUrl;

/* Shared mobile-viewport flag — phones strip the heavy scroll
   animations (LOF zoom, community planet reveal) for a calmer,
   lighter page. */
const useIsMobile = (query = "(max-width: 640px)") => {
  const [m, setM] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = (e) => setM(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return m;
};

/* =========================================================
   EARTH
========================================================= */

const EARTH_DIAMETER = 50;
const EARTH_POSITION = [10, -1, -10];

const Earth = () => {
  const spinRef = useRef();

  const gltf = useGLTF(EARTH_URL);

  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  const drag = useRef({ active: false });

  // horizontal spin only (yaw, driven by X drag)
  const stepY = useRef(0);

  // momentum after release
  const velY = useRef(0);

  const fit = useMemo(() => {
    const sphere = new THREE.Sphere();

    new THREE.Box3().setFromObject(scene).getBoundingSphere(sphere);

    const scale = EARTH_DIAMETER / (sphere.radius * 2 || 2);

    return {
      scale,
      offset: [
        -sphere.center.x * scale,
        -sphere.center.y * scale,
        -sphere.center.z * scale,
      ],
    };
  }, [scene]);

  useFrame(() => {
    const g = spinRef.current;

    if (!g) return;

    if (drag.current.active) {
      g.rotation.y += stepY.current;
      stepY.current = 0;
    } else {
      // idle slow spin + glide from the last throw
      g.rotation.y += velY.current + 0.0008;
      velY.current *= 0.94;
    }
  });

  const onDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture?.(e.pointerId);
    drag.current.active = true;
    document.body.style.cursor = "grabbing";
  };

  const onMove = (e) => {
    if (!drag.current.active) return;

    e.stopPropagation();

    const dx = e.nativeEvent.movementX || 0;

    stepY.current += dx * 0.005;
    velY.current = dx * 0.005;
  };

  const onUp = (e) => {
    e.stopPropagation();
    e.target.releasePointerCapture?.(e.pointerId);
    drag.current.active = false;
    document.body.style.cursor = "";
  };

  return (
    <group position={EARTH_POSITION}>
      <group ref={spinRef}>
        <primitive
          object={scene}
          scale={fit.scale}
          position={fit.offset}
          frustumCulled={false}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerOver={() => {
            if (!drag.current.active) document.body.style.cursor = "grab";
          }}
          onPointerOut={() => {
            if (!drag.current.active) document.body.style.cursor = "";
          }}
        />
      </group>
    </group>
  );
};

/* =========================================================
   STARFIELD
========================================================= */

const StarField = () => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.x += delta * 0.003;
  });

  return (
    <group ref={ref}>
      <Stars
        radius={260}
        depth={80}
        count={7000}
        factor={2.2}
        saturation={0}
        fade
        speed={0.4}
      />

      <Stars
        radius={180}
        depth={50}
        count={900}
        factor={5}
        saturation={0}
        fade
        speed={0.7}
      />
    </group>
  );
};

/* =========================================================
   ASTRONAUT
========================================================= */
const ASTRONAUT_SCALE = 1.8;
const ASTRONAUT_Z = 1.2;
// vertical baseline — counteracts the upward lift baked into the
// floating animation so the body sits at true viewport center
const ASTRONAUT_Y = -2.4;

// hero-only framing — applied at full strength while the hero is on screen
// and faded out over leg 1 so the rest of the journey is untouched
const HERO_ASTRO_SCALE_MUL = 0.78;
const HERO_ASTRO_Y_LIFT = 0.9;

// section-3 (LOF program) landing spot — astronaut flies to the LEFT here
const LOF_ASTRO_SCALE = 2.0; // size inside the framed panel (at rest)
const LOF_ASTRO_Y_NUDGE = -3.5; // push down so head/torso show and legs clip at the bottom
const LOF_FRAME_BORDER = 2; // px — must match the CSS frame border thickness
const LOF_FRAME_RADIUS = 16; // px — inner corner radius for the clip

// size when the box is fully zoomed (head + upper body, like the rest box)
const ZOOM_ASTRO_SCALE = 2.0;

const AGE_ASTRO_SCALE = 0.7; // small astronaut over the cards / learn sections
const AGE_ASTRO_MARGIN = 0.1; // inset from a section's edge (fraction)

/* =========================================================
   SCENE LIGHTS — blue "space" rig everywhere, but the blue
   environment tint is removed (neutral light) while the
   certificates section is in view
========================================================= */

const SceneLights = () => {
  const ambientRef = useRef();
  const dir1Ref = useRef();
  const dir2Ref = useRef();
  const dir3Ref = useRef();
  const { scene } = useThree();

  // base = cinematic blue space rig (matches the banner photo),
  // neutral = blue removed (cert),
  // red = warm red shade matching the competitions nebula background
  const palette = useMemo(
    () => ({
      base: {
        ambient: new THREE.Color("#1c356e"),
        dir1: new THREE.Color("#cfe6ff"), // bright sun-blue key
        dir2: new THREE.Color("#7fb6ff"), // secondary blue fill
        dir3: new THREE.Color("#2a5fff"), // deep cobalt rim
        env: 2.2,
      },
      neutral: {
        // realistic, lightly warm suit lighting (used for cert + post-hero)
        ambient: new THREE.Color("#3a3a3c"),
        dir1: new THREE.Color("#fff2dc"),
        dir2: new THREE.Color("#f4f6fa"),
        dir3: new THREE.Color("#c7c2b6"),
        env: 0.55,
      },
      // dark, moody steel-blue rig matching the modes-to-join /
      // students-project nebula backdrops (deep navy with cool highlights)
      nebula: {
        ambient: new THREE.Color("#0a1830"),
        dir1: new THREE.Color("#7494bc"), // muted moonlight key
        dir2: new THREE.Color("#3e5a7c"), // slate-blue fill
        dir3: new THREE.Color("#18253d"), // near-black cobalt rim
        env: 0.7,
      },
      red: {
        // subtle pink bias — mostly keeps the neutral suit, just tints it
        ambient: new THREE.Color("#2c2030"),
        dir1: new THREE.Color("#ffb4d2"),
        dir2: new THREE.Color("#f0c2dd"),
        dir3: new THREE.Color("#9a6a86"),
        env: 1.1,
      },
      // warm orange / spotlight theme — matches the Tracking section
      warm: {
        ambient: new THREE.Color("#2a1408"),
        dir1: new THREE.Color("#ffb070"),
        dir2: new THREE.Color("#ff8a3a"),
        dir3: new THREE.Color("#aa3c14"),
        env: 0.9,
      },
    }),
    [],
  );

  const tmp = useMemo(() => new THREE.Color(), []);

  // 0 outside the section, ramps to 1 while it occupies the viewport
  const sectionProgress = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return 0;
    const vh = window.innerHeight;
    const r = el.getBoundingClientRect();
    const enter = Math.max(0, Math.min((vh * 0.85 - r.top) / (vh * 0.5), 1));
    const leave = Math.max(0, Math.min((r.bottom - vh * 0.15) / (vh * 0.5), 1));
    const p = Math.min(enter, leave);
    return p * p * (3 - 2 * p);
  };

  useFrame(() => {
    const pComp = sectionProgress(".competitions-section");
    const pModes = sectionProgress(".modes-section");
    const pProj = sectionProgress(".projects-section");
    // Mars / warm-orange theme over the Tracking section
    const pWarm = sectionProgress(".tracking-section");
    // nebula (dark cool blue) covers MODES TO JOIN + STUDENT PROJECTS,
    // both of which sit on dark blue nebula backdrops
    const pNebula = Math.max(pModes, pProj);
    // CERTIFICATES now uses the default blue (base) palette — no
    // neutral override here

    const grade = (ref, key) => {
      if (!ref.current) return;
      ref.current.color.copy(
        tmp
          .copy(palette.base[key])
          .lerp(palette.nebula[key], pNebula)
          .lerp(palette.red[key], pComp)
          .lerp(palette.warm[key], pWarm),
      );
    };
    grade(ambientRef, "ambient");
    grade(dir1Ref, "dir1");
    grade(dir2Ref, "dir2");
    grade(dir3Ref, "dir3");

    if (scene) {
      let env = palette.base.env;
      env = env + (palette.nebula.env - env) * pNebula;
      env = env + (palette.red.env - env) * pComp;
      env = env + (palette.warm.env - env) * pWarm;
      scene.environmentIntensity = env;
    }
  });

  return (
    <>
      {/* cinematic blue rig — sun-key from upper-LEFT, deeper rims */}
      <ambientLight ref={ambientRef} intensity={0.45} color="#1c356e" />
      <directionalLight
        ref={dir1Ref}
        position={[-15, 9, 7]}
        intensity={3.2}
        color="#cfe6ff"
      />
      <directionalLight
        ref={dir2Ref}
        position={[-10, 5, 4]}
        intensity={2.0}
        color="#7fb6ff"
      />
      <directionalLight
        ref={dir3Ref}
        position={[6, -2, -10]}
        intensity={1.6}
        color="#2a5fff"
      />
      <pointLight
        position={[0, 0, 5]}
        intensity={3.2}
        distance={16}
        decay={2}
        color="#dfeaff"
      />
      <pointLight
        position={[-12, 4, 4]}
        intensity={4.2}
        distance={70}
        decay={1.4}
        color="#79b4ff"
      />
    </>
  );
};

/* =========================================================
   FLOATING ASTRONAUT — single instance, travels the full page
   Lives in a fixed canvas so it's visible across all sections
========================================================= */

const FloatingAstronaut = ({ isMobile = false }) => {
  const rootRef = useRef();

  const { camera, size } = useThree();
  const gltf = useGLTF(ASTRONAUT_URL);

  const scene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);
  const { animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  // X of the why-section right-column center in this canvas's world space
  const whyX = useMemo(() => {
    const dist = camera.position.z - ASTRONAUT_Z;
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
    return halfH * (size.width / size.height) * 1.0;
  }, [camera, size]);

  // swings right immediately then arcs back to center — y stays near the hero baseline
  // so the astronaut remains fully visible throughout (same world-y as hero idle)
  const journeyCurve = useMemo(
    () =>
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, ASTRONAUT_Y - 1.0, ASTRONAUT_Z),
        new THREE.Vector3(whyX * 0.9, ASTRONAUT_Y - 1.3, ASTRONAUT_Z),
        new THREE.Vector3(whyX * 0.4, ASTRONAUT_Y - 0.7, ASTRONAUT_Z),
        new THREE.Vector3(0, ASTRONAUT_Y - 1.0, ASTRONAUT_Z),
      ),
    [whyX],
  );

  const journeyPos = useRef(new THREE.Vector3());
  const scrollY = useRef(0);

  useEffect(() => {
    const fn = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useLayoutEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((a) => a.stop());
    const swim =
      actions.moon_walk || actions.moonwalk || actions.idle || actions.Idle;
    const float = actions.floating || actions.Floating;
    if (swim) {
      swim.reset();
      swim.setEffectiveTimeScale(0.55);
      swim.setEffectiveWeight(1);
      // play instantly so the astronaut never appears in T-pose
      swim.play();
    }
    if (float && float !== swim) {
      float.reset();
      float.setEffectiveTimeScale(0.8);
      float.setEffectiveWeight(0.5);
      float.play();
    }
    return () => {
      swim?.stop();
      if (float !== swim) float?.stop();
    };
  }, [actions]);

  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.material.envMapIntensity = 3.5;
      o.material.roughness = 0.25;
      o.material.metalness = 0.55;
      o.material.needsUpdate = true;
    });
  }, [scene]);

  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const c = new THREE.Vector3();
    box.getCenter(c);
    return [-c.x, -c.y, 0];
  }, [scene]);

  useFrame(({ clock }) => {
    const root = rootRef.current;
    if (!root) return;
    const t = clock.getElapsedTime();
    const h = window.innerHeight;

    /* ---- leg 1: hero (center) → why-section ---- */
    const jRaw = Math.max(0, Math.min(scrollY.current / (1.5 * h), 1));
    const jT = jRaw * jRaw * (3 - 2 * jRaw);

    journeyCurve.getPoint(jT, journeyPos.current);
    let tx = journeyPos.current.x;
    let ty = journeyPos.current.y;

    // 1 while sitting in the hero, 0 once leg 1 is done
    const heroFade = 1 - jT;
    ty += HERO_ASTRO_Y_LIFT * heroFade;

    /* ---- leg 2: settle into the Earth box, zoom with it, then shrink
       to the top-right of the age-cards section ---- */
    const vw = size.width;
    const vh = size.height;
    const dist = camera.position.z - ASTRONAUT_Z;
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;
    const halfW = halfH * (vw / vh);
    const toWorldX = (sx) => ((sx / vw) * 2 - 1) * halfW;
    const toWorldY = (sy) => -((sy / vh) * 2 - 1) * halfH;

    const box = document.querySelector(".lof-astro-box");
    const sec = document.querySelector(".lof-section");
    const ageSec = document.querySelector(".age-section");
    const learnSec = document.querySelector(".learn-section");
    const layer = document.getElementById("astro-layer");

    // how far the LOF section has zoomed (0 = rest, 1 = box fills screen)
    let pZoom = 0;
    if (sec) {
      const sr = sec.getBoundingClientRect();
      const total = sec.offsetHeight - vh;
      pZoom = total > 0 ? Math.max(0, Math.min(-sr.top / total, 1)) : 0;
    }

    let pv = 0;
    let settleT = 0;
    let targetScale = ASTRONAUT_SCALE * (1 - (1 - HERO_ASTRO_SCALE_MUL) * heroFade);
    let boxRect = null;

    // section-driven "focus" orientation, blended over the idle sway.
    // tiltY: yaw  (+ = face/look LEFT,  - = face/look RIGHT)
    // tiltX: pitch (for perspective / recline)
    // tiltZ: roll  (+ = head leans LEFT, - = head leans RIGHT)
    let tiltY = 0;
    let tiltX = 0;
    let tiltZ = 0;
    const FOCUS = 0.52; // ~30deg

    // band progress: ramps up when a section enters and back to 0 as it leaves
    const bandProgress = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const enter = Math.max(0, Math.min((vh * 0.85 - r.top) / (vh * 0.5), 1));
      const leave = Math.max(
        0,
        Math.min((r.bottom - vh * 0.15) / (vh * 0.5), 1),
      );
      const p = Math.min(enter, leave);
      return p * p * (3 - 2 * p);
    };

    /* ---- WHY SPACE SCIENCE: shrink a touch, lean + face toward the
       content (flipped to the opposite direction) ---- */
    const pWhy = bandProgress(".why-section");
    if (pWhy > 0) {
      targetScale = targetScale + (ASTRONAUT_SCALE * 0.82 - targetScale) * pWhy;
      tiltY = tiltY + (-FOCUS - tiltY) * pWhy; // flipped — face the opposite side
    }


    if (box) {
      boxRect = box.getBoundingClientRect(); // follows the zoom transform

      pv = Math.max(0, Math.min((vh * 0.95 - boxRect.top) / (vh * 0.6), 1));
      pv = pv * pv * (3 - 2 * pv);

      settleT = Math.min(pv / 0.6, 1);
      settleT = settleT * settleT * (3 - 2 * settleT);

      if (pv > 0) {
        // track the (zooming) box centre so the astronaut stays IN the box.
        // keep the head/upper-body framing (constant nudge) the whole zoom.
        const cx = boxRect.left + boxRect.width / 2;
        const cy = boxRect.top + boxRect.height / 2;
        tx = tx + (toWorldX(cx) - tx) * settleT;
        ty = ty + (toWorldY(cy) + LOF_ASTRO_Y_NUDGE - ty) * settleT;
      }

      // grows from the rest size to a bigger full-body size at full zoom
      const restScale =
        ASTRONAUT_SCALE + (LOF_ASTRO_SCALE - ASTRONAUT_SCALE) * pv;
      targetScale = restScale + (ZOOM_ASTRO_SCALE - restScale) * pZoom;
    }

    /* ---- after full zoom: settle at the TOP-LEFT of the viewport
       (stays put while the cards are read) ---- */
    let pAge = 0;
    if (ageSec) {
      const ar = ageSec.getBoundingClientRect();
      pAge = Math.max(0, Math.min((vh * 0.85 - ar.top) / (vh * 0.5), 1));
      pAge = pAge * pAge * (3 - 2 * pAge);

      if (pAge > 0) {
        const cornerX = vw * AGE_ASTRO_MARGIN;
        const cornerY = vh * 0.9; // lower in the section, not at the top
        tx = tx + (toWorldX(cornerX) - tx) * pAge;
        ty = ty + (toWorldY(cornerY) - ty) * pAge;
        targetScale = targetScale + (AGE_ASTRO_SCALE - targetScale) * pAge;
      }
    }

    /* ---- new "students learn" section: travel top-left → bottom-right
       across the viewport as you scroll through it ---- */
    let pLearn = 0;
    if (learnSec) {
      const lr = learnSec.getBoundingClientRect();
      pLearn = Math.max(0, Math.min((vh * 0.9 - lr.top) / (vh * 0.85), 1));
      pLearn = pLearn * pLearn * (3 - 2 * pLearn);

      if (pLearn > 0) {
        // Travel across the section and land at the bottom-right corner.
        const lx = vw * (AGE_ASTRO_MARGIN + (0.84 - AGE_ASTRO_MARGIN) * pLearn);
        const ly = vh * (0.55 + 0.27 * pLearn); // lands at ~82%vh (bottom-right corner)
        tx = tx + (toWorldX(lx) - tx) * pLearn;
        ty = ty + (toWorldY(ly) - ty) * pLearn;
        targetScale = targetScale + (AGE_ASTRO_SCALE - targetScale) * pLearn;
      }
    }

    /* ---- certificates section: land at the bottom beside the cert stack ---- */
    let pCert = 0;
    const certSec = document.querySelector(".cert-section");
    if (certSec) {
      const cr = certSec.getBoundingClientRect();
      pCert = Math.max(0, Math.min((vh * 0.85 - cr.top) / (vh * 0.65), 1));
      pCert = pCert * pCert * (3 - 2 * pCert);

      if (pCert > 0) {
        // Mid-left landing — sits comfortably inside the left half of
        // the viewport, not flush against the edge
        const cx = vw * 0.38;
        const cy = vh * 0.88;
        tx = tx + (toWorldX(cx) - tx) * pCert;
        ty = ty + (toWorldY(cy) - ty) * pCert;
        targetScale = targetScale + (0.72 - targetScale) * pCert;
        // drop-in arc so the landing feels physical
        ty += Math.sin(Math.PI * pCert) * 0.55;
      }
    }

    /* ---- careers section: drift to RIGHT BOTTOM corner ---- */
    let pCareer = 0;
    const careerSec = document.querySelector(".careers-section");
    if (careerSec) {
      const kr = careerSec.getBoundingClientRect();
      pCareer = Math.max(0, Math.min((vh * 0.88 - kr.top) / (vh * 0.6), 1));
      pCareer = pCareer * pCareer * (3 - 2 * pCareer);

      if (pCareer > 0) {
        const cx = vw * 0.88;
        const cy = vh * (0.72 + 0.1 * pCareer);
        tx = tx + (toWorldX(cx) - tx) * pCareer;
        ty = ty + (toWorldY(cy) - ty) * pCareer;
        // small take-off hop leaving the certificates section
        ty += Math.sin(Math.PI * pCareer) * 0.55;
        targetScale = targetScale + (0.9 - targetScale) * pCareer;
      }
    }

    /* ---- competitions section: float in the bottom-left, upright ---- */
    let pComp = 0;
    const compSec = document.querySelector(".competitions-section");
    if (compSec) {
      const mr = compSec.getBoundingClientRect();
      pComp = Math.max(0, Math.min((vh * 0.85 - mr.top) / (vh * 0.55), 1));
      pComp = pComp * pComp * (3 - 2 * pComp);

      if (pComp > 0) {
        const cx = vw * 0.38;
        // anchor Y near the bottom — astronaut lands lower so he sits
        // visually planted at the foot of the section rather than
        // floating mid-height
        const heading = document.querySelector(".competitions-heading");
        let cy = vh * 1.02;
        if (heading) {
          const hr = heading.getBoundingClientRect();
          // keep the "below heading" guard but bias the landing further
          // down the viewport
          cy = Math.max(hr.bottom + vh * 0.32, vh * 1.02);
        }
        tx = tx + (toWorldX(cx) - tx) * pComp;
        ty = ty + (toWorldY(cy) - ty) * pComp;
        targetScale = targetScale + (1.00 - targetScale) * pComp;
        // straight / front view — no turn during competitions landing
        tiltY = tiltY + (0 - tiltY) * pComp;
        tiltX = tiltX + (0 - tiltX) * pComp;
      }
    }

    /* ---- career-pathways (FAQ) section: settle into the LEFT side
       (handoff from the right-aligned competitions astronaut), body
       turned slightly toward the RIGHT so he's looking at the FAQ
       list on the right ---- */
    let pPath = 0;
    const pathSec = document.querySelector(".career-pathways-section");
    if (pathSec) {
      const pr = pathSec.getBoundingClientRect();
      // start ramping earlier — when the section's top is still ~15% of
      // the viewport BELOW the fold — so the handoff from competitions
      // begins while the user is still on the comp content. Ramp speed
      // (denominator) and finish point stay the same, just shifted up
      pPath = Math.max(0, Math.min((vh * 1.15 - pr.top) / (vh * 0.6), 1));
      pPath = pPath * pPath * (3 - 2 * pPath);

      if (pPath > 0) {
        const cx = vw * 0.14;
        const cy = vh * 0.62; // lower it a bit so the head isn't clipped
        tx = tx + (toWorldX(cx) - tx) * pPath;
        ty = ty + (toWorldY(cy) - ty) * pPath;
        targetScale = targetScale + (0.95 - targetScale) * pPath;
        // proper LEFT SIDE VIEW — a near-90° turn so the astronaut
        // presents his profile to the camera, facing left
        tiltY = tiltY + (Math.PI / 2 - tiltY) * pPath;
        tiltX = tiltX + (0 - tiltX) * pPath;
      }
    }

    /* ---- associated-with section: settle into the LEFT corner ---- */
    let pAssoc = 0;
    const assocSec = document.querySelector(".assoc-section");
    if (assocSec) {
      const asr = assocSec.getBoundingClientRect();
      pAssoc = Math.max(0, Math.min((vh * 0.85 - asr.top) / (vh * 0.6), 1));
      pAssoc = pAssoc * pAssoc * (3 - 2 * pAssoc);

      if (pAssoc > 0) {
        // bottom-left corner
        const cx = vw * 0.12;
        const cy = vh * 0.8;
        tx = tx + (toWorldX(cx) - tx) * pAssoc;
        ty = ty + (toWorldY(cy) - ty) * pAssoc;
        targetScale = targetScale + (0.95 - targetScale) * pAssoc;
        // face the opposite side (3/4 profile toward the content)
        tiltY = tiltY + (0.85 - tiltY) * pAssoc;
      }
    }

    /* ---- vetted-by section: land below the "VETTED BY" title, zoomed in
       to a 3/4 perspective face + upper-body framing ---- */
    let pVetted = 0;
    const vettedSec = document.querySelector(".vetted-section");
    if (vettedSec) {
      const vr = vettedSec.getBoundingClientRect();
      pVetted = Math.max(0, Math.min((vh * 0.85 - vr.top) / (vh * 0.6), 1));
      pVetted = pVetted * pVetted * (3 - 2 * pVetted);

      if (pVetted > 0) {
        // centre of the vetted section, horizontally under the title
        let cx = vw * 0.78;
        // push the model centre well below so only HEAD + CHEST sit in frame,
        // landing around the vertical centre of the section
        let cy = vr.top + vr.height * 0.5 + vh * 0.82;
        const vtitle = document.querySelector(".vetted-title");
        if (vtitle) {
          const tr = vtitle.getBoundingClientRect();
          cx = tr.left + tr.width / 2;
        }
        tx = tx + (toWorldX(cx) - tx) * pVetted;
        ty = ty + (toWorldY(cy) - ty) * pVetted;
        // moderate zoom — head + upper body (smaller than before)
        targetScale = targetScale + (1.8 - targetScale) * pVetted;
        // spin a FULL turn as the section scrolls in, ending facing straight
        // (2π ≡ 0, so the last frame is front-on)
        const spin = 2 * Math.PI * pVetted;
        tiltY = tiltY + (spin - tiltY) * pVetted;
        tiltX = tiltX + (0 - tiltX) * pVetted; // no pitch — face straight
      }
    }

    /* ---- MODES TO JOIN: shrink small + land in the TOP-LEFT corner ---- */
    let pModes = 0;
    const modesSec = document.querySelector(".modes-section");
    if (modesSec) {
      const mr2 = modesSec.getBoundingClientRect();
      pModes = Math.max(0, Math.min((vh * 0.85 - mr2.top) / (vh * 0.6), 1));
      pModes = pModes * pModes * (3 - 2 * pModes);

      if (pModes > 0) {
        const cx = vw * 0.1;
        const cy = vh * 0.5; // vertically centred at the left edge
        tx = tx + (toWorldX(cx) - tx) * pModes;
        ty = ty + (toWorldY(cy) - ty) * pModes;
        targetScale = targetScale + (0.5 - targetScale) * pModes;
        // face LEFT (turned away from the cards) per design request
        tiltY = tiltY + (FOCUS - tiltY) * pModes;
        tiltX = tiltX + (0 - tiltX) * pModes;
        tiltZ = tiltZ + (0 - tiltZ) * pModes;
      }
    }

    /* ---- STUDENT PROJECTS: BIGGER astronaut, lands in the BOTTOM-RIGHT
       corner, facing LEFT toward the cards ---- */
    let pProj = 0;
    const projSec = document.querySelector(".projects-section");
    if (projSec) {
      const pjr = projSec.getBoundingClientRect();
      pProj = Math.max(0, Math.min((vh * 0.85 - pjr.top) / (vh * 0.6), 1));
      pProj = pProj * pProj * (3 - 2 * pProj);

      if (pProj > 0) {
        const cx = vw * 0.88;
        const cy = vh * 0.78;
        tx = tx + (toWorldX(cx) - tx) * pProj;
        ty = ty + (toWorldY(cy) - ty) * pProj;
        // noticeably larger than the modes-section astronaut
        targetScale = targetScale + (0.78 - targetScale) * pProj;
        // face RIGHT (turned away from the cards) per design request
        tiltY = tiltY + (-FOCUS - tiltY) * pProj;
        tiltX = tiltX + (0 - tiltX) * pProj;
        tiltZ = tiltZ + (0 - tiltZ) * pProj;
      }
    }

    /* ---- COMMUNITY: slightly bigger, settles in the bottom-right and turns
       his view OPPOSITE of the content (content sits to the left, so he
       faces toward the right) ---- */
       
    let pCom = 0;
    const comSec = document.querySelector(".community-section");
    if (comSec) {
      const cmr = comSec.getBoundingClientRect();
      pCom = Math.max(0, Math.min((vh * 0.85 - cmr.top) / (vh * 0.6), 1));
      pCom = pCom * pCom * (3 - 2 * pCom);
      if (pCom > 0) {
        // bottom-right corner of the viewport
        const cx = vw * 0.9;
        const cy = vh * 0.82;
        tx = tx + (toWorldX(cx) - tx) * pCom;
        ty = ty + (toWorldY(cy) - ty) * pCom;
        // ~30% bigger than the previous community size (0.7 → 0.91)
        targetScale = targetScale + (0.91 - targetScale) * pCom;
        // turn opposite of the content direction
        tiltY = tiltY + (-0.9 - tiltY) * pCom;
        tiltX = tiltX + (0 - tiltX) * pCom;
        tiltZ = tiltZ + (0 - tiltZ) * pCom;
      }
    }

    /* ---- FOOTER: astronaut STANDS in the bottom-right corner,
       facing the camera (front view) ---- */
    let pFoot = 0;
    const footEl = document.querySelector(".site-footer");
    if (footEl) {
      const fr = footEl.getBoundingClientRect();
      // ramps up as the footer enters the viewport from the bottom
      pFoot = Math.max(0, Math.min((vh - fr.top) / vh, 1));
      pFoot = pFoot * pFoot * (3 - 2 * pFoot);
      if (pFoot > 0) {
        // bottom-right corner — full body visible, planted at the floor
        const cx = vw * 0.88;
        const cy = vh * 0.88;
        tx = tx + (toWorldX(cx) - tx) * pFoot;
        ty = ty + (toWorldY(cy) - ty) * pFoot;
        targetScale = targetScale + (0.85 - targetScale) * pFoot;
        // FRONT VIEW — face straight at the camera
        tiltY = tiltY + (0 - tiltY) * pFoot;
        tiltX = tiltX + (0 - tiltX) * pFoot;
        tiltZ = tiltZ + (0 - tiltZ) * pFoot;
      }
    }

    /* ---- clip to the Earth box for the whole zoom (keeps it inside the
       box until full screen); release once we move on to the next sections ---- */
    if (layer && boxRect) {
      if (settleT >= 0.999 && pAge < 0.02 && pLearn < 0.02) {
        const b = LOF_FRAME_BORDER;
        const top = Math.max(0, boxRect.top + b);
        const left = Math.max(0, boxRect.left + b);
        const right = Math.max(0, vw - (boxRect.right - b));
        const bottom = Math.max(0, vh - (boxRect.bottom - b));
        layer.style.clipPath = `inset(${top}px ${right}px ${bottom}px ${left}px round ${LOF_FRAME_RADIUS}px)`;
      } else {
        layer.style.clipPath = "none";
      }
    }

    /* ---- mobile: keep the astronaut to the hero only, and smaller.
       It shrinks in the hero and is hidden once the hero scrolls away
       so it doesn't travel the rest of the page on phones. ---- */
    if (isMobile) {
      targetScale *= 0.55;
      // lift the astronaut up into the hero so it sits behind the title
      // (astro-layer z-index 3 is already under the hero title's z-index 4)
      ty += 3.6;
      const heroEl = document.querySelector(".hero");
      const heroBottom = heroEl
        ? heroEl.getBoundingClientRect().bottom
        : window.innerHeight;
      // visible while the hero still occupies a meaningful chunk of screen
      root.visible = heroBottom > window.innerHeight * 0.35;
    } else if (!root.visible) {
      root.visible = true;
    }

    // smooth scale toward the target
    root.scale.setScalar(root.scale.x + (targetScale - root.scale.x) * 0.12);

    /* ---- gentle float + smooth follow toward the target ---- */
    const driftX = Math.sin(t * 0.45) * 0.12;
    const bobY = Math.sin(t * 0.6) * 0.1;

    root.position.x += (tx + driftX - root.position.x) * 0.08;
    root.position.y += (ty + bobY - root.position.y) * 0.08;
    root.position.z = ASTRONAUT_Z;

    // living sway, calmer once travelling/settled
    // sway fades to zero inside the panel so the astronaut faces straight
    const sway = (jRaw < 1 ? 1 - jRaw * 0.5 : 0.55) * (1 - pv);
    // user drag offsets carry across the page (declared below the useFrame)
    const uy = window.__astroUserYaw?.current ?? 0;
    const up = window.__astroUserPitch?.current ?? 0;
    // blend idle sway + section tilt + user drag, eased smoothly
    const wantX = Math.sin(t * 0.7) * 0.05 * sway + tiltX + up;
    const wantY = Math.sin(t * 0.35) * 0.12 * sway + tiltY + uy;
    const wantZ = Math.sin(t * 0.5) * 0.1 * sway + tiltZ;
    // even softer lerp factor for very smooth rotation
    root.rotation.x += (wantX - root.rotation.x) * 0.055;
    root.rotation.y += (wantY - root.rotation.y) * 0.055;
    root.rotation.z += (wantZ - root.rotation.z) * 0.055;

    // expose astronaut's screen position so an external DOM hit-area can
    // follow him and let the user drag the model without the fixed astro
    // canvas blocking events on the page
    if (window.__astroScreen) {
      const world = window.__astroScreenTmp || (window.__astroScreenTmp = new THREE.Vector3());
      root.getWorldPosition(world);
      world.project(camera);
      window.__astroScreen.x = (world.x * 0.5 + 0.5) * size.width;
      window.__astroScreen.y = (-world.y * 0.5 + 0.5) * size.height;
      window.__astroScreen.visible = world.z < 1 && root.visible;
    }
  });

  // user drag offsets — added on top of the scroll-driven rotation
  const userYaw = useRef(0);
  const userPitch = useRef(0);
  const dragState = useRef({ active: false, x: 0, y: 0 });

  // expose to useFrame above via window so the existing tilt code can pick it up
  useEffect(() => {
    window.__astroUserYaw = userYaw;
    window.__astroUserPitch = userPitch;
  }, []);

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
    // softer factor — combined with the lerp in useFrame this gives a
    // very smooth rotation feel
    userYaw.current += dx * 0.0035;
    userPitch.current += dy * 0.0035;
  };
  const onPointerUp = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    try { e?.target?.releasePointerCapture?.(e.pointerId); } catch {}
    document.body.style.cursor = "";
  };

  return (
    <group
      ref={rootRef}
      position={[0, ASTRONAUT_Y, ASTRONAUT_Z]}
      scale={ASTRONAUT_SCALE}
      frustumCulled={false}
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
    >
      <primitive object={scene} position={centerOffset} frustumCulled={false} />
    </group>
  );
};

/* =========================================================
   SATELLITE
========================================================= */

const SATELLITE_Z = 5;
const SATELLITE_SIZE = 0.6;

const Satellite = () => {
  const groupRef = useRef();

  const gltf = useGLTF(SATELLITE_URL);

  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  const { camera, size } = useThree();

  const norm = useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;

      const m = o.material;

      m.envMapIntensity = 2.6;
      m.roughness = 0.3;
      m.metalness = 0.65;
      m.needsUpdate = true;
    });

    const s = new THREE.Sphere();

    new THREE.Box3().setFromObject(scene).getBoundingSphere(s);

    return SATELLITE_SIZE / (s.radius * 2 || 1);
  }, [scene]);

  const home = useMemo(() => {
    const dist = camera.position.z - SATELLITE_Z;

    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;

    const halfW = halfH * (size.width / size.height);

    return new THREE.Vector3(-halfW * 0.62, halfH * 0.6, SATELLITE_Z);
  }, [camera, size]);

  useFrame(({ clock }, delta) => {
    const g = groupRef.current;

    if (!g) return;

    const t = clock.getElapsedTime();

    g.position.x = home.x + Math.sin(t * 0.4) * 0.08;

    g.position.y = home.y + Math.cos(t * 0.5) * 0.06;

    g.position.z = SATELLITE_Z;

    g.rotation.y += delta * 0.12;

    g.rotation.z = Math.sin(t * 0.2) * 0.03;
  });

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={norm}
      position={home.toArray()}
      frustumCulled={false}
    />
  );
};

/* =========================================================
   ASTEROIDS
========================================================= */

// [x, y, z, scaleFactor] — varied sizes & depths
const ASTEROID_LAYOUT = [
  [-9, 4, -10, 1.0],
  [9, 4.5, -12, 0.75],
  [-12, -1, -11, 0.85],
  [12, -3, -13, 0.6],
  [-14, 3, -14, 1.3],
  [14, 1, -10, 0.7],
  [-6, -5, -9, 0.5],
  [6, 6, -11, 0.45],
  [0, 7, -13, 0.4],
  [-3, -6, -12, 0.9],
  [4, -7, -10, 0.55],
];

const AsteroidItem = ({ scene, baseScale, conf }) => {
  const ref = useRef();

  const { camera, size } = useThree();

  // base position the asteroid drifts around (drag updates this)
  const pos = useRef(new THREE.Vector3(conf[0], conf[1], conf[2]));

  // momentum carried after release (the "throw")
  const vel = useRef(new THREE.Vector3());

  // where the cursor wants the asteroid (smoothed toward)
  const dragTarget = useRef(new THREE.Vector3(conf[0], conf[1], conf[2]));

  const drag = useRef({ active: false });

  // drag plane locked to this asteroid's depth
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -conf[2]));

  const hit = useRef(new THREE.Vector3());

  // offset between grab point and asteroid center
  const grab = useRef(new THREE.Vector3());

  useFrame(({ clock }, delta) => {
    const g = ref.current;

    if (!g) return;

    const t = clock.getElapsedTime();

    g.rotation.x += delta * 0.06;
    g.rotation.y += delta * 0.08;

    if (drag.current.active) {
      // smooth follow toward the cursor target
      const prevX = pos.current.x;
      const prevY = pos.current.y;

      pos.current.x += (dragTarget.current.x - pos.current.x) * 0.25;
      pos.current.y += (dragTarget.current.y - pos.current.y) * 0.25;

      // record per-frame movement as throw velocity
      vel.current.x = pos.current.x - prevX;
      vel.current.y = pos.current.y - prevY;
    } else {
      // glide with friction, then settle
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;
      vel.current.multiplyScalar(0.95);
    }

    /* =========================================
       BOUNCE OFF THE SECTION EDGES
    ========================================= */

    const dist = camera.position.z - conf[2];

    const halfH = Math.tan((camera.fov * Math.PI) / 360) * dist;

    const halfW = halfH * (size.width / size.height);

    // keep the asteroid's body inside the frame
    const m = Math.max(conf[3], 0.3);
    const maxX = halfW - m;
    const maxY = halfH - m;

    const BOUNCE = 0.7; // energy kept on impact

    if (pos.current.x > maxX) {
      pos.current.x = maxX;
      vel.current.x = -Math.abs(vel.current.x) * BOUNCE;
    } else if (pos.current.x < -maxX) {
      pos.current.x = -maxX;
      vel.current.x = Math.abs(vel.current.x) * BOUNCE;
    }

    if (pos.current.y > maxY) {
      pos.current.y = maxY;
      vel.current.y = -Math.abs(vel.current.y) * BOUNCE;
    } else if (pos.current.y < -maxY) {
      pos.current.y = -maxY;
      vel.current.y = Math.abs(vel.current.y) * BOUNCE;
    }

    g.position.x = pos.current.x;
    g.position.z = pos.current.z;

    // gentle bob, paused while dragging
    g.position.y =
      pos.current.y +
      (drag.current.active ? 0 : Math.sin(t * 0.3 + conf[0]) * 0.2);
  });

  const onDown = (e) => {
    e.stopPropagation();

    e.target.setPointerCapture(e.pointerId);

    drag.current.active = true;

    // stop any existing glide on grab
    vel.current.set(0, 0, 0);

    if (e.ray.intersectPlane(plane.current, hit.current)) {
      grab.current.subVectors(hit.current, pos.current);
    } else {
      grab.current.set(0, 0, 0);
    }

    dragTarget.current.copy(pos.current);

    document.body.style.cursor = "grabbing";
  };

  const onMove = (e) => {
    if (!drag.current.active) return;

    e.stopPropagation();

    if (!e.ray.intersectPlane(plane.current, hit.current)) return;

    dragTarget.current.x = hit.current.x - grab.current.x;

    dragTarget.current.y = hit.current.y - grab.current.y;
  };

  const onUp = (e) => {
    e.stopPropagation();

    e.target.releasePointerCapture?.(e.pointerId);

    drag.current.active = false;

    document.body.style.cursor = "grab";
  };

  return (
    <group
      ref={ref}
      position={[conf[0], conf[1], conf[2]]}
      scale={baseScale * conf[3]}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerOver={() => {
        if (!drag.current.active) document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        if (!drag.current.active) document.body.style.cursor = "";
      }}
    >
      <Clone object={scene} />
    </group>
  );
};

const Asteroids = () => {
  const gltf = useGLTF(ASTEROIDS_URL);

  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  const baseScale = useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.material.envMapIntensity = 2.2;
      o.material.roughness = Math.min(o.material.roughness ?? 0.8, 0.55);
      o.material.needsUpdate = true;
    });

    const s = new THREE.Sphere();

    new THREE.Box3().setFromObject(scene).getBoundingSphere(s);

    return 1 / (s.radius || 1);
  }, [scene]);

  return (
    <>
      {ASTEROID_LAYOUT.map((conf, i) => (
        <AsteroidItem key={i} scene={scene} baseScale={baseScale} conf={conf} />
      ))}
    </>
  );
};

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

        <span className="hero-word">SCIENCE</span>
      </motion.h1>
    </div>
  );
};

/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhySpaceScience = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="why-section">
    <div className="why-container container">
      <div className="why-left">
        <h2 className="why-title prog-section-title">
          WHY <span className="why-title-bold">SPACE SCIENCE & ASTRONOMY?</span>
        </h2>
        <p className="why-desc">Children are naturally curious about the sky, the stars, and the mysteries of the universe. However, that curiosity often fades when learning is reduced to memorisation instead of exploration. The benefits of space science for kids extend far beyond learning about planets, rockets, or galaxies. Space science is one of the few disciplines that seamlessly combines science, engineering, creativity, observation, critical thinking, problem-solving, and technology into a single, engaging learning journey.

By exploring the universe, children learn to ask meaningful questions, think logically, experiment with ideas, and develop the confidence to discover answers on their own. Astronomy doesn't just teach children about space—it inspires curiosity, fuels imagination, and encourages innovation. It teaches them how to think, question, and explore, helping them build skills that will shape their future and prepare them to solve the challenges of tomorrow.
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
      {/* right column is empty — the fixed astronaut canvas shows here */}
      <div className="why-right" />
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
        "Explore planets, stars, moon phases, and galaxies through discovery.",
  "Learn about rockets, astronauts, telescopes, and early Mars missions.",
  "Build curiosity through storytelling, rover models, and hands-on activities."
    ],
  },
  {
    label: "Explorer",
    points: [
      "Apply concepts through hands-on astronomy projects and model building.",
  "Understand Earth-space phenomena through observation and experiments.",
  "Strengthen scientific thinking, creativity, and problem-solving skills.",
    ],
  },
  {
    label: "Innovator",
    points: [
       "Explore advanced astronomy, robotics, and scientific inquiry.",
  "Learn coding, programming, electronics, and engineering challenges.",
  "Build systems, test ideas, and solve real-world space problems."
    ],
  },
  {
    label: "Engineer",
    points: [
       "Explore AI, rocketry, astrophotography, and spectroscopy.",
  "Work on drone systems, celestial navigation, and microgravity concepts.",
  "Develop research, engineering, and future aerospace skills."
      ],  
  },
  {
    label: "Researcher",
    points: [
       "Explore specialised space science, astronomy, and certification pathways.",
  "Strengthen research, technical, and interdisciplinary problem-solving skills.",
  "Engage in deeper learning for future careers and personal exploration."
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
  const isMobile = useIsMobile();

  useEffect(() => {
    // On phones the pinned zoom is disabled — the section renders as a
    // normal static block (the Earth box column is hidden via CSS).
    if (isMobile) {
      const top = topRef.current;
      const box = boxRef.current;
      const text = textRef.current;
      if (top) top.style.transform = "";
      if (box) {
        box.style.borderWidth = "";
        box.style.borderRadius = "";
      }
      if (text) text.style.opacity = "";
      return undefined;
    }
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
  }, [isMobile]);

  return (
    <section className="lof-section" data-astro-target ref={sectionRef}>
      <div className="lof-sticky">
        <div className="lof-top container" ref={topRef}>
          {/* cell = natural metrics; box = the framed Earth panel that zooms */}
          <div className="lof-astro-col" ref={cellRef}>
            <div className="lof-astro-box" ref={boxRef} />
          </div>

          <div className="lof-text-col" ref={textRef}>
            <h2 className="lof-title prog-section-title">
              THE LAB OF FUTURE WAY
            </h2>
            <p className="lof-desc">We don't hand students ready-made answers—we give them meaningful problems worth exploring. By encouraging curiosity, critical thinking, and experimentation, we help them discover solutions on their own. Every challenge becomes an opportunity to question, innovate, and build the confidence to think beyond the obvious.</p>

            <h2 className="lof-title prog-section-title">WHY START YOUNG?</h2>
            <p className="lof-desc">The strongest thinking habits form early. Through space and astronomy classes for young
            children, curiosity becomes confidence, observation becomes instinct, and complex ideas
            begin to feel exciting — not intimidating.</p>

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

// Section 4 — the frame image supplies the age range; the tier label is rendered
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
// Shared image pool used to seed each card's slider. To give a card its
// own dedicated gallery, add an `imgs: [imgA, imgB, ...]` array to that
// item below — it overrides the auto-generated set.
const LEARN_IMAGE_POOL = [
  learnThinkCritically,
  learnUnderstandWorld,
  learnBuildModels,
  learnUseTools,
  learnCommunicate,
  learnWorkTeams,
  learnSolveProblems,
];

const LEARN_ITEMS = [
  { label: "Think critically", img: learnThinkCritically, imgs: [learnGallery1, learnGallery2] },
  { label: "Understand how the world works", img: learnUnderstandWorld, imgs: [learnGallery3, learnGallery4] },
  { label: "Build scientific models", img: learnBuildModels, imgs: [learnGallery5, learnGallery6] },
  { label: "Use tools and technology", img: learnUseTools, imgs: [learnGallery7, learnGallery8] },
  { label: "Communicate ideas clearly", img: learnCommunicate, imgs: [learnGallery9, learnGallery10] },
  { label: "Work in teams", img: learnWorkTeams, imgs: [learnGallery11, learnGallery12] },
  { label: "Solve unfamiliar problems", img: learnSolveProblems, imgs: [learnGallery13, learnGallery14] },
];

const StudentsLearn = () => (
  <section className="learn-section">
    <div className="container">
      <h2 className="learn-title prog-section-title">WHAT WILL STUDENTS LEARN?</h2>
      <p className="learn-sub">Students develop critical thinking skills for students, strengthen observation and
research, apply scientific modeling, and build confidence in problem-solving through
astronomy, coding, robotics, engineering, experimentation, communication, and real-world
space challenges.</p>

      <div className="learn-grid">
        {LEARN_ITEMS.map((it, i) => {
          // each card gets its own image first, then two others from the
          // pool so the autoplay slider has something to cycle through
          const imgs =
            it.imgs && it.imgs.length
              ? it.imgs
              : [
                  it.img,
                  LEARN_IMAGE_POOL[(i + 2) % LEARN_IMAGE_POOL.length],
                  LEARN_IMAGE_POOL[(i + 4) % LEARN_IMAGE_POOL.length],
                ];
          return (
            <article className="learn-card" key={it.label}>
              <Swiper
                className="learn-card-slider"
                modules={[Autoplay]}
                loop
                slidesPerView={1}
                speed={700}
                grabCursor
                autoplay={{
                  delay: 2200,
                  disableOnInteraction: false,
                }}
              >
                {imgs.map((src, j) => (
                  <SwiperSlide key={j}>
                    <img
                      className="learn-card-img"
                      src={src}
                      alt={it.label}
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <span className="learn-card-label">{it.label}</span>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* =========================================================
   CERTIFICATES (section 6)
========================================================= */

const Certificates = () => (
  <section className="cert-section">
    <div className="cert-inner container">
      <div className="cert-text">
        <h2 className="cert-title prog-section-title">CERTIFICATES</h2>
        <p>Every skill earned is a step towards greater confidence, and every milestone achieved deserves to be recognised. We celebrate each accomplishment, inspiring students to keep learning, growing, and reaching for even greater heights on their journey of discovery.</p>
      
        
      </div>

      <div className="cert-slider">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={1.6}
          autoplay={{
            delay: 1800,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 240,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2.2 },
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <SwiperSlide key={i} className="cert-slide">
              <img src={certificateUrl} alt="LOF certificate" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
);

/* =========================================================
   BIG ASTEROID (space-careers background element)
========================================================= */

const BigAsteroid = () => {
  const groupRef = useRef();
  const gltf = useGLTF(BIG_ASTEROID_URL);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  const scale = useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      // real rock — diffuse, almost no specular. The space.hdr env was
      // bouncing off the surface at 4.8x intensity and the roughness was
      // being clamped DOWN to 0.5, which made it look like polished
      // chrome. Force the opposite: nearly fully rough, non-metallic,
      // and barely any environment contribution so the baked texture
      // is what we see, not the lighting rig
      o.material.roughness = Math.max(o.material.roughness ?? 0.95, 0.95);
      o.material.metalness = 0;
      o.material.envMapIntensity = 0.35;
      o.material.needsUpdate = true;
    });
    const s = new THREE.Sphere();
    new THREE.Box3().setFromObject(scene).getBoundingSphere(s);
    return 5.5 / (s.radius * 2 || 1);
  }, [scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.05;
    groupRef.current.rotation.y += delta * 0.09;
    groupRef.current.rotation.z += delta * 0.03;
  });

  return (
    <group ref={groupRef} position={[-4.5, -0.5, -1]}>
      <primitive object={scene} scale={scale} frustumCulled={false} />
    </group>
  );
};

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
  <section className="careers-section">
    <div className="container">
      <h2 className="careers-title prog-section-title">WHY SPACE FOR FUTURE CAREERS?</h2>
      <p className="careers-sub">The space economy will be worth $1 trillion by 2040. It needs coders, engineers, data scientists, AI specialists and designers, not just astronauts. Space careers for students now span everything from AI in astronomy to aerospace engineering — and Lab of Future builds students the industry is actually waiting for.
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

const Competitions = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="competitions-section">
    <div className="competitions-inner container">
      <div className="competitions-left">
        <div className="competitions-heading">
          <h2 className="competitions-label-text">COMPETITIONS</h2>
          <p className="competitions-subtitle">LOF students don’t just participate, they prepare with purpose. From astronomy
competitions for students and space science olympiad preparation to global innovation
challenges, students build confidence, portfolios, and real problem-solving ability through
structured national science competition training.</p>
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
    q: "Astrophysics & Space Research",
    a: "Astrophysics & Observational Astronomy. Your astrophysics pathway starts here. For students who need to understand why — not just what. Learn through telescopes, physics, mathematics, and real astronomical observation.", 

  },
  {
    q: "Aerospace & Satellite Engineering",
    a: "Design rockets, satellites, habitats, and mission systems while understanding how real spacecraft are engineered and launched.",
  },
  {
    q: "Space Research & Data Science",
    a: "The space data science pathway trains students to analyse astronomical data, find patterns, and apply computational methods to real space missions.",
  },
  {
    q: "Astrobiology & Planetary Science",
    a: "Could life exist beyond Earth? This interdisciplinary pathway combines astronomy, biology, chemistry, and planetary science to explore one of humanity's biggest questions.",
  },
    {
    q: "Exoplanet & Habitability Research",
    a: "Students discover how scientists search for Earth-like worlds and study conditions that may support life beyond our solar system.",
  },
      {
    q: "Climate & Earth Observation Science",
    a: "Using satellite data and remote sensing tools, students analyse climate systems, environmental change, and planetary monitoring.",
  },
];

const CareerPathways = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="career-pathways-section">
      <div className="container">
        <h2 className="career-pathways-title prog-section-title">CAREER PATHWAYS</h2>
        <p className="prog-section-subtitle">
           One Passion. Countless Career Directions.
  </p>
  <p>Most programmes tell students what careers exist. We let them walk the path early enough to actually choose.
</p>
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
    points: ["Astrophysics", "Planetary Science", "Astrodynamics", "Space Research"],
    
     
     
  },
  
  {
    title: "Love coding & AI?",
    points: ["Space Data Science","AI for Space Science","Simulation & Modelling","Cybersecurity"],
  },
  {
    title: "Love building things?",
    points: ["Robotics","Satellite Engineering","Aerospace Systems","Space Hardware Design"],
  },
  {
    title: "Love people & impact?",
    points: ["Space Policy","Science Communication","Space Design & Visualisation","Entrepreneurship"],
  },
];

const ChooseRightPath = () => (
  <section className="choose-path-section">
    <div className="container">
      <h2 className="choose-path-title prog-section-title">HOW TO CHOOSE THE RIGHT PATH</h2>
      <p className="careers-sub">Every child learns differently. Our mentors assess interests, strengths, and curiosity levels to
recommend the right space science curriculum and personalised space learning for
children.</p>
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
// Partner detail data — drives the click-to-open modal. Edit each entry's
// name / details / stats (and add an optional `image`) to match its logo.
// `x` is the box's horizontal position in the tree (unchanged).
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
      "India's national space agency, building satellites, launch vehicles, and landmark planetary missions like Chandrayaan and Mangalyaan to advance science and national development.",
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
      src={assocLight}
      alt=""
      aria-hidden="true"
    />
  </button>
);

/* Partner detail modal — opens on card click. Layout mirrors the
   reference: logo + identity + meta + CTA on the left, hero image and
   three stat cards on the right. */
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

  // Portal to <body> so no section's stacking context can sit over it.
  return createPortal(
    <div className="assoc-modal-overlay" onClick={onClose}>
      <div
        className="assoc-modal"
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
          {/* LEFT — identity + meta + CTA */}
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

          {/* RIGHT — hero image + stat cards */}
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
  <section className="assoc-section">
    {/* scattered blinking star dots in the backdrop */}
    <div className="assoc-blink-stars" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <i key={i} />
      ))}
    </div>

    <h2 className="assoc-title prog-section-title">WHO ARE WE ASSOCIATED WITH</h2>
    <p className="prog-section-subtitle">Collaborations, scientist interactions, institutional partnerships, and real-world exposure
designed to bring students closer to the future of space.</p>

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
      className={`spacescience-vetted-by vetted-section${inView ? " vetted-section--in" : ""}`}
    >
      <div className="vetted-inner container">
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

        {/* right column stays open for the astronaut to land in */}
        <div className="vetted-right">
          <h2 className="vetted-title prog-section-title">VETTED BY</h2>
          <p className="prog-section-subtitle">Our curriculum is reviewed by scientists, educators, and specialists with real industry and
research experience.</p>
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
  <section className="modes-section">
    <div className="container">
      <h2 className="modes-title prog-section-title">MODES TO JOIN</h2>
      <p className="modes-subtitle prog-section-subtitle">More Than Just Science</p>
      <p className="modes-desc">Choose from onsite space and astronomy classes, live online space science courses,
school programs, immersive camps, or DIY learning experiences — all guided by mentors.</p>

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
    title: "Investigating Exoplanets Using ESA CHEOPS Data",
    desc: "Analysing real satellite data to detect planets 800 light years away — using the same methods professional astronomers use. ",
    student: "Yathika",
    meta: "Age 11 | Space & Astronomy Research Track",
  },
  {
    title: "Mission Mars: Rescue the Ice Crystals ",
    desc: "Designing and programming an autonomous Mars rover to collect fragile ice samples and return safely to base.",
    student: "Student Name",
    meta: "Class | Section",
  },
  {
    title: "Touchdown Lander Deployment System",
    desc: "Building and triggering a 4-legged lander deployment mechanism — modelled after Artemis & Chandrayaan landing systems.",
    student: "Student Name",
    meta: "Class | Section",
  },
   {
    title: "Student-Made CubeSat Launched Into Stratosphere ",
    desc: "Representing the UAE, our students built and launched a real CubeSat into the stratosphere as part of Orbita Mission 25...",
    student: "Team UAE",
    meta: "Orbita Mission 25 | Space Research Track",
  },
   {
    title: "3D-printed Space Debris Collection System",
    desc: "AI-Powered Space Debris Collection System 3D-designed and 3D-printed a fully automated system to capture, recognise, compress and collect space debris in orbit...",
    student: "Akanksha Juliette · Age 16",
    meta: "Space & Astronomy Research Track Mentored by Vitali Braun, ESA Engineer",
  },
];

const StudentProjects = () => (
  <section className="projects-section">
    <div className="container">
      <h2 className="projects-title prog-section-title">STUDENT PROJECTS</h2>
      <p className="projects-subtitle prog-section-subtitle">Real Projects. Real Science. Real Pride.</p>
      <p className="projects-desc">These aren't school assignments. These are real student space projects and astronomy prototypes — built by real students using actual satellite data, real tools, and genuine scientific methods.
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
                  <h3 className="projects-card-title pb-3">{p.title}</h3>
                  <p className="projects-card-desc pb-3">{p.desc}</p>
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
    desc: "Students tackle challenges no textbook has solved — detecting invisible planets using real satellite data, designing systems that survive on Mars, and launching hardware into the stratosphere. This is real-world problem solving, not theory.",
  },
  {
    icon: impactIcon2,
    title: 'The "Maker"\nMindset',
    desc: "Every project is built, tested and defended. Students develop a true maker mindset — working with real datasets, real tools and real scientific workflows. Not simulations. Not worksheets. Real science.",
  },
  {
    icon: impactIcon3,
    title: "Measurable\nGrowth",
    desc: "Students leave with more than a certificate. They leave with a science portfolio built from real project outcomes — proof of what they can actually do. To universities, competitions and future mentors, that portfolio speaks louder than any grade.",
  },
];

const ProjectImpact = () => (
  <section className="impact-section">
    <div className="container">
      <div className="impact-head">
        <h2 className="impact-title prog-section-title">PROJECT IMPACT</h2>
        <p className="impact-subtitle prog-section-subtitle">Real Skills. Real Proof. Real Future.</p>
        <p className="impact-desc">Every project at Lab of Future begins with a real question and ends with a documented answer. Our real-world STEM projects are designed to take a curious mind and turn it into an active builder — developing measurable skill development at every stage.</p>
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
   COMMUNITY — Earth + Moon split as you scroll, then the
   tabs / testimonials reveal
========================================================= */

// shared helper — how far we've scrolled INTO a section, 0 at the top edge,
// 1 once the section's bottom hits the bottom of the viewport (or close to)
const sectionScrollProgress = (el) => {
  if (!el) return 0;
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  const total = el.offsetHeight - vh;
  if (total <= 0) return r.top < 0 ? 1 : 0;
  return Math.max(0, Math.min(-r.top / total, 1));
};

/* Viewport-intersection progress — works whether the section is 100vh or
   500vh tall. 0 when the section top is sitting at the bottom of the
   viewport; 1 once the section top has scrolled past the top of the
   viewport. Gives a smooth 1-viewport-height scroll window. */
const sectionViewportProgress = (el) => {
  if (!el) return 0;
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  return Math.max(0, Math.min(1 - r.top / vh, 1));
};

/* Exit progress — holds at 0 while the section is entering or fully in
   view, then ramps 0 → 1 over one viewport-height of scroll as the section
   leaves the top of the viewport. Use this when the animation should only
   start as the user heads to the NEXT section. */
const sectionExitProgress = (el) => {
  if (!el) return 0;
  const vh = window.innerHeight;
  const r = el.getBoundingClientRect();
  if (r.top >= 0) return 0; // section top still at/below viewport top — idle
  return Math.max(0, Math.min(-r.top / vh, 1));
};

// shared pointer-drag handler factory — both planets get manual rotation
// with momentum-style free spin after release
const usePlanetDrag = (ref) => {
  const state = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    velY: 0, // angular velocity (rad/frame) carried over after release
    velX: 0,
  });

  const onPointerDown = (e) => {
    e.stopPropagation();
    state.current.active = true;
    state.current.lastX = e.clientX;
    state.current.lastY = e.clientY;
    state.current.velY = 0;
    state.current.velX = 0;
    try {
      e.target.setPointerCapture?.(e.pointerId);
    } catch {}
    document.body.style.cursor = "grabbing";
  };
  const onPointerMove = (e) => {
    if (!state.current.active || !ref.current) return;
    const dx = e.clientX - state.current.lastX;
    const dy = e.clientY - state.current.lastY;
    state.current.lastX = e.clientX;
    state.current.lastY = e.clientY;
    ref.current.rotation.y += dx * 0.006;
    ref.current.rotation.x += dy * 0.006;
    // capture latest drag delta as release velocity (free spin)
    state.current.velY = dx * 0.006;
    state.current.velX = dy * 0.006;
  };
  const onPointerUp = (e) => {
    if (!state.current.active) return;
    state.current.active = false;
    try {
      e?.target?.releasePointerCapture?.(e.pointerId);
    } catch {}
    document.body.style.cursor = "";
    // velocity stays — useFrame applies and decays it for the free spin
  };
  return {
    state,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerOver: () => {
        if (!state.current.active) document.body.style.cursor = "grab";
      },
      onPointerOut: () => {
        if (!state.current.active) document.body.style.cursor = "";
      },
    },
  };
};

const CommunityEarth = () => {
  const ref = useRef();
  const gltf = useGLTF(EARTH3_URL);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  const { state: drag, handlers } = usePlanetDrag(ref);

  const scale = useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      // useGLTF caches the source; the main scene's Earth uses the same
      // GLB, so clone the material before mutating to keep them independent
      o.material = o.material.clone();
      const m = o.material;
      if (m.map) {
        m.map.colorSpace = THREE.SRGBColorSpace;
        m.map.needsUpdate = true;
      }
      if (m.emissiveMap) m.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      // restrained env response so the surface texture isn't washed out
      m.envMapIntensity = 1.0;
      m.roughness = Math.max(m.roughness ?? 0.7, 0.65);
      m.needsUpdate = true;
    });
    const s = new THREE.Sphere();
    new THREE.Box3().setFromObject(scene).getBoundingSphere(s);
    // bigger earth (3.6 → 7)
    return 7 / (s.radius * 2 || 1);
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const sec = document.querySelector(".community-section");
    let p = sectionScrollProgress(sec);
    p = p * p * (3 - 2 * p);

    // drift left + grow (only a quarter peeks in from the left at full scroll)
    const targetX = -7 * p;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.1;
    const grow = 1 + 0.45 * p; // up to 1.45x as it slides off-screen
    ref.current.scale.setScalar(grow);

    // rotation: drag → free spin (momentum) → idle spin
    if (!drag.current.active) {
      ref.current.rotation.y += drag.current.velY;
      ref.current.rotation.x += drag.current.velX;
      // friction decay
      drag.current.velY *= 0.97;
      drag.current.velX *= 0.97;
      // gentle idle spin only after the throw has died out
      if (Math.abs(drag.current.velY) < 0.001) {
        ref.current.rotation.y += delta * 0.04;
      }
    }
  });

  return (
    <group ref={ref} position={[0, -0.2, 0]} {...handlers}>
      <primitive object={scene} scale={scale} frustumCulled={false} />
    </group>
  );
};

const CommunityMoon = () => {
  const ref = useRef();
  const gltf = useGLTF(MOON_SMALL_URL);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  const { state: drag, handlers } = usePlanetDrag(ref);

  const scale = useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const m = o.material;
      if (m.map) {
        m.map.colorSpace = THREE.SRGBColorSpace;
        m.map.needsUpdate = true;
      }
      m.envMapIntensity = 1.4;
      m.needsUpdate = true;
    });
    const s = new THREE.Sphere();
    new THREE.Box3().setFromObject(scene).getBoundingSphere(s);
    return 1.6 / (s.radius * 2 || 1);
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const sec = document.querySelector(".community-section");
    let p = sectionScrollProgress(sec);
    p = p * p * (3 - 2 * p);
    const targetX = 6.5 * p;
    ref.current.position.x += (targetX - ref.current.position.x) * 0.1;

    if (!drag.current.active) {
      ref.current.rotation.y += drag.current.velY;
      ref.current.rotation.x += drag.current.velX;
      drag.current.velY *= 0.97;
      drag.current.velX *= 0.97;
      if (Math.abs(drag.current.velY) < 0.001) {
        ref.current.rotation.y += delta * 0.08;
      }
    }
  });

  return (
    <group ref={ref} position={[0, -0.2, -1.5]} {...handlers}>
      <primitive object={scene} scale={scale} frustumCulled={false} />
    </group>
  );
};

const LOREM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

const TESTIMONIALS = {
  students: [
    { name: "Yathika, Age 11", role: "Exoplanet Research Project", img: projectImg, desc: "I used real ESA satellite data to find a planet 800 light years away. I was 11. No astronomy class for children ever made me feel like a real scientist — until this one - Exoplanet Research Project" },
    { name: "Team UAE", role: "Orbita Mission 25 | Space Research Track", img: projectImg, desc: "We built a real satellite, launched it into the stratosphere, and won 2nd place in Russia — representing the UAE. No school could have given us this." },
    { name: "Shanee Johns", role: "Parent of Akanksha, Age 17 | Space Debris Project", img: projectImg, desc: "Akanksha's project is now on display in our school library. The response was overwhelming. What Lab of Future built in her goes beyond a project. It built her confidence, her communication, and her future." },
    { name: "Parent of Omar", role: "Age 12 | Space & Astronomy Track", img: projectImg, desc: "My son came home after his first session and said — Mum, I want to work at ESA. He was 12. These astronomy classes for children are taught by people who actually live and breathe space." },
    { name: "Riya", role: "Age 14 | Computational Astronomy Track", img: projectImg, desc: "I signed up not knowing what to expect. Six months later I had a research portfolio, a certificate, and a passion I didn't know I had. This kids astronomy program is unlike anything else." },
    { name: "Parent of Noor", role: "Age 10 | Space Explorer Track", img: projectImg, desc: "We tried coding camps, robotics camps, science clubs. Nothing stuck. The moment she joined this space science for kids program — something clicked. She hasn't stopped since." },
    { name: "Akanksha Juliette", role: "Age 17 | Space Debris Project | Mentored by ESA Engineer Vitali Braun", img: projectImg, desc: "I designed a space debris collection system mentored by a real ESA engineer. At 17. That's not a school project. That's a career starting early" },
    { name: "Parent of Zara", role: "Age 11 | Space & Astronomy Track", img: projectImg, desc: "My daughter used to say science was boring. Three months into this program she was explaining light curves to her grandfather over dinner. He was more confused than before — but we were so proud." },
  ],
};

const Community = () => {
  // category filter (tabs) removed — always show the default testimonials
  const [tab] = useState("students");
  const sectionRef = useRef(null);
  const [reveal, setReveal] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // On phones the section is static — content is always shown and the
    // scroll-driven planet reveal is skipped.
    if (isMobile) {
      setReveal(true);
      return undefined;
    }
    const onScroll = () => {
      // content reveals AFTER the planets have completed their split
      const p = sectionScrollProgress(sectionRef.current);
      setReveal(p > 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  const items = TESTIMONIALS[tab];

  return (
    <section
      ref={sectionRef}
      className={`community-section${
        reveal || isMobile ? " community-section--in" : ""
      }`}
    >
      {/* sticky 3D backdrop — Earth left, Moon right, animated by scroll.
          Dropped on phones so the section is a plain static block. */}
      {!isMobile && (
      <div className="community-bg-holder">
        <Canvas
          {...canvasPerf}
          camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 200 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            // planets are draggable; only their meshes consume events
            pointerEvents: "auto",
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} color="#22386b" />
            <directionalLight
              position={[6, 8, 5]}
              intensity={2.2}
              color="#cfe2ff"
            />
            <directionalLight
              position={[-6, 4, 3]}
              intensity={1.4}
              color="#a8c8ff"
            />
            <pointLight
              position={[3, 0, 5]}
              intensity={2.4}
              distance={22}
              decay={2}
              color="#9ec3ff"
            />
            <Environment
              files="/hdri/space.hdr"
              resolution={256}
              background={false}
              environmentIntensity={1.6}
            />
            <CommunityEarth />
            <CommunityMoon />
          </Suspense>
        </Canvas>
      </div>
      )}

      {/* sticky content — fades in once the planets have split */}
      <div className="community-content">
        <div className="container community-grid">
          <div className="community-slider">
            <Swiper
              key={tab}
              direction="vertical"
              modules={[Autoplay]}
              loop
              slidesPerView={3}
              centeredSlides
              spaceBetween={28}
              speed={650}
              autoplay={{
                delay: 2400,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                768: { slidesPerView: 3, spaceBetween: 32 },
              }}
            >
              {items.map((it, i) => (
                <SwiperSlide key={`${tab}-${i}`} className="community-slide">
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
                      {it.role && (
                        <span className="community-card-role">{it.role}</span>
                      )}
                      <p className="community-card-desc">{it.desc}</p>
                      {/* <button type="button" className="community-card-btn">
                        Read more
                      </button> */}
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="community-info">
            <h2 className="community-title prog-section-title">
              What Our
              <br />
              Community Says
            </h2>
            <p className="community-desc">At Lab of Future, learning goes far beyond weekly sessions.</p><br />

<p className="community-desc">Families joining our kids astronomy program become part of a vibrant ecosystem filled
with scientist interactions, expert masterclasses, quizzes, challenges, and real-world
experiences designed to keep curiosity alive.</p><br />

<p className="community-desc">More than traditional astronomy classes for children, this is an immersive space science
for kids experience where students begin thinking like explorers, creators, and future
problem-solvers — with parents closely involved in the journey.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   FUTURE BUILT — astronaut video, scrubbed by scroll. Stops on
   the final frame; centred CTA fades in at the end.
========================================================= */

const FutureBuilt = () => {
  const { openEnquiry } = useEnquiryModal();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const startedRef = useRef(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // start playback on the FIRST scroll that puts the section in view.
    // Once kicked off it plays through at its own normal rate — playback
    // is no longer tied to scroll position or scroll speed.
    const onScroll = () => {
      if (startedRef.current) return;
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        startedRef.current = true;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    };

    // reveal the CTA once the video finishes; freezes on its last frame
    // automatically since the element has no `loop`
    const onEnded = () => setReveal(true);

    window.addEventListener("scroll", onScroll, { passive: true });
    video.addEventListener("ended", onEnded);

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`future-section${reveal ? " future-section--in" : ""}`}
    >
      {/* sticky video — fills the viewport, scroll-scrubbed */}
      <div className="future-bg">
        <video
          ref={videoRef}
          src={futureVideoUrl}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="future-bg-overlay" />
      </div>

      {/* sticky content — fades in once the video has reached its end frame */}
      <div className="future-content">
        <h2 className="future-title">
          THE FUTURE WON&apos;T BE MEMORISED
          <br />
          IT WILL BE BUILT
        </h2>
        <p className="future-desc">
          Give your child more than knowledge. Give them direction, confidence,
          and capability &mdash; and the tools to shape the world beyond our
          planet.
        </p>
        <div className="future-actions">
          <button type="button" onClick={openEnquiry} className="future-btn future-btn--primary">
            Enroll Now
          </button>
          <button type="button" onClick={openEnquiry} className="future-btn future-btn--ghost">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   TRACKING — "What are we tracking?" — big orange-lit moon
   with mission countdowns. Drag the moon to rotate it.
========================================================= */

const TRACKING_MISSIONS = [
  { title: "Mission 1", time: "T-14:40:00" },
  { title: "Mission 2", time: "T-14:40:00" },
  { title: "Mission 3", time: "T-14:40:00" },
];

const TrackingMoon = () => {
  const groupRef = useRef();
  const gltf = useGLTF(MARS_URL);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  const scale = useMemo(() => {
    scene.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      // clone so we don't mutate the shared GLB material
      o.material = o.material.clone();
      // let Mars' baked diffuse show through, with a slight env boost so the
      // warm orange backlight lifts the rim
      o.material.envMapIntensity = 0.8;
      o.material.roughness = Math.max(o.material.roughness ?? 0.85, 0.8);
      o.material.needsUpdate = true;
    });
    const s = new THREE.Sphere();
    new THREE.Box3().setFromObject(scene).getBoundingSphere(s);
    // big Mars — fills the right half of the viewport like the reference
    return 15 / (s.radius * 2 || 1);
  }, [scene]);

  // pure idle spin — no drag interaction
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={groupRef} position={[7, -7, -2.5]}>
      <primitive object={scene} scale={scale} frustumCulled={false} />
    </group>
  );
};

const Tracking = () => (
  <section className="tracking-section">
    {/* warm orange spot behind the moon — bleeds into the dark backdrop */}
    <div className="tracking-bg-glow" />

    {/* 3D moon */}
    <div className="tracking-canvas">
      <Canvas
        {...canvasPerf}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 200 }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          // canvas no longer captures pointer events — Mars is purely
          // decorative now, so clicks fall through to the watch buttons
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          {/* very dark ambient + warm rim from behind the moon */}
          <ambientLight intensity={0.18} color="#160a06" />

          {/* orange spotlight from ABOVE — the warm rim catches along the
              top edge of the moon as it turns */}
          <pointLight
            position={[5, 9, -2]}
            intensity={90}
            distance={32}
            decay={1.4}
            color="#ff7a28"
          />
          <pointLight
            position={[4, 6, -4]}
            intensity={55}
            distance={26}
            decay={1.5}
            color="#ff8838"
          />
          {/* secondary hot halo behind/above the moon's centre */}
          <pointLight
            position={[5, 5, -8]}
            intensity={38}
            distance={28}
            decay={1.7}
            color="#ffae5a"
          />
          {/* soft warm fill on the front so the moon isn't pitch black */}
          <directionalLight
            position={[-4, 4, 6]}
            intensity={0.75}
            color="#ffb58a"
          />
          {/* faint cool kick from camera-left for separation */}
          <directionalLight
            position={[-6, -2, 4]}
            intensity={0.25}
            color="#6080a8"
          />

          <Environment
            preset="sunset"
            background={false}
            environmentIntensity={0.6}
          />

          <TrackingMoon />
        </Suspense>
      </Canvas>
    </div>

    {/* mission list */}
    <div className="tracking-content">
      <div className="container tracking-inner">
        <h2 className="tracking-title">What are we tracking?</h2>
        <div className="tracking-list">
          {TRACKING_MISSIONS.map((m, i) => (
            <article className="tracking-mission" key={i}>
              <h3 className="tracking-mission-title">{m.title}</h3>
              <p className="tracking-mission-time">{m.time}</p>
              <NavLink
                to="/programs"
                className="glass-btn glass-btn--light header-btn"
                style={{ marginTop: "var(--space-s)" }}
              >
                WATCH <span aria-hidden="true" style={{marginLeft:"20px"}}>&#9654;</span>
              </NavLink>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* =========================================================
   EXPLORE PROGRAMS — autoplay card slider
========================================================= */

const PROGRAM_CARDS = [
  { label: "ROBOTICS", img: modeOnsiteImg },
  { label: "ARTIFICIAL INTELLIGENCE", img: modeOnlineImg },
  { label: "DRONES", img: modeDiyImg },
  { label: "3D DESIGNING", img: modeOnsiteImg },
  { label: "ROBOTICS", img: modeOnlineImg },
  { label: "ARTIFICIAL INTELLIGENCE", img: modeDiyImg },
];

const ExplorePrograms = () => (
  <section className="explore-section">
    <div className="container">
      <h2 className="explore-title prog-section-title">Explore our other programs</h2>
      <p className="prog-section-subtitle">Space is just the beginning.
Explore AI, Robotics, Aeromodelling, Space Robotics, Model Rocketry, Satellite Design,
Coding, Aerospace Engineering, and 3D Design — immersive, hands-on programs built to
help students create, experiment, innovate, and think like future problem-solvers.</p>

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
   FAQ — Frequently Asked Questions (two-column accordion).
   Duplicated from AiAndDataScience.jsx so the Space Science
   page shows the same FAQ block after the Tracking section.
========================================================= */

const FAQ_ROBOTICS = [
  {
    q: "What age group is the program designed for?",
    a: "Our Space Science and Astronomy program is designed for students aged 6–18 years, with age-specific pathways that evolve with curiosity, confidence, and capability.",
  },
  {
    q: "Does my child need prior knowledge of astronomy or space science?",
    a: "Not at all. Whether your child is just beginning or already deeply curious, the program is designed to meet them at the right level and help them grow meaningfully.",
  },
  {
    q: "What is the difference between online and onsite learning?",
    a: "Our online astronomy classes are live, mentor-led, and highly interactive. Students engage in guided activities, discussions, and hands-on learning. Onsite learners experience additional lab-based building, collaboration, and immersive project work at Lab of Future.",
  },
  {
    q: "What kinds of projects will students work on?",
    a: "Students work on rockets, Mars rover challenges, telescope observations, coding, robotics, mission simulations, and space-based design projects—learning through building, experimentation, and problem-solving.",
  },
  {
    q: "Do students participate in competitions?",
    a: "Yes. Students regularly receive exposure to space and astronomy olympiads, innovation challenges, and research-based competitions designed to strengthen confidence, analytical thinking, and creativity.",
  },
  {
    q: "What happens if my child misses a class?",
    a: "Our missed class policy ensures students stay on track through guided support, mentor assistance, and catch-up mechanisms wherever applicable.",
  },
  {
    q: "Who teaches the program?",
    a: "Our mentors, educators, and specialists bring strong qualifications in space science, technology, experiential learning, and student engagement.",
  },
  {
    q: "Do students receive certificates?",
    a: "Yes. Students receive accredited certificates and milestone recognitions based on participation, projects completed, and demonstrated learning outcomes.",
  },
  {
    q: "Is transportation available?",
    a: "Transportation availability depends on the location and format of the program. Please speak with our team for route and pickup details.",
  },
  {
    q: "What are the program fees?",
    a: "Our Space Science program fees vary based on age group, learning format, and duration. Please contact our team for the latest fee structure and available options.",
  },
  {
    q: "How long is the program?",
    a: "Our astronomy course duration varies by age, level, and learning pathway. Students progress through 5 structured levels — Beginner to Mastery, ensuring age-appropriate learning and continuous skill development.",
  },
  {
    q: "How do I get started?",
    a: "Simply book a consultation or trial session, and our team will guide you toward the best pathway for your child. You can also enroll directly through our admissions team.",
  },
];

const FaqRobotics = () => {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);
  const half = Math.ceil(FAQ_ROBOTICS.length / 2);
  const cols = [FAQ_ROBOTICS.slice(0, half), FAQ_ROBOTICS.slice(half)];

  return (
    <section className="faq-robotics-section faq-robotics-section--space">
      {/* darkening overlay over the space FAQ background for text contrast */}
      <div className="faq-robotics-overlay" aria-hidden="true" />
      <div className="container">
        <h2 className="faq-robotics-title prog-section-title">
          FREQUENTLY ASKED <br></br>QUESTIONS
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

const SpaceScience = () => {
  const { openEnquiry } = useEnquiryModal();

  // Tag <body> so this page's header CTA can opt into the dark-btn.svg
  // frame without affecting the global header on other pages.
  useEffect(() => {
    document.body.classList.add("space-science-page");
    return () => document.body.classList.remove("space-science-page");
  }, []);

  // Mobile flag — on phones we strip the heavy hero 3D (asteroids +
  // satellite) and keep the astronaut to the hero only (see below).
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <BackToTopButton />
      <SEO
        title={`Home | ${siteConfig.title}`}
        description={siteConfig.description}
        url={siteConfig.url}
        image={siteConfig.socialImage}
        keywords={["React", "Three.js", "GSAP"]}
      />

      {/* Single fixed canvas — ONE astronaut travels the entire page */}
      <div
        id="astro-layer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <Canvas
          {...canvasPerf}
          camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 500 }}
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <Suspense fallback={null}>
            <SceneLights />
            <Environment
              files="/hdri/space.hdr"
              resolution={256}
              background={false}
              environmentIntensity={1.6}
            />
            <FloatingAstronaut isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      {/* invisible drag-area follows the astronaut on screen */}
      <AstroHitArea />

      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-flare" />

        <HeroText />

        <Canvas
          className="hero-canvas"
          {...canvasPerf}
          camera={{
            position: [0, 0, 8],
            fov: 45,
            near: 0.1,
            far: 2000,
          }}
        >
          <Suspense fallback={null}>
            {/* CINEMATIC BLUE — matches the banner photo: bright blue
                sun from upper-LEFT, deep navy ambient, strong cool rim */}
            <ambientLight intensity={0.45} color="#1c356e" />

            {/* SUN KEY — bright blue-white from the upper-left, in line
                with the lens-flare position in the banner artwork */}
            <directionalLight
              position={[-15, 9, 7]}
              intensity={3.2}
              color="#cfe6ff"
            />

            {/* secondary blue key — lifts the suit/satellite highlights */}
            <directionalLight
              position={[-10, 5, 4]}
              intensity={2.0}
              color="#7fb6ff"
            />

            {/* deep cobalt rim from behind, separates the figures from
                the photo's dark areas */}
            <directionalLight
              position={[6, -2, -10]}
              intensity={1.6}
              color="#2a5fff"
            />

            {/* close fill aimed at the astronaut for the chrome visor */}
            <pointLight
              position={[0, 0, 5]}
              intensity={3.2}
              distance={16}
              decay={2}
              color="#dfeaff"
            />

            {/* cool atmospheric glow from camera-left (sun bloom) */}
            <pointLight
              position={[-12, 4, 4]}
              intensity={4.2}
              distance={70}
              decay={1.4}
              color="#79b4ff"
            />

            {/* subtle warm bounce from Earth (right side of frame) so
                the suit picks up a hint of warmth like in the photo */}
            <pointLight
              position={[12, 0, 4]}
              intensity={1.6}
              distance={50}
              decay={1.6}
              color="#5d8fe6"
            />

            {/* space HDRI — keeps reflections + IBL accurate */}
            <Environment
              files="/hdri/space.hdr"
              resolution={512}
              background={false}
              environmentIntensity={2.2}
            />

            {/* asteroids + satellite are dropped on phones to lighten the
                hero scene */}
            {!isMobile && <Asteroids />}

            <Earth />

            {!isMobile && <Satellite />}
          </Suspense>
        </Canvas>

        <div className="hero-vignette" />

        <div className="hero-bottom-fade" />
      </section>

      <WhySpaceScience />

      <LofProgram />

      <AgePrograms />

      <StudentsLearn />

      <Certificates />

      {/* Space-themed backdrop shared by two sections */}
      <div className="space-careers-wrapper">
        {/* Sticky canvas holder — stays in viewport while content scrolls over it */}
        <div className="space-careers-bg-holder">
          <Canvas
            {...canvasPerf}
            camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 200 }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} color="#22386b" />
              <directionalLight
                position={[5, 8, 5]}
                intensity={1.9}
                color="#7fb4ff"
              />
              <directionalLight
                position={[-8, 4, 2]}
                intensity={1.3}
                color="#aee0ff"
              />
              <pointLight
                position={[0, 2, 4]}
                intensity={2.0}
                distance={20}
                decay={2}
                color="#5a90ff"
              />
              {/* Reddish environment lighting on the big asteroid (left side) */}
              <pointLight
                position={[-6, 1, 3]}
                intensity={4.5}
                distance={18}
                decay={2}
                color="#ff3311"
              />
              <pointLight
                position={[-3, 2, 4]}
                intensity={3.0}
                distance={14}
                decay={2}
                color="#ff5522"
              />
              <pointLight
                position={[-5, -2, 2]}
                intensity={2.2}
                distance={12}
                decay={2}
                color="#cc2200"
              />
              <Environment
                files="/hdri/space.hdr"
                resolution={256}
                background={false}
                environmentIntensity={2.0}
              />
              <BigAsteroid />
            </Suspense>
          </Canvas>
          <div className="space-careers-overlay" />
        </div>

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

      <Community />

      <Tracking />

      <FaqRobotics />

      <ExplorePrograms />

    </>
  );
};

useGLTF.clear(ASTRONAUT_URL);

// Hero-critical models — load immediately so the first viewport renders fast.
useGLTF.preload(EARTH_URL);
useGLTF.preload(ASTRONAUT_URL);
useGLTF.preload(SATELLITE_URL);

// Secondary models — defer by 2 s so they don't compete with hero assets.
setTimeout(() => {
  useGLTF.preload(ASTEROIDS_URL);
  useGLTF.preload(BIG_ASTEROID_URL);
  useGLTF.preload(EARTH3_URL);
  useGLTF.preload(MOON_SMALL_URL);
  useGLTF.preload(MARS_URL);
}, 2000);

export default SpaceScience;
