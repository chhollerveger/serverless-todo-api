import { HttpResponse } from "@presentation";

export interface IController<T = any> {
  handle(a: T, b?: T): Promise<HttpResponse>;
}