import { IResponseBody } from "../http/body";
import { StatusName } from "../http/status";

export class ServerError extends Error implements IResponseBody {
  constructor(message: string, stack: string = undefined) {
    super(message);
    this.message = message;
    this.name = StatusName.ServerError;
    this.stack = stack
  }
}
