import { get, size } from "lodash";
import { Title } from "@deskpro/app-sdk";
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
        : activities.map((activity, idx) => (
          <ActivityItem
            key={get(activity, ["id"])}
            isLast={isLast(activities, idx)}
            activity={activity}
          />
        ))
      }
    </>
  );
};

export { Activities };
