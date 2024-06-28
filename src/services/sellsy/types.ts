import type { Dict } from "../../types";
import type { components, paths } from "./schema";

export type Response<T> = Promise<T>;

export type Pagination<T> = {
  data: T[],
  pagination: {
    limit: number;
    count: number;
    total: number;
    offset: string;
  }
};

export type SellsyAPIError = {
  error: {
    code: number,
    message: string;
    context: string;
    details: Dict<string>;
  };
};

export type AccessToken = {
  token_type: "Bearer",
  access_token: string;
  refresh_token: string,
  expires_in: number,
};

export type SearchType = components["parameters"]["searchType"];

export type Contact = components["schemas"]["ContactItem"];

export type Currency = components["schemas"]["Currency"];

export type Company = paths["/contacts/{id}/companies"]["get"]["responses"]["200"]["content"]["application/json"]["data"][number];

export type Activity = components["schemas"]["Activity"];

export type ActivityType = paths["/timeline/{type}/{id}/search"]["parameters"]["path"]["type"];

export type ContactCreateInput = components["schemas"]["ContactCreateItem"];

export type ContactUpdateInput = components["schemas"]["ContactUpdateItem"];
