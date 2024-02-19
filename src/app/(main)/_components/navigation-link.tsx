import Link from "next/link";

import { Hint } from "@/components/hint";
import { buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/hooks/store/side-bar";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  name: string;
  href: string;
}

const NavigationLink = ({ children, name, href }: Props) => {
  const isOpen = useSidebar((state) => state.isOpen);
  const size = isOpen ? "default" : "icon";

  return (
    <Hint label={name} side="right" align="center" sideOffset={10}>
      <Link
        href={href}
        passHref
        className={buttonVariants({
          variant: "ghost",
          size: size as "default" | "icon" | "sm" | "lg" | null | undefined,
          className: cn(
            "flex w-full place-items-center gap-3 overflow-x-clip transition-colors duration-100",
          ),
        })}
      >
        {children}
        <p className="!m-0 whitespace-nowrap tracking-wide">{name}</p>
      </Link>
    </Hint>
  );
};

export default NavigationLink;
