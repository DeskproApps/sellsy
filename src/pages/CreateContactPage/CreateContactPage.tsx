import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { setEntityService } from "../../services/deskpro";
import { createContactService } from "../../services/sellsy";
import { DEFAULT_ERROR } from "../../constants";
import { CreateContact } from "../../components";
import { getContactValues } from "../../components/ContactForm";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { Contact } from "../../services/sellsy/types";
import type { FormValidationSchema } from "../../components/ContactForm";

const CreateContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);
  const contact: Contact = useMemo(() => ({
    first_name: get(context, ["data", "user", "firstName"]) || "",
    last_name: get(context, ["data", "user", "lastName"]) || "",
    email: get(context, ["data", "user", "primaryEmail"])
      || get(context, ["data", "user", "emails",0])
      || "",
  }), [context]);

  const onNavigateToLink = useCallback(() => navigate("/contacts/link"), [navigate]);

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !dpUserId) {
      return Promise.resolve();
    }

    return createContactService(client, getContactValues(data))
      .then((contact) => !contact?.id
        ? Promise.resolve()
        : setEntityService(client, dpUserId, `${contact.id}`)
      )
      .then(() => navigate("/home"))
      .catch((err) => setError(get(err, ["data", "error", "message"]) || DEFAULT_ERROR));
  }, [client, navigate, dpUserId]);

  useSetTitle("Link Contact");

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateContact
      error={error}
      contact={contact}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateContactPage };
