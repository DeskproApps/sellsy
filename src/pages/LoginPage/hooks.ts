import { useEffect, useState, useCallback, useMemo } from "react";
import { get, size } from "lodash";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  getEntityListService,
  setAccessTokenService,
  setRefreshTokenService,
} from "../../services/deskpro";
import { getAccessTokenService, getCurrenciesService } from "../../services/sellsy";
import { useAsyncError } from "../../hooks";
import { getQueryParams } from "../../utils";
import { DEFAULT_ERROR, AUTH_URL } from "../../constants";
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "./utils";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { Maybe, UserContext } from "../../types";

export type Result = {
  poll: () => void,
  authUrl: string|null,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const navigate = useNavigate();
  const [error, setError] = useState<Maybe<string>>(null);
  const [callback, setCallback] = useState<OAuth2StaticCallbackUrl|undefined>();
  const { asyncErrorHandler } = useAsyncError();
  const [authUrl, setAuthUrl] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { client } = useDeskproAppClient();
  const clientId = useMemo(() => get(context, ["settings", "client_id"]), [context]);
  const dpUser = useMemo(() => get(context, ["data", "user"]), [context]);
  const key = useMemo(() => uuidv4(), []);
  const codeVerifier = useMemo(() => generateCodeVerifier(), []);

  useInitialisedDeskproAppClient(
    (client) => {
      client.oauth2()
        .getGenericCallbackUrl(key, /code=(?<token>[^&]+)/, /state=(?<key>[^&]+)/)
        .then(setCallback);
    },
    [setCallback]
  );

  useEffect(() => {
    if (callback?.callbackUrl && clientId) {
      generateCodeChallenge(codeVerifier).then((codeChallenge) => {
        setAuthUrl(`${AUTH_URL}/authorization?${getQueryParams({
          response_type: "code",
          client_id: clientId,
          redirect_uri: callback.callbackUrl,
          code_challenge: codeChallenge,
          code_challenge_method: "S256",
          state: key,
        })}`);
      })
    }
  }, [key, callback, clientId, codeVerifier]);

  const poll = useCallback(() => {
    if (!client || !callback?.poll || !callback?.callbackUrl) {
      return;
    }

    setError(null);
    setTimeout(() => setIsLoading(true), 500);

    callback.poll()
      .then(({ token }) => getAccessTokenService(client, {
        code: token,
        redirectUri: callback.callbackUrl,
        codeVerifier: codeVerifier,
      }))
      .then(({ access_token, refresh_token }) => Promise.all([
        setAccessTokenService(client, access_token),
        setRefreshTokenService(client, refresh_token),
      ]))
      .catch((err) => {
        setIsLoading(false);
        setError(get(err, ["data", "hint"])
          || get(err, ["data", "error_description"])
          || DEFAULT_ERROR
        );
      })
      .then(() => getCurrenciesService(client)) // check auth
      .then(() => getEntityListService(client, dpUser.id))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/contacts/link"))
      .catch(asyncErrorHandler)
  }, [client, callback, codeVerifier, asyncErrorHandler, dpUser, navigate]);

  return { authUrl, poll, error, isLoading };
};

export { useLogin };
