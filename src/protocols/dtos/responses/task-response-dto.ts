export interface ITaskResponseDto {
  id: string;
  listId?: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}