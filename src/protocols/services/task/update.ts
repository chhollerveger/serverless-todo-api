import { TaskRequestDto } from "@protocols";

export interface IUpdateTaskService {
  update(request: TaskRequestDto): Promise<void>;
}