import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "../ui/button";

type Props = {
  arrow: boolean;
  label: string;
};

const RegisterationLink = ({ arrow, label }: Props) => {
  const showArrow = arrow ? arrow : false;
  return (
    <Link
      href={"/auth?prompt=register"}
      className={buttonVariants({
        variant: "default",
        className: "w-full",
      })}
    >
      {label} {showArrow && <ArrowRight className="ml-1.5 h-5 w-5" />}
    </Link>
  );
};

export default RegisterationLink;
