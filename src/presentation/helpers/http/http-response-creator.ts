import { SuccessData } from "@presentation";
import { HttpResponse, IGenericType, makeHttpResponseHeaders } from "@protocols"
import { BadRequestError } from "../response/bad-request-error";
import { ServerError } from "../response/server-error";
import { StatusCode } from "./status";

export class HttpResponseCreator {

  public static success = (message: string, data: IGenericType<{}> = undefined): HttpResponse => ({
    statusCode: StatusCode.Success,
    headers: makeHttpResponseHeaders(),
    body: new SuccessData(message, data)
  });

  public static badRequest = (error: BadRequestError): HttpResponse => ({
    statusCode: StatusCode.BadRequest,
    headers: makeHttpResponseHeaders(),
    body: error
  });

  public static serverError = (error: ServerError): HttpResponse => ({
    statusCode: StatusCode.ServerError,
    headers: makeHttpResponseHeaders(),
    body: (error instanceof ServerError) ? error : new ServerError('Internal server error', null)
  });
}



