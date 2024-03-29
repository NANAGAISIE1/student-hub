"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationLinks } from "@/constants/navigation-links";
import { cn } from "@/lib/utils";

type Props = {
  className: string;
};

const NormalSubmenu = ({ href, label }: { href: string; label: string }) => {
  return (
    <li className="w-full rounded-lg p-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
      <NavigationMenuLink asChild>
        <Link href={href}>{label}</Link>
      </NavigationMenuLink>
    </li>
  );
};

const NavigationMenus = ({ className }: Props) => {
  const pathname = usePathname();
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border-0 bg-transparent text-base">
            Download
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="m-0 flex list-none flex-col justify-start gap-2 p-6 md:w-[200px] lg:w-[300px]">
              <li>
                <NormalSubmenu href="/docs" label="IOS & Android" />
              </li>
              <li>
                <NormalSubmenu href="/docs" label="Mac & Windows" />
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <p className="p-leading">
                    SmartNote is always at home right{" "}
                    <Link
                      href={"/spaces"}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      in your browser
                    </Link>
                  </p>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navigationLinks
          .filter((nav) => nav.title !== "Dashboard")
          .map((nav) => (
            <NavigationMenuItem key={nav.href}>
              <Link href={nav.href} passHref legacyBehavior>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === nav.href &&
                      "bg-secondary text-secondary-foreground",
                  )}
                >
                  {nav.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenus;
