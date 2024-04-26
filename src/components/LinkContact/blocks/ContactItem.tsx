import { useMemo, useCallback } from "react";
import { get } from "lodash";
import { Title, Link } from "@deskpro/app-sdk";
import { getFullName, getExternalLinks } from "../../../utils";
import { SellsyLogo, Secondary } from "../../common";
import type { FC, MouseEventHandler } from "react";
import type { Contact } from "../../../services/sellsy/types";

export type Props = {
  contact: Contact;
  onClickTitle: () => void;
};

const ContactItem: FC<Props> = ({ contact, onClickTitle }) => {
  const fullName = useMemo(() => getFullName(contact), [contact]);

  const onClick: MouseEventHandler<HTMLAnchorElement> = useCallback((e) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <div style={{ marginBottom: 14 }}>
      <Title
        title={!onClickTitle
          ? `${fullName}`
          : (<Link href="#" onClick={onClick}>{fullName}</Link>)
        }
        marginBottom={0}
        link={getExternalLinks.contact(get(contact, ["object", "id"]))}
        icon={<SellsyLogo/>}
      />
      <Secondary type="p5">&lt;{contact.email}&gt;</Secondary>
    </div>
  );
};

export { ContactItem };
