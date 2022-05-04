import { ClientTypes, TaskRequestDto } from "@protocols";

export interface IGetTaskService {
  get(request: TaskRequestDto): Promise<ClientTypes.GetItemOutput>;
}