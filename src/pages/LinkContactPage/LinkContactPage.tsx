import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements, useAsyncError } from "../../hooks";
import { useSearch } from "./hooks";
import { setEntityService } from "../../services/deskpro";
import { LinkContact } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { Contact } from "../../services/sellsy/types";

const LinkContactPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Maybe<Contact>>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { contacts, isLoading } = useSearch(searchQuery);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onChangeSearch = useDebouncedCallback(setSearchQuery, 1000);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkContact = useCallback(() => {
    if (!client || !dpUserId || !selectedContact?.id) {
      return;
    }

    setIsSubmitting(true);

    return setEntityService(client, dpUserId, `${selectedContact.id}`)
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, dpUserId, selectedContact, asyncErrorHandler, navigate]);

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <LinkContact
      onCancel={onCancel}
      isLoading={isLoading}
      contacts={contacts}
      isSubmitting={isSubmitting}
      onLinkContact={onLinkContact}
      onChangeSearch={onChangeSearch}
      selectedContact={selectedContact}
      onChangeSelectedContact={setSelectedContact}
    />
  );
};

export { LinkContactPage };
