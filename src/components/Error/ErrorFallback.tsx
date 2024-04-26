import { get } from "lodash";
import { match } from "ts-pattern";
import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR } from "../../constants";
import { SellsyError } from "../../services/sellsy";
import { Container, ErrorBlock } from "../common";
import type { FC } from "react";
import type { FallbackProps } from "react-error-boundary";

type Props = Omit<FallbackProps, "error"> & {
  error: Error,
};

const ErrorFallback: FC<Props> = ({ error }) => {
  let message = DEFAULT_ERROR;
  let consoleMessage;

  if (error instanceof SellsyError) {
    message = match(get(error, ["data", "error", "code"]))
      .with(401, () => "Unauthorized")
      .otherwise(() => get(error, ["data", "error", "message"]) || DEFAULT_ERROR);
  }

  // eslint-disable-next-line no-console
  console.error(consoleMessage || error);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
