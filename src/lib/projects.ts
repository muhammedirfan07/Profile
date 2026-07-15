export type Project = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  tags: string[];
  overview: string;
  features: string[];
  tech: string[];
  codeUrl?: string;
  demoUrl?: string;
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
      "Real-time charging station approvals & notifications via Socket.io.",
      "Interactive station search and filters based on location, charging type and vehicle type.",
      "Secure booking and payment system integrated with Stripe Checkout.",
      "Auto-generated station IDs and real-time slot availability tracking.",
      "Unread notification counter and real-time badge updates.",
      "User authentication and profile management.",
    ],
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io", "Chart.js", "JWT"],
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
      "Only authorized users can view or manage projects using secure JWT login.",
      "RESTful backend to manage tasks/projects, stored in MongoDB for easy scalability.",
      "Customizable workflows and task statuses.",
      "Cleanly showcases all tasks and projects with status.",
    ],
    tech: ["React", "Bootstrap", "MongoDB", "Express", "Node.js"],
  },
];

export const uiWork = [
  {
    title: "Modern Dashboards",
    desc: "A dashboard-style UI inspired by modern admin interfaces. Focused on visual clarity, chart integration and responsive grid layouts.",
  },
  {
    title: "Coffee Website",
    desc: "A visually rich landing page for a coffee brand. Designed with elegant typography, parallax scrolling and modern aesthetic.",
  },
];

export const skills = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "TypeScript"],
  Backend: ["Node.js", "Express", "REST APIs", "Socket.io", "JWT"],
  Database: ["MongoDB", "MySQL", "Firebase"],
  Tools: ["Git", "GitHub", "Figma", "Postman", "Vercel"],
};