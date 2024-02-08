import { Icons } from "@/components/icons";

export type Feature = {
  title: string;
  excerpt: string;
  description: string;
  icon: JSX.Element;
  image: string;
  className: string;
};

export const features: Feature[] = [
  {
    title: "AI Assistance",
    excerpt: "Ask Anything, Learn Everything",
    description:
      "SmartNote Hub's AI is your intelligent companion, ready to assist you with any questions. From understanding complex concepts to creating personalized quizzes tailored to your learning style, our AI is here to enhance your educational journey.",
    icon: Icons.star,
    image: "/images/placeholder.png",
    className: "md:col-span-1",
  },
  {
    title: "Centralized Storage",
    excerpt: "All Slides and Files, One Central Hub",
    description:
      "Experience the convenience of having all your course materials in a single, organized space. SmartNote Hub centralizes your slides and files, making it effortless to find, access, and manage your learning resources with ease.",
    icon: Icons.storage,
    image: "/images/placeholder.png",
    className: "md:col-span-1",
  },
  {
    title: "Timetable Creation",
    excerpt: "Never Miss a Beat: Your Personal and School Timetable",
    description:
      "Stay on top of your schedule with SmartNote Hub's intuitive timetable creation feature. Whether it's lectures or study sessions, plan your days efficiently to ensure you never miss an important moment in your educational journey.",
    icon: Icons.calendar,
    image: "/images/placeholder.png",
    className: "md:col-span-1",
  },
  {
    title: "Collaborative Note-Sharing",
    excerpt: "Connect, Collaborate, Learn Together",
    description:
      "Share the wealth of knowledge with fellow SmartNote users. Create, share, and collaborate on courses and notes effortlessly within our community. SmartNotes fosters a collaborative environment where learning becomes a shared experience.",
    icon: Icons.star,
    image: "/images/placeholder.png",
    className: "md:col-span-2",
  },
  {
    title: "Global Repository Access",
    excerpt: "Explore Knowledge Beyond Borders",
    description:
      "Unlock a world of learning materials with SmartNote Hub's global repository. Access slides and learning materials from different universities worldwide, expanding your educational horizons and enriching your understanding of diverse subjects.",
    icon: Icons.star,
    image: "/images/placeholder.png",
    className: "md:col-span-1",
  },
];

export const featureByIndex = (index: number) =>
  features[index % features.length];
