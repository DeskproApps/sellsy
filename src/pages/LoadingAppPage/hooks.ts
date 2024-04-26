import { useMemo } from "react";
import { get, size, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { checkAuthService } from "../../services/sellsy";
import { tryToLinkAutomatically } from "../../utils";
import type { UserContext } from "../../types";

type UseCheckAuth = () => void;

const useLoadingApp: UseCheckAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUser = useMemo(() => get(context, ["data", "user"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (isEmpty(dpUser)) {
      return;
    }

    checkAuthService(client)
      .then(() => tryToLinkAutomatically(client, dpUser))
      .then(() => getEntityListService(client, dpUser.id))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/contacts/link"))
      .catch(() => navigate("/login"));
  }, [dpUser]);
};

export { useLoadingApp };
