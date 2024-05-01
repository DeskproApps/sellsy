import { Fragment, useMemo } from "react";
import { size } from "lodash";
import { Title, TwoProperties, HorizontalDivider } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { getExternalLinks, isLast } from "../../../utils";
import { NoFound, SellsyLogo } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Company, Contact } from "../../../services/sellsy/types";

export type Props = {
  contact: Maybe<Contact>;
  companies: Company[];
};

const Companies: FC<Props> = ({ companies, contact }) => {
  const link = useMemo(() => {
    return !contact?.id ? null : getExternalLinks.linkedCompanies(contact.id);
  }, [contact?.id]);

  return (
    <>
      <Title
        title={`Linked companies (${size(companies)})`}
        {...(!link ? {} : { link })}
        {...(!link ? {} : { icon: <SellsyLogo/> })}
      />

      {(!Array.isArray(companies) || !size(companies))
        ? <NoFound text="No conpanies found"/>
        : companies.map((company, idx) => (
          <Fragment key={company.id}>
            <Title
              title={company.name}
              icon={<SellsyLogo/>}
              link={getExternalLinks.company(company.id)}
            />
            <TwoProperties
              leftLabel="Email"
              leftText={company.email}
              rightLabel="Created"
              rightText={format(company.created)}
            />
            {!isLast(companies, idx) && <HorizontalDivider style={{ marginBottom: 10 }}/>}
          </Fragment>
        ))
      }
    </>
  );
};

export { Companies };
