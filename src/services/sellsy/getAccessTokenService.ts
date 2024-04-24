import { baseRequest } from "./baseRequest";
import { getQueryParams } from "../../utils";
import { AUTH_URL, placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { AccessToken } from "./types";

type Params = {
  redirectUri: string;
  codeVerifier: string;
  code: string;
};

const getAccessTokenService = (
  client: IDeskproClient,
  { code, redirectUri, codeVerifier }: Params,
) => {
  const data = new FormData();
  data.append("grant_type", "authorization_code");
  data.append("redirect_uri", redirectUri);
  data.append("client_id", placeholders.CLIENT_ID);
  data.append("code_verifier", codeVerifier);
  data.append("code", code);

  return baseRequest<AccessToken>(client, {
    rawUrl: `${AUTH_URL}/access-tokens`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: getQueryParams(data),
  });
};

export { getAccessTokenService };
