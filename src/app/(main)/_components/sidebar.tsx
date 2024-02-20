"use client";
import { useAnimationControls } from "framer-motion";
import {
  Calendar,
  LayoutDashboard,
  MoreHorizontal,
  Settings,
} from "lucide-react";
import { useEffect } from "react";

import { SearchCommand } from "@/components/search-command";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/store/side-bar";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  if (isDesktop)
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontal className={"w-8 min-w-8"} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="flex flex-col justify-evenly pt-12"
          >
            <div className="flex flex-col gap-3">
              <SearchCommand isCollapsed />
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
          </SheetContent>
        </Sheet>
      </>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal className={"w-8 min-w-8"} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="flex min-h-[50vh] w-full flex-col items-center justify-between pb-10">
        <div className="flex w-full flex-col gap-3">
          {/* <SearchCommand /> */}
          <NavigationLink name="Setting" href="/settings">
            <Settings className="w-8 min-w-8" />
          </NavigationLink>
        </div>
        <div className="flex w-full flex-col gap-3">
          <NavigationLink name="Dashboard" href="/dashboard">
            <LayoutDashboard className="w-8 min-w-8" />
          </NavigationLink>
          <NavigationLink name="Timetable" href="/timetable">
            <Calendar className="w-8 min-w-8" />
          </NavigationLink>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
