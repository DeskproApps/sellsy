import { Fragment } from "react";
import { get, size, split, capitalize } from "lodash";
import {
  Title,
  TwoProperties,
  HorizontalDivider,
} from "@deskpro/app-sdk";
import { NoFound } from "../../common";
import { format } from "../../../utils/date";
import { isLast } from "../../../utils";
import type { FC } from "react";
import type { Activity } from "../../../services/sellsy/types";

export type Props = {
  activities: Activity[];
};

const Activities: FC<Props> = ({ activities }) => {
  return (
    <>
      <Title title="Activities"/>
      {(!Array.isArray(activities) || !size(activities))
        ? <NoFound text="No activities found"/>
        : activities.map((activity, idx) => (
          <Fragment key={activity.id}>
            <Title
              title={
                capitalize(get(activity, ["event_details", "source"]))
                + " "
                + get(split(get(activity, ["event"]), "."), [0])
              }
            />
            <TwoProperties
              leftLabel="Event date"
              leftText={format(get(activity, ["event_date"]), { time: true })}
              rightLabel="Result"
              rightText={get(activity, ["object", "model", "result", "name"])}
            />
            {!isLast(activities, idx) && <HorizontalDivider style={{ marginBottom: 10 }}/>}
          </Fragment>
        ))
      }
    </>
  );
};

export { Activities };
