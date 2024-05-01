import { cleanup } from "@testing-library/react";
import { render, mockActivities } from "../../../../../testing";
import { Activities } from "../Activities";
import type { Props } from "../Activities";

const renderActivities = (props?: Partial<Props>) => render((
  <Activities
    activities={props?.activities || mockActivities.data as never[]}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Activities", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText, findAllByText } = renderActivities();

      expect(await findByText(/Activities/i)).toBeInTheDocument();

      expect(await findAllByText(/Outcoming phonecall/i)).toHaveLength(2);

      expect(await findByText(/30 Apr 2024, 12:52/i)).toBeInTheDocument();
      expect(await findByText(/Appel planifié/i)).toBeInTheDocument();

      expect(await findByText(/30 Apr 2024, 12:53/i)).toBeInTheDocument();
      expect(await findByText(/Occupé/i)).toBeInTheDocument();
    });

    test("should show \"No activities found\" if no activities", async () => {
      const { findByText } = renderActivities({ activities: [] });

      expect(await findByText(/No activities found/i)).toBeInTheDocument();
    });
  });
});
