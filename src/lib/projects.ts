export type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  tags: string[];
  overview: string;
  features: string[];
  tech: string[];
    github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    slug: "voltspot",
    title: "VoltSpot",
    category: "Energy Monitoring",
    tagline:
      "An innovative platform to streamline EV charging station bookings with two core modules — User, Partner and Admin. Built with React, Node.js and MongoDB with real-time data visualization.",
    tags: ["React", "Node.js", "MongoDB", "JavaScript"],
    overview:
      "VoltSpot is a smart, user-friendly EV Charging Station Booking Platform designed to simplify the process of locating, booking and managing EV charging stations. It connects users with verified charging stations based on their location, vehicle type and charging needs.",
    features: [
  "Role-based platform with three portals — User, Partner, and Admin — each with tailored dashboards and permissions.",
  "Full authentication suite: email/password, Google OAuth, and Gmail OTP verification with JWT-secured sessions.",
  "Real-time station approval workflow via Socket.io — partners get instant notifications when admins approve or reject a station.",
  "Secure booking and payments via Stripe Checkout, including webhook-driven refund and wallet-credit handling.",
  "Partner analytics dashboard with Recharts visualizations (booking trends, revenue, and rating breakdowns).",
  "Interactive station discovery with location, charging type, and vehicle-type filters, plus live slot availability.",
  "Admin panel with a dual-layout (table/card) station management view, approve/reject actions, and search/filter tools.",
  "Dark/light theme system built on CSS variable tokens, with a flicker-free load and instant toggle.",
],
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io", "Chart.js", "JWT","Firebase","Tailwind"],
    github: "https://github.com/muhammedirfan07/Voltspot_Backend.git",
    demo: "https://votsport-forontend.vercel.app/",
  },
  {
    slug: "chatdot",
    title: "ChatDot",
    category: "Online Chat Application",
    tagline:
      "A real-time chat application enabling instant messaging, user presence tracking, and dynamic updates for active users.",
    tags: ["JavaScript", "React", "Tailwind", "Socket.io"],
    overview:
      "ChatDot is a modern, real-time chat application built for seamless user communication. It supports live messaging between multiple users with online presence and instant delivery — ideal for team chats, peer-to-peer messaging and scalable real-time tools.",
    features: [
      "Event-driven architecture for smooth, scalable real-time communication.",
      "Multiple users send and receive messages simultaneously via Socket.io.",
      "Live online users list that updates automatically on join/leave.",
      "Node.js + Express backend handling WebSocket connections and auth.",
      "Mobile-responsive design.",
    ],
    tech: ["React", "Node.js", "Socket.io", "Express", "Tailwind CSS", "HTML"],
    github: "https://github.com/muhammedirfan07/ChatDot",
    demo: "https://chat-dot-ochre.vercel.app/",
  },
  {
    slug: "taskflow",
    title: "TaskFlow",
    category: "Productivity",
    tagline:
      "A collaborative task management application with real-time updates, customizable workflows and detailed tracking to boost team productivity.",
    tags: ["React", "MongoDB", "JavaScript", "Bootstrap"],
    overview:
      "TaskFlow is a simple and effective task and project management system that lets users organize, view and track tasks and projects. It showcases ongoing and completed work with controlled access for authorized users.",
    features: [
  "Secure JWT-based authentication restricting project access to authorized team members only.",
  "RESTful API backend with MongoDB persistence for scalable task and project management.",
  "Customizable task workflows with status tracking ",
  "Dashboard view summarizing ongoing and completed projects at a glance.",
  "Responsive UI built with Bootstrap for consistent use across devices.",
],
    tech: ["React", "Bootstrap", "MongoDB", "Express", "Node.js"],
    github: "https://github.com/muhammedirfan07/task-flow",
    demo: "https://github.com/muhammedirfan07/task-flow",
  },
];

export const uiWork = [
  {
    title: "Modern Dashboards",
    desc: "A dashboard-style UI inspired by modern admin interfaces. Focused on visual clarity, chart integration and responsive grid layouts.",
    github: "https://github.com/muhammedirfan07/Dashboard",
    demo: "https://dashboard-blond-two.vercel.app/",
  },
  {
    title: "Coffee Website",
    desc: "A visually rich landing page for a coffee brand. Designed with elegant typography, parallax scrolling and modern aesthetic.",
    github: "https://github.com/muhammedirfan07/coffee-website",
    demo: "https://coffee-website-bay.vercel.app/",
  },
  {
    title: "Spotify Clone",
    desc: "A music streaming UI clone focused on player controls, playlist layout and dark-themed media components.",
    github: "https://github.com/muhammedirfan07/spotify-clone",
    demo: "https://muhammedirfan07.github.io/spotify-clone/",
  },
];

export const skills = {
  "Frontend & Backend": [
    "React.js", "Next.js", "JavaScript", "TypeScript",
    "Tailwind CSS", "Bootstrap", "Node.js", "Express",
    "REST APIs", "Socket.io", "JWT",
  ],
  "Libraries & Tools": [
    "MongoDB", "MySQL", "Firebase",
    "Git", "GitHub", "Figma", "Postman",
  ],
  "Payment & Deployment": [
    "Stripe", "Razorpay", "Vercel", "Render", "Netlify", "Docker",
  ],
};

export const journey: {
  period: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
}[] = [
  {
    period: "Aug 2024 — Present",
    title: "MERN Stack Developer Intern",
    org: "Luminar Technolab",
    description:
      "Working on full-stack web applications using the MERN stack. Responsible for developing responsive UIs, implementing RESTful APIs, and integrating with MongoDB databases.",
    tags: ["React.js", "Node.js", "MongoDB", "Express"],
  },
  {
    period: "2021 — 2024",
    title: "Bachelor of Computer Science",
    org: "Kannur University",
    description:
      "Graduated with honors. Specialized in web development and software engineering.",
    tags: ["CS", "Web Dev"],
  },
];