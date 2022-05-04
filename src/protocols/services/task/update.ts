import { ClientTypes, TaskRequestDto } from "@protocols";

export interface IUpdateTaskService {
  update(request: TaskRequestDto): Promise<ClientTypes.UpdateItemOutPut>;
}