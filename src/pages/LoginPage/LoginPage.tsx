import { useSetTitle, useRegisterElements } from "../../hooks";
import { Login } from "../../components";
import type { FC } from "react";
import { useLogin } from "./hooks";

const LoginPage: FC = () => {
  const { onSignIn, authUrl, isLoading, error } = useLogin();

  useSetTitle();

  useRegisterElements();

  return (
    <Login
      error={error}
      onLogin={onSignIn}
      authUrl={authUrl}
      isLoading={isLoading}
    />
  );
};

export { LoginPage };
