import { useSetTitle, useRegisterElements } from "../../hooks";
import { LinkContact } from "../../components";
import type { FC } from "react";

const LinkContactPage: FC = () => {
  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <LinkContact />
  );
};

export { LinkContactPage };
