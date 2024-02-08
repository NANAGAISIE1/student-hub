import Link from "next/link";

import { Icons } from "./icons";

export const LogoWithName = () => (
  <Link
    href="/"
    className="flex items-center justify-center gap-2 font-semibold text-primary"
  >
    <Icons.logo className="fill-primary text-primary" />
    <span>Smartnote.</span>
  </Link>
);
