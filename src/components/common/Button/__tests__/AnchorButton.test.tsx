import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { AnchorButton } from "../Button";

describe("AnchorButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should show link", async () => {
    const { getByRole } = render((
      <AnchorButton href="https://deskpro.test/callback" text="Click me!" />
    ), { wrappers: { theme: true } });
    const link = getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Click me!");
  });
});
