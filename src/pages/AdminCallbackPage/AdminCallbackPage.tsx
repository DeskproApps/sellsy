import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { AdminCallback } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";

const AdminCallbackPage: FC = () => {
  const [callbackUrl, setCallbackUrl] = useState<Maybe<string>>(null);
  const key = useMemo(() => uuidv4(), []);

  useInitialisedDeskproAppClient((client) => {
    client.oauth2()
      .getAdminGenericCallbackUrl(key, /code=(?<token>[0-9a-f]+)/, /state=(?<key>.+)/)
      .then(({ callbackUrl }) => setCallbackUrl(callbackUrl));
  }, [key]);

  return (
    <AdminCallback callbackUrl={callbackUrl} />
  );
};

export { AdminCallbackPage };
