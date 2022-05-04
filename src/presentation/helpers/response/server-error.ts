import { IResponseBody } from "@protocols";
import { StatusName } from "../http/status";

export class ServerError extends Error implements IResponseBody {
  constructor(message: string, stack: string) {
    super(message);
    this.name = StatusName.ServerError;
    this.stack = stack
  }
}
