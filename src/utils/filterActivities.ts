import { uniqBy, filter, isEmpty } from "lodash";
import { isCall } from "./isCall";
import { isEmail } from "./isEmail";
import type { Activity } from "../services/sellsy/types";

const filterActivities = (activities?: Activity[]) => {
  if (!Array.isArray(activities) || isEmpty(activities)) {
    return [];
  }

  const onlyNeededActivities = filter(activities, (a) => isCall(a) || isEmail(a));

  return uniqBy(onlyNeededActivities, "object.id");
};

export { filterActivities };
