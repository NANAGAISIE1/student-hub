import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useSearchParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { AuthTypes } from "@/constants/auth-types";

export const Providers = ({
  connection_id,
  Label,
  Icon,
}: {
  connection_id: string;
  Label: string;
  Icon: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");

  if (prompt === AuthTypes.LOGIN) {
    return (
      <LoginLink
        authUrlParams={{
          connection_id: connection_id,
        }}
        className={buttonVariants({
          variant: "default",
          className: "flex w-full items-center justify-center gap-2",
        })}
      >
        {Icon}
        <p className="!mt-0">{Label}</p>
      </LoginLink>
    );
  }

  return (
    <RegisterLink
      authUrlParams={{
        connection_id: connection_id,
      }}
      className={buttonVariants({
        variant: "default",
        className: "flex w-full items-center justify-center gap-2",
      })}
    >
      {Icon}
      <p className="!mt-0">{Label}</p>
    </RegisterLink>
  );
};
