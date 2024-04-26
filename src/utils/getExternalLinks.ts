import { SELLSY_URL } from "../constants";
import type { Contact } from "../services/sellsy/types";

const getExternalLinks = {
  contact: (id: Contact["id"]): string => `${SELLSY_URL}/peoples/${id}`,
};

export { getExternalLinks };
