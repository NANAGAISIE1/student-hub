"use client";

import { FaMicrosoft } from "react-icons/fa";
import { GrApple, GrGoogle } from "react-icons/gr";

import { Separator } from "@/components/ui/separator";

import { Providers } from "./providers";

type Props = {};

const AuthProviders = (props: Props) => {
  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-0 flex w-full items-center">
          <Separator
            orientation="horizontal"
            className="z-20 w-full bg-muted-foreground"
          />
        </div>
        <div className="relative z-30 flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 items-center justify-center gap-3 md:grid-cols-3">
        <Providers
          connection_id={process.env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID!}
          Label="Google"
          Icon={<GrGoogle title="Google login" color="brand" />}
        />
        <Providers
          connection_id={process.env.NEXT_PUBLIC_KINDE_APPLE_CONNECTION_ID!}
          Label="Apple"
          Icon={<GrApple title="Apple Login" color="brand" />}
        />
        <Providers
          connection_id={process.env.NEXT_PUBLIC_KINDE_MICROSOFT_CONNECTION_ID!}
          Label="Microsoft"
          Icon={<FaMicrosoft title="Microsoft Login" color="brand" />}
        />
      </div>
    </>
  );
};

export default AuthProviders;
