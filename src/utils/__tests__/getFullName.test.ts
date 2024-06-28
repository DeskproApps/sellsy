import { omit } from "lodash";
import { getFullName } from "../getFullName";
import { mockContact } from "../../../testing";

describe("utils", () => {
  describe("getFullName", () => {
    test("should return fullname or email", () => {
      expect(getFullName(mockContact as never)).toBe("Pylyp Orlyk");
      expect(getFullName(omit(mockContact, ["first_name"]) as never)).toBe("Orlyk");
      expect(getFullName(omit(mockContact, ["last_name"]) as never)).toBe("Pylyp");
      expect(getFullName(omit(mockContact, ["last_name", "first_name"]) as never))
        .toBe("pylyp.orlyk@zaporizhian.org");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getFullName(payload as never)).toBe("");
    });
  })
});
