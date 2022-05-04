import { TaskDto } from "@protocols";

export interface IDeleteTaskService {
  delete(request: TaskDto): Promise<void>;
}