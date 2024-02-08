"use client";
import { IconSun } from "@tabler/icons-react";
import { IconMoon } from "@tabler/icons-react";
import { IconDeviceDesktop } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size={"icon"}
        onClick={() => setTheme("light")}
      >
        <IconSun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
      >
        <IconMoon className="h-[1.2rem] w-[1.2rem] " />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("system")}
      >
        <IconDeviceDesktop className="h-[1.2rem] w-[1.2rem] " />
        <span className="sr-only">System theme</span>
      </Button>
    </>
  );
}
