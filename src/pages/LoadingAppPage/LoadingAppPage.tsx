import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { useLoadingApp } from "./hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useLoadingApp();

  useSetTitle();

  useRegisterElements();

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
