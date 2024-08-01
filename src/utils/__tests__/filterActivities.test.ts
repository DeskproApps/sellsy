import { filterActivities } from "../filterActivities";
import { mockActivities } from "../../../testing";

describe("utils", () => {
  describe("filterActivities", () => {
    test("should return only needed and unique activities", () => {
      const result = filterActivities(mockActivities.data as never);
      expect(result[0]).toMatchObject({
        id: "oookVZABSRyhjBW9joFC",
        event_more: { subject: "Second email" },
      });
      expect(result[1]).toMatchObject({
        id: "j4cMVJABSRyhjBW9EEUZ",
        object: { model: {  source: "outcoming" } },
      });
      expect(result[2]).toMatchObject({
        id: "mCYmVZAB2sbb82mxL21c",
        object: { model: {  source: "outcoming" } },
      });
      expect(result[3]).toMatchObject({
        id: "TiYqVZAB2sbb82mxVHjw",
        object: { model: {  source: "incoming" } },
      });
      expect(result[4]).toMatchObject({
        id: "xQh_VJABn8gs-IgEcdfS",
        event_more: { subject: "Deskpro Ltd. - Rendez-vous sur" },
      });
      expect(result[5]).toMatchObject({
        id: "KgsjVZABn8gs-IgEOyKc",
        event_more: { subject: "One more email" },
      });
      expect(result[6]).toMatchObject({
        id: "XgcLVJABn8gs-IgEHtZO",
        event_more: { subject: "Email Subject" },
      });
      expect(result[7]).toBeUndefined();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(filterActivities(value as never)).toEqual([]);
    });
  });
});
