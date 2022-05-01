import { ClientTypes } from "@protocols";

export interface IUpdateTaskService {
  update(request: any): Promise<ClientTypes.UpdateItemOutPut>;
}