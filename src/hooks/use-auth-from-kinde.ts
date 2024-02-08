import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useCallback, useMemo } from "react";

interface UseAuthReturn {
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchAccessToken: (args: {
    forceRefreshToken: boolean;
  }) => Promise<string | null>;
}

export function useAuthFromKinde(): UseAuthReturn {
  const { isLoading, isAuthenticated, getToken } = useKindeAuth();

  const fetchAccessToken = useCallback(
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (forceRefreshToken) {
        try {
          const response = getToken();
          // Returns the token as string
          return response as string;
        } catch (error) {
          return null;
        }
      }
      // Add this line to ensure the function always returns a string or null
      return null;
    },
    [getToken],
  );

  return useMemo(
    () => ({
      isLoading: Boolean(isLoading),
      isAuthenticated: Boolean(isAuthenticated),
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken],
  );
}
