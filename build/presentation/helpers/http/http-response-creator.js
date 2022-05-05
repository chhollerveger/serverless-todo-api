import { SuccessData } from "@presentation";
import { ServerError } from "../response/server-error";
import { makeHttpResponseHeaders } from "./header";
import { StatusCode } from "./status";
export class HttpResponseCreator {
}
HttpResponseCreator.success = (message, data = undefined) => ({
    statusCode: StatusCode.Success,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(new SuccessData(message, data))
});
HttpResponseCreator.badRequest = (error) => ({
    statusCode: StatusCode.BadRequest,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(error)
});
HttpResponseCreator.serverError = (error) => ({
    statusCode: StatusCode.ServerError,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify((error instanceof ServerError) ? error : new ServerError('Internal server error', error.stack))
});
//# sourceMappingURL=http-response-creator.js.map