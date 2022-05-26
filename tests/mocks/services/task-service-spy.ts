import { ICreateTaskService, ITaskResponseDto, TaskRequestDto } from "@protocols";
import { mockTaskData } from "../data/task-data";

export class TaskServiceSpy implements ICreateTaskService {
  data: ITaskResponseDto = mockTaskData();
  created: {};

  async create(request: TaskRequestDto): Promise<string> {
    this.data.description = request.description;
    this.created = { taskId: this.data.id };
    return this.data.id;
  }
}