import { IResponseBody } from "@protocols"
import { StatusName } from "../helpers/status";

export class SuccessData<T = any> implements IResponseBody {
  message: string;
  name: string;
  data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.name = StatusName.Success;
    this.data = data
  }
}
