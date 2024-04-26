import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { Button } from "../Button";

describe("Button", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should show button", async () => {
    const { getByRole } = render((
      <Button type="button" text="Click me!" />
    ), { wrappers: { theme: true } });
    const button = getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me!");
  });
});
