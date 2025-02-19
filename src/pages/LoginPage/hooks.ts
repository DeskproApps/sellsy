import { useState, useCallback, useMemo, useRef } from 'react';
import { get, size } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import {
  getEntityListService,
  setAccessTokenService,
  setRefreshTokenService,
} from "../../services/deskpro";
import { getAccessTokenService, checkAuthService } from "../../services/sellsy";
import { useAsyncError } from "../../hooks";
import { getQueryParams, tryToLinkAutomatically } from "../../utils";
import { DEFAULT_ERROR, AUTH_URL } from "../../constants";
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "./utils";
import type { Maybe, Settings } from '../../types';

export type Result = {
  onLogIn: () => void,
  authUrl: string|null,
  error: Maybe<string>,
  isLoading: boolean,
};

const useLogin = (): Result => {
  const navigate = useNavigate();
  const [error, setError] = useState<Maybe<string>>(null);
  const { asyncErrorHandler } = useAsyncError();
  const callbackURLRef = useRef('');
  const [authUrl, setAuthUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { context } = useDeskproLatestAppContext<unknown, Settings>();
  const dpUser = useMemo(() => get(context, ["data", "user"]), [context]);
  const codeVerifier = useMemo(() => generateCodeVerifier(), []);

  useInitialisedDeskproAppClient(async client => {
    if (context?.settings.use_deskpro_saas === undefined) return;

    const clientID = context.settings.client_id;
    const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

    if (mode === 'local' && typeof clientID !== 'string') return;

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const oauth2 = mode === 'global' ? await client.startOauth2Global('26b26604-eadf-4fec-9b91-1cf685ad4449') : await client.startOauth2Local(
      ({ callbackUrl, state }) => {
        callbackURLRef.current = callbackUrl;

        return `${AUTH_URL}/authorization?${getQueryParams({
          client_id: clientID,
          state,
          response_type: 'code',
          code_challenge_method: 'S256',
          code_challenge: codeChallenge,
          redirect_uri: callbackUrl,
        })}`;
      },
      /code=(?<code>[^&]+)/,
      async code => {
        const { access_token, refresh_token } = await getAccessTokenService(client, {
          code,
          codeVerifier,
          redirectUri: callbackURLRef.current
        });

        return {
          data: { access_token, refresh_token }
        };
      }
    );
    
    setAuthUrl(oauth2.authorizationUrl);
    setError(null);

    try {
      const pollResult = await oauth2.poll();

      await setAccessTokenService(client, pollResult.data.access_token);
      pollResult.data.refresh_token && await setRefreshTokenService(client, pollResult.data.refresh_token);
      await checkAuthService(client);
      await tryToLinkAutomatically(client, dpUser);

      const entityIDs = await getEntityListService(client, dpUser.id);

      navigate(size(entityIDs) ? '/home' : '/contacts/link');
    } catch (error) {
      setError(get(error, ['data', 'hint'])
        || get(error, ['data', 'error_description'])
        || DEFAULT_ERROR
      );
      asyncErrorHandler(error instanceof Error ? error : new Error('Unknown Error'));
    } finally {
      setIsLoading(false);
    };
  });

  const onLogIn = useCallback(() => {
    setIsLoading(true);
    window.open(authUrl, '_blank');
  }, [setIsLoading, authUrl]);

  return { authUrl, onLogIn, error, isLoading };
};

export { useLogin };