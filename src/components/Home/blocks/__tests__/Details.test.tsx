import { cleanup } from "@testing-library/react";
import { render, mockContact } from "../../../../../testing";
import { Details } from "../Details";
import type { Props } from "../Details";

const renderDetails = (props?: Partial<Props>) => render((
  <Details contact={props?.contact || mockContact as never}/>
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Details", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderDetails();

      expect(await findByText(/Pylyp Orlyk/i)).toBeInTheDocument();
      expect(await findByText(/pylyp.orlyk@zaporizhian.org/i)).toBeInTheDocument();
      expect(await findByText(/Hetman/i)).toBeInTheDocument();
      expect(await findByText(/\+442035821980/i)).toBeInTheDocument();
    });
  });
});
