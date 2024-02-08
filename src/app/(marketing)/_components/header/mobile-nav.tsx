"use client";

import { useConvexAuth } from "convex/react";
import { MenuIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AuthenticatedLinks from "../links/authenticated-links";
import GeneralLinks from "../links/general-links";
import LoadingSkeleton from "../links/loading";

const SheetList = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isAuthenticated) {
    return <AuthenticatedLinks />;
  }

  return <GeneralLinks />;
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex lg:hidden">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Smartnote.</SheetTitle>
        </SheetHeader>
        <SheetList />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
