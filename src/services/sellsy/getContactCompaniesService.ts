import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, Company, Pagination } from "./types";

const getContactCompaniesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
) => {
  return baseRequest<Pagination<Company>>(client, {
    url: `/contacts/${contactId}/companies`,
  });
};

export { getContactCompaniesService };
