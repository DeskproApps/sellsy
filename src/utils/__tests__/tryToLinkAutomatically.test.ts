import { cleanup, act, waitFor } from "@testing-library/react";
import { tryToLinkAutomatically } from "../tryToLinkAutomatically";
import { getEntityListService, setEntityService } from "../../services/deskpro";
import { mockClient, mockUserContext } from "@deskpro/app-testing-utils";
import { searchContactsService } from "../../services/sellsy";
import { mockSearchContacts } from "../../../testing";

jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/deskpro/setEntityService");
jest.mock("../../services/sellsy/searchService");

describe("utils", () => {
  describe("tryToLinkAutomatically", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("shouldn't link contact if already a linked", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue(["1"]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (searchContactsService as jest.Mock).mockResolvedValue(mockSearchContacts);

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockUserContext.data.user);
      });

      await waitFor(() => {
        expect(getEntityListService).toHaveBeenCalled();
        expect(searchContactsService).not.toHaveBeenCalled();
        expect(setEntityService).not.toHaveBeenCalled();
      });
    });

    test("shouldn't link contact if the dp user has no email", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue(["1"]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (searchContactsService as jest.Mock).mockResolvedValue(mockSearchContacts);

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, {} as never);
      });

      await waitFor(() => {
        expect(getEntityListService).toHaveBeenCalled();
        expect(searchContactsService).not.toHaveBeenCalled();
        expect(setEntityService).not.toHaveBeenCalled();
      });
    });

    test("shouldn't link if no contacts found", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (searchContactsService as jest.Mock).mockResolvedValue({});

      await waitFor(async () => {
        await act(async () => {
          await tryToLinkAutomatically(mockClient as never, mockUserContext.data.user);
        });

        expect(getEntityListService).toHaveBeenCalled();
        expect(searchContactsService).toHaveBeenCalled();
        expect(setEntityService).not.toHaveBeenCalled();
      });
    });

    test("should link contact", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (searchContactsService as jest.Mock).mockResolvedValue(mockSearchContacts);

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockUserContext.data.user);
      });

      await waitFor(() => {
        expect(getEntityListService).toHaveBeenCalled();
        expect(searchContactsService).toHaveBeenCalled();
        expect(setEntityService).toHaveBeenCalled();
      });
    });
  });
});
