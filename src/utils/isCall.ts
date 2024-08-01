import { get } from "lodash";
import type { Activity } from "../services/sellsy/types";

const isCall = (activity?: Activity): activity is Activity => {
  return `${get(activity, ["event"])}`.includes("phonecall");
};

export { isCall };
