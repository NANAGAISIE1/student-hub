"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const Kinde = ({ children }: { children: React.ReactNode }) => {
  return (
    <KindeProvider
      clientId={process.env.KINDE_CLIENT_ID}
      domain={process.env.KINDE_ISSUER_URL}
      logoutUri={process.env.KINDE_POST_LOGOUT_REDIRECT_URL}
      redirectUri={process.env.KINDE_POST_LOGIN_REDIRECT_URL}
      audience={process.env.KINDE_AUDIENCE}
    >
      {children}
    </KindeProvider>
  );
};

export default Kinde;
