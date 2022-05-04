import { ClientTypes, TaskDto } from "@protocols";

export interface IGetTaskService {
  get(request: TaskDto): Promise<ClientTypes.GetItemOutput>;
}