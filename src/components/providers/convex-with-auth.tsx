"use client";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

import { useAuthFromKinde } from "@/hooks/use-auth-from-kinde";

export default function ConvexProviderWithKinde({
  children,
}: {
  children: ReactNode;
}) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromKinde}>
      {children}
    </ConvexProviderWithAuth>
  );
}
