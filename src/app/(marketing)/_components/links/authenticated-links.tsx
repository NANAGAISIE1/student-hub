import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { navigationLinks } from "@/constants/navigation-links";

type Props = {};

const AuthenticatedLinks = (props: Props) => {
  return (
    <ul className="w-full list-none space-y-4">
      {navigationLinks.map((link) => (
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
        <LogoutLink className="flex w-full items-center font-semibold text-destructive">
          Log out
        </LogoutLink>
      </li>
    </ul>
  );
};

export default AuthenticatedLinks;
