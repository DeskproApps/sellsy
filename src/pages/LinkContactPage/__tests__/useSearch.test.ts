import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { wrap } from "@deskpro/app-testing-utils";
import { searchContactsService } from "../../../services/sellsy";
import { mockSearchContacts } from "../../../../testing";
import { useSearch } from "../hooks";
import type { Result } from "../hooks";

const renderSearchHook = (q?: string) => renderHook<Result, string>(
  () => useSearch(q),
  { wrapper: ({ children }) => wrap(children as never, { query: true }) },
);

jest.mock("../../../services/sellsy/searchService");

describe("useLogout", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("shouldn't return contacts if no search query was passed", async () => {
    (searchContactsService as jest.Mock).mockResolvedValue(mockSearchContacts);

    const { result } = renderSearchHook();

    await waitFor(() => {
      expect(searchContactsService).not.toHaveBeenCalled();
      expect(result.current.contacts).toStrictEqual([]);
    });
  });

  test("should return contacts if search query was passed", async () => {
    (searchContactsService as jest.Mock).mockResolvedValue(mockSearchContacts);

    const { result } = renderSearchHook("search query");

    await waitFor(() => {
      expect(searchContactsService).toHaveBeenCalled();
      expect(result.current.contacts).toEqual(mockSearchContacts.data);
    });
  });
});
