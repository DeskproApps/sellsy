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

    test("render", () => {
      const { queryByText } = renderCompanies();

      expect(queryByText(/Linked companies \(1\)/i)).toBeInTheDocument();

      expect(queryByText(/Enchante/i)).toBeInTheDocument();
      expect(queryByText(/contact@sellsy\.fr/i)).toBeInTheDocument();
      expect(queryByText(/25 Jun 2024/i)).toBeInTheDocument();
    });

    test("should show \"No companies found\" if no companies", () => {
      const { queryByText } = renderCompanies({ companies: [] });
      expect(queryByText(/No conpanies found/i)).toBeInTheDocument();
    });
  });
});
