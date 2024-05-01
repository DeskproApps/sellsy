import { useMemo } from "react";
import { get } from "lodash";
import { useQueryWithClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import {
  getContactService,
  getActivitiesService,
  getContactCompaniesService,
} from "../services/sellsy";
import { QueryKey } from "../query";
import type { Maybe, UserContext } from "../types";
import type { Contact, Company, Activity } from "../services/sellsy/types";

type UseContact = () => {
  isLoading: boolean;
  contact: Maybe<Contact>;
  companies: Company[];
  activities: Activity[];
};

const useContact: UseContact = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const contactIds = useQueryWithClient(
    [QueryKey.LINKED_CONTACT, dpUserId as string],
    (client) => getEntityListService(client, dpUserId as string),
    { enabled: Boolean(dpUserId) },
  );

  const contactId = useMemo(() => get(contactIds.data, [0]), [contactIds.data]);

  const contact = useQueryWithClient(
    [QueryKey.CONTACT, contactId as string],
    (client) => getContactService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  const companies = useQueryWithClient(
    [QueryKey.CONTACT_COMPANIES, contactId as string],
    (client) => getContactCompaniesService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  const activities = useQueryWithClient(
    [QueryKey.CONTACT_ACTIVITIES, contactId as string],
    (client) => getActivitiesService(client, contactId as Contact["id"]),
    { enabled: Boolean(contactId) },
  );

  return {
    isLoading: [contactIds, contact, companies].some(({ isLoading }) => isLoading),
    contact: contact.data,
    companies: get(companies, ["data", "data"]) || [],
    activities: get(activities, ["data", "data"]) || [],
  };
};

export { useContact };
