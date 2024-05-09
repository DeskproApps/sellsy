import { getInitValues } from "../utils";
import { mockContact } from "../../../../testing";

describe("ContactForm", () => {
  describe("utils", () => {
    describe("getInitValues", () => {
      test("should return empty values", () => {
        expect(getInitValues()).toStrictEqual({
          firstName: "",
          lastName: "",
          position: "",
          email: "",
          phone: "",
        });
      });

      test("should return init contact values", () => {
        expect(getInitValues(mockContact as never)).toStrictEqual({
          firstName: "Pylyp",
          lastName: "Orlyk",
          position: "Hetman",
          email: "pylyp.orlyk@zaporizhian.org",
          phone: "+442035821980",
        });
      });

      test.each([{}, [], "", 123, 0, false, true])("wrong value: %p", (value) => {
        expect(getInitValues(value as never)).toStrictEqual({
          firstName: "",
          lastName: "",
          position: "",
          email: "",
          phone: "",
        });
      });
    });
  });
});
