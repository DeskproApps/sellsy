import type { Dict } from "../../types";

export type Response<T> = Promise<T>;

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
