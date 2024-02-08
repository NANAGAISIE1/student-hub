import { useSearchParams } from "next/navigation";

import { AuthTypes } from "@/constants/auth-types";

export const AuthCopy = () => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");

  if (prompt === AuthTypes.LOGIN) {
    return <h1>Welcome Back</h1>;
  }

  if (prompt === AuthTypes.REGISTER) {
    return (
      <>
        <h1>Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Welcome</h1>
      <p className="text-sm text-muted-foreground">
        Authenticate to start using Smartnote.
      </p>
    </>
  );
};
