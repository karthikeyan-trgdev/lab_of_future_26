// Home.jsx

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";

import {
  Clone,
  ContactShadows,
  Environment,
  Stars,
  useAnimations,
  useGLTF,
  OrbitControls,
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

import { NavLink } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

import SEO from "../../components/common/SEO";
import { siteConfig } from "../../data/siteConfig";
import { canvasPerf } from "../../hooks/useDevicePerformance";

import droneCertImg from "../../assets/programs/aeromodelling/certificate.png";

import learnThinkCritically from "../../assets/programs/aeromodelling/students-learn-1.webp";
import learnUnderstandWorld from "../../assets/programs/aeromodelling/students-learn-2.webp";
import learnBuildModels from "../../assets/programs/aeromodelling/students-learn-3.webp";
import learnUseTools from "../../assets/programs/aeromodelling/students-learn-4.webp";
import learnCommunicate from "../../assets/programs/aeromodelling/students-learn-5.webp";
import learnWorkTeams from "../../assets/programs/aeromodelling/students-learn-6.webp";
import learnSolveProblems from "../../assets/programs/aeromodelling/students-learn-7.webp";

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

// Space Robotics specific assets — replaces the astronaut/earth/satellite
// trio in the hero with a single interactive robot character.
import roboticsHeroBg from "../../assets/programs/space-robotics/robotics-hero-bg.webp";
import robotCharacterUrl from "../../assets/programs/space-robotics/robot_character.glb?url";

// Drone hero assets
import droneGlbUrl from "../../assets/programs/drones/Drone.glb?url";
// Separate GLB used ONLY by the CTA drone — the small interactive
// drone that auto-rotates + responds to drag.
import smallDroneGlbUrl from "../../assets/programs/drones/small-drone.glb?url";
import droneDarkBtn from "../../assets/programs/drones/dark-btn.svg";
import dronesBgShape1 from "../../assets/programs/drones/bg-shape-1.svg";
import dronesElement1 from "../../assets/programs/drones/element-1.svg";
import dronesBgShape2 from "../../assets/programs/drones/bg-shape-2.svg";
import dronesAgeShape from "../../assets/programs/drones/age-shape.svg";
import dronesAgeSectionShape from "../../assets/programs/drones/age-section-shape.png";
import smallRobotUrl from "../../assets/programs/space-robotics/small-robot.glb?url";
import programImg1 from "../../assets/programs/space-robotics/program-1.png";
import programImg2 from "../../assets/programs/space-robotics/program-2.png";
import programImg3 from "../../assets/programs/space-robotics/program-3.png";
import programImg4 from "../../assets/programs/space-robotics/program-4.png";
import programImg5 from "../../assets/programs/space-robotics/program-5.png";
import programImg6 from "../../assets/programs/space-robotics/program-6.png";
import programImg7 from "../../assets/programs/space-robotics/program-7.png";
import programImg8 from "../../assets/programs/space-robotics/program-8.png";

import modeOnsiteImg from "../../assets/modes-to-join/onsite.png";
import modeOnlineImg from "../../assets/modes-to-join/online.png";
import modeDiyImg from "../../assets/modes-to-join/diy.png";
import projectImg from "../../assets/projects/project-1.png";
import droneProjectImg from "../../assets/programs/drones/project-image-1.png";
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

import dronesCareerImg1 from "../../assets/programs/drones/future-career-img-1.webp";
import dronesCareerImg2 from "../../assets/programs/drones/future-career-img-2.webp";
import dronesCareerImg3 from "../../assets/programs/drones/future-career-img-3.webp";
import dronesCareerImg4 from "../../assets/programs/drones/future-career-img-4.webp";

import calenderIcon from "../../assets/future-career/calender.svg";
import olympiadIcon from "../../assets/future-career/olympiad.svg";
import portfolioIcon from "../../assets/future-career/portfolio.svg";
import recognitionIcon from "../../assets/future-career/recognition.svg";
import skullIcon from "../../assets/future-career/skull.svg";
import competitionFrame from "../../assets/comp-frame.png";

// Aeromodelling-specific assets
import aeroHeroBg        from "../../assets/programs/aeromodelling/hero-bg.webp";
import aeroAircraftImg   from "../../assets/programs/aeromodelling/aircraft-1.png";
import aeroWhyBg         from "../../assets/programs/aeromodelling/why-aeromodeling-bg.webp";
import aeroWhyShape      from "../../assets/programs/aeromodelling/why-aeromodeling-shape.png";
import aeroWhyRight      from "../../assets/programs/aeromodelling/why-aeromodelling-right.png";
import aeroDarkBtn       from "../../assets/programs/aeromodelling/dark-btn.svg";
import aeroLightBtn      from "../../assets/programs/aeromodelling/light-btn.svg";
import aeroWhyYoungBg   from "../../assets/programs/aeromodelling/why-young-bg.webp";
import aeroAgeFrame      from "../../assets/programs/aeromodelling/age-frame.png";
import aeroLearnBg       from "../../assets/programs/aeromodelling/students-learn-bg.webp";
import aeroLearnFrame    from "../../assets/programs/aeromodelling/students-learn-frame.png";
import aeroCertBg        from "../../assets/programs/aeromodelling/certificate-bg.webp";
import aeroFutureCompBg  from "../../assets/programs/aeromodelling/future-and-competition-bg.webp";
import aeroCareerFrame   from "../../assets/programs/aeromodelling/future-career-box-frame.png";
import aeroCareerCoding  from "../../assets/programs/aeromodelling/coding.png";
import aeroCareerAI      from "../../assets/programs/aeromodelling/ai.png";
import aeroCareerElec    from "../../assets/programs/aeromodelling/electronics.png";
import aeroCareerEngD    from "../../assets/programs/aeromodelling/engineering-design.png";
import aeroCareerData    from "../../assets/programs/aeromodelling/data-analysis.png";
import aeroCareer3D      from "../../assets/programs/aeromodelling/3d-designing.png";
import aeroCareerResearch from "../../assets/programs/aeromodelling/research-mindset.png";
import aeroCareerPathBg     from "../../assets/programs/aeromodelling/career-pathway-bg.png";
import aeroRightPathAssocBg from "../../assets/programs/aeromodelling/right-path-and-associated-bg.png";
import aeroAssocBoxFrame    from "../../assets/programs/aeromodelling/associated-box-frame.svg";
import aeroAssocBoxLight    from "../../assets/programs/aeromodelling/associated-box-light.svg";
import aeroRightPathFrame   from "../../assets/programs/aeromodelling/right-path-box-frame.png";
import aeroTeamBoxFrame     from "../../assets/programs/aeromodelling/team-designation-box-frame.png";
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
import aeroVettedBg          from "../../assets/programs/aeromodelling/vetted-by-bg.webp";
import aeroVettedAircraft    from "../../assets/programs/aeromodelling/vetted-by-aircraft.png";
import aeroModesProjBg       from "../../assets/programs/aeromodelling/modes-and-students-project-bg.webp";
import aeroModeFrame         from "../../assets/programs/aeromodelling/modes-to-join-box-frame.png";
import aeroStudentProjFrame  from "../../assets/programs/aeromodelling/students-box-frame.png";
import aeroImpactBg         from "../../assets/programs/aeromodelling/project-impact-bg.webp";
import aeroImpactAircraft   from "../../assets/programs/aeromodelling/project-impact-aircraft.png";

import assocLight from "../../assets/assocoated-section/associated-client-frame-lighting.svg";
import assocLightRobotics from "../../assets/programs/drones/associated-client-frame-lighting.svg";
import lofLogo from "../../assets/Logo/log-header-logo.svg";
import assocLogo1 from "../../assets/programs/drones/logo-1.png";
import assocLogo2 from "../../assets/programs/drones/logo-2.png";
import assocLogo3 from "../../assets/programs/drones/logo-3.png";
import assocLogo4 from "../../assets/programs/drones/logo-4.png";
import assocLogo5 from "../../assets/programs/drones/logo-5.png";
import assocLogo6 from "../../assets/programs/drones/logo-6.png";
import assocLogo7 from "../../assets/programs/drones/logo-7.png";
import droneAssocImg from "../../assets/programs/drones/bg-shape-22.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import vettedGeorge from "../../assets/programs/drones/team-1.png";
import vettedMadison from "../../assets/programs/drones/team-2.png";
import vettedDavid from "../../assets/programs/drones/team-3.png";
import vettedVitali from "../../assets/programs/drones/team-4.png";
import vettedFrameRobotics from "../../assets/programs/drones/team-name-frame.png";

const EARTH_URL = earthUrl;
const ASTRONAUT_URL = astronautUrl;
const SATELLITE_URL = satelliteUrl;
const ASTEROIDS_URL = asteroidsUrl;
const BIG_ASTEROID_URL = bigAsteroidUrl;
const EARTH3_URL = earth3Url;
const MOON_SMALL_URL = moonSmallUrl;
const MARS_URL = marsUrl;

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

const FloatingAstronaut = () => {
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
    let targetScale = ASTRONAUT_SCALE;
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
      pCert = Math.max(0, Math.min((vh * 0.85 - cr.top) / (vh * 0.5), 1));
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
        let cy = vr.top + vr.height * 0.5 + vh * 0.95;
        const vtitle = document.querySelector(".vetted-title");
        if (vtitle) {
          const tr = vtitle.getBoundingClientRect();
          cx = tr.left + tr.width / 2;
        }
        tx = tx + (toWorldX(cx) - tx) * pVetted;
        ty = ty + (toWorldY(cy) - ty) * pVetted;
        // big zoom — only head + chest visible
        targetScale = targetScale + (2.7 - targetScale) * pVetted;
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
      window.__astroScreen.visible = world.z < 1;
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

const WhyAeromodelling = () => (
  <section className="aero-why-section">
    <div className="aero-why-inner container">

      {/* Title — sits above the panel in the notch area */}
      <h2 className="aero-why-title">
        <span className="aero-why-title-outline">WHY</span>{" "}<br></br>
        <span className="aero-why-title-bold">AEROMODELLING</span>
      </h2>

      {/* Blue panel shape — why-aeromodeling-shape.png */}
      <div className="aero-why-shape">
        <div className="aero-why-content">

          {/* LEFT — text + bullets + CTAs */}
          <div className="aero-why-text">
            <p>Aeromodelling is the most powerful gateway into science.</p>
            <p>Because when a child asks:</p>
            <ul className="aero-why-list">
              <li>How do we know where we are?</li>
              <li>Can humans live on Mars?</li>
              <li>How do rockets escape Earth?</li>
              <li>What lies beyond what we see?</li>
            </ul>
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

const WhySpaceScience = () => (
  <section className="why-section why-section--robotics drones-why-section">
    <div className="drones-why-inner container">
      {/* Outer decorative geometric elements at the page corners */}
      <img
        src={dronesElement1}
        alt=""
        aria-hidden="true"
        className="drones-why-element drones-why-element--tr-outer"
      />
      <img
        src={dronesElement1}
        alt=""
        aria-hidden="true"
        className="drones-why-element drones-why-element--bl-outer"
      />

      {/* Title sits in the notch (top-left) of the panel */}
      <h2 className="drones-why-title">
        <span className="drones-why-title-outline">WHY</span>{" "}
        <span className="drones-why-title-bold">DRONES?</span>
      </h2>

      {/* The black notched panel — uses bg-shape-1.svg as the actual
          panel shape (the SVG already contains the notch + dot patterns) */}
      <div className="drones-why-shape">

        <div className="drones-why-content">
          {/* LEFT — text + bullets + CTAs */}
          <div className="drones-why-text">
            <p>Drones is the most powerful gateway into science.</p>
            <p>Because when a child asks:</p>
            <ul className="drones-why-list">
              <li>How do we know where we are?</li>
              <li>Can humans live on Mars?</li>
              <li>How do rockets escape Earth?</li>
              <li>What lies beyond what we see?</li>
            </ul>
            <p>
              They naturally enter physics, maths, coding, engineering,
              biology, and climate science.
            </p>
            <p>
              Children stay engaged longer when learning begins with wonder
              instead of pressure
            </p>
            <div className="drones-why-cta-row">
              <NavLink to="/student-portal" className="drones-why-btn">
                Enroll Now
              </NavLink>
              <NavLink to="/contact" className="drones-why-btn">
                Book a Demo
              </NavLink>
            </div>
          </div>

          {/* RIGHT — empty landing zone.  The drone flies here from
              the hero as the user scrolls and "lands" inside this
              rect.  Actual rendering lives in <DroneTraveler />. */}
          <div className="drones-why-image" aria-hidden="true" />
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
          <h2 className="aero-young-title">
            WHY START{" "}
            <span className="aero-young-badge">YOUNG?</span>
          </h2>
          <p className="aero-young-desc">
            Scientific thinking is strongest when built early. Children
            naturally observe patterns, ask bold questions, and imagine
            possibilities.
          </p>
          <p className="aero-young-desc">
            The mindset needed in research begins in childhood: asking why,
            testing ideas, and not fearing difficult questions.
          </p>
        </div>
        <div className="aero-young-block">
          <h2 className="aero-young-title">
            WHAT DOES LOF{" "}
            <span className="aero-young-badge">DO?</span>
          </h2>
          <p className="aero-young-desc">
            LOF transforms curiosity into capability. Students move from
            consuming facts to building models, asking questions,
            experimenting, presenting ideas.
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
      <h2 className="aero-learn-title">
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
        In aeromodelling, every answer creates new questions. Students learn how to think, not just what to remember.
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
          <h2 className="aero-cert-title">CERTIFICATES</h2>
          <ul className="aero-cert-list">
            <li>Level-based completion certificates</li>
            <li>Skill-based recognition (design, analysis, collaboration)</li>
            <li>Project-based acknowledgments linked to performance and outcomes</li>
          </ul>
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
   ZEB ROBOT — used inside the "Why Space Robotics" panel.
   Loads zeb.glb, centres + scales it to fit, and lets the
   parent canvas spin it via OrbitControls.
========================================================= */

/* =========================================================
   DRONE MODEL — loads Drone.fbx, recolours per-mesh, and spins
   the propellers.  Body layer 1 = black, layers 2 & 3 = white;
   propellers = polished black with white reflections; lander = white.
========================================================= */
const DroneModel = ({
  scale = 0.022,
  position = [0, 0, 0],
  poseRef = null,
  playClips = ["animation 1", "hover"],
  // When true, the GLB's baked animation tracks own all moving
  // parts — DroneModel skips the manual propeller pivot reparenting
  // and skips the per-frame propeller spin.  Use this in places
  // where the animation clip itself drives the whole drone (e.g.
  // the CTA section showing "animation 1" as a self-contained
  // sequence).  Mixing manual spin with a baked animation that
  // also moves the propellers produces wrong initial positions
  // until the clip's transforms eventually settle.
  useBakedAnimation = false,
  // Which GLB to load.  Defaults to the page-wide drone; the CTA
  // section overrides with its own Drone -CTA.glb so the model
  // shown there can have a different rig / animation set without
  // affecting the traveling drone.
  glbUrl = droneGlbUrl,
}) => {
  const groupRef = useRef();
  const propellersRef = useRef([]);

  const { scene, animations } = useGLTF(glbUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Play the baked clips on the cloned model.  We bind useAnimations
  // to groupRef so it walks the cloned subtree.
  const { actions, names: clipNames } = useAnimations(animations, groupRef);

  // Stable key so the useEffect doesn't re-fire each render when
  // the default `playClips` array prop reference changes.
  const playClipsKey = playClips.join("|");

  useEffect(() => {
    if (!actions) return;
    // eslint-disable-next-line no-console
    console.log("[Drone animations]:", clipNames);

    // Helper — case-insensitive name match so "Hover animation",
    // "hover", "Hover_Anim", etc. all resolve to the right clip.
    const pickAction = (...needles) => {
      const lower = needles.map((s) => s.toLowerCase());
      const key = clipNames?.find((n) =>
        lower.some((needle) => n.toLowerCase().includes(needle)),
      );
      return key ? actions[key] : null;
    };

    // Resolve the caller-supplied clip names to actions.  Each entry
    // in playClips is a substring match against the GLB's actual
    // clip names so "animation 2" finds "Animation 2", "animation2",
    // or any clip containing that substring (case-insensitive).
    const toPlay = playClips
      .map((needle) => pickAction(needle))
      .filter(Boolean);

    // playClips === []  → caller explicitly wants NO animation
    //                     (static GLB pose, no clips played).
    // toPlay  has matches → play exactly those clips.
    // toPlay  is empty but playClips wasn't → no name matched a
    //                     real clip, fall back to playing every
    //                     clip so the drone isn't frozen by a typo.
    const list =
      playClips.length === 0
        ? []
        : toPlay.length > 0
        ? toPlay
        : Object.values(actions);

    for (const a of list) {
      a.reset()
       .setLoop(THREE.LoopRepeat, Infinity)
       .fadeIn(0.4)
       .play();
      a.clampWhenFinished = false;
      a.enabled = true;
      a.timeScale = 1;
    }
    return () => {
      for (const a of list) a?.fadeOut(0.3).stop();
    };
  }, [actions, clipNames, playClipsKey]);

  // Auto-fit + auto-centre the GLB.  Bounding box is computed ONLY
  // from VISIBLE mesh nodes — cameras, lights and empty bones that
  // GLB exporters leave in would otherwise inflate maxDim and offset
  // the centre, shrinking the actual drone and pushing it off-screen.
  // The `scale` prop is a multiplier on top of the auto-fit
  // (1 = perfectly fit, >1 = bigger).
  const { fitScale, fitOffset } = useMemo(() => {
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
    if (!foundMesh) return { fitScale: 1, fitOffset: new THREE.Vector3() };
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // Target: largest dimension fills ~1.6 world units. Camera at
    // z = 4.5 with FOV 38° gives a visible height ≈ 3.1 at z = 0,
    // so 1.6 leaves ~50% padding around the drone on all sides.
    return { fitScale: 0.5 / maxDim, fitOffset: center };
  }, [cloned]);

  // Subtract the centre offset so the model is centred on its own
  // group's origin (otherwise GLBs exported with off-centre pivots
  // can render off-screen).
  useMemo(() => {
    cloned.position.sub(fitOffset);
  }, [cloned, fitOffset]);

  // Material presets ----------------------------------------------------
  // Glossy dark — main body case, motor housings, lander, camera.
  const matBlack = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#15171c"),
        metalness: 0.55,
        roughness: 0.35,
      }),
    [],
  );
  // Bright satin silver — propeller arms / wing-like side panels.
  const matSilver = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c7ccd4"),
        metalness: 1.0,
        roughness: 0.32,
        envMapIntensity: 1.2,
      }),
    [],
  );
  // BLACK propellers with strong reflections — matches the reference
  // photo where the blades are pitch black with bright white catch
  // lights from the studio HDRI on their edges.
  const matPropeller = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0a0c"),
        metalness: 1.0,
        roughness: 0.18,
        envMapIntensity: 1.4,
      }),
    [],
  );
  const matWhite = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f3f4f7"),
        metalness: 0.25,
        roughness: 0.45,
      }),
    [],
  );
  const matAccentRed = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ff2a3a"),
        emissive: new THREE.Color("#ff2a3a"),
        emissiveIntensity: 1.2,
        metalness: 0.6,
        roughness: 0.3,
      }),
    [],
  );

  // Walk the GLB scene, recolour each mesh by name, then wrap every
  // propeller in its OWN pivot Group positioned exactly at the
  // propeller's geometric centre.  Rotating the pivot spins the
  // propeller around its own hub — works even when the propeller
  // mesh has non-identity rotation/scale from the exporter.
  useMemo(() => {
    propellersRef.current = [];
    let bodyIdx = 0;
    const propMeshes = [];

    // Debug: dump every mesh name so we can verify the matching.
    // Open DevTools console to see them.
    const allNames = [];
    cloned.traverse((obj) => {
      if (obj.isMesh) allNames.push(obj.name);
    });
    // eslint-disable-next-line no-console
    console.log("[Drone mesh names]:", allNames);

    // Match patterns — broad keyword lists so the assignment survives
    // small naming differences across re-exports.
    const isProp = (n) =>
      n.includes("proppler") ||
      n.includes("propeller") ||
      n.includes("propeler") ||
      /\bprop[._-]?\d?\b/.test(n) ||
      n.includes("blade") ||
      n.includes("rotor") ||
      n.includes("fan");

    const isHolder = (n) =>
      (n.includes("holder") || n.includes("arm") || n.includes("boom") || n.includes("strut")) &&
      !n.includes("motor");

    const isLander = (n) =>
      n.includes("lander") ||
      n.includes("landing") ||
      n.includes("foot") ||
      n.includes("leg") ||
      n.includes("camera") ||
      n.includes("gimbal");

    const isBody = (n) =>
      n.includes("body") ||
      n.includes("frame") ||
      n.includes("chassis") ||
      n.includes("case") ||
      n.includes("hull") ||
      n.includes("shell");

    const isRod = (n) => n.includes("rod");

    // Material overrides REMOVED — let the GLB's embedded textures
    // show through.  We still walk the tree to collect propeller
    // meshes (by name first, geometry fallback second) because the
    // pivot/spin loop needs the propeller references.
    cloned.traverse((obj) => {
      if (!obj.isMesh) return;
      const n = (obj.name || "").toLowerCase();
      if (isProp(n)) propMeshes.push(obj);
    });

    // Fallback: if NO propellers matched by name, find them by their
    // XZ-corner position — one per quadrant, farthest from the body
    // centre.  No material changes here either.
    if (propMeshes.length === 0) {
      const meshes = [];
      const droneBox = new THREE.Box3().setFromObject(cloned);
      const droneCenter = droneBox.getCenter(new THREE.Vector3());
      cloned.traverse((obj) => {
        if (!obj.isMesh || !obj.geometry) return;
        obj.geometry.computeBoundingBox?.();
        const bb = new THREE.Box3().setFromObject(obj);
        const size = bb.getSize(new THREE.Vector3());
        const center = bb.getCenter(new THREE.Vector3());
        const dx = center.x - droneCenter.x;
        const dz = center.z - droneCenter.z;
        const distXZ = Math.sqrt(dx * dx + dz * dz);
        const quadrant = (dx >= 0 ? 1 : 0) * 2 + (dz >= 0 ? 1 : 0);
        const aspect = (size.x + size.z) / (2 * Math.max(size.y, 0.0001));
        meshes.push({ obj, distXZ, quadrant, aspect });
      });
      const winners = {};
      for (const m of meshes) {
        if (m.aspect < 1.2) continue;
        if (!winners[m.quadrant] || m.distXZ > winners[m.quadrant].distXZ) {
          winners[m.quadrant] = m;
        }
      }
      for (const q of Object.keys(winners)) {
        propMeshes.push(winners[q].obj);
      }
      // eslint-disable-next-line no-console
      console.log(
        "[Drone] name-based propeller match found 0; geometry fallback picked",
        propMeshes.length,
        "— mesh names:",
        propMeshes.map((m) => m.name).join(", "),
      );
    }
    // Mark bodyIdx as used so the linter is happy (kept for future
    // per-mesh material overrides if you decide to mix textures + tints).
    void bodyIdx;

    // ── Set up individual pivot groups for each propeller ──────
    // 1. Compute the propeller's world-space bounding-box centre.
    // 2. Convert that centre into the propeller-parent's local space.
    // 3. Create a Group at that local position inside the same parent.
    // 4. Re-parent the propeller into the Group with `attach()` —
    //    `attach()` preserves the propeller's world transform, so
    //    its visible position doesn't move, but its local origin
    //    relative to its new parent (the pivot) is now offset by
    //    exactly the right amount that rotation.y on the pivot
    //    spins it around its own hub.
    //
    // SKIPPED when useBakedAnimation is true — we leave the cloned
    // scene graph untouched so the GLB's animation tracks can
    // target the original mesh nodes by their original parent
    // paths / local transforms.
    if (!useBakedAnimation) {
      cloned.updateMatrixWorld(true);
      const tmpBox = new THREE.Box3();
      for (const mesh of propMeshes) {
        const parent = mesh.parent;
        if (!parent) continue;

        tmpBox.setFromObject(mesh);
        const worldCenter = tmpBox.getCenter(new THREE.Vector3());
        const localCenter = parent
          .worldToLocal(worldCenter.clone());

        const pivot = new THREE.Group();
        pivot.name = (mesh.name || "propeller") + "_pivot";
        pivot.position.copy(localCenter);
        parent.add(pivot);
        pivot.attach(mesh);

        propellersRef.current.push(pivot);
      }
    }
  }, [cloned, matBlack, matWhite, matPropeller, matAccentRed, useBakedAnimation]);

  // STATIC pose — drone body doesn't move.  Only the propellers
  // spin around their own pivots.  When `poseRef` is provided the
  // entire (x, y, z) rotation is taken from it each frame so the
  // caller (e.g. DroneTravelerModel) can supply a single combined
  // pose without parent/child Euler-composition artefacts.
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = position[1];
    if (poseRef?.current) {
      groupRef.current.rotation.x = poseRef.current.x;
      groupRef.current.rotation.y = poseRef.current.y;
      groupRef.current.rotation.z = poseRef.current.z;
    } else {
      // Baked product-shot pose used when DroneModel is mounted
      // stand-alone (no external pose control).
      groupRef.current.rotation.x = 0.38; // ~22° forward tilt
      groupRef.current.rotation.y = -Math.PI / 5; // ~-36° yaw
      groupRef.current.rotation.z = -0.18;
    }
    // Spin each propeller fast around its own Y axis — SKIPPED when
    // the GLB's baked animation already drives the propellers, so we
    // don't double-rotate or fight the clip's transforms.
    if (!useBakedAnimation) {
      const spin = delta * 35; // ~334 rpm
      for (const p of propellersRef.current) {
        p.rotation.y += spin;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale * fitScale}
      position={position}
    >
      <primitive object={cloned} />
    </group>
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

/* ── Static drone view for the Why-Start-Young panel ── */
const StartYoungDroneView = () => (
  <Canvas
    gl={{ alpha: true, antialias: true }}
    style={{ background: "transparent", width: "100%", height: "100%" }}
    camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 100 }}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.45} color="#cfd8e6" />
      <directionalLight position={[5, 6, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-6, 4, 3]} intensity={0.9} color="#9ec0ff" />
      <pointLight position={[2, -2, 4]} intensity={1.6} distance={14} decay={2} color="#ff3344" />
      <Environment preset="warehouse" background={false} environmentIntensity={0.7} />
      <DroneModel scale={6} position={[0, -0.3, 0]} />
    </Suspense>
  </Canvas>
);

const WhyStartYoung = () => (
  <section className="drones-start-section">
    <div className="drones-start-inner container">
      <div className="drones-start-shape">
        <div className="drones-start-grid">
          {/* LEFT — drone model placeholder + travel waypoint */}
          <div className="drones-start-drone drone-wp-start" aria-hidden="true">
            {/* <StartYoungDroneView /> */}
          </div>

          {/* RIGHT — two text blocks */}
          <div className="drones-start-content">
            <div className="drones-start-block">
              <h2 className="drones-start-title">
                WHY START{" "}
                <span className="drones-start-badge">YOUNG?</span>
              </h2>
              <p className="drones-start-desc">
                Scientific thinking is strongest when built early. Children
                naturally observe patterns, ask bold questions, and imagine
                possibilities.
              </p>
              <p className="drones-start-desc">
                The mindset needed in research begins in childhood: asking why,
                testing ideas, and not fearing difficult questions.
              </p>
            </div>

            <div className="drones-start-block">
              <h2 className="drones-start-title">
                WHAT DOES LOF{" "}
                <span className="drones-start-badge">DO?</span>
              </h2>
              <p className="drones-start-desc">
                LOF transforms curiosity into capability. Students move from
                consuming facts to building models, asking questions,
                experimenting, presenting ideas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AgePrograms = () => (
  <section className="age-section">
    <img
      src={dronesAgeSectionShape}
      alt=""
      aria-hidden="true"
      className="age-section-deco age-section-deco--tl"
    />
    <img
      src={dronesAgeSectionShape}
      alt=""
      aria-hidden="true"
      className="age-section-deco age-section-deco--br"
    />
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
      <h2 className="learn-title">
        WHAT WILL STUDENTS <span className="learn-badge">LEARN?</span>
      </h2>
      <p className="learn-sub">
        Replace syllabus lists with transformation.<br />Students learn to:
      </p>

      <div className="learn-grid">
        {LEARN_ITEMS.map((it) => (
          <article className="learn-card" key={it.label}>
            <img className="learn-card-img" src={it.img} alt={it.label} />
            <span className="learn-card-label">{it.label}</span>
          </article>
        ))}
        {/* Empty slot reserved for drone + travel waypoint */}
        <div className="learn-drone-slot drone-wp-learn" aria-hidden="true" />
      </div>

      <p className="learn-foot">
        In drone, every answer creates new questions. Students should learn how to think, not just what to remember.
      </p>
    </div>
  </section>
);

/* =========================================================
   CERTIFICATES (section 6)
========================================================= */

const Certificates = () => (
  <section className="cert-section cert-section--robotics drones-cert-section">
          <div className="container">
    <div className="drones-cert-shape">
        <div className="drones-cert-inner">

          {/* LEFT — title + bullet list + drone placeholder */}
          <div className="drones-cert-text">
            <h2 className="drones-cert-title">CERTIFICATES</h2>
            <ul className="drones-cert-list">
              <li>Level-based completion certificates</li>
              <li>Skill-based recognition (design, analysis, collaboration)</li>
              <li>Project-based acknowledgments linked to performance and outcomes</li>
            </ul>
          </div>

          {/* RIGHT — coverflow certificate slider */}
          <div className="drones-cert-slider-wrap">
            <Swiper
              className="drones-cert-swiper"
              modules={[EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView={1.5}
              autoplay={{ delay: 2400, disableOnInteraction: true, pauseOnMouseEnter: true }}
              coverflowEffect={{ rotate: 0, stretch: 30, depth: 200, modifier: 1.4, slideShadows: false }}
              breakpoints={{ 768: { slidesPerView: 1.8 } }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <SwiperSlide key={i} className="drones-cert-slide">
                  <img src={droneCertImg} alt="LOF certificate" loading="lazy" draggable="false" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
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

const DRONES_CAREER_SKILLS = [
  { label: "ENGINEERING DESIGN", img: dronesCareerImg1 },
  { label: "CODING",             img: dronesCareerImg2 },
  { label: "RESEARCH MINDSET",   img: dronesCareerImg3 },
  { label: "DATA ANALYSIS",      img: dronesCareerImg4 },
];

const AERO_CAREER_SKILLS = [
  { label: "CODING",             img: aeroCareerCoding   },
  { label: "AI THINKING",        img: aeroCareerAI       },
  { label: "ELECTRONICS",        img: aeroCareerElec     },
  { label: "ENGINEERING DESIGN", img: aeroCareerEngD     },
  { label: "DATA ANALYSIS",      img: aeroCareerData     },
  { label: "3D DESIGNING",       img: aeroCareer3D       },
  { label: "RESEARCH MINDSET",   img: aeroCareerResearch },
];

const AeroFutureCareers = () => (
  <section className="aero-career-section">
    <div className="container">
      <h2 className="aero-career-title">
        WHY AEROMODELLING FOR{" "}
        <span className="aero-career-badge">FUTURE CAREERS?</span>
      </h2>
      <p className="aero-career-sub">
        Space teaches the future workforce skills.<br />
        Even if students never become astronauts, they gain:
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
        The aerodynamics sector is not only about aircrafts. It is where multiple technologies meet.<br />
        Learning space prepares students for many careers.
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
          <p className="aero-comp-subtitle">
            Showcase your aeromodelling skills. Solve real-world challenges.
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

const WhySpaceForCareers = () => (
  <section className="careers-section careers-section--robotics">
    <div className="drone-wp-careers" aria-hidden="true" />
    <div className="container">
      <h2 className="careers-title">
        WHY ROBOTICS FOR{" "}
        <span className="careers-title-badge">FUTURE CAREERS?</span>
      </h2>
      <p className="careers-sub">
        Space teaches the future workforce skills.
        <br />
        Even if students never become astronauts, they gain:
      </p>

      <div className="careers-skills-grid drones-careers-grid">
        {DRONES_CAREER_SKILLS.map((skill) => (
          <article className="careers-skill-card drones-career-card" key={skill.label}>
            <img className="careers-skill-img" src={skill.img} alt={skill.label} />
            <span className="careers-skill-label">{skill.label}</span>
          </article>
        ))}
      </div>

      <p className="careers-footer">
        The aerodynamics sector is not only about aircrafts. It is where multiple technologies meet.
        <br />
        Learning space prepares students for many careers.
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
    <div className="drone-wp-comp" aria-hidden="true" />
    <div className="competitions-inner container">
      <div className="competitions-left">
        <div className="competitions-heading">
          <h2 className="competitions-label-text">
            <span className="competitions-label-badge">COMPETITIONS</span>
          </h2>
          <p className="competitions-subtitle">
            Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build. Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build. Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build.Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build.Showcase your robotics skills. Solve real-world challenges.
            Get recognised for what you build.
          </p>
          <NavLink
            to="/programs"
            className="drones-comp-btn"
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
          {/* <div className="comp-skull-center">
            <img src={skullIcon} alt="" />
          </div> */}
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
        <h2 className="career-pathways-title">
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
    <div className="drone-wp-choose" aria-hidden="true" />
    <div className="container">
      <h2 className="choose-path-title">
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
    <h2 className="assoc-title">
      WHO ARE WE{" "}
      <span className="assoc-title-badge">ASSOCIATED</span> WITH
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

    <img
      className="assoc-drone-img"
      src={droneAssocImg}
      alt=""
      aria-hidden="true"
    />
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
        <div className="vetted-left-col">
          <h2 className="vetted-title">
            <span className="vetted-title-badge">VETTED</span> BY
          </h2>
          <div className="drone-wp-vetted" aria-hidden="true" />
          <img
            className="vetted-drone-img"
            src={droneAssocImg}
            alt=""
            aria-hidden="true"
          />
        </div>

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
   AEROMODELLING — CAREER PATHWAYS
========================================================= */

const AeroCareerPathways = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);
  return (
    <section className="aero-pathway-section">
      <div className="container">
        <h2 className="aero-pathway-title">CAREER PATHWAYS</h2>
        <div className="aero-faq-list">
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
      <h2 className="aero-right-path-title">
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
    <h2 className="aero-assoc-title">
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
          <h2 className="aero-vetted-title">VETTED BY</h2>
          <div className="aero-vetted-aircraft" aria-hidden="true">
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

/* =========================================================
   AEROMODELLING — MODES TO JOIN
========================================================= */

const AeroModesToJoin = () => (
  <section className="aero-modes-section">
    <div className="container">
      <h2 className="aero-modes-title">MODES TO JOIN</h2>
      <p className="aero-modes-subtitle">MORE THAN JUST SCIENCE</p>
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
      <h2 className="aero-projects-title">STUDENT PROJECTS</h2>
      <p className="aero-projects-subtitle">FROM CURIOSITY TO CREATION</p>
      <p className="aero-projects-desc">
        Whether you&apos;re learning from home, joining a local hub, or diving in
        remotely, we&apos;ve got a mission path that works for you.
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

const ModesToJoin = () => (
  <section className="modes-section modes-section--robotics">
    <div className="drone-wp-modes" aria-hidden="true" />
    <div className="container">
      <h2 className="modes-title">
        <span className="modes-title-badge">MODES</span> TO JOIN
      </h2>
      <p className="modes-subtitle">More Than Just Science</p>
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
    <div className="drone-wp-projects" aria-hidden="true" />
    <div className="container">
      <h2 className="projects-title">
        STUDENT PROJECTS
      </h2>
      <p className="projects-subtitle">From Curiosity to Creation</p>
      <p className="projects-desc">
        Whether you&apos;re learning from home, joining a local hub, or diving in
        remotely, we&apos;ve got a mission path that works for you.
      </p>

      <div className="projects-slider">
        <Swiper
          modules={[Autoplay]}
          loop
          slidesPerView={1.2}
          spaceBetween={20}
          centeredSlides={false}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 24 },
            900: { slidesPerView: 2.2, spaceBetween: 28 },
            1100: { slidesPerView: 2.4, spaceBetween: 32 },
          }}
        >
          {PROJECTS.map((p, i) => (
            <SwiperSlide key={i} className="projects-slide">
              <article className="projects-card drones-project-card">
                <div className="projects-card-imgwrap">
                  <img
                    className="projects-card-img"
                    src={droneProjectImg}
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

      <div className="projects-stats drones-projects-stats">
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

const AeroProjectImpact = () => (
  <section className="aero-impact-section">
    {/* Aircraft — top-right corner decoration */}
    <img src={aeroImpactAircraft} alt="" aria-hidden="true" className="aero-impact-aircraft" loading="lazy" />

    <div className="container">
      <div className="impact-head">
        <h2 className="aero-impact-title">
          <span className="aero-impact-badge">PROJECT</span> IMPACT
        </h2>
        <p className="aero-impact-subtitle">From Curiosity to Capability</p>
        <p className="aero-impact-desc">
          Science isn&apos;t just about reading; it&apos;s about doing. Every
          project at Lab of Future is designed to take you from a curious
          observer to an active builder.
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
    </div>
  </section>
);

const ProjectImpact = () => (
  <section className="impact-section impact-section--robotics">
    <div className="drone-wp-impact" aria-hidden="true" />
    <div className="container">
      <div className="impact-head">
        <h2 className="impact-title">
          <span className="impact-title-badge">PROJECT</span> IMPACT
        </h2>
        <p className="impact-subtitle">From Curiosity to Capability</p>
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
  school: [
    { name: "Greenfield Academy", img: projectImg, desc: LOREM },
    { name: "Lab of Future School", img: projectImg, desc: LOREM },
    { name: "Stellar Public School", img: projectImg, desc: LOREM },
    { name: "Orbital High School", img: projectImg, desc: LOREM },
    { name: "Northgate Academy", img: projectImg, desc: LOREM },
    { name: "Riverside School", img: projectImg, desc: LOREM },
  ],
  students: [
    { name: "Vishwanathan V", img: projectImg, desc: LOREM },
    { name: "Priyanka M", img: projectImg, desc: LOREM },
    { name: "Jeff Jacob", img: projectImg, desc: LOREM },
    { name: "Anika Sharma", img: projectImg, desc: LOREM },
    { name: "Rohan Kumar", img: projectImg, desc: LOREM },
    { name: "Lakshmi V", img: projectImg, desc: LOREM },
  ],
  interns: [
    { name: "Aarav Sharma", img: projectImg, desc: LOREM },
    { name: "Meera Iyer", img: projectImg, desc: LOREM },
    { name: "Karthik R", img: projectImg, desc: LOREM },
    { name: "Sneha Patil", img: projectImg, desc: LOREM },
    { name: "Dev Mehta", img: projectImg, desc: LOREM },
    { name: "Pooja N", img: projectImg, desc: LOREM },
  ],
};

const Community = () => {
  const [tab, setTab] = useState("students");
  const sectionRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // content reveals AFTER the planets have completed their split
      const p = sectionScrollProgress(sectionRef.current);
      setReveal(p > 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = TESTIMONIALS[tab];

  return (
    <section
      ref={sectionRef}
      className={`community-section${reveal ? " community-section--in" : ""}`}
    >
      {/* sticky 3D backdrop — Earth left, Moon right, animated by scroll */}
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

      {/* sticky content — fades in once the planets have split */}
      <div className="community-content">
        <div className="container community-grid">
          <div className="community-left">
            <div className="community-tabs">
              {[
                { key: "school", label: "School" },
                { key: "students", label: "Students" },
                { key: "interns", label: "Interns" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={`community-tab${
                    tab === t.key ? " community-tab--active" : ""
                  }`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <span className="community-arrow" aria-hidden="true">
              &rarr;
            </span>
          </div>

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

          <div className="community-info">
            <h2 className="community-title">
              What Our
              <br />
              Community Says
            </h2>
            <p className="community-desc">
              Hear directly from the students, parents, and schools who have
              experienced the Lab of Future journey firsthand.
            </p>
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
          THE FUTURE WON&apos;T BE TAUGHT
          <br />
          IT WILL BE BUILT
        </h2>
        <p className="future-desc">
          Give your child more than knowledge. Give them direction, confidence,
          and capability &mdash; and the tools to shape the world beyond our
          planet.
        </p>
        <div className="future-actions">
          <a href="#enroll" className="future-btn future-btn--primary">
            Enroll Now
          </a>
          <a href="#demo" className="future-btn future-btn--ghost">
            Book a Demo
          </a>
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
      <div className="drone-wp-faq" aria-hidden="true" />
      <div className="container">
        <h2 className="faq-robotics-title">
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

/* CTA drone — small-drone.glb rendered with auto-fit centering.
   - Loads small-drone.glb (not the page-wide drone or the old
     animated Drone -CTA).
   - Auto-fit: bounding-box centre is snapped to the model's local
     origin so the drone sits dead-centre regardless of how the
     artist exported the pivot.
   - No animation clips are played — the visual motion is supplied
     entirely by OrbitControls' autoRotate. */
const CtaSmallDroneModel = () => {
  const { scene } = useGLTF(smallDroneGlbUrl);
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Auto-fit + auto-centre.  Compute the bbox of the visible mesh
  // nodes (skip cameras / lights / empties) and recentre + rescale.
  const { fitScale } = useMemo(() => {
    const box = new THREE.Box3();
    let foundMesh = false;
    cloned.updateMatrixWorld(true);
    cloned.traverse((obj) => {
      if (!obj.isMesh || obj.visible === false || !obj.geometry) return;
      obj.geometry.computeBoundingBox?.();
      const tmp = new THREE.Box3().setFromObject(obj);
      if (Number.isFinite(tmp.min.x) && Number.isFinite(tmp.max.x)) {
        box.union(tmp);
        foundMesh = true;
      }
    });
    if (!foundMesh) return { fitScale: 1 };
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    // Target largest dim ≈ 3.0 world units at camera z=4.5, fov 38°
    // (bumped from 2.4 so the drone reads larger inside the CTA stage).
    return { fitScale: 3.0 / maxDim };
  }, [cloned]);

  return (
    <group scale={fitScale}>
      <primitive object={cloned} />
    </group>
  );
};

/* CTA canvas — Drag-to-rotate enabled, slow auto-rotate, no
   zoom/pan so the layout doesn't move when the user interacts. */
const CtaDroneCanvas = () => (
  <Canvas
    gl={{ alpha: true, antialias: true }}
    style={{ width: "100%", height: "100%", background: "transparent" }}
    camera={{ position: [0, 0, 4.5], fov: 38, near: 0.1, far: 100 }}
  >
    <Suspense fallback={null}>
      <ambientLight intensity={0.45} color="#cfd8e6" />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-6, 4, 3]} intensity={1.0} color="#9ec0ff" />
      <pointLight position={[2, -2, 4]} intensity={1.5} distance={14} decay={2} color="#ff3344" />
      <Environment preset="warehouse" background={false} environmentIntensity={0.7} />
      <CtaSmallDroneModel />
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.8}
        autoRotate
        autoRotateSpeed={5.6}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Suspense>
  </Canvas>
);

const CtaRobotics = () => (
  <section className="cta-robotics-section">
    <div className="cta-robotics-inner container">
      {/* LEFT — drone GLB playing animation 2 only. */}
      <div className="cta-robotics-stage">
        {/* <CtaDroneCanvas /> */}
      </div>

      {/* RIGHT — title + copy + buttons */}
      <div className="cta-robotics-text">
        <h2 className="cta-robotics-title">
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
      <h2 className="explore-title">
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

/* =========================================================
   DRONE TRAVELER — single fixed canvas containing the drone.
   The drone is parked over the hero stage on load, then flies
   down and lands inside the Why Drones panel's right column
   target rect as the user scrolls.

   The wrapper is INTENTIONALLY larger than the underlying
   target rect (controlled by PAD).  This gives the drone's
   diagonally-extending propellers room to render without
   getting clipped by the canvas edge — without changing the
   apparent landing position, since the canvas is recentered
   on the target rect's centre.
========================================================= */
const DRONE_PAD = 0; // wrapper matches target rect exactly

const DroneTraveler = () => {
  const wrapRef = useRef(null);
  const tiltRef = useRef({
    tilt: 0, bank: 0, heading: 0,
    leftness: 0, atFaq: 0, inTransit: 0, progress: 0,
  });

  useEffect(() => {
    let raf = 0;
    let curX = null, curY = null, curS = null;
    let prevCurX = 0;
    let prevTx = null, prevTy = null;
    let curTilt = 0, curBank = 0, curHeading = 0, curLeftness = 0, curAtFaq = 0;
    let prevLpLearn = 0; // tracks leg-3 progress across frames for the
                         // off-screen teleport at the half-leg boundary

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const ss = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };

    // Centre of a DOM element in viewport space
    const getPos = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    };

    // Position at an arbitrary fraction (fx, fy) of a DOM rect.
    // fx=0 left edge, fx=1 right edge.  Same convention for fy.
    // Used to land the drone at top-right / center-left etc. instead
    // of the geometric centre of the waypoint element.
    const offPos = (sel, fx, fy) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { cx: r.left + r.width * fx, cy: r.top + r.height * fy };
    };

    // 0→1 as `sel` section scrolls from `enterFrac` to `exitFrac` of viewport height
    const legP = (sel, enter = 0.85, exit = 0.35) => {
      const el = document.querySelector(sel);
      if (!el) return 0;
      const vh = window.innerHeight;
      return ss(clamp((vh * enter - el.getBoundingClientRect().top) / (vh * (enter - exit)), 0, 1));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const wrap = wrapRef.current;
      if (!wrap) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const BASE = Math.min(580, vw * 0.44); // canvas size at scale 1.0

      // Waypoint positions.  Default waypoints use the .drone-wp-*
      // sentinel elements; the sections with custom landing zones
      // (per design) compute positions relative to the section's
      // own bounding rect via offPos(sel, fractionX, fractionY).
      const hero     = getPos('.drones-hero-stage');
      const why      = getPos('.drones-why-image');
      const start    = getPos('.drone-wp-start');
      // learn — start from the .drone-wp-learn grid slot (bottom-right
      // of the learn grid) and nudge slightly to the RIGHT so the
      // drone reads as set apart from the cards rather than tucked
      // into the last grid cell.
      const learn    = (() => {
        const r = getPos('.drone-wp-learn');
        return r ? { cx: r.cx + 80, cy: r.cy } : null;
      })();
      // cert — nudge slightly DOWN from the sentinel's center so the
      // drone sits a little lower inside the certificate panel.
      const cert     = (() => {
        const r = getPos('.drone-wp-cert');
        return r ? { cx: r.cx, cy: r.cy + 60 } : null;
      })();
      // careers — center-LEFT of the section, nudged a little
      // further LEFT (was 0.20).
      const careers  = offPos('.careers-section',          0.12, 0.50);
      // comp — center but slightly LEFT, pushed FURTHER DOWN inside
      // the section (was 0.66).
      const comp     = offPos('.competitions-section',     0.40, 0.78);
      // choose (CAREER PATHWAYS) — TOP-LEFT of the section,
      // nudged a little further LEFT (was 0.20).
      const choose   = offPos('.choose-path-section',      0.12, 0.22);
      // vetted — landing below the "VETTED BY" title (the .drone-wp-vetted
      // sentinel sits right under the title once the section uses
      // align-items: flex-start).  Nudged further RIGHT (was +80)
      // and further DOWN (was +140) from the sentinel's center.
      const vetted   = (() => {
        const r = getPos('.drone-wp-vetted');
        return r ? { cx: r.cx + 160, cy: r.cy + 220 } : null;
      })();
      // modes / projects / impact — TOP-RIGHT of each section.
      const modes    = offPos('.modes-section',            0.85, 0.22);
      const projects = offPos('.projects-section',         0.85, 0.22);
      const impact   = offPos('.impact-section',           0.85, 0.22);
      // faq — center of the viewport, drone faces STRAIGHT here (endpoint).
      const faq      = offPos('.faq-robotics-section',     0.50, 0.50);

      if (!hero) return;

      // Leg progress values — no off-screen exits, drone always visible
      const p = {
        toWhy:     legP('.drones-why-section',        0.85, 0.35),
        toStart:   legP('.drones-start-age-wrapper',  0.85, 0.40),
        toLearn:   legP('.learn-section',             0.88, 0.48),
        toCert:    legP('.drones-cert-section',       0.85, 0.40),
        toCareers: legP('.careers-section',           0.85, 0.40),
        toComp:    legP('.competitions-section',      0.85, 0.40),
        toChoose:  legP('.choose-path-section',       0.85, 0.40),
        toVetted:  legP('.vetted-section--robotics',  0.85, 0.45),
        toModes:   legP('.modes-section',             0.85, 0.40),
        toProjects:legP('.projects-section',          0.85, 0.40),
        toImpact:  legP('.impact-section',            0.85, 0.40),
        toFaq:     legP('.faq-robotics-section',      0.85, 0.40),
      };

      // When a source waypoint has scrolled above the viewport, clamp its Y
      // to the top edge so the drone enters from the top rather than hiding
      // above the screen during the transition.
      const visY = (y) => Math.max(y, BASE * 0.5);

      // Chain waypoints sequentially. Scale range kept tight (0.76–1.05)
      // so the drone never jumps in apparent size between sections.
      let tx = hero.cx, ty = hero.cy, tS = 1.0, activeLegP = 0;

      const applyLeg = (fromX, fromY, fromS, toX, toY, toS, lp, arc = 0.04) => {
        if (lp <= 0) return;
        tx = lerp(fromX, toX, lp);
        ty = lerp(fromY, toY, lp) - Math.sin(lp * Math.PI) * vh * arc;
        tS = lerp(fromS, toS, lp);
        if (lp > 0 && lp < 1) activeLegP = lp;
      };

      // Leg 1: hero → why (right, tiny scale-up)
      if (why && p.toWhy > 0)
        applyLeg(hero.cx, hero.cy, 1.0, why.cx, why.cy, 1.05, p.toWhy, 0.05);

      // Leg 2: why → start-young (left, tiny scale-down).
      // Target Y is clamped via visY so the drone never drifts above
      // the viewport once start-young scrolls up — keeps the rest
      // position usable as a stable source for leg 3.
      if (start && why && p.toStart > 0)
        applyLeg(why.cx, why.cy, 1.05, start.cx, visY(start.cy), 0.93, p.toStart, 0.04);

      // Leg 3: start-young → learn — EXIT LEFT, RE-ENTER FROM RIGHT.
      // Phase A: drone moves STRAIGHT LEFT off the screen from its
      //          start-young rest position (no Y change → no "drop").
      // Boundary: while fully off-screen, curX/curY snap from the
      //          left exit point to a RIGHT entry point — invisible
      //          teleport so the drone re-enters from the OTHER side.
      // Phase B: drone enters from off-screen RIGHT and lands at the
      //          bottom-right grid slot of the learn section,
      //          slightly smaller than at start-young.
      if (learn && start && p.toLearn > 0) {
        const lp      = p.toLearn;
        const exitX   = -BASE * 1.2;       // off-screen LEFT
        const entryX  = vw + BASE * 1.2;   // off-screen RIGHT
        const fromY   = visY(start.cy);    // stable Y at start-young
        const LEARN_S = 0.85;              // "a little bit smaller"

        if (lp < 0.5) {
          // Phase A — straight left exit, no Y motion.
          const e = ss(lp * 2);
          tx = lerp(start.cx, exitX, e);
          ty = fromY;
          tS = lerp(0.93, LEARN_S, e);
        } else {
          // Phase B — enter from RIGHT, land at learn.
          const e = ss((lp - 0.5) * 2);
          tx = lerp(entryX, learn.cx, e);
          ty = lerp(fromY,  learn.cy, e);
          tS = LEARN_S;
        }

        // SNAP at half-leg boundary — BOTH directions.  Both endpoints
        // are off-screen, so the user never sees the teleport itself.
        //
        // Forward  (scrolling DOWN, lp crosses 0.5 going UP):
        //   drone is off-screen LEFT → snap to off-screen RIGHT so
        //   phase B reads as "re-entering from the right".
        // Reverse  (scrolling UP, lp crosses 0.5 going DOWN):
        //   drone is off-screen RIGHT → snap to off-screen LEFT so
        //   phase A reads as "re-entering from the left" back into
        //   start-young.
        if (prevLpLearn < 0.5 && lp >= 0.5) {
          curX = entryX;
          curY = fromY;
        } else if (prevLpLearn >= 0.5 && lp < 0.5) {
          curX = exitX;
          curY = fromY;
        }
        prevLpLearn = lp;

        if (lp > 0 && lp < 1) activeLegP = lp;
      } else {
        prevLpLearn = 0; // reset before the leg starts
      }

      // Leg 4: learn → cert (drone smaller at cert).
      if (cert && learn && p.toCert > 0)
        applyLeg(learn.cx, learn.cy, 0.85, cert.cx, cert.cy, 0.75, p.toCert, 0.04);

      // Leg 5: cert → careers (slightly smaller + lower position).
      if (careers && cert && p.toCareers > 0)
        applyLeg(cert.cx, cert.cy, 0.75, careers.cx, careers.cy, 0.70, p.toCareers, 0.04);

      // Leg 6: careers → competition (small drone, center-left near content).
      if (comp && careers && p.toComp > 0)
        applyLeg(careers.cx, careers.cy, 0.70, comp.cx, comp.cy, 0.72, p.toComp, 0.04);

      // Leg 7: competition → choose right path (top-LEFT, slightly
      // smaller per design).
      if (choose && comp && p.toChoose > 0)
        applyLeg(comp.cx, comp.cy, 0.72, choose.cx, choose.cy, 0.80, p.toChoose, 0.05);

      // Leg 8: choose → vetted (direct landing below the VETTED BY title).
      if (vetted && choose && p.toVetted > 0)
        applyLeg(choose.cx, choose.cy, 0.80, vetted.cx, vetted.cy, 0.85, p.toVetted, 0.04);

      // Leg 9: vetted → modes — OFF-SCREEN RIGHT DETOUR.
      // Phase A: drone exits past the RIGHT edge of the viewport.
      // Phase B: drone RE-ENTERS from the right and lands at the
      //          top-right of the modes-to-join section.  Both phases
      //          share the off-screen-right pivot so no teleport
      //          snap is required.
      if (modes && vetted && p.toModes > 0) {
        const lp      = p.toModes;
        const rightX  = vw + BASE * 1.2;
        if (lp < 0.5) {
          // Phase A — exit RIGHT, straight horizontal motion.
          const e = ss(lp * 2);
          tx = lerp(vetted.cx, rightX, e);
          ty = vetted.cy;
          tS = lerp(0.85, 0.85, e);
        } else {
          // Phase B — enter from RIGHT, land at modes top-right.
          const e = ss((lp - 0.5) * 2);
          tx = lerp(rightX, modes.cx, e);
          ty = lerp(vetted.cy, modes.cy, e);
          tS = 0.85;
        }
        if (lp > 0 && lp < 1) activeLegP = lp;
      }

      // Leg 10: modes → student projects (top-right, fully visible).
      if (projects && modes && p.toProjects > 0)
        applyLeg(modes.cx, modes.cy, 0.85, projects.cx, projects.cy, 0.95, p.toProjects, 0.04);

      // Leg 11: projects → impact (top-right, fully visible).
      if (impact && projects && p.toImpact > 0)
        applyLeg(projects.cx, projects.cy, 0.95, impact.cx, impact.cy, 0.95, p.toImpact, 0.04);

      // Leg 12: impact → faq (drone descends to FAQ bottom-right
      //         and stays there — this is the final endpoint).
      if (faq && impact && p.toFaq > 0)
        applyLeg(impact.cx, impact.cy, 0.95, faq.cx, faq.cy, 0.72, p.toFaq, 0.04);

      // Position + scale: BOTH lerped at the SAME slow rate.
      //
      // Previously we tried two extremes:
      //   (a) curS lerped at its own rate → scale finishes on a
      //       different timer than position → "scale changes
      //       after landing" feeling.
      //   (b) curS = tS instant while curX lerps slowly → scale
      //       jumps with scroll, position keeps catching up →
      //       perceived as "drone arrives at size before the
      //       motion completes".
      //
      // Sharing one `lf` for x/y/s means at every frame in the
      // tail:  curX is exactly `lf` of the way to tx, AND curS
      // is exactly `lf` of the way to tS.  They're in lockstep,
      // so the resize is interleaved with the motion all the
      // way through.  When the position finally settles, the
      // size has settled too — no perceived "post-landing"
      // pop.
      //
      // Slow factor (0.05) is what gives the gliding "smoother
      // and slower" feel between sections — both axes share
      // the same tail so the eye can't single one out.
      const lf = 0.05;
      if (curX === null) { curX = tx; curY = ty; curS = tS; }
      curX = lerp(curX, tx, lf);
      curY = lerp(curY, ty, lf);
      curS = lerp(curS, tS, lf);

      // Use actual canvas velocity (curX delta) for yaw so it's smooth
      const velX = curX - prevCurX;
      prevCurX = curX;
      prevTx = tx; prevTy = ty;

      const inTransit = Math.sin(activeLegP * Math.PI);

      // FLIGHT pose deltas — applied only while in transit, decay
      // back to zero at every landing.  Computed as raw targets,
      // smoothed below.
      const targetTilt    = inTransit * 0.22;
      const targetBank    = -Math.sign(velX) * inTransit * 0.14;
      const targetHeading = -Math.sign(velX) * inTransit * (Math.PI * 0.32);

      // LEFTNESS — 1.0 when the drone is landed on the LEFT half of
      // the viewport (start-young etc.), 0.0 on the right half.
      // Drives a HORIZONTAL MIRROR of the rest pose (yaw + bank
      // signs flip together).  DroneTravelerModel reads this and
      // produces a single combined Euler rotation so there's no
      // parent/child rotation composition.
      const targetLeftness = clamp(
        (vw * 0.5 + 80 - curX) / 160,
        0,
        1,
      );

      // atFaq — drives a "facing straight" rest pose at the FAQ
      // endpoint (yaw, bank, and pitch all blend toward 0 so the
      // drone reads as level + nose toward the camera).
      const targetAtFaq = p.toFaq;

      curTilt     = lerp(curTilt,     targetTilt,     0.06);
      curBank     = lerp(curBank,     targetBank,     0.06);
      curHeading  = lerp(curHeading,  targetHeading,  0.05);
      curLeftness = lerp(curLeftness, targetLeftness, 0.06);
      curAtFaq    = lerp(curAtFaq,    targetAtFaq,    0.06);

      tiltRef.current.tilt      = curTilt;
      tiltRef.current.bank      = curBank;
      tiltRef.current.heading   = curHeading;
      tiltRef.current.leftness  = curLeftness;
      tiltRef.current.atFaq     = curAtFaq;
      tiltRef.current.inTransit = inTransit;
      tiltRef.current.progress  = activeLegP;

      // Hover bob — gentle sine, dampened during flight
      const t = performance.now() / 1000;
      const bobAmp = 10 * (1 - inTransit * 0.72);
      const bobY = Math.sin(t * 1.75) * bobAmp;

      // Position + size the canvas wrapper
      const dW = BASE * curS;
      const dH = BASE * curS;
      wrap.style.width  = `${dW}px`;
      wrap.style.height = `${dH}px`;
      wrap.style.left   = `${curX - dW / 2}px`;
      wrap.style.top    = `${curY - dH / 2 + bobY}px`;
    };

    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="drone-traveler"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 0, height: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <Canvas
        {...canvasPerf}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 6.5], fov: 62, near: 0.1, far: 100 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} color="#cfd8e6" />
          <directionalLight position={[5, 6, 5]} intensity={1.8} color="#ffffff" />
          <directionalLight position={[-6, 4, 3]} intensity={1.0} color="#9ec0ff" />
          <pointLight position={[2, -2, 4]} intensity={1.6} distance={14} decay={2} color="#ff3344" />
          <pointLight position={[-3, -2, 4]} intensity={1.4} distance={14} decay={2} color="#ff3344" />
          <Environment preset="warehouse" background={false} environmentIntensity={0.7} />
          <DroneTravelerModel tiltRef={tiltRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

/* Wrapper around DroneModel that composes a SINGLE Euler pose
   (no parent/child rotation composition) and feeds it into
   DroneModel via poseRef.  This avoids the gimbal-style artefact
   you get when stacking yaw + pitch across two groups — the
   inner pitch ends up rotating around the wrong world axis.

   Rest pose:
     leftness = 0 (right half) → (x=0.38, y=-PI/5, z=-0.18)  base
     leftness = 1 (left  half) → (x=0.38, y=+PI/5, z=+0.18)  mirror

   Flight overlays (from tiltRef):
     +tilt    on x     — nose dips during travel
     +heading on y     — nose turns toward direction of motion
     +bank    on z     — body rolls into the turn
*/
const BASE_X =  0.38;
const BASE_Y = -Math.PI / 5;
const BASE_Z = -0.18;

const DroneTravelerModel = ({ tiltRef }) => {
  const poseRef = useRef({ x: BASE_X, y: BASE_Y, z: BASE_Z });
  const lerp = (a, b, t) => a + (b - a) * t;

  useFrame((state) => {
    const {
      tilt, bank, heading, leftness, atFaq = 0, inTransit,
    } = tiltRef.current;
    // Gentle idle pitch float when landed, dampened mid-flight.
    const idle = Math.sin(state.clock.elapsedTime * 1.6) * 0.028 * (1 - inTransit);

    // Mirror the rest pose horizontally on the left half.
    const restYMirror = BASE_Y + leftness * (2 * Math.PI / 5); // -PI/5 → +PI/5
    const restZMirror = BASE_Z + leftness * 0.36;              // -0.18 → +0.18

    // At FAQ — blend the rest pose toward "facing straight" (all
    // axes → 0, nose toward camera, level body, no forward pitch).
    const restX = lerp(BASE_X,     0, atFaq);
    const restY = lerp(restYMirror, 0, atFaq);
    const restZ = lerp(restZMirror, 0, atFaq);

    poseRef.current.x = restX + tilt + idle;
    poseRef.current.y = restY + heading;
    poseRef.current.z = restZ + bank - tilt * 0.35;
  });

  return <DroneModel scale={10} position={[0, -1.2, 0]} poseRef={poseRef} />;
};

const Aerospace = () => {
  return (
    <div className="aerospace-page">
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

        {/* Aircraft image — floats above the background */}
        <motion.div
          className="aero-hero-aircraft"
          aria-hidden="true"
          initial={{ opacity: 0, x: 60, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <img src={aeroAircraftImg} alt="" loading="eager" />
        </motion.div>

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

useGLTF.clear(ASTRONAUT_URL);

// Hero-critical models — load immediately so the first viewport renders fast.
useGLTF.preload(robotCharacterUrl);
useGLTF.preload(EARTH_URL);
useGLTF.preload(ASTRONAUT_URL);
useGLTF.preload(SATELLITE_URL);

// CTA small robot — defer so it doesn't compete with hero assets.
setTimeout(() => useGLTF.preload(smallRobotUrl), 1500);

// CTA small drone GLB — defer so it doesn't compete with the
// hero / traveler drone load.
setTimeout(() => useGLTF.preload(smallDroneGlbUrl), 1500);

// Secondary models — defer by 2 s so they don't compete with hero assets.
setTimeout(() => {
  useGLTF.preload(ASTEROIDS_URL);
  useGLTF.preload(BIG_ASTEROID_URL);
  useGLTF.preload(EARTH3_URL);
  useGLTF.preload(MOON_SMALL_URL);
  useGLTF.preload(MARS_URL);
}, 2000);

export default Aerospace;
