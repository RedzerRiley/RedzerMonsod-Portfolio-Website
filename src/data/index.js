// ── Skills ────────────────────────────────────────────────────
export const skills = [
  { name: "React",          icon: "react",        color: "#61DAFB", category: "Frontend" },
  { name: "TypeScript",     icon: "typescript",   color: "#3178C6", category: "Frontend" },
  { name: "JavaScript",     icon: "javascript",   color: "#F7DF1E", category: "Frontend" },
  { name: "Tailwind CSS",   icon: "tailwindcss",  color: "#38BDF8", category: "Frontend" },
  { name: "Vite",           icon: "vite",         color: "#646CFF", category: "Frontend" },
  { name: "HTML",           icon: "html5",        color: "#E34F26", category: "Frontend" },
  { name: "CSS",            icon: "css3",         color: "#1572B6", category: "Frontend" },
  { name: "Django",         icon: "django",       color: "#092E20", category: "Backend"  },
  { name: "PHP",            icon: "php",          color: "#777BB4", category: "Backend"  },
  { name: "Python",         icon: "python",       color: "#3776AB", category: "Backend"  },
  { name: "C++",            icon: "cplusplus",    color: "#00599C", category: "Backend"  },
  { name: "C",              icon: "c",            color: "#A8B9CC", category: "Backend"  },
  { name: "Java",           icon: "java",         color: "#007396", category: "Backend"  },
  { name: "REST APIs",      icon: "fastapi",      color: "#009688", category: "Backend"  },
  { name: "Firebase",       icon: "firebase",     color: "#FFCA28", category: "Cloud"    },
  { name: "AWS",            icon: "amazonaws",    color: "#FF9900", category: "Cloud"    },
  { name: "MySQL",          icon: "mysql",        color: "#4479A1", category: "Database" },
  { name: "PostgreSQL",     icon: "postgresql",   color: "#336791", category: "Database" },
  { name: "MongoDB",        icon: "mongodb",      color: "#47A248", category: "Database" },
  { name: "GitHub",         icon: "github",       color: "#e2e8f0", category: "DevOps"   },
  { name: "Docker",         icon: "docker",       color: "#2496ED", category: "DevOps"   },
  { name: "Ubuntu",         icon: "ubuntu",       color: "#E95420", category: "DevOps"   },
  { name: "Kubernetes",     icon: "kubernetes",   color: "#326CE5", category: "DevOps"   },
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
    repo: "https://github.com/RedzerRiley/RentCheck", // ← add your repo URL here
    description:
      "A full-stack web application for managing rental payments and tenant data. Built with a responsive React + TypeScript frontend, automated CI/CD pipeline, and Firebase backend with secure authentication.",
    highlights: [
      "99% uptime with Firebase deployment",
      "~40% efficiency gain over manual tracking",
      "~70% reduction in deployment time via CI/CD",
      "Secure authentication & CRUD operations",
    ],
    stack: ["React", "TypeScript", "Vite", "Firebase", "Figma"],
    color: "#6366f1",
    accent: "#a5b4fc",
  },
  {
    id: 2,
    title: "SK Barangay Esperanza Ilaya Web Page",
    image: "sk-esperanzailaya.png",
    subtitle: "CRUD Web Page for SK Barangay Esperanza Ilaya",
    context: "Web Systems 2",
    link: "https://sk-esperanzailaya.up.railway.app/index.php",
    repo: "https://github.com/RedzerRiley/CRUD-Web-Page-for-SK-Brgy-Esperanza-Ilaya", // ← add your repo URL here
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
  {
    id: 3,
    title: "Huawei ICT Competition 2025 Networking Track",
    image: "huawei-ict.png",
    subtitle: "Participant in Huawei's annual ICT competition in the Networking Track",
    context: "Huawei ICT Competition 2025",
    link: null,
    repo: null, // no repo for this one
    description:
      "Participated in Huawei's annual ICT competition, showcasing skills in networking and cloud technologies.",
    highlights: [
      "Gained hands-on experience with Huawei Networking services",
      "Collaborated with a team to solve complex networking challenges",
      "Enhanced understanding of cloud infrastructure and network management",
    ],
    stack: ["Huawei Networking", "Networking", "Network Infrastructure"],
    color: "#ff6f61",
    accent: "#ff9b8a",
  },
  {
    id: 4,
    title: "Oratio - A Catholic Companion Prayer App",
    image: "oratio.png",
    subtitle: "A mobile app for Catholic prayer and devotion",
    context: "Personal Project",
    link: "https://oratio-317ac.web.app/auth",
    repo: "https://github.com/RedzerRiley/Oratio-Catholic-Prayer-and-Journal-App", // ← add your repo URL here
    description:
      "A mobile app designed to provide a comprehensive prayer experience for Catholics, featuring a variety of prayers, devotionals, and spiritual resources.",
    highlights: [
      "Curated a wide range of Catholic prayers and devotionals",
      "Implemented a user-friendly interface for easy navigation",
      "Deployed on Firebase for reliable access",
    ],
    stack: ["React", "Firebase", "Typescript", "Tailwind CSS", "Mobile Development"],
    color: "#8b5cf6",
    accent: "#c4b5fd",
  },
];

// ── Experience ────────────────────────────────────────────────
export const experience = [
  {
    id: 1,
    role: "Software Developer Intern",
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
    stack: ["React", "Tailwind CSS", "Django", "OpenedX", "GitHub", "REST APIs", "MySQL", "PostgreSQL", "WSL2 (Ubuntu)", "Docker", "MongoDB", "Tutor"],
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