import { IGenericType, IResponseBody } from "@protocols"
import { StatusName } from "../http/status";

export class BadRequestError extends Error implements IResponseBody {
  data: IGenericType<{}>;
  constructor(message: string, data: IGenericType<{}>) {
    super(message);
    this.name = StatusName.BadRequest;
    this.data = data;
  }
}
