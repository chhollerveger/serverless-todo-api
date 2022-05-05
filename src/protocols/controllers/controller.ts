import { HttpResponse } from "@presentation";

export interface IController<T = any> {
  handle(data: T): Promise<HttpResponse>;
}