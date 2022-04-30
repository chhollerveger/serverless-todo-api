import { ResponseHeader } from "@models";

export interface IHttpResponse {
  statusCode: number;
  headers: ResponseHeader;
  body: string;
};