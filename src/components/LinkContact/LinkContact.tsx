import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, Navigation } from "../common";
import { Buttons, Contacts } from "./blocks";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../types";
import type { Contact } from "../../services/sellsy/types";

type Props = {
  isLoading: boolean;
  onCancel: () => void;
  isSubmitting: boolean;
  contacts: Contact[];
  onLinkContact: () => void;
  onNavigateToCreate: () => void;
  selectedContact: Maybe<Contact>;
  onChangeSearch: (search: string) => void;
  onChangeSelectedContact: Dispatch<Maybe<Contact>>;
};

const LinkContact: FC<Props> = ({
  onCancel,
  contacts,
  isLoading,
  isSubmitting,
  onLinkContact,
  onChangeSearch,
  selectedContact,
  onNavigateToCreate,
  onChangeSelectedContact,
}) => {
  return (
    <>
      <Container>
        <Navigation onNavigateToCreate={onNavigateToCreate}/>
        <Search isFetching={isLoading} onChange={onChangeSearch}/>
        <Buttons
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          onLinkContact={onLinkContact}
          selectedContact={selectedContact}
        />
      </Container>
      <HorizontalDivider/>
      <Container>
        <Contacts
          contacts={contacts}
          isLoading={isLoading}
          selectedContact={selectedContact}
          onChangeSelectedContact={onChangeSelectedContact}
        />
      </Container>
    </>
  );
};

export { LinkContact };
