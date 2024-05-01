import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1500,
    },
  },
});

const QueryKey = {
  SEARCH: "search",
  LINKED_CONTACT: "linked_contact",
  CONTACT: "contact",
  CONTACT_COMPANIES: "contact_companies",
  CONTACT_ACTIVITIES: "contact_activities"
}

export { queryClient, QueryKey };
