"use client";
import { useAnimationControls } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useEffect } from "react";

import { SearchCommand } from "@/components/search-command";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/store/side-bar";
import { cn } from "@/lib/utils";

import NavigationLink from "./navigation-link";

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const Sidebar = () => {
  const isOpen = useSidebar((state) => state.isOpen);
  const setIsOpen = useSidebar((state) => state.setIsOpen);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen, containerControls, svgControls]);

  const handleOpenClose = () => {
    setIsOpen();
  };

  return (
    <motion.nav
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className="fixed left-0 top-0 z-10 flex h-full flex-col gap-20 bg-neutral-900 p-5 shadow shadow-neutral-600"
    >
      <div className={cn("flex w-full place-items-center justify-end")}>
        <Button onClick={() => handleOpenClose()} size={"icon"}>
          {isOpen ? <ArrowLeft /> : <ArrowRight />}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <SearchCommand />
        <NavigationLink name="Setting" href="/settings">
          <Settings className="w-8 min-w-8" />
        </NavigationLink>
      </div>
      <div className="flex flex-col gap-3">
        <NavigationLink name="Dashboard" href="/dashboard">
          <LayoutDashboard className="w-8 min-w-8" />
        </NavigationLink>
        <NavigationLink name="Timetable" href="/timetable">
          <Calendar className="w-8 min-w-8" />
        </NavigationLink>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
