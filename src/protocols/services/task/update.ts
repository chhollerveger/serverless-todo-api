import { ClientTypes, TaskDto } from "@protocols";

export interface IUpdateTaskService {
  update(request: TaskDto): Promise<ClientTypes.UpdateItemOutPut>;
}