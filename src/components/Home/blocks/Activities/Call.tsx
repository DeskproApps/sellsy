import { useMemo } from "react";
import { get, trim, capitalize } from "lodash";
import { Title, Property, TwoProperties } from "@deskpro/app-sdk";
import { format } from "../../../../utils/date";
import type { FC } from "react";
import type { Activity } from "../../../../services/sellsy/types";

export type Props = {
  activity: Activity;
};

const Call: FC<Props> = ({ activity }) => {
  const title = useMemo(() => {
    const source = capitalize(get(activity, ["object", "model", "source"], ""));
    return trim(`${source} Call`);
  }, [activity]);
  const note = useMemo(() => {
    return get(activity, ["object", "model", "description"]) || null;
  }, [activity]);

  return (
    <>
      <Title title={title}/>
      <TwoProperties
        leftLabel="Type"
        leftText="Call"
        rightLabel="Date"
        rightText={format(get(activity, ["object", "model", "date"]), { time: true })}
      />
      {note && (
        <Property label="Note" text={note}/>
      )}
    </>
  );
};

export { Call };
