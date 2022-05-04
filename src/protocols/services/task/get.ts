import { ITaskResponseDto, TaskRequestDto } from "@protocols";

export interface IGetTaskService {
  get(request: TaskRequestDto): Promise<ITaskResponseDto>;
}