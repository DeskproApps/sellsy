import { get } from "lodash";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { searchContactsService } from "../../services/sellsy";
import { QueryKey } from "../../query";
import type { Contact } from "../../services/sellsy/types";

export type Result = {
  isLoading: boolean;
  contacts: Contact[];
};

type Hooks = (q?: string) => Result;

const useSearch: Hooks = (q) => {
  const contacts = useQueryWithClient(
    [QueryKey.SEARCH, q as string],
    (client) => searchContactsService(client, q as string),
    { enabled: Boolean(q) },
  );

  return {
    isLoading: contacts.isLoading && Boolean(q),
    contacts: get(contacts, ["data", "data"]) || [],
  };
};

export { useSearch };
