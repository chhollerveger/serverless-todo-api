import { TaskDto } from "@protocols";

export interface ICreateTaskService {
  create(request: TaskDto): Promise<string>;
}