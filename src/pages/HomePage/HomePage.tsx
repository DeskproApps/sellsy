import { LoadingSpinner } from "@deskpro/app-sdk";
import { useContact, useSetTitle, useRegisterElements } from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { contact, companies, activities, isLoading } = useContact();

  useSetTitle();

  useRegisterElements(({ registerElement }) => {
    registerElement("edit", {
      type: "edit_button",
      payload: { type: "changePage", path: `/contacts/edit` },
    });
    registerElement("menu", {
      type: "menu",
      items: [
        { title: "Log Out", payload: { type: "logout" } },
        { title: "Unlink Contact", payload: { type: "unlink" } },
      ],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Home
      contact={contact}
      companies={companies}
      activities={activities}
    />
  );
};

export { HomePage };
