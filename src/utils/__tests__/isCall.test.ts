import { isCall } from "../isCall";
import { mockActivities } from "../../../testing";

const mockCallActivity = mockActivities.data[1];
const mockEmailActivity = mockActivities.data[0];

describe("utils", () => {
  describe("isCall", () => {
    test("should return true if the activity is Call", () => {
      expect(isCall(mockCallActivity as never)).toBeTruthy();
    });

    test("shouldn't be true if the activity is not Call", () => {
      expect(isCall(mockEmailActivity as never)).toBeFalsy();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(isCall(value as never)).toBeFalsy();
    });
  });
});
