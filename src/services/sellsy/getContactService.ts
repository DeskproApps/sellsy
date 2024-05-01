import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact } from "./types";

const getContactService = (
  client: IDeskproClient,
  contactId: Contact["id"],
): Promise<Contact> => {
  return baseRequest(client, {
    url: `/contacts/${contactId}`,
  });
};

export { getContactService };
