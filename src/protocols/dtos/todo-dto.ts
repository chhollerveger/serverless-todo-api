export interface ITodoDto {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  taskCount: number;
  tasks: ITaskTodo[]

}

interface ITaskTodo {
  id: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}