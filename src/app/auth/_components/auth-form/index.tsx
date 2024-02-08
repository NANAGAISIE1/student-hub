"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

import { AuthCopy } from "./auth-copy";
import { AuthTypeLink } from "./auth-type-link";
import { Auth } from "../auth-type";

enum AuthTypes {
  LOGIN = "login",
  REGISTER = "register",
}

const AuthForm = () => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <AuthCopy />
      </div>
      <div className="absolute top-0 flex w-full items-center justify-between">
        <Link
          href={"/"}
          className="!m-0 flex items-center gap-2 text-sm font-medium md:hidden"
        >
          <Icons.logo className="fill-accent-foreground text-accent-foreground" />
          <span>Smartnote.</span>
        </Link>
        <AuthTypeLink />
      </div>
      <div
        className={cn(
          "relative flex w-full items-center justify-between gap-6",
          prompt !== AuthTypes.LOGIN ? "" : "flex-col",
          prompt !== AuthTypes.REGISTER ? "" : "flex-col",
        )}
      >
        <Auth />
      </div>
    </>
  );
};

export default AuthForm;
