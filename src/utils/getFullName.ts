import { get, size } from "lodash";
import type { Maybe } from "../types";
import type { Contact } from "../services/sellsy/types";

const getFullName = (contact?: Maybe<Contact>): string => {
  const name = [
    get(contact, ["first_name"]),
    get(contact, ["last_name"]),
  ].filter(Boolean);

  return size(name) ? name.join(" ") : get(contact, ["email"]) || "";
};

export { getFullName };
