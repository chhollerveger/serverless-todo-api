import { Ok } from "@presentation";
import { IGenericType } from "@protocols";
import { BadRequestError } from "../response/bad-request-error";
import { Created } from "../response/created";
import { NotFoundError } from "../response/not-found-error";
import { ServerError } from "../response/server-error";
import { makeHttpResponseHeaders } from "./header";
import { HttpResponse } from "./response";
import { StatusCode } from "./status";

export class HttpResponseCreator {

  public static ok = (message: string, data: IGenericType<{}> = undefined): HttpResponse => ({
    statusCode: StatusCode.Ok,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(new Ok(message, data))
  });

  public static created = (message: string, data: IGenericType<{}> = undefined): HttpResponse => ({
    statusCode: StatusCode.Created,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(new Created(message, data))
  });

  public static badRequest = (error: BadRequestError): HttpResponse => ({
    statusCode: StatusCode.BadRequest,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(error)
  });

  public static notFound = (error: NotFoundError): HttpResponse => ({
    statusCode: StatusCode.NotFound,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(error)
  });

  public static serverError = (error: ServerError | Error): HttpResponse => ({
    statusCode: StatusCode.ServerError,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify((error instanceof ServerError) ? error : new ServerError('Internal server error'))
  });

  public static handleException = (error: NotFoundError | BadRequestError | ServerError | Error): HttpResponse => {
    const exception = (error instanceof NotFoundError) ? HttpResponseCreator.notFound(error)
      : (error instanceof BadRequestError) ? HttpResponseCreator.badRequest(error)
        : HttpResponseCreator.serverError(error);
    return exception;
  };
}




