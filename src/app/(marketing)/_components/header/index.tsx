import { LogoWithName } from "@/components/logos";

import Auth from "./auth";
import MobileNav from "./mobile-nav";
import NavigationMenus from "./nav";

const Header = async () => {
  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 w-full border-b border-border/40 bg-background/95 backdrop-blur transition-all supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center justify-between">
            <LogoWithName />
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
