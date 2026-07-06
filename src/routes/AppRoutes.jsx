import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Spinner from '../components/common/Spinner';

// New category landing (5 audience tiles)
const Home = lazy(() => import('../pages/Home/Home'));
// Existing big space-themed page — now a program detail page
const SpaceScience = lazy(() => import('../pages/Home/SpaceScience'));
// Sibling program — same layout / different theme (orange + cyan)
const SpaceRobotics = lazy(() => import('../pages/Home/SpaceRobotics'));
// Third program — same layout, drones-specific theme
const Drones = lazy(() => import('../pages/Home/Drones'));
// Fourth program — same layout, AI & Data Science theme
const AiAndDataScience = lazy(() => import('../pages/Home/AiAndDataScience'));
// Fifth program — scaffolded from Drones, aerospace theme
const Aerospace = lazy(() => import('../pages/Home/Aerospace'));

// Category pages
const Students = lazy(() => import('../pages/Students/Students'));
const ComingSoon = lazy(() => import('../pages/ComingSoon/ComingSoon'));
const IframeEmbed = lazy(() => import('../pages/IframeEmbed/IframeEmbed'));

const About = lazy(() => import('../pages/About/About'));
const Services = lazy(() => import('../pages/Services/Services'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const AppRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      {/* "Choose your path" landing is a full-bleed splash — render it
         OUTSIDE MainLayout so the global Header + Footer don't add to
         the page height (those would otherwise push the 100vh
         backdrop into scroll territory). */}
      <Route index element={<Home />} />

      {/* Every other route gets the standard header/footer chrome. */}
      <Route path="/" element={<MainLayout />}>
        {/* Category pages */}
        <Route path="students" element={<Students />} />
        <Route path="students/space-science" element={<SpaceScience />} />
        <Route path="students/space-robotics" element={<SpaceRobotics />} />
        <Route path="students/drones" element={<Drones />} />
        <Route
          path="students/ai-and-data-science"
          element={<AiAndDataScience />}
        />
        <Route path="students/aeromodelling" element={<Aerospace />} />
        <Route
          path="schools"
          element={<ComingSoon category="Schools" />}
        />
        <Route
          path="universities"
          element={<ComingSoon category="Universities" />}
        />
        <Route
          path="professionals"
          element={<ComingSoon category="Professionals" />}
        />
        <Route
          path="industries"
          element={<ComingSoon category="Industries" />}
        />

        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />

        {/* School Programs / Events — gamma.app embeds */}
        <Route
          path="school-programs/zero-gravity"
          element={
            <IframeEmbed
              src="https://gamma.app/embed/sbmltll626kq6ud"
              title="Zero Gravity Program"
            />
          }
        />
        <Route
          path="events/orbita-26"
          element={
            <IframeEmbed
              src="https://gamma.app/embed/fbn7ejouxgdvgh4"
              title="Orbita 26"
            />
          }
        />
        <Route
          path="events/asian-space-settlement-design-competition-2026"
          element={
            <IframeEmbed
              src="https://gamma.app/embed/brxuo87f7e3tb7z"
              title="Asian Space Settlement Design Competition 2026"
            />
          }
        />
        <Route
          path="events/summer-camp-2026"
          element={
            <IframeEmbed
              src="https://gamma.app/embed/r2qgxqn8dfe57vl"
              title="Summer Camp 2026"
            />
          }
        />
        <Route
          path="events/summer-internship-2026"
          element={
            <IframeEmbed
              src="https://gamma.app/embed/h0pfs5b55hait92"
              title="Summer Internship 2026"
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
