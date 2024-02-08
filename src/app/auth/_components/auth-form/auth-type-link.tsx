import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { AuthTypes } from "@/constants/auth-types";
import { cn } from "@/lib/utils";

export const AuthTypeLink = () => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");

  const authPrompt = prompt === AuthTypes.LOGIN ? "register" : "login";
  const buttonText = prompt === AuthTypes.LOGIN ? "Register" : "Login";
  const buttonClass = cn(
    buttonVariants({ variant: "ghost" }),
    "md:absolute md:right-2 md:top-2",
  );

  return (
    <Link href={`/auth?prompt=${authPrompt}`} className={buttonClass}>
      {buttonText}
    </Link>
  );
};
