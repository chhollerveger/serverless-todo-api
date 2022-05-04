import { HttpResponse } from "@presentation";

export interface IController<T = any> {
  handle(request: T): Promise<HttpResponse>;
}