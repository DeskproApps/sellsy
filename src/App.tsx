import { useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useLogout, useUnlinkContact } from "./hooks";
import { isNavigatePayload } from "./utils";
import {
  HomePage,
  LoginPage,
  LoadingAppPage,
  LinkContactPage,
  EditContactPage,
  AdminCallbackPage,
  CreateContactPage,
} from "./pages";
import { ErrorFallback } from "./components";
import type { FC } from "react";
import type { EventPayload } from "./types";

const App: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { client } = useDeskproAppClient();
  const { unlink, isLoading: isLoadingUnlink } = useUnlinkContact();
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const isAdmin = useMemo(() => pathname.includes("/admin/"), [pathname]);
  const isLoading = useMemo(() => {
    return !client || isLoadingUnlink || isLoadingLogout
  }, [client, isLoadingUnlink, isLoadingLogout]);

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .with("unlink", unlink)
      .with("logout", logout)
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/admin/callback" element={<AdminCallbackPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/contacts/link" element={<LinkContactPage/>}/>
        <Route path="/contacts/create" element={<CreateContactPage/>}/>
        <Route path="/contacts/edit" element={<EditContactPage/>}/>
        <Route index element={<LoadingAppPage/>} />
      </Routes>
      {!isAdmin && (<><br/><br/><br/></>)}
    </ErrorBoundary>
  );
};

export { App };
