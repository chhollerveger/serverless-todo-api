import { HttpResponse, makeHttpResponseHeaders } from "@protocols"
import { BadRequestError } from "../response/bad-request-error";
import { ServerError } from "../response/server-error";
import { StatusCode } from "./status";


export const ok = (data: any): HttpResponse => ({
  statusCode: StatusCode.Success,
  headers: makeHttpResponseHeaders(),
  body: data
});

export const badRequest = (error: BadRequestError): HttpResponse => ({
  statusCode: StatusCode.BadRequest,
  headers: makeHttpResponseHeaders(),
  body: error
});

export const serverError = (error: ServerError): HttpResponse => ({
  statusCode: StatusCode.ServerError,
  headers: makeHttpResponseHeaders(),
  body: (error instanceof ServerError) ? error : new ServerError('Internal server error', null)
});

