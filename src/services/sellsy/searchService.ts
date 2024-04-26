import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Pagination, SearchType, Contact } from "./types";

const searchService = <T>(
  client: IDeskproClient,
  type: SearchType,
  q: string,
) => {
  return baseRequest<T>(client, {
    url: "/search",
    queryParams: [
      `q=${q}`,
      ...(!Array.isArray(type) ? [] : type.map((t) => `type[]=${t}`)),
    ].join("&"),
  });
};

const searchContactsService = (client: IDeskproClient, q: string) => {
  return searchService<Pagination<Contact>>(client, ["contact"], q);
};

export { searchService, searchContactsService };
