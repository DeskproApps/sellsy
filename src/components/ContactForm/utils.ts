import { z } from "zod";
import type { Maybe } from "../../types";
import type { Contact, ContactCreateInput } from "../../services/sellsy/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  firstName: z.string(),
  lastName: z.string().min(1),
  position: z.string(),
  email: z.union([z.string().email(), z.literal("")]),
  phone: z.string(),
});

const getInitValues = (contact?: Maybe<Contact>): FormValidationSchema => ({
  firstName: contact?.first_name || "",
  lastName: contact?.last_name || "",
  position: contact?.position || "",
  email: contact?.email || "",
  phone: contact?.phone_number || "",
});

const getContactValues = (data: FormValidationSchema): ContactCreateInput => {
  return {
    first_name: data.firstName || "",
    last_name: data.lastName || "",
    position: data.position || "",
    email: data.email || "",
    phone_number: data.phone || "",
  };
};

export { validationSchema, getInitValues, getContactValues };
