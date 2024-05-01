/** Typo */
export const nbsp = "\u00A0";

/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

export const LOCALE = "en-GB";

/** Deskpro */
export const APP_PREFIX = "sellsy";

export const ENTITY = "linkedSellsyContact";

export const DEFAULT_ERROR = "There was an error!";

export const ACCESS_TOKEN_PATH = "oauth2/access_token";

export const REFRESH_TOKEN_PATH = "oauth2/refresh_token";

export const placeholders = {
  CLIENT_ID: "__client_id__",
  CLIENT_SECRET: "__client_secret__",
  ACCESS_TOKEN: `[user[${ACCESS_TOKEN_PATH}]]`,
  REFRESH_TOKEN: `[user[${REFRESH_TOKEN_PATH}]]`,
};

/** Sellsy Pro */
export const SELLSY_URL = "https://www.sellsy.com";

export const AUTH_URL = "https://login.sellsy.com/oauth2";

export const BASE_URL = "https://api.sellsy.com/v2";
