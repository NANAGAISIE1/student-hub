import Link from "next/link";

import { Icons } from "@/components/icons";

import Auth from "./auth";
import MobileNav from "./mobile-nav";
import NavigationMenus from "./nav";

const Header = async () => {
  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-border/40 bg-background/95 backdrop-blur transition-all supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 font-semibold text-primary"
            >
              <Icons.logo className="fill-primary text-primary" />
              <span>Smartnote.</span>
            </Link>
            <NavigationMenus className="hidden lg:flex" />
          </div>

          <MobileNav />
          <Auth />
        </div>
      </div>
    </header>
  );
};

export default Header;
