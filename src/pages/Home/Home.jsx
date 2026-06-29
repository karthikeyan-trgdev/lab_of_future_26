import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, ContactShadows, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

import SEO from '../../components/common/SEO';
import SplashCursor from '../../components/common/SplashCursor';
import { siteConfig } from '../../data/siteConfig';

import homeBg from '../../assets/home-bg.jpeg';
import lofLogoWhite from '../../assets/lof-logo-white.png';
import studentsDoor from '../../assets/Doors/students.webp';
import schoolsDoor from '../../assets/Doors/schools.webp';
import collegeDoor from '../../assets/Doors/college.webp';
import adultsDoor from '../../assets/Doors/adults.webp';
import corporateDoor from '../../assets/Doors/corporate.webp';
import robotUrl from '../../assets/3d-models/new-robot.glb?url';

import '../../styles/pages/category-home.css';

/* =========================================================
   CHOOSE-YOUR-PATH home page.
   The user is greeted by 5 portal-doors on a futuristic deck;
   a small AI robot stands in front. Clicking a door tells the
   robot to walk to that door, then a portal/black-hole effect
   sweeps the screen and we navigate to the chosen route.
========================================================= */

// Each door's screen X position is expressed as a fraction from
// -0.5 (left edge) to +0.5 (right edge). The robot Canvas uses the
// same ratio so the robot lines up with the chosen door regardless
// of viewport width.
const DOORS = [
  {
    slug: 'students',
    label: 'Students',
    img: studentsDoor,
    accent: '#22c55e', // green
    xRatio: -0.36,
  },
  {
    slug: 'schools',
    label: 'Schools',
    img: schoolsDoor,
    accent: '#3b82f6', // blue
    xRatio: -0.18,
  },
  {
    slug: 'universities',
    label: 'Universities',
    img: collegeDoor,
    accent: '#a855f7', // purple
    xRatio: 0,
  },
  {
    slug: 'professionals',
    label: 'Professionals',
    img: adultsDoor,
    accent: '#f97316', // orange
    xRatio: 0.18,
  },
  {
    slug: 'industries',
    label: 'Industries',
    img: corporateDoor,
    accent: '#06b6d4', // cyan
    xRatio: 0.36,
  },
];

/* ---------- AI ROBOT (3D) ---------- */
// Smoothly walks toward `targetX` in world units. When `entering` is
// true the robot scales down + lifts as if being sucked into the
// portal so the hand-off into the black-hole feels continuous.
/* Robot phases:
     null         — standing still on the deck, FRONT VIEW (facing the
                    camera). The user sees the robot's face at rest.
     'zooming'    — door is moving to viewport centre; robot waits
                    in the front-view idle pose
     'turning'    — robot rotates 180° in place to face the door
                    (back to camera). Sequential, before walking.
     'walking'    — robot strides FORWARD (−Z) into the centred door,
                    body now facing the door, shrinking slightly with
                    perspective.
     'blackZoom'  — a black radial mask sweeps in from the edges and
                    finalises to solid black.
*/
const Robot = ({ door, phase, stage }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(robotUrl);
  const cloned = useMemo(() => scene.clone(), [scene]);
  const { actions, mixer } = useAnimations(animations, ref);
  // meshes identified as the head's indicator circle. Their emissive
  // intensity is pulsed each frame to give a blinking LED feel.
  const headLightsRef = useRef([]);
  // Track when the current phase started, so timed animations (like the
  // jump arc) can compute progress.
  const phaseStartRef = useRef(0);
  const lastPhaseRef = useRef(null);
  // Same idea for the load-time stage transitions ('hidden' → 'entering' → 'ready').
  const stageStartRef = useRef(0);
  const lastStageRef = useRef(null);

  useEffect(() => {
    // Play EVERY baked clip on infinite loop. These animate the zeb's
    // bones (wings, head, etc.) — they DON'T conflict with the manual
    // group-level transforms in useFrame, so we can run both at once.
    for (const action of Object.values(actions)) {
      action.reset();
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
      action.enabled = true;
      action.timeScale = 1;
      action.play();
    }
    return () => mixer?.stopAllAction();
  }, [actions, mixer, animations]);

  // Walk the cloned model: log mesh names + force every emissive
  // material to bypass tone mapping and bump its emissive intensity
  // so the GLB-authored glow actually shows through the Studio HDRI's
  // bright ambient.
  useEffect(() => {
    if (!cloned) return;
    const allMeshes = [];
    cloned.traverse((obj) => {
      if (!obj.isMesh) return;
      allMeshes.push(obj);

      // Clone the material so we don't mutate the cached GLB material
      // (which would leak across other usages of useGLTF(robotUrl)).
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      const fixed = mats.map((m) => {
        if (!m) return m;
        const cm = m.clone();
        // ACES tone mapping crushes saturated emissive — disable it on
        // any material that actually has an emissive contribution.
        const hasEmissive =
          cm.emissive &&
          (cm.emissive.r > 0.001 ||
            cm.emissive.g > 0.001 ||
            cm.emissive.b > 0.001 ||
            cm.emissiveMap);
        if (hasEmissive) {
          cm.toneMapped = false;
          // Boost so the glow reads against the bright HDRI ambient.
          cm.emissiveIntensity = Math.max(cm.emissiveIntensity || 1, 3.5);
          cm.needsUpdate = true;
        }
        return cm;
      });
      obj.material = Array.isArray(obj.material) ? fixed : fixed[0];
    });

    // eslint-disable-next-line no-console
    console.log(
      '[Zeb meshes + emissives]:',
      allMeshes.map((m) => {
        const mat = Array.isArray(m.material) ? m.material[0] : m.material;
        return {
          name: m.name,
          emissive: mat?.emissive?.getHexString?.() || '—',
          intensity: mat?.emissiveIntensity ?? '—',
          toneMapped: mat?.toneMapped ?? '—',
        };
      })
    );
  }, [cloned]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const g = ref.current;

    // Track stage start time (load-time entrance animation).
    if (stage !== lastStageRef.current) {
      stageStartRef.current = state.clock.elapsedTime;
      lastStageRef.current = stage;
    }
    const tInStage = state.clock.elapsedTime - stageStartRef.current;

    // Track phase start time for arc / falling animations
    if (phase !== lastPhaseRef.current) {
      phaseStartRef.current = state.clock.elapsedTime;
      lastPhaseRef.current = phase;
    }
    const tInPhase = state.clock.elapsedTime - phaseStartRef.current;

    // ---- stage handling: hidden / entering ----
    // Zeb is invisible until the doors finish their power-up. Then it
    // rises from BELOW the screen, spinning + zooming in, slowing as
    // it approaches its idle position at the bottom centre, facing
    // the camera so the user sees its front.
    if (stage === 'hidden') {
      g.position.x = 0;
      g.position.y = -10;
      g.position.z = 0;
      g.scale.x = g.scale.y = g.scale.z = 0;
      return;
    }
    
    if (stage === 'entering') {
      // SMOOTH 3-phase entrance:
      //   1) RISE + SPIN + SCALE-UP  (0 – 60%)   robot reveals from
      //      below and rises to the viewport centre while rotating
      //      smoothly AND scaling up — all three motions happen
      //      together in one continuous, ease-in-out curve.
      //   2) PAUSE at centre          (60 – 70%)  brief beat where it
      //      hangs at centre with a tiny scale bump for emphasis.
      //   3) LAND DOWN (scale-down)   (70 – 100%) eases down to the
      //      idle bottom-centre position; scale eases down a touch
      //      as it lands — the "scale down a little bit" finish.
      const ENTRY_DUR = 3.4;
      const tn = Math.min(tInStage / ENTRY_DUR, 1);

      // Easing helpers — both ease in AND out for buttery transitions.
      const easeInOut = (t) => (t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const smoothstep = (t) => t * t * (3 - 2 * t);

      let y, scale, rotY;

      if (tn < 0.6) {
        // RISE + SPIN + SCALE-UP — one combined smooth motion.
        const t = tn / 0.6;
        const e = easeInOut(t);
        y = -6 + 6 * e;                 // -6 → 0 (centre)
        scale = 1.3 * e;                 // 0 → 1.3 (peak at centre)
        rotY = e * Math.PI * 4;          // 2 smooth rotations
      } else if (tn < 0.7) {
        // PAUSE at centre — tiny scale pop, gentle continued spin.
        const t = (tn - 0.6) / 0.1;
        const e = smoothstep(t);
        y = 0;
        scale = 1.3 + 0.05 * e;          // 1.3 → 1.35 (subtle emphasis)
        rotY = Math.PI * 4 + e * Math.PI * 0.3;
      } else {
        // LAND DOWN to idle position with a slight SCALE-DOWN.
        // Rotation completes its 3rd turn (6π ≡ 0 = face camera).
        const t = (tn - 0.7) / 0.3;
        const e = easeInOut(t);
        y = (-1.6 - 0) * e;              // 0 → -1.6 (idle bottom)
        scale = 1.35 + (1.1 - 1.35) * e; // 1.35 → 1.1 (scale down a bit)
        rotY = Math.PI * 4.3 + e * Math.PI * 1.7; // → 6π (face camera)
      }

      g.position.x = 0;
      g.position.y = y;
      g.position.z = 0;
      g.rotation.y = rotY;
      g.rotation.x = 0;
      g.rotation.z = 0;
      g.scale.x = g.scale.y = g.scale.z = scale;
      return;
    }

    // Zeb GLB orientation: rotation.y = 0 → face toward camera (front
    // view); rotation.y = π → back to camera (face toward doors).
    const FACE_CAMERA = 0;
    const FACE_DOOR = Math.PI;
    const IDLE_SCALE = 1.1;  // matches entrance end-scale for smooth handover
    const FLOOR_Y = -1.6; // bottom-centre idle Y

    const lerpScale = (target, k) => {
      const ds = (target - g.scale.x) * k;
      g.scale.x += ds; g.scale.y += ds; g.scale.z += ds;
    };

    if (!phase || !door) {
      // idle — VERY light up/down float on top of the GLB's baked clip.
      // Small amplitude so the motion reads as breathing, not bouncing.
      const t = state.clock.elapsedTime;
      const BOB_CYCLE = 2.8;
      const bobT = (t % BOB_CYCLE) / BOB_CYCLE;
      const bobTri = bobT < 0.5 ? bobT * 2 : (1 - bobT) * 2;
      g.position.x += (0 - g.position.x) * 0.15;
      g.position.y = FLOOR_Y + bobTri * 0.15;  // gentle ±0.15 unit float
      g.position.z += (0 - g.position.z) * 0.15;
      g.rotation.y += (FACE_CAMERA - g.rotation.y) * 0.15;
      g.rotation.x += (0 - g.rotation.x) * 0.15;
      g.rotation.z += (0 - g.rotation.z) * 0.15;
      lerpScale(IDLE_SCALE, 0.15);
      return;
    }

    if (phase === 'zooming') {
      // Door is travelling to centre; robot stays in front-view idle
      g.position.x += (0 - g.position.x) * 0.12;
      g.position.y = FLOOR_Y;
      g.position.z += (0 - g.position.z) * 0.12;
      g.rotation.y += (FACE_CAMERA - g.rotation.y) * 0.15;
      g.rotation.x += (0 - g.rotation.x) * 0.15;
      g.rotation.z += (0 - g.rotation.z) * 0.15;
      lerpScale(IDLE_SCALE, 0.15);
    } else if (phase === 'turning') {
      // Rotate 180° in place to face the door (back to camera)
      g.position.x += (0 - g.position.x) * 0.12;
      g.position.y = FLOOR_Y;
      g.position.z += (0 - g.position.z) * 0.12;
      g.rotation.y += (FACE_DOOR - g.rotation.y) * 0.18;
      lerpScale(IDLE_SCALE, 0.15);
    } else if (phase === 'walking') {
      // Walk straight forward into the centred door
      g.position.x += (0 - g.position.x) * 0.18;
      g.position.y = FLOOR_Y;
      g.position.z += (-4.5 - g.position.z) * 0.08;
      // Body locked facing door — turn already complete
      g.rotation.y += (FACE_DOOR - g.rotation.y) * 0.25;
      g.rotation.x += (0 - g.rotation.x) * 0.2;
      g.rotation.z += (0 - g.rotation.z) * 0.2;
      lerpScale(IDLE_SCALE * 0.45, 0.06);
    } else if (phase === 'blackZoom') {
      // Quick window while the black mask sweeps in
      g.position.z += (-7 - g.position.z) * 0.15;
      g.position.x = 0;
      g.position.y = FLOOR_Y;
      g.rotation.y = FACE_DOOR;
      lerpScale(IDLE_SCALE * 0.2, 0.12);
    }
  });

  return (
    <group ref={ref} position={[0, -10, 0]} scale={[0, 0, 0]}>
      <primitive object={cloned} />
    </group>
  );
};

useGLTF.preload(robotUrl);

/* ---------- TYPEWRITER ---------- */
// Streams `text` one character at a time after `startDelay` ms. The
// final character is followed by a blinking caret until the animation
// ends — looks like a sci-fi HUD typing the prompt onto the screen.
const Typewriter = ({ text, speed = 70, startDelay = 0 }) => {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let intervalId;
    const startId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return (
    <>
      {shown}
      <span
        aria-hidden="true"
        className={`typewriter-caret${
          done ? ' typewriter-caret--done' : ''
        }`}
      >
        |
      </span>
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  // Multi-phase walk-to-door state machine. See the Robot component
  // comment for what each phase represents.
  const [phase, setPhase] = useState(null);
  // Mobile-only: flips true once the user swipes the horizontal door
  // row, used to slide the robot to the horizontal centre of the viewport.
  const [swiped, setSwiped] = useState(false);

  // (Drag-to-rotate removed — robot now stays in its fixed front pose
  //  until a door is clicked.)
  // Doors are clickable from the moment they appear — the staggered
  // power-up animation runs purely as a visual highlight, not as a gate.
  const doorsReady = true;

  // The App-level preloader covers the home page for ~5 s on first load
  // (it's outside the Routes tree). CSS animations on the doors begin
  // counting from mount time, so on first load they finish BEFORE the
  // preloader fades out, leaving the doors already in their settled
  // state by the time the user sees them. We pause the animations until
  // the preloader has actually left the DOM — that way on a fresh load
  // the highlight sequence plays AFTER the preloader, and on re-entry
  // (no preloader) it plays immediately.
  const [animsReady, setAnimsReady] = useState(() => {
    if (typeof document === 'undefined') return false;
    return !document.querySelector('.preloader');
  });
  useEffect(() => {
    if (animsReady) return undefined;
    const tick = () => {
      if (!document.querySelector('.preloader')) {
        setAnimsReady(true);
        observer.disconnect();
      }
    };
    const observer = new MutationObserver(tick);
    observer.observe(document.body, { childList: true, subtree: true });
    // Safety fallback in case the preloader is replaced without a
    // mutation event we observe.
    const fallback = window.setTimeout(() => setAnimsReady(true), 6000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [animsReady]);

  // Load-time entrance staging for the robot.
  //   'hidden'   — invisible while the doors power up one by one
  //   'entering' — robot rises from below + spins down to idle pose
  //   'ready'    — idle, doors are interactive
  // Doors finish their staggered animation at ~0.3s + 4×0.22s + 1.1s ≈ 2.28s
  // after `animsReady`. Robot entrance takes another ~1.8s on top.
  const [stage, setStage] = useState('hidden');
  useEffect(() => {
    if (!animsReady) return undefined;
    // Kick the robot off as soon as the FIRST door is up + a quick
    // beat, instead of waiting for the whole stagger to finish. The
    // remaining doors keep popping in while the robot is rising, so
    // the two animations now overlap and the page feels alive sooner.
    const enterDelay = 900; // was 2280 — robot enters ~1.4s earlier
    const tEnter = window.setTimeout(() => setStage('entering'), enterDelay);
    // Entrance duration MUST match ENTRY_DUR in Robot.useFrame (3.4s)
    // so rise + pause + land plays in full before idle takes over.
    const tReady = window.setTimeout(
      () => setStage('ready'),
      enterDelay + 3400
    );
    return () => {
      window.clearTimeout(tEnter);
      window.clearTimeout(tReady);
    };
  }, [animsReady]);

  const handleSelect = (door, buttonEl) => {
    if (phase) return; // ignore further clicks once a journey starts
    if (stage !== 'ready') return; // no door interaction until robot has landed

    // Capture the door's current screen-centre — used by the door's
    // own animate prop to compute the transform that brings it to the
    // viewport centre.
    const rect = buttonEl?.getBoundingClientRect();
    const screenCenterX = rect
      ? rect.left + rect.width / 2
      : window.innerWidth / 2;
    const screenCenterY = rect
      ? rect.top + rect.height / 2
      : window.innerHeight / 2;

    setSelected({ ...door, screenCenterX, screenCenterY });

    // Sequence:
    //   0.00 – 0.80s   zooming     (door slides + scales to centre)
    //   0.80 – 1.30s   turning     (robot rotates 180° to face door)
    //   1.30 – 2.40s   walking     (robot strides forward into door)
    //   2.40 – 3.00s   blackZoom   (black mask sweeps in, navigate)
    setPhase('zooming');
    window.setTimeout(() => setPhase('turning'), 800);
    window.setTimeout(() => setPhase('walking'), 1300);
    window.setTimeout(() => setPhase('blackZoom'), 2400);
    window.setTimeout(() => navigate(`/${door.slug}`), 3000);
  };

  return (
    <>
      <SEO
        title={siteConfig.title}
        description="Lab of Future — choose your path: students, schools, universities, professionals or industries."
      />

      {/* Splash cursor for the landing page (rendered outside MainLayout,
          so it needs its own instance + color). */}
      <SplashCursor
        DENSITY_DISSIPATION={6}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#3B82F6"
      />

      <main
        className="path-home"
        style={{ backgroundImage: `url(${homeBg})` }}
      >
        <div className="path-home-veil" />

        {/* top title block */}
        <motion.div
          className="path-home-head"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: phase ? 0 : 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="path-home-eyebrow">
            <span className="eyebrow-bar" />
            WELCOME TO
            <span className="eyebrow-bar" />
          </div>
          <div className="path-home-logo-wrap">
            <img
              src={lofLogoWhite}
              alt="Lab of Future"
              className="path-home-logo"
            />
          </div>
          <h1 className="path-home-title">CHOOSE YOUR PATH</h1>
          <p className="path-home-sub">
            Explore. Learn. Innovate. Build the future.
          </p>
        </motion.div>

        {/* row of 5 portal doors */}
        <div
          className={`doors-row${
            animsReady ? ' doors-row--anim' : ''
          }`}
          onScroll={() => {
            if (!swiped) setSwiped(true);
          }}
        >
          {DOORS.map((d, idx) => {
            const isSelected = selected?.slug === d.slug;
            const isDimmed = phase && !isSelected;

            // Animate target per phase. Selected door sits at the
            // viewport centre (scaled up) for the whole transition;
            // other doors fade out as soon as a click happens.
            let doorAnim;
            if (
              phase === 'zooming' ||
              phase === 'turning' ||
              phase === 'walking' ||
              phase === 'blackZoom'
            ) {
              if (isSelected) {
                const dx =
                  window.innerWidth / 2 - (selected?.screenCenterX || 0);
                const dy =
                  window.innerHeight / 2 - (selected?.screenCenterY || 0);
                doorAnim = { x: dx, y: dy, scale: 1.3, opacity: 1 };
              } else {
                doorAnim = { x: 0, y: 0, scale: 1, opacity: 0 };
              }
            } else {
              doorAnim = {
                x: 0,
                y: 0,
                scale: 1,
                opacity: isDimmed ? 0 : 1,
              };
            }
            const transitionProps = phase
              ? { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
              : {
                  duration: 0.65,
                  ease: 'easeOut',
                  delay: 0.1 + DOORS.indexOf(d) * 0.08,
                };

            return (
              <motion.button
                key={d.slug}
                type="button"
                className={`door-tile${isSelected ? ' door-tile--selected' : ''}${
                  isDimmed ? ' door-tile--dimmed' : ''
                }`}
                // --door-accent drives the colour of every glow / shadow.
                // --seq-delay staggers the power-up so doors highlight
                // one by one. --float-* gives each door its own
                // independent gentle bob so the row doesn't look
                // synchronised.
                style={{
                  '--door-accent': d.accent,
                  '--seq-delay': `${0.3 + idx * 0.22}s`,
                  '--float-duration': `${4.2 + idx * 0.45}s`,
                  '--float-offset': `${idx * 0.6}s`,
                  // Selected door sits above the others while it's
                  // travelling to the centre.
                  zIndex: isSelected ? 5 : undefined,
                }}
                disabled={!doorsReady || !!phase || stage !== 'ready'}
                onClick={(e) => handleSelect(d, e.currentTarget)}
                initial={{ opacity: 0, y: 60 }}
                animate={doorAnim}
                transition={transitionProps}
                // Snap-style tween (not spring) on hover so the lift
                // doesn't feel laggy or bouncy when the cursor passes
                // quickly between doors. Hover is suppressed before
                // the power-up sequence has finished.
                whileHover={
                  doorsReady && !phase
                    ? {
                        y: -10,
                        transition: { duration: 0.18, ease: 'easeOut' },
                      }
                    : undefined
                }
                aria-label={`Enter ${d.label}`}
              >
                <span className="door-glow" />
                <div className="door-img-float">
                  <img src={d.img} alt={d.label} className="door-img" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile-only swipe hint — the doors become a horizontal swipe
           row on phones, so nudge the user to flick through them. */}
        {!phase && (
          <div className="swipe-hint" aria-hidden="true">
            <span className="swipe-hint-text">Swipe to select your path</span>
            <span className="swipe-hint-arrow">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        )}

        {/* (Robot click-blocker removed — the centre door must remain
           clickable even when the robot is hovering in front of it.
           The robot Canvas already has pointer-events:none, so clicks
           pass through to the doors below.) */}

        {/* 3D AI robot — fixed full-viewport canvas with pointer-events
           off so the doors stay clickable */}
        <div
          className={`robot-layer${
            phase ? ' robot-layer--active' : swiped ? ' robot-layer--swiped' : ''
          }`}
        >
          <Canvas
            dpr={[1, 1.25]}
            camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ pointerEvents: 'none' }}
          >
            <Suspense fallback={null}>
              {/* Studio HDRI — image-based lighting for soft, even
                 reflections on the robot's metallic / shiny parts.
                 `background={false}` keeps the canvas transparent so
                 the page's space backdrop still shows through. */}
              <Environment preset="studio" background={false} />
              <ambientLight intensity={0.5} color="#a8c8ff" />
              <directionalLight
                position={[2, 5, 4]}
                intensity={1.6}
                color="#ffffff"
              />
              <directionalLight
                position={[-3, 2, 3]}
                intensity={0.9}
                color="#7fb6ff"
              />
              <pointLight
                position={[0, -1, 3]}
                intensity={1.4}
                distance={12}
                color={selected?.accent || '#80a4ff'}
              />
              <Robot door={selected} phase={phase} stage={stage} />
              {/* Ground shadow under the robot. ContactShadows projects
                 a real depth-derived shadow onto its plane, so it stays
                 anchored to the deck and naturally fades + tracks the
                 robot as he rolls + shrinks into a door. */}
              <ContactShadows
                position={[0, -2.42, 0]}
                scale={[8, 4]}
                opacity={0.55}
                blur={2.4}
                far={5}
                frames={Infinity}
                resolution={256}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Black-zoom transition — a black overlay clipped to an
           expanding circle. Starts as a small hole at viewport centre
           and rapidly grows to swallow the screen, handing off to the
           next route on a solid black frame. ~0.6s, ease-in. */}
        <AnimatePresence>
          {phase === 'blackZoom' && (
            <motion.div
              key="blackzoom"
              className="black-zoom-overlay"
              initial={{ clipPath: 'circle(0% at 50% 50%)' }}
              animate={{ clipPath: 'circle(150% at 50% 50%)' }}
              transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Home;
