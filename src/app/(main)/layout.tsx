"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/ui/spinner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/auth?prompt=login");
  }

  return (
    <div className="flex h-screen">
      {/* <Navigation /> */}
      <main className="h-full flex-1 overflow-y-auto">
        {/* <SearchCommand /> */}

        {children}
      </main>
    </div>
  );
};

export default MainLayout;
