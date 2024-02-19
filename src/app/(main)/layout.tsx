"use client";

import { useConvexAuth } from "convex/react";

import { Spinner } from "@/components/ui/spinner";

import NavBar from "./_components/navbar";
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
    <main className="container flex h-screen w-full flex-col">
      <div className="sticky inset-x-0 top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur transition-all supports-[backdrop-filter]:bg-background/60">
        <Sidebar />
        <NavBar />
      </div>
      <section className="flex w-full flex-col gap-5 p-10">{children}</section>
    </main>
  );
};

export default MainLayout;
