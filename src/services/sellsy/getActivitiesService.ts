import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Dict } from "../../types";
import type { Contact, Activity, Pagination, ActivityType } from "./types";

const getActivitiesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  type: ActivityType,
  queryParams?: Dict<string>,
) => {
  return baseRequest<Pagination<Activity>>(client, {
    url: `/timeline/${type}/${contactId}/search`,
    method: "POST",
    queryParams: {
      limit: "100",
      order: "due_date",
      ...queryParams,
    },
    data: {
      filters: {
        entities: ["email", "phonecall"],
      },
    },
  });
};

export { getActivitiesService };
