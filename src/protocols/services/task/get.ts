import { ClientTypes } from "@protocols";

export interface IGetTaskService {
  get(request: any): Promise<ClientTypes.GetItemOutput>;
}