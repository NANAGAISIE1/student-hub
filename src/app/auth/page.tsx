import Link from "next/link";
import { Suspense } from "react";

import { Icons } from "@/components/icons";
import { Typewriter } from "@/components/ui/typewritter-effect";

import AuthForm from "./_components/auth-form";
import AuthFormSkeleton from "./_components/skeleton";

export default function AuthenticationPage() {
  return (
    <main className="container relative grid h-screen grid-cols-1 flex-col items-center justify-center md:grid-cols-2 lg:max-w-none lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-accent-foreground dark:border-r md:flex">
        <div className="absolute inset-0 bg-accent" />
        <Link
          href={"/"}
          className="relative z-20 hidden items-center gap-2 text-lg font-medium md:flex"
        >
          <Icons.logo className="fill-accent-foreground text-accent-foreground" />
          <span>Smartnote.</span>
        </Link>
        <div className="z-20 flex h-full w-full items-center justify-start">
          <Typewriter />
        </div>
      </div>
      <div className="relative mx-auto flex h-full w-full flex-col items-center  justify-center space-y-6 lg:p-8">
        <Suspense fallback={<AuthFormSkeleton />}>
          <AuthForm />
        </Suspense>
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center">
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>
          <pre> | </pre>
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
