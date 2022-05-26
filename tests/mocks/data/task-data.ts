import { ITaskResponseDto } from "@protocols";

export const mockTaskData = (): ITaskResponseDto => ({
  id: '0f87c7d0-82c6-4d98-9b3a-ea1bca666afa',
  listId: '61470607-e7c4-486a-9334-fc2af1f4c1e5',
  description: 'my todo list',
  completed: true,
  createdAt: 1653575394579,
  updatedAt: 1653575578311
})