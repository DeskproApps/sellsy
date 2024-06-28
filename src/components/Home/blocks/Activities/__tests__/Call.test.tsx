import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockActivities } from "../../../../../../testing";
import { Call } from "../Call";
import type { Props } from "../Call";

const mockCallActivity = mockActivities.data[3];
const mockCallWithoutDescription = mockActivities.data[2];

const renderCallActivity = (props?: Partial<Props>) => render((
  <Call
    activity={props?.activity || mockCallActivity as never}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Activities", () => {
    describe("Call", () => {
      afterEach(() => {
        jest.clearAllMocks();
        cleanup();
      });

      test("render", async () => {
        const { queryByText } = renderCallActivity();

        expect(queryByText(/Incoming Call/i)).toBeInTheDocument();
        expect(queryByText(/27 Jun 2024, 12:10/i)).toBeInTheDocument();
        expect(queryByText(/note for "Add call"/i)).toBeInTheDocument();
      });

      test("render call activity without note", () => {
        const { queryByText } = renderCallActivity({ activity: mockCallWithoutDescription as never });

        expect(queryByText(/Outcoming Call/i)).toBeInTheDocument();
        expect(queryByText(/26 Jun 2024, 16:50/i)).toBeInTheDocument();
        expect(queryByText(/note/i)).not.toBeInTheDocument();
      });
    });
  });
});
