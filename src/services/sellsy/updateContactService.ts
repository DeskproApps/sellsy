import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, ContactUpdateInput } from "./types";

const updateContactService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  data: ContactUpdateInput,
) => {
  return baseRequest(client, {
    url: `/contacts/${contactId}`,
    method: "PUT",
    data,
  });
};

export { updateContactService };
