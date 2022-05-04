import { TaskRequestDto } from "@protocols";

export interface IDeleteTaskService {
  delete(request: TaskRequestDto): Promise<void>;
}