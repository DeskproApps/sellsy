import { has } from "lodash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Input } from "@deskpro/deskpro-ui";
import { getInitValues, validationSchema } from "./utils";
import { Label, Button, ErrorBlock } from "../common";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const ContactForm: FC<Props> = ({
  error,
  contact,
  onSubmit,
  onCancel,
  isEditMode,
}) => {
  const form = useForm<FormValidationSchema>({
    defaultValues: getInitValues(contact),
    resolver: zodResolver(validationSchema),
  });
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error}/>}

      <Label htmlFor="firstName" label="First name">
        <Input
          id="firstName"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["firstName", "message"])}
          value={watch("firstName")}
          {...register("firstName")}
        />
      </Label>

      <Label htmlFor="lastName" label="Last name" required>
        <Input
          id="lastName"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["lastName", "message"])}
          value={watch("lastName")}
          {...register("lastName")}
        />
      </Label>

      <Label htmlFor="position" label="Position">
        <Input
          id="position"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["position", "message"])}
          value={watch("position")}
          {...register("position")}
        />
      </Label>

      <Label htmlFor="email" label="Email">
        <Input
          id="email"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["email", "message"])}
          value={watch("email")}
          {...register("email")}
        />
      </Label>

      <Label htmlFor="phone" label="Phone">
        <Input
          id="phone"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["phone", "message"])}
          value={watch("phone")}
          {...register("phone")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text={isEditMode ? "Save" : "Create"}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        <Button
          type="button"
          text="Cancel"
          intent="tertiary"
          onClick={onCancel}
        />
      </Stack>
    </form>
  );
};

export {ContactForm};
