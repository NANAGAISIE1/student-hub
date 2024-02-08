"use client";

import { useSearchParams } from "next/navigation";

import LoginLink from "@/components/auth/login-link";
import RegisterationLink from "@/components/auth/register-link";
import { AuthTypes } from "@/constants/auth-types";

import Form from "./auth-form/form";
import AuthProviders from "./social-auth";

export const Auth = () => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");

  if (prompt === AuthTypes.LOGIN || prompt === AuthTypes.REGISTER) {
    return (
      <>
        <Form />
        <AuthProviders />
      </>
    );
  }

  if (!prompt) {
    return (
      <>
        <LoginLink label="Login" />
        <RegisterationLink label="Register" arrow={false} />
      </>
    );
  }
};
