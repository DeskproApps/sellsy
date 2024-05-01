import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, ContactCreateInput } from "./types";

const createContactService = (
  client: IDeskproClient,
  data: ContactCreateInput,
) => {
  return baseRequest<Contact>(client, {
    url: "/contacts",
    method: "POST",
    data
  });
};

export { createContactService };
