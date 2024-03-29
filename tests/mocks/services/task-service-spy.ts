import { ICreateTaskService, IDeleteTaskService, IGetTaskService, ITaskResponseDto, IUpdateTaskService, TaskRequestDto } from "@protocols";
import { mockTaskData } from "../data/task-data";

export class TaskServiceSpy implements ICreateTaskService, IDeleteTaskService, IGetTaskService, IUpdateTaskService {
  data: ITaskResponseDto = mockTaskData();
  created: {};

  async create(request: TaskRequestDto): Promise<string> {
    this.data.description = request.description;
    this.created = { taskId: this.data.id };
    return this.data.id;
  }

  async delete(params: TaskRequestDto): Promise<void> {
    this.data.id = params.taskId;
  }

  async get(params: TaskRequestDto): Promise<ITaskResponseDto> {
    if (params.taskId !== this.data.id && params.listId !== this.data.listId) {
      return null;
    }
    return this.data;
  }

  async update(params: TaskRequestDto): Promise<void> {
    if (params.taskId === this.data.id && params.listId === this.data.listId) {
      if (typeof params.completed !== 'undefined') {
        this.data.completed = params.completed;
      }
      if (params.description) {
        this.data.description = params.description;
      }
    }
  }
}