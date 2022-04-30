import { IHttpResponse } from "@protocols";
import { StatusCode } from "src/enums";
import { IResponseBody } from "./body";
import { RESPONSE_HEADERS } from "./header";
import { STATUS_MESSAGES } from "./status";

export class ResponseModel {
  private body: IResponseBody;
  private code: number;

  /**
   * ResponseModel Constructor
   * @param data
   * @param code
   * @param message
   */
  constructor(data = {}, code: StatusCode, message = '') {
    this.body = {
      data: data,
      message: message,
      status: STATUS_MESSAGES[code],
    };
    this.code = code;
  }

  setBodyVariable = (variable: string, value: string): void => {
    this.body[variable] = value;
  }

  setData = (data: any): void => {
    this.body.data = data;
  }

  setCode = (code: number): void => {
    this.code = code;
  }

  getCode = (): number => {
    return this.code;
  }

  setMessage = (message: string): void => {
    this.body.message = message;
  }

  getMessage = (): any => {
    return this.body.message;
  }

  generate = (): IHttpResponse => {
    return {
      statusCode: this.code,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify(this.body),
    };
  }
}