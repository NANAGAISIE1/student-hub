"use client";

import { useConvexAuth } from "convex/react";
import Link from "next/link";

import LoginLink from "@/components/auth/login-link";
import RegisterationLink from "@/components/auth/register-link";
import UserAccountNav from "@/components/auth/user-account-nav";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

type Props = {};

const ButtonLink = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="flex gap-x-2">
        <Skeleton className="h-6 w-20" />
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <>
        <Link
          href="/spaces"
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          Dashboard
        </Link>

        <UserAccountNav />
      </>
    );
  }

  return (
    <>
      <LoginLink label="Login" />
      <RegisterationLink label="Get started" arrow={false} />
    </>
  );
};

const Auth = (props: Props) => {
  return (
    <div className="hidden items-center space-x-4 lg:flex">
      <ButtonLink />
    </div>
  );
};

export default Auth;
