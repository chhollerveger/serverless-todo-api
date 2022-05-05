import { IGenericType } from "@protocols"
import { IResponseBody } from "../http/body";
import { StatusName } from "../http/status";

export class BadRequestError implements IResponseBody {
  data: IGenericType<{}>;
  name: string;
  message: string;
  constructor(message: string, data: IGenericType<{}>) {
    this.data = data;
    this.name = StatusName.BadRequest;
    this.message = message;
  }
}
