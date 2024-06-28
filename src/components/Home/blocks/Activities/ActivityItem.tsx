import { match, P } from "ts-pattern";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { isCall, isEmail } from "../../../../utils";
import { Call } from "./Call";
import { Email } from "./Email";
import type { FC } from "react";
import type { Activity } from "../../../../services/sellsy/types";

export type Props = {
  isLast: boolean;
  activity: Activity;
};

const ActivityItem: FC<Props> = ({ activity, isLast }) => {
  const Item = match(activity)
    .with(P.when(isCall), () => Call)
    .with(P.when(isEmail), () => Email)
    .otherwise(() => null);

  if (!Item) {
    return null
  }

  return (
    <>
      <Item activity={activity}/>
      {!isLast && <HorizontalDivider style={{ marginBottom: 10 }}/>}
    </>
  );
};

export { ActivityItem };
