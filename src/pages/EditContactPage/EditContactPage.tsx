import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, useDeskproAppClient } from "@deskpro/app-sdk";
import { useRegisterElements, useContact } from "../../hooks";
import { updateContactService } from "../../services/sellsy";
import { DEFAULT_ERROR } from "../../constants";
import { getContactValues } from "../../components/ContactForm";
import { EditContact } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/ContactForm";

const EditContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { isLoading, contact } = useContact();
  const contactId = useMemo(() => contact?.id, [contact]);

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !contactId) {
      return Promise.resolve();
    }

    return updateContactService(client, contactId, getContactValues(data))
      .then(() => navigate("/home"))
      .catch((err) => setError(get(err, ["data", "error", "message"]) || DEFAULT_ERROR));
  }, [client, navigate, contactId]);

  useRegisterElements();

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <EditContact
      error={error}
      contact={contact}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

export { EditContactPage };
