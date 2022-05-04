import { IResponseBody } from "./body";
import { HttpResponseHeader } from "./header";

export type HttpResponse = {
  statusCode: number;
  headers: HttpResponseHeader;
  body: IResponseBody;
};