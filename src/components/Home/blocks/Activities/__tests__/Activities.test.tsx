import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { filterActivities } from "../../../../../utils";
import { mockActivities } from "../../../../../../testing";
import { Activities } from "../Activities";
import type { Props } from "../Activities";

const mockFilteredActivities = filterActivities(mockActivities.data as never[]);

const renderActivities = (props?: Partial<Props>) => render((
  <Activities activities={props?.activities || mockFilteredActivities}/>
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Activities", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", () => {
      const { queryByText, queryAllByText } = renderActivities();

      expect(queryByText(/Activities \(7\)/i)).toBeInTheDocument();

      expect(queryByText(/Second email/i)).toBeInTheDocument();
      expect(queryByText(/Deskpro Ltd\. - Rendez-vous sur/i)).toBeInTheDocument();
      expect(queryByText(/One more email/i)).toBeInTheDocument();
      expect(queryByText(/Email Subject/i)).toBeInTheDocument();
      expect(queryByText(/Incoming Call/i)).toBeInTheDocument();
      expect(queryAllByText(/Outcoming Call/i)).toHaveLength(2);
    });

    test("should show \"No activities found\" if no activities", () => {
      const { queryByText } = renderActivities({ activities: [] });

      expect(queryByText(/Activities \(0\)/i)).toBeInTheDocument();
      expect(queryByText(/No activities found/i)).toBeInTheDocument();
    });
  });
});
