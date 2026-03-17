// ── Skills ────────────────────────────────────────────────────
export const skills = [
  { name: "React",       icon: "⚛️",  level: 90, color: "#61DAFB", category: "Frontend" },
  { name: "TypeScript",  icon: "🟦",  level: 80, color: "#3178C6", category: "Frontend" },
  { name: "JavaScript",  icon: "🟨",  level: 88, color: "#F7DF1E", category: "Frontend" },
  { name: "Tailwind CSS",icon: "🎨",  level: 90, color: "#38BDF8", category: "Frontend" },
  { name: "Vite",        icon: "⚡",  level: 80, color: "#646CFF", category: "Frontend" },
  { name: "Django",      icon: "🐍",  level: 75, color: "#41b883", category: "Backend"  },
  { name: "PHP",         icon: "🐘",  level: 72, color: "#777BB4", category: "Backend"  },
  { name: "REST APIs",   icon: "🔌",  level: 82, color: "#6EE7B7", category: "Backend"  },
  { name: "Firebase",    icon: "🔥",  level: 80, color: "#FFCA28", category: "Cloud"    },
  { name: "MySQL",       icon: "🗄️",  level: 78, color: "#4479A1", category: "Database" },
  { name: "PostgreSQL",  icon: "🐘",  level: 70, color: "#336791", category: "Database" },
  { name: "GitHub",      icon: "🐙",  level: 85, color: "#e2e8f0", category: "DevOps"   },
  { name: "Docker",      icon: "🐳",  level: 68, color: "#2496ED", category: "DevOps"   },
  { name: "Open edX",    icon: "📚",  level: 72, color: "#E5A823", category: "Platform" },
];

// ── Projects ──────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "RentCheck",
    image: "rentcheck.png",
    subtitle: "Rental Management System",
    context: "Software Engineering 1",
    link: "https://rentcheck-6a7ec.web.app/",
    description:
      "A full-stack web application for managing rental payments and tenant data. Built with a responsive React + TypeScript frontend, automated CI/CD pipeline, and Firebase backend with secure authentication.",
    highlights: [
      "99% uptime with Firebase deployment",
      "~40% efficiency gain over manual tracking",
      "~70% reduction in deployment time via CI/CD",
      "Secure authentication & CRUD operations",
    ],
    stack: ["React", "TypeScript", "Vite", "Firebase"],
    color: "#6366f1",
    accent: "#a5b4fc",
  },
  {
    id: 2,
    title: "SK Barangay Portal",
    image: "sk-esperanzailaya.png",
    subtitle: "CRUD Web App for SK Barangay Esperanza Ilaya",
    context: "Web Systems 2",
    link: "https://sk-esperanzailaya.up.railway.app/index.php",
    description:
      "A web-based system to digitize barangay records, announcements, and administrative processes for the local government unit.",
    highlights: [
      "Full CRUD operations for efficient data management",
      "Docker Compose for streamlined dev workflow",
      "Deployed on Railway for scalable hosting",
      "PHP + MySQL backend integration",
    ],
    stack: ["PHP", "MySQL", "Railway", "Docker"],
    color: "#0ea5e9",
    accent: "#7dd3fc",
  },
];

// ── Experience ────────────────────────────────────────────────
export const experience = [
  {
    id: 1,
    role: "Software Engineering Intern",
    image: "cloudswyft.png",
    company: "Cloudswyft",
    location: "Philippines",
    period: "Dec 2025 – Mar 2026",
    type: "Internship",
    bullets: [
      "Debugged and resolved issues in the Open edX platform supporting the ICEI high school curriculum, reducing recurring errors by ~20–30%.",
      "Worked with Micro-Frontend (MFE) architecture, supporting modules such as authentication, learner dashboard, and course interfaces.",
      "Designed the base Entity-Relationship Diagram (ERD), improving database structure and system data flow.",
      "Collaborated using version control and structured workflows, contributing to efficient feature development and integration.",
      "Applied sprint/agile methodologies, ensuring timely delivery of development tasks.",
      "Strengthened debugging and testing processes, reducing issue resolution time by ~25%.",
    ],
    stack: ["React", "Tailwind CSS", "Django", "Open edX (MFE)", "GitHub", "REST APIs", "MySQL", "PostgreSQL", "WSL2", "Docker", "MongoDB"],
    color: "#10b981",
  },
];

// ── Education ─────────────────────────────────────────────────
export const education = [
  {
    school: "Mapúa University",
    course: "BS Computer Science",
    location: "Makati City",
    period: "2024 – Present",
    active: true,
    icon: "🖥️",
  },
  {
    school: "Mapúa University",
    course: "BS Physics",
    location: "Makati City",
    period: "2023 – 2024",
    active: false,
    icon: "⚛️",
  },
];