import type { SellsyAPIError } from "./types";

export type InitData = {
  status: number,
  data: SellsyAPIError,
};

class SellsyError extends Error {
  status: number;
  data: SellsyAPIError;

  constructor({ status, data }: InitData) {
    const message = "SellsyError Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { SellsyError };
