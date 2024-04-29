import { get, isEmpty } from "lodash";
import { getEntityListService, setEntityService } from "../services/deskpro";
import { searchContactsService } from "../services/sellsy";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe, DPUser } from "../types";
import type { Contact } from "../services/sellsy/types";

const tryToLinkAutomatically = async (
  client: IDeskproClient,
  dpUser: DPUser,
): Promise<void> => {
  const entityIds = await getEntityListService(client, dpUser.id);
  let contactId: Maybe<Contact["id"]> = null;

  if (!isEmpty(entityIds)) {
    return;
  }

  const email = get(dpUser, ["primaryEmail"]);

  if (!email) {
    return;
  }

  try {
    const contacts = await searchContactsService(client, email);
    contactId = get(contacts, ["data", 0, "id"]);
  } catch (e) {
    return;
  }

  if (!contactId) {
    return;
  }

  return setEntityService(client, dpUser.id, `${contactId}`);
};

export { tryToLinkAutomatically };
