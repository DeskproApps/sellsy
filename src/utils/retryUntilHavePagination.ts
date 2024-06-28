import { get, concat, isEmpty } from "lodash";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe } from "../types";
import type { Pagination } from "../services/sellsy/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseCallback<T> = (client: IDeskproClient, ...params: any) => Promise<Pagination<T>>;

const retryUntilHavePagination = <T>(fn: PromiseCallback<T>): PromiseCallback<T> => {
  return (client, ...params) => {
    let result: T[] = [];
    let offset: Maybe<string> = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const run: () => Promise<any> = () => {
      return fn(
        client,
        ...params,
        !offset ? {} : { offset },
      ).then((res) => {
        const values = get(res, ["data"], []) || [];
        offset = get(res, ["pagination", "offset"]);
        result = !values ? result : concat(result, values);

        if (isEmpty(values)) {
          return { data: result };
        }

        return run();
      });
    };

    return run();
  }
};

export { retryUntilHavePagination };
