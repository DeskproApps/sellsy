import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Details, Companies, Activities } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Contact, Company, Activity } from "../../services/sellsy/types";

export type Props = {
  contact: Maybe<Contact>;
  companies: Company[];
  activities: Activity[];
};

const Home: FC<Props> = ({ contact, companies, activities }) => {
  return (
    <>
      <Container>
        <Details contact={contact}/>
      </Container>
      <HorizontalDivider/>
      <Container>
        <Companies contact={contact} companies={companies}/>
      </Container>
      <HorizontalDivider/>
      <Container>
        <Activities activities={activities}/>
      </Container>
    </>
  );
};

export { Home };
