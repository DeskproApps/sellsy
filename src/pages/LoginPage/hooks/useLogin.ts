import { AUTH_URL } from "@/constants";
import { createSearchParams, useNavigate } from "react-router-dom";
import { generatePKCEPair } from "@/utils";
import { getAccessTokenService, checkAuthService } from "@/services/sellsy";
import { setAccessTokenService, setRefreshTokenService } from "@/services/deskpro";
import { UserData, Settings } from "@/types";
import { useState, useCallback, useEffect } from "react";
import { useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import type { IOAuth2, OAuth2Result } from "@deskpro/app-sdk";

interface UseLoginReturn {
  onSignIn: () => void,
  authUrl: string | null,
  error: null | string,
  isLoading: boolean,
}

export function useLogin(): UseLoginReturn {
  const [authUrl, setAuthUrl] = useState<string | null>(null)
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [oauth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)
  const [authCodes, setAuthCodes] = useState<{ codeChallenge: string, codeVerifier: string } | null>(null)

  const navigate = useNavigate()

  const { context } = useDeskproLatestAppContext<UserData, Settings>()
  const dpUser = context?.data?.user

  const settings = context?.settings
  const mode = settings?.use_advanced_connect === false ? 'global' : 'local';



  useEffect(() => {
    if (!authCodes) {
      generatePKCEPair().then(setAuthCodes)
    }
  }, [authCodes])

  useInitialisedDeskproAppClient(async (client) => {
    if (!settings || !authCodes) {
      // Make sure settings have loaded.
      return
    }

    const clientId = settings.client_id;
    if (mode === 'local' && (typeof clientId !== 'string' || clientId.trim() === "")) {
      // Local mode requires a clientId.
      setError("No client id was provided while setting up the app, a client id is required when using advanced connect.");
      return
    }

    // Start OAuth process depending on the authentication mode
    const oauth2Response = mode === "local" ?
      await client.startOauth2Local(
        ({ state, callbackUrl }) => {
          return `${AUTH_URL}/authorization?${createSearchParams([
            ["response_type", "code"],
            ["client_id", clientId ?? ""],
            ["state", state],
            ["redirect_uri", callbackUrl],
            ["code_challenge", authCodes.codeChallenge],
            ["code_challenge_method", "S256"],
          ]).toString()}`;

        },
        /\bcode=(?<code>[^&#]+)/,
        async (code: string): Promise<OAuth2Result> => {
          // Extract the callback URL from the authorization URL
          const url = new URL(oauth2Response.authorizationUrl);
          const redirectUri = url.searchParams.get("redirect_uri");

          if (!redirectUri) {
            throw new Error("Failed to get callback URL");
          }

          const data = await getAccessTokenService(client, {
            code,
            redirectUri,
            codeVerifier: authCodes.codeVerifier,
          });

          return { data }
        }
      )
      // Global Proxy Service
      : await client.startOauth2Global("3cb206ee-bfe9-4047-8229-08ce75524a4d");

    setAuthUrl(oauth2Response.authorizationUrl)
    setOAuth2Context(oauth2Response)

  }, [setAuthUrl, mode, settings, authCodes])


  useInitialisedDeskproAppClient((client) => {
    if (!oauth2Context || !dpUser) {
      return
    }

    const startPolling = async () => {
      try {
        const result = await oauth2Context.poll();

        setAccessTokenService(client, result.data.access_token)

        if (result.data.refresh_token) {
          setRefreshTokenService(client, result.data.refresh_token)
        }

        const data = await checkAuthService(client);
        if (!data) {
          throw new Error("Error authenticating user");
        }


        navigate("/")
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred during the login process");
      } finally {
        setIsLoading(false)
        setIsPolling(false)
      }
    }

    if (isPolling) {
      startPolling()
    }
  }, [isPolling, oauth2Context, navigate, dpUser])


  const onSignIn = useCallback(() => {
    setIsLoading(true);
    setIsPolling(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);


  return { authUrl, onSignIn, error, isLoading }

}