export interface ITodoDto {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: 1609475930597;
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