import { ITodoModel } from "../todo/todo-model";

export interface ITaskModel extends ITodoModel {
  listId: string;
  description: string;
  completed: boolean;
}