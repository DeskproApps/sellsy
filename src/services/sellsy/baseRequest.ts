import { isEmpty } from "lodash";
import { proxyFetch, adminGenericProxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders } from "../../constants";
import { getQueryParams, getRequestBody } from "../../utils";
import { SellsyError } from "./SellsyError";
import type { Request, FetchOptions } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data,
  method = "GET",
  queryParams = {},
  headers: customHeaders,
  settings,
}) => {
  const dpFetch = await (!settings ? proxyFetch : adminGenericProxyFetch)(client);
  const baseUrl = rawUrl ? rawUrl : `${BASE_URL}${url || ""}`;
  const params = getQueryParams(queryParams);
  const body = getRequestBody(data);

  const requestUrl = `${baseUrl}${isEmpty(params) ? "": `?${params}`}`;
  const options: FetchOptions = {
    method,
    body,
    headers: {
      "Authorization": `Bearer ${placeholders.ACCESS_TOKEN}`,
      "Accept": "application/json",
      ...customHeaders,
    },
  };

  if (!isEmpty(data)) {
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.json();
    } catch (e) {
      errorData = {};
    }

    throw new SellsyError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    result = await res.json();
  } catch (e) {
    return {};
  }

  return result;
};

export { baseRequest };
