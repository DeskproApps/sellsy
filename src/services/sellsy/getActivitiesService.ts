import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Contact, Activity, Pagination, ActivityType } from "./types";

const getActivitiesService = (
  client: IDeskproClient,
  contactId: Contact["id"],
  type: ActivityType = "contact",
) => {
  return baseRequest<Pagination<Activity>>(client, {
    url: `/timeline/${type}/${contactId}/search`,
    method: "POST",
    data: {
      filters: {
        entities: ["email", "phonecall"],
      },
    },
  });
};

export { getActivitiesService };
