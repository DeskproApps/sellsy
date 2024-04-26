import { useMemo } from "react";
import { get, size, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getCurrenciesService } from "../../services/sellsy";
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

    getCurrenciesService(client)
      .then(() => getEntityListService(client, dpUser.id))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/contacts/link"))
      .catch(() => navigate("/login"));
  }, [dpUser]);
};

export { useLoadingApp };
