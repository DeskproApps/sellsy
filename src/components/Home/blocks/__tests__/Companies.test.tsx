import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockContact, mockCompanies } from "../../../../../testing";
import { Companies } from "../Companies";
import type { Props } from "../Companies";

const renderCompanies = (props?: Partial<Props>) => render((
  <Companies
    contact={props?.contact || mockContact as never}
    companies={props?.companies || mockCompanies.data as never}
  />
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Companies", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderCompanies();

      expect(await findByText(/Linked companies \(2\)/i)).toBeInTheDocument();

      expect(await findByText(/Société X \(test\)/i)).toBeInTheDocument();
      expect(await findByText(/contact\+x@sellsy\.com/i)).toBeInTheDocument();
      expect(await findByText(/23 Apr 2024/i)).toBeInTheDocument();

      expect(await findByText(/Société A \(test\)/i)).toBeInTheDocument();
      expect(await findByText(/contact\+a@sellsy.com/i)).toBeInTheDocument();
      expect(await findByText(/20 Apr 2024/i)).toBeInTheDocument();
    });

    test("should show \"No companies found\" if no companies", async () => {
      const { findByText } = renderCompanies({ companies: [] });

      expect(await findByText(/No conpanies found/i)).toBeInTheDocument();
    });
  });
});
