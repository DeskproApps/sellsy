import { getContactValues } from "../utils";
import { default as mockValues } from "./values.json";

describe("ContactForm", () => {
  describe("utils", () => {
    describe("getContactValues", () => {
      test("should return full contact values", () => {
        expect(getContactValues(mockValues as never)).toStrictEqual({
          first_name: "Dorcas",
          last_name: "McCullough",
          position: "Radiologic Technologist",
          email: "cormac.mccarthy@example.org",
          phone_number: "+33987679431",
        });
      });

      test.each([{}, [], "", 123, 0, false, true])("wrong value: %p", (value) => {
        expect(getContactValues(value as never)).toStrictEqual({
          email: "",
          first_name: "",
          last_name: "",
          phone_number: "",
          position: "",
        });
      });
    });
  });
});
