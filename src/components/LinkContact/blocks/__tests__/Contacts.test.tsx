import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { mockSearchContacts } from "../../../../../testing";
import { Contacts } from "../Contacts";
import type { Props } from "../Contacts";

const renderContacts = (props?: Partial<Props>) => render((
  <Contacts
    isLoading={props?.isLoading || false}
    contacts={props?.contacts || mockSearchContacts.data as never}
    selectedContact={props?.selectedContact || null}
    onChangeSelectedContact={props?.onChangeSelectedContact || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  describe("Contacts", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderContacts();

      expect(await findByText(/Ivan Vyhovsky/i)).toBeInTheDocument();
      expect(await findByText(/ivan.vyhovsky@cossacks.org/i)).toBeInTheDocument();

      expect(await findByText(/Ivan Mazepa/i)).toBeInTheDocument();
      expect(await findByText(/ivan.mazepa@cossacks.org/i)).toBeInTheDocument();

      expect(await findByText(/Bohdan Khmelnytsky/i)).toBeInTheDocument();
      expect(await findByText(/bohdan.khmelnytsky@cossacks.org/i)).toBeInTheDocument();
    });

    test("should show \"No contacts found\"", async () => {
      const { findByText } = renderContacts({ contacts: [] });

      expect(await findByText(/No contacts found/i)).toBeInTheDocument();
    });

    test("should show \"No found\"", async () => {
      const { findByText } = renderContacts({ contacts: {} as never });

      expect(await findByText(/No found/i)).toBeInTheDocument();
    });
  });
});
