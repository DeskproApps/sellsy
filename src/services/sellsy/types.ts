import type { Dict } from "../../types";
import type { components } from "./schema";

export type Response<T> = Promise<T>;

export type Pagination<T> = { data: T[] };

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
