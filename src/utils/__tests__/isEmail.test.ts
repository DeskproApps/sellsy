import { isEmail } from "../isEmail";
import { mockActivities } from "../../../testing";

const mockCallActivity = mockActivities.data[1];
const mockEmailActivity = mockActivities.data[0];

describe("utils", () => {
  describe("isEmail", () => {
    test("should return true if the activity is Email", () => {
      expect(isEmail(mockEmailActivity as never)).toBeTruthy();
    });

    test("shouldn't be true if the activity is not Email", () => {
      expect(isEmail(mockCallActivity as never)).toBeFalsy();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(isEmail(value as never)).toBeFalsy();
    });
  });
});
