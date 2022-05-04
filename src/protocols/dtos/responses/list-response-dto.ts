import { ITaskResponseTodo } from "./task-response-dto";

export interface IListResponseDto {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  taskCount: number;
  tasks?: ITaskResponseTodo[];
}
