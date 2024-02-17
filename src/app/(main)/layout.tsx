"use client";

import { useConvexAuth } from "convex/react";

import { Spinner } from "@/components/ui/spinner";

import Sidebar from "./_components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <main className="relative flex h-screen w-full flex-row">
      <Sidebar />
      <section className="ml-20 flex w-full flex-col gap-5 p-10">
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
