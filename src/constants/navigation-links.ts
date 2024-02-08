type NavLinkProps = {
  title: string;
  href: string;
  type: "public" | "private";
};

export const navigationLinks: NavLinkProps[] = [
  {
    title: "Dashboard",
    href: "/spaces",
    type: "private",
  },
  {
    title: "Pricing",
    href: "/pricing",
    type: "public",
  },
  {
    title: "About",
    href: "/about",
    type: "public",
  },
  {
    title: "Contact",
    href: "/contact",
    type: "public",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    type: "public",
  },
];
