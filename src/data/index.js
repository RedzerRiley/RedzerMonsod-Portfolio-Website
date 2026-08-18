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
    video: "rentcheck.mp4",
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
    video: "sk-esperanzailaya.mp4",
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
    video: "oratio.mp4",
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
    {
    id: 5,
    title: "Alumna AI - KPMG Philippines Academic Innovation Challenge",
    image: "alumna-ai.png",
    video: "alumna-ai.mp4",
    subtitle: "AI-Powered Study Planning Assistant",
    context: "KPMG Philippines Academic Innovation Challenge",
    
    link: "https://canva.link/0cgaxlg1mrpb95q",
    repo: null,
    description:
      "An AI-powered study planning assistant designed to help students organize academic tasks through intelligent scheduling, automated reminders, and a centralized dashboard.",
    highlights: [
      "Designed an AI-powered study planning assistant using Microsoft Copilot Studio",
      "Built Power Automate workflows for dynamic task scheduling and automated reminders",
      "Developed a centralized Power Apps dashboard for managing academic tasks",
      "Collaborated with a multidisciplinary team during the KPMG Philippines Academic Innovation Challenge",
    ],
    stack: [
      "Microsoft Copilot Studio",
      "Power Automate",
      "Power Apps",
      "AI",
    ],
    color: "#f59e0b",
    accent: "#fcd34d",
  },

  {
    id: 6,
    title: "Unified Internship Workflow Management Platform",
    image: "internship-workflow.png",
    video: "internship-workflow.mp4",
    subtitle: "Internship Workflow & Management Platform",
    context: "Pru Life UK - Black Orcas Summit Life Agency",
    
    link: null,
    repo: null,
    description:
      "A proposed internship workflow management platform designed to centralize attendance, tasks, communication, and internship coordination into a unified system.",
    highlights: [
      "Designed the system architecture for an integrated internship workflow platform",
      "Planned attendance, task management, and communication workflows",
      "Proposed a React, Express.js, MongoDB, and JWT-based application architecture",
      "Planned Google Workspace integrations to streamline internship workflows",
      "Designed role-based access control for different platform users",
    ],
    stack: [
      "React",
      "Express.js",
      "MongoDB",
      "JWT",
      "Google Workspace",
      "RBAC",
    ],
    color: "#14b8a6",
    accent: "#5eead4",
  },
];

// ── Experience ────────────────────────────────────────────────
export const experience = [
  {
    id: 1,
    role: "Software Engineer Intern",
    image: "cloudswyft.png",
    logo: "cloudswyft-logo.png",
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

 {
  id: 2,
  role: "Fullstack Developer Head Intern",
  image: "internship-workflow.png",
  logo: "pru-life-logo.jpg",
  company: "Pru Life UK - Black Orcas Summit Life Insurance Agency",
  location: "Philippines",
  period: "April 2026 - Aug 2026",
  type: "Internship",
  bullets: [
    "Developed full-stack features for an internal Daily Time Record (DTR) platform using React, Express, and MongoDB.",
    "Built Docker-based development environments, improving project setup efficiency by ~40%.",
    "Delivered 21 production features across the platform while maintaining structured Git workflows.",
    "Performed 20 code reviews, helping maintain code quality and consistency across the development team.",
    "Promoted to Head Intern, onboarding and mentoring new interns while coordinating development activities.",
    "Led quality assurance (QA) testing and coordinated deployment of the internal DTR platform.",
  ],
  stack: [
    "React",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "Docker",
    "Git",
    "GitHub",
    "REST APIs",
    "QA Testing",
    "CI/CD"
  ],
  color: "#10b981",
},

{
  id: 3,
  role: "Cybersecurity Intern",
  image: "cybersecurity-internship.png",
  logo: "kpmg-logo.png",
  company: "KPMG Philippines",
  location: "Philippines",
  period: "Aug 2026 - Present",
  type: "Internship",
  bullets: [
    "Assisted in cybersecurity assessments and audits, contributing to the identification of potential vulnerabilities.",
    "Collaborated with the cybersecurity team to implement security measures and best practices.",
    "Participated in training sessions and workshops to enhance knowledge of cybersecurity protocols and tools.",
  ],
  stack: [
    "Cybersecurity",
    "Security Audits",  
  ],

  color: "#10b981",
}
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