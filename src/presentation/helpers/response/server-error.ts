import { IGenericType } from "@protocols";
import { IResponseBody } from "../http/body";
import { StatusName } from "../http/status";

export class ServerError implements IResponseBody {
  data: IGenericType<{}>;
  name: string;
  message: string;

  constructor(message: string, data: IGenericType<{}> = undefined) {
    this.data = data;
    this.name = StatusName.ServerError;
    this.message = message
  }
}
