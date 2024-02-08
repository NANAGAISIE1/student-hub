import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { navigationLinks } from "@/constants/navigation-links";

const GeneralLinks = () => {
  return (
    <ul className="w-full list-none space-y-4">
      {navigationLinks
        .filter((link) => link.type !== "private")
        .map((link) => (
          <>
            <li key={link.href}>
              <Link
                className="flex w-full items-center font-semibold"
                href={link.href}
              >
                {link.title}
              </Link>
            </li>
            <Separator />
          </>
        ))}
      <li>
        <Link
          className="flex w-full items-center font-semibold"
          href="/sign-in"
        >
          Sign in
        </Link>
      </li>
      <Separator />
      <li>
        <Link
          className="flex w-full items-center font-semibold text-primary"
          href="/sign-up"
        >
          Get started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </li>
    </ul>
  );
};

export default GeneralLinks;
