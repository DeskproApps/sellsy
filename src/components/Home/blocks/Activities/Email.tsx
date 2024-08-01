import { useMemo } from "react";
import { get } from "lodash";
import { Title, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../../utils/date";
import type { FC } from "react";
import type { Activity } from "../../../../services/sellsy/types";

export type Props = {
  activity: Activity;
};

const Email: FC<Props> = ({ activity }) => {
  const title = useMemo(() => {
    return get(activity, ["event_more", "subject"]) || "Email";
  }, [activity]) as string;

  return (
    <>
      <Title title={title} />
      <TwoProperties
        leftLabel="Type"
        leftText="Email"
        rightLabel="Date"
        rightText={format(get(activity, ["event_date"]), { time: true })}
      />
    </>
  );
};

export { Email};
