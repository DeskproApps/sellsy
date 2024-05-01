import { get } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { getFullName, getExternalLinks } from "../../../utils";
import { SellsyLogo } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Contact } from "../../../services/sellsy/types";

export type Props = {
  contact: Maybe<Contact>;
};

const Details: FC<Props> = ({ contact }) => {
  return (
    <>
      <Title
        title={getFullName(contact)}
        link={getExternalLinks.contact(get(contact, ["id"]))}
        icon={<SellsyLogo/>}
      />
      <Property label="Email" text={get(contact, ["email"])}/>
      <Property label="Position" text={get(contact, ["position"])}/>
      <Property label="Phone" text={get(contact, ["phone_number"])}/>
    </>
  );
};

export { Details };
