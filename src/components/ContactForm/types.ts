import { z } from "zod";
import { validationSchema } from "./utils";
import type { SubmitHandler } from "react-hook-form";
import type { Maybe } from "../../types";
import type { Contact } from "../../services/sellsy/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type Props = {
  onSubmit: SubmitHandler<FormValidationSchema>;
  onCancel?: () => void;
  error?: Maybe<string|string[]>;
  isEditMode?: boolean;
  contact?: Maybe<Contact>;
};
