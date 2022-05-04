import { IGenericType } from "@protocols";

export interface IResponseBody {
  message: string;
  name: string;
  data?: IGenericType<{}>;
};