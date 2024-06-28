import { Fragment } from "react";
import { map, size } from "lodash";
import {HorizontalDivider, Title} from "@deskpro/app-sdk";
import { NoFound } from "../../../common";
import { isLast } from "../../../../utils";
import { ActivityItem } from "./ActivityItem";
import type { FC } from "react";
import type { Activity } from "../../../../services/sellsy/types";

export type Props = {
  activities: Activity[];
};

const Activities: FC<Props> = ({ activities }) => {
  return (
    <>
      <Title title={`Activities (${size(activities)})`}/>
      {(!Array.isArray(activities) || !size(activities))
        ? <NoFound text="No activities found"/>
        : map(activities, (activity, idx) => (
          <Fragment>
            <ActivityItem
              key={activity.id}
              activity={activity}
            />
            {!isLast(activities, idx) && (
              <HorizontalDivider style={{ marginBottom: 10 }}/>
            )}
          </Fragment>
        ))
      }
    </>
  );
};

export { Activities };
