import { get } from "lodash";
import type { Activity } from "../services/sellsy/types";

const isEmail = (activity: Activity): activity is Activity => {
  return `${get(activity, ["event"])}`.includes("emailengine.sent");
};

export { isEmail };
