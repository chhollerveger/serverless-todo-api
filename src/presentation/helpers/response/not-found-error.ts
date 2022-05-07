import { IGenericType } from "@protocols"
import { IResponseBody } from "../http/body";
import { StatusName } from "../http/status";

export class NotFoundError implements IResponseBody {
  data: IGenericType<{}>;
  name: string;
  message: string;
  constructor(message: string, data: IGenericType<{}> = undefined) {
    this.data = data;
    this.name = StatusName.NotFound;
    this.message = message;
  }
}