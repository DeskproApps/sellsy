import { SELLSY_URL } from "../constants";
import type { Contact, Company } from "../services/sellsy/types";

const getExternalLinks = {
  contact: (id: Contact["id"]): string => `${SELLSY_URL}/peoples/${id}`,
  linkedCompanies: (id: Contact["id"]) => `${SELLSY_URL}/peoples/${id}/thirds`,
  company: (id: Company["id"]) => `${SELLSY_URL}/thirds/prospect/${id}`,
};

export { getExternalLinks };
