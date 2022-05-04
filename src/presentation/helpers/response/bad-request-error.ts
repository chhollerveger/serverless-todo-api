import { IResponseBody } from "@protocols"
import { StatusName } from "../http/status";

export class BadRequestError<T = any> extends Error implements IResponseBody {
  data?: any;
  constructor(message: string, data: T) {
    super(message);
    this.name = StatusName.BadRequest;
    this.data = data;
  }
}
