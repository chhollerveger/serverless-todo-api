
import { IHttpResponse } from '../models/http-response';

export interface IController<T = any> {
  handle(request: T): Promise<IHttpResponse>;
}