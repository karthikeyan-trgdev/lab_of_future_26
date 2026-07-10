// =============================================================
// CAREERS DATA
// Static job listings for the Career ("Find Your Future") page.
// No backend yet — swap `careers` for an API fetch when one exists.
//
// Each role carries the facets the sidebar filters on:
//   program        — top-level department / program area
//   location       — office / remote
//   disciplineGroup — parent group in the Discipline tree
//   discipline     — leaf under the group
// The filter option lists are DERIVED from this array (see helpers
// at the bottom) so adding a role automatically updates the filters.
// =============================================================

export const careers = [
  {
    id: "stem-instructor-dubai",
    title: "STEM Lab Instructor",
    program: "Education & Training",
    location: "Dubai, UAE",
    disciplineGroup: "Instruction & Mentoring",
    discipline: "STEM Instructor",
    type: "Full-time",
    shortDescription:
      "Deliver hands-on space, robotics and coding sessions to school students inside our innovation labs.",
    overview:
      "As a STEM Lab Instructor you are the face of Lab of Future in the classroom — turning curiosity into capability. You will run immersive, project-based sessions across space science, robotics and coding, adapting your delivery to different age groups and abilities.",
    responsibilities: [
      "Deliver hands-on lab sessions across space science, robotics, drones and coding.",
      "Adapt curriculum to the age group and learning level of each cohort.",
      "Mentor students through projects, competitions and showcases.",
      "Maintain lab equipment and ensure a safe learning environment.",
      "Give feedback to parents and school partners on student progress.",
    ],
    requirements: [
      "Bachelor's degree in Engineering, Science, Education or a related field.",
      "1+ years teaching, coaching or mentoring students (any age).",
      "Comfort with robotics kits, microcontrollers or coding basics.",
      "Excellent communication and classroom-management skills.",
    ],
    niceToHave: [
      "Experience with drones, 3D printing or space-science curricula.",
      "Arabic language skills.",
    ],
  },
  {
    id: "robotics-coach-abudhabi",
    title: "Robotics Coach",
    program: "Education & Training",
    location: "Abu Dhabi, UAE",
    disciplineGroup: "Instruction & Mentoring",
    discipline: "Robotics Coach",
    type: "Full-time",
    shortDescription:
      "Coach student teams through robotics builds and international competitions from concept to podium.",
    overview:
      "Lead student robotics teams from first build to competition day. You'll blend engineering know-how with mentorship to help young makers design, program and iterate real robots.",
    responsibilities: [
      "Coach student teams for national and international robotics competitions.",
      "Guide design, build, wiring and programming of competition robots.",
      "Run weekly practice sessions and design reviews.",
      "Track team milestones and readiness for events.",
    ],
    requirements: [
      "Degree in Mechatronics, Electrical/Mechanical Engineering or similar.",
      "Hands-on experience with robotics platforms (VEX, FIRST, Arduino, etc.).",
      "Prior coaching or team-lead experience preferred.",
    ],
    niceToHave: ["Competition judging or refereeing experience."],
  },
  {
    id: "drone-trainer-sharjah",
    title: "Drone Flight Trainer",
    program: "Education & Training",
    location: "Sharjah, UAE",
    disciplineGroup: "Instruction & Mentoring",
    discipline: "Drone Trainer",
    type: "Full-time",
    shortDescription:
      "Teach safe drone piloting, assembly and aerial-mission planning to students of all levels.",
    overview:
      "Introduce students to the world of unmanned flight — from building their first quadcopter to flying supervised aerial missions. Safety-first, mission-driven, and hands-on.",
    responsibilities: [
      "Teach drone assembly, flight control and safety procedures.",
      "Plan and supervise indoor and outdoor flight missions.",
      "Maintain the drone fleet and spare-parts inventory.",
    ],
    requirements: [
      "Experience piloting multi-rotor drones.",
      "Understanding of UAV safety and local flight regulations.",
      "Patience and a strong safety mindset when working with students.",
    ],
    niceToHave: ["Valid drone pilot certification.", "FPV experience."],
  },
  {
    id: "space-educator-dubai",
    title: "Space Science Educator",
    program: "Education & Training",
    location: "Dubai, UAE",
    disciplineGroup: "Instruction & Mentoring",
    discipline: "Space Science Educator",
    type: "Full-time",
    shortDescription:
      "Bring astronomy, rocketry and space missions to life for the next generation of explorers.",
    overview:
      "Spark wonder about the universe. You'll teach space science through models, simulations and experiments that make abstract concepts tangible and thrilling.",
    responsibilities: [
      "Deliver engaging space-science and astronomy sessions.",
      "Run rocketry, satellite and mission-design activities.",
      "Support students preparing for space olympiads and competitions.",
    ],
    requirements: [
      "Background in Physics, Astronomy, Aerospace or related field.",
      "Ability to explain complex ideas simply and vividly.",
    ],
    niceToHave: ["Experience with space-settlement design competitions."],
  },
  {
    id: "curriculum-developer",
    title: "Curriculum Developer",
    program: "Curriculum & Content",
    location: "Dubai, UAE",
    disciplineGroup: "Curriculum & Content",
    discipline: "Curriculum Developer",
    type: "Full-time",
    shortDescription:
      "Design age-progressive STEM curricula that map from beginner curiosity to advanced mastery.",
    overview:
      "Own the learning journey. You'll architect curricula across our programs, ensuring each level builds logically on the last and stays aligned with outcomes parents and schools care about.",
    responsibilities: [
      "Design and document curricula across programs and age bands.",
      "Define learning outcomes, assessments and progression paths.",
      "Collaborate with instructors to refine content from the field.",
    ],
    requirements: [
      "Experience in instructional/curriculum design for STEM.",
      "Strong writing and information-structuring skills.",
    ],
    niceToHave: ["Familiarity with UAE / international school standards."],
  },
  {
    id: "instructional-designer",
    title: "Instructional Designer",
    program: "Curriculum & Content",
    location: "Remote",
    disciplineGroup: "Curriculum & Content",
    discipline: "Instructional Designer",
    type: "Remote",
    shortDescription:
      "Turn curriculum into beautiful, interactive lesson experiences and facilitator guides.",
    overview:
      "Translate raw curriculum into polished, engaging learning experiences — slide decks, activity sheets, facilitator guides and interactive media.",
    responsibilities: [
      "Produce lesson decks, worksheets and facilitator guides.",
      "Storyboard interactive and multimedia learning content.",
      "Apply learning-science principles to maximise engagement.",
    ],
    requirements: [
      "Portfolio of instructional-design work.",
      "Proficiency with design/authoring tools.",
    ],
    niceToHave: ["Motion or interaction design skills."],
  },
  {
    id: "content-writer",
    title: "STEM Content Writer",
    program: "Curriculum & Content",
    location: "Remote",
    disciplineGroup: "Curriculum & Content",
    discipline: "Content Writer",
    type: "Remote",
    shortDescription:
      "Write clear, exciting learning content and stories about science, space and technology.",
    overview:
      "Make science irresistible on the page. You'll write lesson content, blog articles and student-facing materials that are accurate, clear and fun.",
    responsibilities: [
      "Write and edit lesson content and articles.",
      "Simplify technical topics for young learners.",
      "Maintain a consistent, engaging brand voice.",
    ],
    requirements: [
      "Strong writing samples on technical or educational topics.",
      "Excellent grasp of grammar and clarity.",
    ],
    niceToHave: ["STEM background."],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    program: "Technology",
    location: "Dubai, UAE",
    disciplineGroup: "Engineering & Technology",
    discipline: "Software Engineer",
    type: "Full-time",
    shortDescription:
      "Build the web platforms and learning tools that power Lab of Future's programs.",
    overview:
      "Engineer the digital backbone of Lab of Future — from our public websites to internal learning tools and student dashboards.",
    responsibilities: [
      "Build and maintain web applications and internal tools.",
      "Collaborate with design and content teams on new features.",
      "Write clean, tested, maintainable code.",
    ],
    requirements: [
      "Proficiency with modern JavaScript/React.",
      "Experience shipping and maintaining web apps.",
    ],
    niceToHave: ["Node/back-end experience.", "3D/WebGL experience."],
  },
  {
    id: "electronics-engineer",
    title: "Hardware & Electronics Engineer",
    program: "Technology",
    location: "Abu Dhabi, UAE",
    disciplineGroup: "Engineering & Technology",
    discipline: "Hardware & Electronics",
    type: "Full-time",
    shortDescription:
      "Prototype robotics, drone and IoT kits used across our student labs.",
    overview:
      "Design and prototype the hardware kits that students learn on — robotics boards, drone components and IoT devices built for durability and hands-on learning.",
    responsibilities: [
      "Design, prototype and test electronic kits and modules.",
      "Source components and manage the hardware BOM.",
      "Support instructors with hardware troubleshooting.",
    ],
    requirements: [
      "Degree in Electronics/Electrical Engineering.",
      "PCB design and embedded prototyping experience.",
    ],
    niceToHave: ["Experience designing education hardware."],
  },
  {
    id: "it-systems",
    title: "IT & Systems Administrator",
    program: "Technology",
    location: "Dubai, UAE",
    disciplineGroup: "Engineering & Technology",
    discipline: "IT & Systems",
    type: "Full-time",
    shortDescription:
      "Keep lab devices, networks and systems running smoothly across all centres.",
    overview:
      "Own the technology that keeps our labs online — devices, networks, accounts and systems across every Lab of Future centre.",
    responsibilities: [
      "Administer devices, networks and user accounts.",
      "Provide IT support to lab teams and staff.",
      "Maintain security and backup practices.",
    ],
    requirements: [
      "Experience in IT administration and support.",
      "Networking and endpoint-management knowledge.",
    ],
    niceToHave: ["Relevant IT certifications."],
  },
  {
    id: "program-manager",
    title: "Program Manager",
    program: "Operations",
    location: "Dubai, UAE",
    disciplineGroup: "Business & Operations",
    discipline: "Program Manager",
    type: "Full-time",
    shortDescription:
      "Own delivery of school partnerships and program rollouts end to end.",
    overview:
      "Drive flawless delivery of our programs across partner schools — planning schedules, coordinating instructors and keeping stakeholders delighted.",
    responsibilities: [
      "Plan and manage program rollouts across partner schools.",
      "Coordinate instructors, schedules and resources.",
      "Report on delivery metrics and partner satisfaction.",
    ],
    requirements: [
      "Project/program management experience.",
      "Strong organisation and stakeholder-management skills.",
    ],
    niceToHave: ["Experience in education or events."],
  },
  {
    id: "operations-coordinator",
    title: "Operations Coordinator",
    program: "Operations",
    location: "Sharjah, UAE",
    disciplineGroup: "Business & Operations",
    discipline: "Operations Coordinator",
    type: "Full-time",
    shortDescription:
      "Keep day-to-day lab operations, logistics and scheduling running like clockwork.",
    overview:
      "Be the operational engine behind our labs — handling scheduling, logistics, inventory and the hundred details that keep sessions running on time.",
    responsibilities: [
      "Coordinate schedules, logistics and inventory.",
      "Support instructors and centre managers day to day.",
      "Improve operational processes.",
    ],
    requirements: [
      "Operations or coordination experience.",
      "Detail-oriented and dependable.",
    ],
    niceToHave: ["Experience with scheduling tools."],
  },
  {
    id: "partnerships-lead",
    title: "Partnerships Lead",
    program: "Operations",
    location: "Dubai, UAE",
    disciplineGroup: "Business & Operations",
    discipline: "Partnerships",
    type: "Full-time",
    shortDescription:
      "Grow relationships with schools, universities and industry partners across the region.",
    overview:
      "Open doors and build lasting relationships with schools, universities and industry partners who share our mission to inspire future innovators.",
    responsibilities: [
      "Develop and manage school and industry partnerships.",
      "Pitch programs and negotiate agreements.",
      "Represent Lab of Future at events and forums.",
    ],
    requirements: [
      "Business development or partnerships experience.",
      "Excellent relationship-building and presentation skills.",
    ],
    niceToHave: ["Existing network in education."],
  },
  {
    id: "marketing-comms",
    title: "Marketing & Communications Specialist",
    program: "Corporate",
    location: "Dubai, UAE",
    disciplineGroup: "Corporate",
    discipline: "Marketing & Communications",
    type: "Full-time",
    shortDescription:
      "Tell the Lab of Future story across campaigns, social media and events.",
    overview:
      "Shape how the world hears about Lab of Future — across social, campaigns, PR and events that grow our community of curious minds.",
    responsibilities: [
      "Plan and run marketing campaigns and social content.",
      "Manage brand voice across channels.",
      "Support event promotion and community growth.",
    ],
    requirements: [
      "Marketing or communications experience.",
      "Strong copy and content-creation skills.",
    ],
    niceToHave: ["Design or video-editing skills."],
  },
  {
    id: "finance-accountant",
    title: "Finance & Accounting Associate",
    program: "Corporate",
    location: "Dubai, UAE",
    disciplineGroup: "Corporate",
    discipline: "Finance & Accounting",
    type: "Full-time",
    shortDescription:
      "Manage day-to-day finance, invoicing and reporting for a fast-growing ed-tech company.",
    overview:
      "Keep our finances healthy and transparent — handling bookkeeping, invoicing, payroll support and reporting as we scale.",
    responsibilities: [
      "Maintain accounts, invoicing and reconciliations.",
      "Support payroll, budgeting and reporting.",
      "Ensure compliance with financial processes.",
    ],
    requirements: [
      "Accounting/finance qualification or experience.",
      "Proficiency with accounting software.",
    ],
    niceToHave: ["Experience in the UAE market."],
  },
  {
    id: "hr-generalist",
    title: "Human Resources Generalist",
    program: "Corporate",
    location: "Dubai, UAE",
    disciplineGroup: "Corporate",
    discipline: "Human Resources",
    type: "Full-time",
    shortDescription:
      "Support hiring, onboarding and people operations across our growing team.",
    overview:
      "Help us find and grow great people. You'll support recruiting, onboarding and the everyday people operations that make Lab of Future a great place to work.",
    responsibilities: [
      "Coordinate recruiting and onboarding.",
      "Maintain HR records and support people operations.",
      "Help build a positive team culture.",
    ],
    requirements: [
      "HR or people-operations experience.",
      "Discretion and strong interpersonal skills.",
    ],
    niceToHave: ["UAE labour-law knowledge."],
  },
];

// ---- Derived filter option lists -----------------------------------

const unique = (arr) => [...new Set(arr)];

export const programOptions = unique(careers.map((c) => c.program)).sort();

export const locationOptions = unique(careers.map((c) => c.location)).sort();

// Discipline tree: { group: [discipline, …] }
export const disciplineGroups = careers.reduce((acc, c) => {
  if (!acc[c.disciplineGroup]) acc[c.disciplineGroup] = new Set();
  acc[c.disciplineGroup].add(c.discipline);
  return acc;
}, {});

// Normalise the Sets to sorted arrays for rendering.
export const disciplineTree = Object.fromEntries(
  Object.entries(disciplineGroups).map(([group, set]) => [
    group,
    [...set].sort(),
  ]),
);
