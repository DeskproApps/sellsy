import { AdminCallback } from "../../components";
import { AUTH_URL } from "@/constants";
import { createSearchParams } from "react-router-dom";
import { LoadingSpinner, OAuth2Result, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useState } from "react";

export function AdminCallbackPage() {
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null)

  useInitialisedDeskproAppClient(async (client) => {
    const oauth2 = await client.startOauth2Local(
      ({ state, callbackUrl }) => {
        return `${AUTH_URL}/authorization?${createSearchParams([
          ["response_type", "code"],
          ["client_id", "FakeVal"],
          ["state", state],
          ["redirect_uri", callbackUrl],
          ["code_challenge", "FakeVal"],
          ["code_challenge_method", "S256"],
        ]).toString()}`
      },
      /code=(?<code>[0-9a-f]+)/,
      async (): Promise<OAuth2Result> => ({ data: { access_token: "", refresh_token: "" } })
    )

    const url = new URL(oauth2.authorizationUrl);
    const redirectUri = url.searchParams.get("redirect_uri")

    if (redirectUri) {
      setCallbackUrl(redirectUri)
    }
  })

  if (!callbackUrl) {
    return (<LoadingSpinner />)
  }
  return (
    <AdminCallback callbackUrl={callbackUrl} />
  );
};

