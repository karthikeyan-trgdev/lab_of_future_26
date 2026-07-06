// Popup accent colors per program page, matching each page's own
// --sr-primary / --sr-accent CSS custom properties (see
// src/styles/pages/{aerospace,drones,space-robotics,ai-and-data-science}.css).
// Keyed by route prefix; matched by longest-prefix so nested routes
// (e.g. /students/drones) resolve before the generic /students fallback.
export const PROGRAM_THEMES = [
  {
    prefix: '/students/aeromodelling',
    label: 'Aeromodelling & Aerospace',
    primary: '#1a1a1a',
    accent: '#6a6a6a',
    glow: 'rgba(74, 74, 74, 0.45)',
  },
  {
    prefix: '/students/drones',
    label: 'Drones',
    primary: '#1a1a1a',
    accent: '#6a6a6a',
    glow: 'rgba(74, 74, 74, 0.45)',
  },
  {
    prefix: '/students/space-robotics',
    label: 'Space Robotics',
    primary: '#1d3b8a',
    accent: '#4a7fc4',
    glow: 'rgba(47, 99, 200, 0.45)',
  },
  {
    prefix: '/students/ai-and-data-science',
    label: 'AI & Data Science',
    primary: '#1d3b8a',
    accent: '#4a7fc4',
    glow: 'rgba(47, 99, 200, 0.45)',
  },
  {
    prefix: '/students/space-science',
    label: 'Space Science',
    primary: '#2f5fd6',
    accent: '#5a9bff',
    glow: 'rgba(90, 155, 255, 0.45)',
  },
  {
    prefix: '/students',
    label: 'Student Programs',
    primary: '#0f7ea8',
    accent: '#5EC8FF',
    glow: 'rgba(94, 200, 255, 0.45)',
  },
];

const DEFAULT_THEME = {
  label: 'Lab of Future',
  primary: '#6c63ff',
  accent: '#22d3ee',
  glow: 'rgba(108, 99, 255, 0.45)',
};

export const getProgramTheme = (pathname) => {
  const match = PROGRAM_THEMES
    .filter((theme) => pathname.startsWith(theme.prefix))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0];

  return match || DEFAULT_THEME;
};
