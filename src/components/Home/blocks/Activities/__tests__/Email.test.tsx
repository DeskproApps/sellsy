import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockActivities } from "../../../../../../testing";
import { Email } from "../Email";
import type { Props } from "../Email";

const mockEmailActivity = mockActivities.data[10];

const renderEmailActivity = (props?: Partial<Props>) => render((
  <Email
    activity={props?.activity || mockEmailActivity as never}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Activities", () => {
    describe("Email", () => {
      afterEach(() => {
        jest.clearAllMocks();
        cleanup();
      });

      test("render", async () => {
        const { queryByText } = renderEmailActivity();

        expect(queryByText(/Deskpro Ltd\. - Rendez-vous sur/i)).toBeInTheDocument();
        expect(queryByText(/Email/i)).toBeInTheDocument();
        expect(queryByText(/26 Jun 2024, 12:22/i)).toBeInTheDocument();
      });
    });
  });
});
