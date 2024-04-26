import { Title } from "@deskpro/app-sdk";
import { Container } from "../common";
import type { FC } from "react";

export type Props = {
  //..
};

const Home: FC<Props> = () => {
  return (
    <Container>
      <Title title="Home" />
    </Container>
  );
};

export { Home };
