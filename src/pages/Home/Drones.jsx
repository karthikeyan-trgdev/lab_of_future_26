// Home.jsx

import { Canvas, useFrame } from "@react-three/fiber";

import {
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
import { useEnquiryModal } from "../../context/EnquiryModalContext";

import droneCertImg from "../../assets/programs/drones/drone-certificate.webp";

import learnThinkCritically from "../../assets/programs/drones/future-career/students-learn (1).webp";
import learnUnderstandWorld from "../../assets/programs/drones/future-career/students-learn (2).webp";
import learnBuildModels from "../../assets/programs/drones/future-career/students-learn (3).webp";
import learnUseTools from "../../assets/programs/drones/future-career/students-learn (5).webp";
import learnCommunicate from "../../assets/programs/drones/future-career/students-learn (6).webp";
import learnWorkTeams from "../../assets/programs/drones/future-career/students-learn (8).webp";
import learnSolveProblems from "../../assets/programs/drones/future-career/students-learn (9).webp";

// Drone hero assets
import droneGlbUrl from "../../assets/programs/drones/Drone.glb?url";
// Separate GLB used ONLY by the CTA drone — the small interactive
// drone that auto-rotates + responds to drag.
import smallDroneGlbUrl from "../../assets/programs/drones/small-drone.glb?url";
import dronesElement1 from "../../assets/programs/drones/element-1.svg";
import dronesAgeSectionShape from "../../assets/programs/drones/age-section-shape.png";
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


/* =========================================================
   WHY SPACE SCIENCE SECTION
========================================================= */

const WhySpaceScience = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
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
      <h2 className="drones-why-title prog-section-title">
        <span className="drones-why-title-outline">WHY</span>{" "}
        <span className="drones-why-title-bold">DRONES?</span>
      </h2>

      {/* The black notched panel — uses bg-shape-1.svg as the actual
          panel shape (the SVG already contains the notch + dot patterns) */}
      <div className="drones-why-shape">

        <div className="drones-why-content">
          {/* LEFT — text + bullets + CTAs */}
          <div className="drones-why-text">
            <p>The sky used to be the limit. Now it's the starting point.
There is a moment every student never forgets. The first time something you built
actually flies. Not a video. Not a simulation. Something you assembled,
programmed, and launched yourself hovering in the air because you made it work.<br /><br />
At Lab of Future, students turn curiosity into flight by assembling, programming, and
piloting drones through mission-based STEM learning. From first lift-off to
autonomous missions, they discover how ideas become real movement, real
confidence, and real innovation. This is where learners stop imagining the future and
start flying it.</p>
            <div className="drones-why-cta-row">
              <button type="button" onClick={openEnquiry} className="drones-why-btn">
                Enroll Now
              </button>
              <button type="button" onClick={openEnquiry} className="drones-why-btn">
                Book a Demo
              </button>
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
};

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
      "First contact with drones. Children explore flight, direction, propellers, and safe flying practices. These age-based drone classes build curiosity, coordination, and confidence.",
    ],
  },
  {
    label: "Ages 8–10",
    points: [
      "Students learn drone controls, flight maneuvers, obstacle awareness, and mission challenges. Hands-on activities introduce navigation, teamwork, and problem-solving through exciting flying experiences.",
    ],
  },
  {
    label: "Ages 11–14",
    points: [
      "Drone systems, sensors, aerodynamics, and flight planning take center stage. Students begin understanding how technology, data, and engineering work together in aviation.",
    ],
  },
  {
    label: "Ages 15–18",
    points: [
      "Advanced drone operations, autonomous flight concepts, aerial mapping, and mission design. Projects focus on innovation, technical skills, and real-world drone applications.",
    ],
  },
  {
    label: "Ages 18+",
    points: [
      "Industry-focused drone training with advanced technologies, automation concepts, and project-based challenges. Students develop practical skills for higher education, research, and emerging careers.",
    ],
  },
];


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
              <h2 className="drones-start-title prog-section-title">
                The Lab of {" "}
                <span className="drones-start-badge">Future Way?</span>
              </h2>
              <p className="drones-start-desc">A hands-on drone learning program where students explore real concepts of
Physics, Aerodynamics, Coding, Engineering & Problem Solving through real
flight missions, drone systems, and aerospace challenges.</p>
            </div>

            <div className="drones-start-block">
              <h2 className="drones-start-title prog-section-title">
                Why Start {" "}
                <span className="drones-start-badge">Young?</span>
              </h2>
              <p className="drones-start-desc">Childhood is when curiosity is at its peak, and the best time to build future-ready
skills. Our drone classes for beginners in Dubai, designed for children aged 6 years
and above, offer hands-on drone learning experiences that help young learners
build confidence, strengthen problem-solving skills, and develop strong STEM
foundations right from the start.</p>
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
  { label: "Understand How Drones Fly", img: learnThinkCritically },
  { label: "Master Drone Controls", img: learnUnderstandWorld },
  { label: "Build and Program Drones", img: learnBuildModels },
  { label: "Explore Sensors & Navigation", img: learnUseTools },
  { label: "Learn Drone Coding", img: learnCommunicate },
  { label: "Complete Real Missions", img: learnWorkTeams },
  { label: "Explore Autonomous Flight", img: learnSolveProblems },
];

const StudentsLearn = () => (
  <section className="learn-section">
    <div className="container">
      <h2 className="learn-title prog-section-title">
        WHAT WILL STUDENTS <span className="learn-badge">LEARN?</span>
      </h2>
      <p className="learn-sub">
        Learn to explore, build, and think like a drone innovator.<br />Students learn to:
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
        Every flight is a challenge. Every mission builds a future-ready skill.
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
            <h2 className="drones-cert-title prog-section-title">CERTIFICATES</h2>
            {/* <ul className="drones-cert-list">
              <li>Level-based completion certificates</li>
              <li>Skill-based recognition (design, analysis, collaboration)</li>
              <li>Project-based acknowledgments linked to performance and outcomes</li>
            </ul>*/}
            <p>
            Students receive a Drone Course Certificate recognizing hands-on learning, skill
development, and progress in drone training, highlighting their understanding of
fundamentals, control techniques, and real-world STEM application.
            </p> 
            {/* Drone placeholder + travel waypoint */}
            <div className="drones-cert-drone drone-wp-cert" aria-hidden="true" />
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
   COMPETITIONS (section 8)
========================================================= */

const COMPETITION_ITEMS = [
  {
    icon: calenderIcon,
    title: "Monthly Themed Drone Competitions",
    desc: "Keep learners engaged all year with fresh monthly drone challenges focused on <br/> flying, coding, teamwork, and missions.",
  },
  {
    icon: olympiadIcon,
    title: "National / Regional Level Competitions",
    desc: "Prepare students for bigger competition platforms through structured training, flight <br/> tasks, documentation, and presentation skills.",
  },
  {
    icon: portfolioIcon,
    title: "Global Drone Competitions",
    desc: "Build future-ready confidence for international drone challenges involving autonomy, <br/> innovation, rescue missions, and UAV engineering.",
  },
  {
    icon: recognitionIcon,
    title: "Portfolio-Based Drone Competitions",
    desc: "Turn drone builds, flight logs, code records, design notes, and mission outcomes into <br/> strong student portfolio entries.",
  },
];

const Competitions = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="competitions-section competitions-section--robotics">
    <div className="drone-wp-comp" aria-hidden="true" />
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
          <button
            type="button"
            className="drones-comp-btn"
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
    q: "Drone Pilot",
    a: "Learn how drones are used in industries like rescue operations, agriculture, <br/> inspections, logistics, and mission-based    flying opening pathways into real aviation and UAV operations.",
  },
  {
    q: "Aerial Photography & Media",
    a: "Explore how drones capture stunning aerial visuals for filmmaking, tourism, <br/> events, sports, real estate and digital storytelling.",
  },
  {
    q: "UAV Engineer",
    a: "Discover the technology behind drones by understanding flight systems, <br/> sensors, controls, design, testing, and innovation in unmanned aerial vehicles.",
  },
  {
    q: "Aerial Mapping & Surveying",
    a: "See how drones help create maps, collect data, and support construction, <br/> environmental studies, urban planning, and land surveys.",
  },
  {
    q: "Drone Research & Innovation",
    a: "Explore emerging fields like autonomous drones, AI-powered navigation, <br/> smart safety systems, and future flying technologies.",
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
    title: "Love Flying & Control?",
    points: ["Drone piloting, FPV racing, Flight safety, Navigation."],
  },
  {
    title: "Love coding & AI?",
    points: ["Autonomous drones, Sensor logic, GPS, Computer vision, Mission automation."],
  },
  {
    title: "Love building things?",
    points: ["UAV design, Aerodynamics, Payload systems, Propellers, Drone assembly."],
  },
  {
    title: "Love Maps & Real-World Impact?",
    points: ["Aerial mapping, Surveying, Rescue missions, Agriculture, Inspection, Environmental monitoring."],
  },
];

const ChooseRightPath = () => (
  <section className="choose-path-section choose-path-section--robotics">
    <div className="drone-wp-choose" aria-hidden="true" />
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
    <h2 className="assoc-title prog-section-title">
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
          <h2 className="vetted-title prog-section-title">
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
  { label: "ON-SITE", img: modeOnsiteImg },
  { label: "ONLINE", img: modeOnlineImg },
  { label: "DIY", img: modeDiyImg },
];

const ModesToJoin = () => (
  <section className="modes-section modes-section--robotics">
    <div className="drone-wp-modes" aria-hidden="true" />
    <div className="container">
      <h2 className="modes-title prog-section-title">
        <span className="modes-title-badge">MODES</span> TO JOIN
      </h2>
      <p className="modes-subtitle prog-section-subtitle">More Than Just Science</p>
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
    title: "Autonomous Payload Drop Drone",
    desc: "Designing and testing a drone that carries a payload and releases it accurately at a <br /> target point using balance, timing, and mission-control thinking.",
    /* student: "Student Name",
    meta: "Class | Section", */
  },
  {
    title: "Dragonfly Rotorcraft",
    desc: "Inspired by nature and aerial mobility, students explore rotorcraft design, <br /> lift generation, balance, lightweight and controlled aerial movement through a <br /> dragonfly-style flying system.",
     /* student: "Student Name",
    meta: "Class | Section", */
  },
  {
    title: "Space Drone Mission",
    desc: "Creating a drone concept for future space exploration designed for planetary <br /> mapping, habitat inspection, rescue support, and off-world mobility.",
     /* student: "Student Name",
    meta: "Class | Section", */
  },
   {
    title: "Obstacle Avoidance Drone",
    desc: "Plan flight routes, avoid obstacles, and complete precision challenges using real <br /> drone control techniques.",
     /* student: "Student Name",
    meta: "Class | Section", */
  },
];

const StudentProjects = () => (
  <section className="projects-section projects-section--robotics">
    <div className="drone-wp-projects" aria-hidden="true" />
    <div className="container">
      <h2 className="projects-title prog-section-title">
        STUDENT PROJECTS
      </h2>
      <p className="projects-subtitle prog-section-subtitle">Real Missions. Real Flight. Real Pride. to Creation</p>
      <p className="projects-desc">
        What if a drone could deliver help, map unknown terrain, or fly like a tiny mission explorer? At Lab of Future, students don’t follow textbook exercises, they follow real drone missions built around curiosity, testing, and hands-on discovery.
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
    desc: "The benefits of drone education become real when students explore drone applications in mapping, inspection, emergency response, agriculture, and environmental monitoring.",
  },
  {
    icon: impactIcon2,
    title: 'The Explorer\nMindset',
    desc: "Every mission develops drone skills development through planning, testing, decision-making, and continuous improvement.",
  },
  {
    icon: impactIcon3,
    title: "Measurable\nGrowth",
    desc: "Track STEM learning outcomes beyond grades in confidence, teamwork, technical skills, mission success, and problem-solving ability.",
  },
];

const ProjectImpact = () => (
  <section className="impact-section impact-section--robotics">
    <div className="drone-wp-impact" aria-hidden="true" />
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
   FAQ — Frequently Asked Questions (two-column accordion)
========================================================= */

const FAQ_ROBOTICS = [
  {
    q: "What is a drone and how does it work?",
    a: "A drone is an unmanned aerial vehicle that can be controlled remotely or autonomously. It works using a combination of GPS, sensors, and flight controllers to navigate and perform tasks.",
  },
  {
    q: "What is the Lab of Future Drones program?",
    a: "It is a hands-on aerospace learning program where students explore drone flying, coding, safety, sensors, navigation, and real-world mission-based drone projects.",
  },
  {
    q: "What is the right age for a child to start learning about drones?",
    a: "Children can start learning drone basics from as young as 6 years old through safe, guided activities. At Lab of Future, the pathway is structured age-wise so every learner starts at the right level.",
  },
  {
    q: "Is there a progression path from beginner to advanced?",
    a: "Yes. Students begin with drone basics, safety, and flight control, then progress into coding, sensors, navigation, mission planning, autonomous systems, and advanced drone projects.",
  },
  {
    q: "Will students learn to actually fly drones?",
    a: "Yes. Students learn real flying skills through supervised practice, including takeoff, landing, hovering, movement control, safety checks, and mission-based flight challenges.",
  },
  {
    q: "Do students receive a drone license after the program?",
    a: "Students receive a Lab of Future course certificate. A professional drone license or government permit is separate and depends on UAE aviation authority requirements.",
  },
  {
    q: "Are drones used in real industries today?",
    a: "Drones are widely used in agriculture, mapping, infrastructure inspection, filmmaking, logistics, emergency response, environmental monitoring, and scientific research.",
  },
  {
    q: "What careers are available for drone pilots?",
    a: "Drone skills can lead to careers in aviation, inspection, aerial photography, surveying, agriculture, logistics, emergency response, defence, research, and UAV engineering.",
  },
  {
    q: "Are there drone competitions for school students?",
    a: "Yes. Students can prepare for drone racing, FPV missions, obstacle challenges, design contests, and project-based drone competitions that test speed, control, teamwork, and problem-solving.",
  },
  {
    q: "What is the career pathway from school-level drone learning?",
    a: "Students can move from beginner drone learning to advanced projects, competitions, certifications, university pathways, and future careers in aerospace, UAV systems, mapping, or drone engineering.",
  },
    {
    q: "What is the difference between drones and robotics?",
    a: "Robotics focuses on machines that sense, move, and act. Drones are a specialized flying robotics system that combines aerodynamics, electronics, coding, control, and navigation.",
  },
  {
    q: "How do I know if the drone program is right for my child?",
    a: "If your child enjoys flying objects, building, experimenting, solving puzzles, coding, or asking how technology works, drones can be a strong and exciting learning pathway.",
  },
  {
    q: "What makes Lab of Future a credible drone education provider?",
    a: "Lab of Future offers structured curriculum, trained mentors, hands-on projects, safety-first learning, progress tracking, certificates, and real student project outcomes.",
  },
  {
    q: "How do I enrol my child in the Lab of Future drone program?",
    a: "Parents can contact Lab of Future, share the child’s age group, choose the right program level, confirm batch availability, and complete the registration process.",
  },
  {
    q: "What kind of drone projects will my child complete?",
    a: "Students work on flight missions, obstacle navigation, drone mapping, FPV challenges, sensor-based activities, autonomous drone concepts, and real-world aerospace-inspired projects.",
  },
    {
    q: "What safety measures are in place during drone sessions?",
    a: "Drone sessions are supervised by mentors, with safety briefings, controlled practice areas, age-appropriate equipment, pre-flight checks, and clear flying rules.",
  },
   {
    q: "How is my child’s progress tracked?",
    a: "Progress is tracked through flight skills, project completion, mentor feedback, teamwork, confidence, technical understanding, and the ability to explain and improve their work.",
  },
    {
    q: "What do parents say about the Lab of Future drone program?",
    a: "Parents value the hands-on learning, mentor guidance, real projects, and confidence students gain while exploring drone technology in a safe and structured environment.",
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

const CtaRobotics = () => {
  const { openEnquiry } = useEnquiryModal();
  return (
  <section className="cta-robotics-section">
    <div className="cta-robotics-inner container">
      {/* LEFT — drone GLB playing animation 2 only. */}
      <div className="cta-robotics-stage">
        <CtaDroneCanvas />
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

const Drones = () => {
  const { openEnquiry } = useEnquiryModal();

  // The drone traveler is choreographed for wide desktop layouts — at
  // mobile/tablet/laptop widths his landing spots collide with section
  // content (age cards, headings, etc.), so he's dropped from the DOM
  // entirely at or below the laptop breakpoint.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 1280
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1280);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="drones-page">
      <ScrollProgressBar />
      <BackToTopButton />

      {/* Fixed 3-D drone that travels across all sections as user scrolls */}
      {!isMobile && <DroneTraveler />}

      <SEO
        title={`Drones | ${siteConfig.title}`}
        description="Lab of Future — Drones: design, build and fly autonomous aerial systems, from quadcopters to fixed-wing UAVs."
        url={`${siteConfig.url}/students/drones`}
        image={siteConfig.socialImage}
        keywords={["Drones", "UAV", "Aerial Robotics", "STEM"]}
      />

      <section className="hero drones-hero">
        {/* Dark hex-pattern backdrop painted via CSS */}
        <div className="drones-hero-bg" aria-hidden="true" />
        <div className="drones-hero-vignette" aria-hidden="true" />

        <div className="drones-hero-grid container">
          {/* LEFT — title + tagline + description + CTA */}
          <div className="drones-hero-text">
            <motion.h1
              className="drones-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              DRONES
            </motion.h1>
            <motion.p
              className="drones-hero-tagline"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              POWER. PRECISION. POSSIBILITIES.
            </motion.p>
            <motion.p
              className="drones-hero-desc"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              From aerial surveillance to precision delivery, our drone program equips students with real-world skills in flight mechanics, autonomous systems, and aerial robotics — preparing the next generation of engineers and innovators.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            >
              <NavLink to="/students/drones" className="drones-hero-cta">
                ENROLL NOW
                <span aria-hidden="true" className="drones-hero-cta-arrow">
                  &rarr;
                </span>
              </NavLink>
            </motion.div>
          </div>

          {/* RIGHT — empty target rect for the drone traveler.
              The actual drone canvas is rendered by <DroneTraveler />
              at the top of the page and follows this rect's position. */}
          <div className="drones-hero-stage" aria-hidden="true" />
        </div>
      </section>

      <WhySpaceScience />

      <div className="drones-start-age-wrapper">
        <WhyStartYoung />
        <AgePrograms />
      </div>

      <StudentsLearn />

      <Certificates />

      {/* BigAsteroid backdrop removed for Space Robotics — the careers
         + competitions sections each carry their own light background. */}
      <div className="space-careers-wrapper space-careers-wrapper--robotics">
        <div className="space-careers-content">
          {/* <WhySpaceForCareers /> */}
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

      <div className="drones-assoc-vetted-wrapper">
        <Associated />
        <VettedBy />
      </div>

      {/* MODES TO JOIN — 3D moon backdrop removed; section now just
         shows its CSS background image */}
      <div className="drones-modes-projects-wrapper">
        <div className="modes-stage-wrapper">
          <div className="modes-stage-content">
            <ModesToJoin />
          </div>
        </div>
        <StudentProjects />
      </div>

      <ProjectImpact />

      {/* Community + Tracking sections removed for the robotics page. */}

      <FaqRobotics />

      <CtaRobotics />

      <ExplorePrograms />

      <SiteFooter />
    </div>
  );
};

// CTA small drone GLB — defer so it doesn't compete with the hero / traveler drone load.
setTimeout(() => useGLTF.preload(smallDroneGlbUrl), 1500);

export default Drones;
