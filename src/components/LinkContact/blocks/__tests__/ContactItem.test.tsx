import { cleanup } from "@testing-library/react";
import { render, mockSearchContacts } from "../../../../../testing";
import { ContactItem } from "../ContactItem";
import type { Props } from "../ContactItem";

const renderContactItem = (props?: Partial<Props>) => render((
  <ContactItem
    contact={props?.contact || mockSearchContacts.data[0] as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkContact", () => {
  describe("ContactItem", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderContactItem();

      expect(await findByText(/Ivan Vyhovsky/i)).toBeInTheDocument();
      expect(await findByText(/ivan.vyhovsky@cossacks.org/i)).toBeInTheDocument();
    });
  });
});
