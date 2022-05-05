import { IGenericType } from "@protocols"
import { IResponseBody } from "../http/body";
import { StatusName } from "../http/status";

export class SuccessData implements IResponseBody {
  data: IGenericType<{}>;
  name: string;
  message: string;

  constructor(message: string, data: IGenericType<{}>) {
    this.message = message;
    this.name = StatusName.Success;
    this.data = data
  }
}
