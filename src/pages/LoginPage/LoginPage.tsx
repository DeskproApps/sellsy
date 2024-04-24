import { useSetTitle, useRegisterElements } from "../../hooks";
import { useLogin } from "./hooks";
import { Login } from "../../components";
import type { FC } from "react";

const LoginPage: FC = () => {
  const { poll, authUrl, isLoading, error } = useLogin();

  useSetTitle();

  useRegisterElements();

  return (
    <Login
      error={error}
      onLogin={poll}
      authUrl={authUrl}
      isLoading={isLoading}
    />
  );
};

export { LoginPage };
