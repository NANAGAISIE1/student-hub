import { absoluteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "SmartNote Hub",
  url: absoluteUrl("/"),
  ogImage: ["/public/icons/logo-light.svg", "public/logo-dark.svg"],
  description:
    "SmartNote Hub: Your Intelligent Learning and Note-Taking Platform! Centralize your course materials, take smart notes, and enhance your learning experience. SmartNote Hub is your dedicated space for organized learning, AI-powered quizzes, and efficient timetable management. Elevate your education with seamless organization and personalized learning paths. Get ready to turn your notes into knowledge with SmartNote Hub – Where Every Note Sparks Intelligence!",
  image: {
    lightsvg: "/icons/logo-light.svg",
    darksvg: "/icons/logo-dark.svg",
    lightpng: "/images/logo-light.png",
    darkpng: "/images/logo-dark.png",
  },
  links: {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    noIndex: false,
    metadataBase: absoluteUrl("/"),
  },
  keywords: [
    "Note-Taking Platform",
    "Learning Hub",
    "AI-Powered Quizzes",
    "Timetable Management",
    "Educational Platform",
    "Organized Learning",
    "Centralized Notes",
    "Smart Learning",
    "Personalized Learning Paths",
    "Efficient Education",
    "Intelligent Note-Taking",
    "Educational Tools",
    "Study Resources",
    "Learning Intelligence",
    "SmartNote Hub",
    "Educational Technology",
    "Study Platform",
    "Digital Learning",
    "Knowledge Organization",
    "Efficient Note-Taking",
  ],
};

export type SiteConfig = typeof siteConfig;
