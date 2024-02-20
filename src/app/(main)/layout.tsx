"use client";
import { useConvexAuth } from "convex/react";
import {
  AlertCircle,
  Calendar,
  LayoutDashboard,
  Settings,
  Trash2,
  Users2,
} from "lucide-react";
import { useState } from "react";

import UserAccountNav from "@/components/auth/user-account-nav";
import { SearchCommand } from "@/components/search-command";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Nav } from "./_components/side-bar-nav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useConvexAuth();
  const defaultLayout = [265, 800];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="flex h-screen w-full flex-col items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={4}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={(collapsed) => {
              setIsCollapsed(collapsed);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                collapsed,
              )}`;
            }}
            className={cn(
              "h-full",
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out",
            )}
          >
            <div
              className={cn(
                "flex h-[52px] w-full items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2",
              )}
            >
              {" "}
              <UserAccountNav isCollapsed={isCollapsed} />
            </div>
            <Separator />
            <div className="flex h-full flex-grow flex-col">
              <SearchCommand isCollapsed={isCollapsed} />
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Settings",
                    icon: Settings,
                    variant: "ghost",
                    href: "dashboard/settings",
                  },
                  {
                    title: "Trash",
                    label: "23",
                    icon: Trash2,
                    variant: "ghost",
                    href: "/dashboard/trash",
                  },
                ]}
              />
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                className="flex-grow"
                links={[
                  {
                    title: "Dashboard",
                    label: "972",
                    icon: LayoutDashboard,
                    variant: "ghost",
                    href: "/dashboard",
                  },
                  {
                    title: "Timetable",
                    icon: Calendar,
                    variant: "ghost",
                    href: "/timetable",
                  },
                ]}
              />
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Social",
                    label: "972",
                    icon: Users2,
                    variant: "ghost",
                  },
                  {
                    title: "Updates",
                    label: "342",
                    icon: AlertCircle,
                    variant: "ghost",
                  },
                ]}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} className="container">
            {isLoading ? (
              <div className="flex h-screen items-center justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <ScrollArea className="h-screen">
                <section className="flex w-full flex-col gap-5 p-10">
                  {children}
                </section>
              </ScrollArea>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
        {/* <main className="flex h-screen w-full flex-col">
          <div className="sticky inset-x-0 top-0 z-50 flex h-14 w-full items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur transition-all supports-[backdrop-filter]:bg-background/60">
        <Sidebar />
        <NavBar />
      </div>
      <section className="flex w-full flex-col gap-5 p-10">{children}</section>
          <Mail
          accounts={accounts}
          defaultLayout={[265, 440, 655]}
          navCollapsedSize={4}
        />
        </main> */}
      </TooltipProvider>
    </>
  );
};

export default MainLayout;
