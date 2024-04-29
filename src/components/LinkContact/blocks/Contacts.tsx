import { Fragment } from "react";
import { size } from "lodash";
import { Radio } from "@deskpro/deskpro-ui";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { Card, NoFound } from "../../common";
import { ContactItem } from "./ContactItem";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../../types";
import type { Contact } from "../../../services/sellsy/types";

export type Props = {
  isLoading: boolean;
  contacts: Maybe<Contact[]>;
  selectedContact: Maybe<Contact>;
  onChangeSelectedContact: Dispatch<Maybe<Contact>>;
};

const Contacts: FC<Props> = ({
  contacts,
  isLoading,
  selectedContact,
  onChangeSelectedContact,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <>
      {!Array.isArray(contacts)
        ? <NoFound/>
        : !size(contacts)
          ? <NoFound text="No contacts found"/>
          : contacts.map((contact) => (
            <Fragment key={contact.id}>
              <Card>
                <Card.Media>
                  <Radio
                    size={12}
                    id={`${contact.id}`}
                    style={{ marginTop: 4 }}
                    checked={contact.id === selectedContact?.id}
                    onChange={() => onChangeSelectedContact(contact)}
                  />
                </Card.Media>
                <Card.Body>
                  <ContactItem
                    contact={contact}
                    onClickTitle={() => onChangeSelectedContact(contact)}
                  />
                </Card.Body>
              </Card>
            </Fragment>
          ))
      }
    </>
  );
}

export { Contacts };
