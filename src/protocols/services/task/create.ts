import { TaskRequestDto } from "@protocols";

export interface ICreateTaskService {
  create(request: TaskRequestDto): Promise<string>;
}