import { FC, useState } from 'react';
import { useDeskproLatestAppContext, useInitialisedDeskproAppClient } from '@deskpro/app-sdk';
import { AdminCallback } from "../../components";
import type { Maybe, Settings } from '../../types';
import { AUTH_URL } from '../../constants';
import { getQueryParams } from '../../utils';

const AdminCallbackPage: FC = () => {
  const { context } = useDeskproLatestAppContext<unknown, Settings>();
  const [callbackUrl, setCallbackUrl] = useState<Maybe<string>>(null);

  useInitialisedDeskproAppClient(client => {
    const clientID = context?.settings.client_id;

    client.startOauth2Local(
      ({ callbackUrl, state }) => {
        setCallbackUrl(callbackUrl);

        return `${AUTH_URL}/authorization?${getQueryParams({
          client_id: clientID ?? '',
          state,
          response_type: 'code',
          code_challenge_method: 'S256',
          code_challenge: '',
          redirect_uri: callbackUrl,
        })}`;
      },
      /code=(?<code>[0-9a-f]+)/,
      async () => ({data: {access_token: ''}}),
      {
        pollInterval: 10000,
        timeout: 600
      }
    );
  }, []);

  return (
    <AdminCallback callbackUrl={callbackUrl} />
  );
};

export { AdminCallbackPage };