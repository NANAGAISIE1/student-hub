import Link from "next/link";

import { buttonVariants } from "../ui/button";

type Props = {
  label: string;
};

const LoginLink = ({ label }: Props) => {
  return (
    <Link
      href={"/auth?prompt=login"}
      className={buttonVariants({
        variant: "ghost",
        className: "w-full",
      })}
    >
      {label}
    </Link>
  );
};

export default LoginLink;
