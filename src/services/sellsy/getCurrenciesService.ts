import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Currency, Pagination } from "./types";

const getCurrenciesService = (client: IDeskproClient) => {
  return baseRequest<Pagination<Currency>>(client, { url: "/currencies" });
};

export { getCurrenciesService };
