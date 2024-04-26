import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";

const getCurrenciesService = (client: IDeskproClient) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return baseRequest<any>(client, { url: "/currencies" });
};

export { getCurrenciesService };
