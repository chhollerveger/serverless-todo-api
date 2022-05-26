import { IListResponseDto } from "@protocols";

export const mockListData = (): IListResponseDto => ({
  id: '61470607-e7c4-486a-9334-fc2af1f4c1e5',
  name: 'my todo list',
  createdAt: 1653575340652,
  updatedAt: 1653575340652,
  taskCount: 2,
  tasks: [
    {
      id: '94611e24-ba70-4a01-8e00-5f1b4e7c4552',
      description: 'my task todo list 1',
      completed: false,
      createdAt: 1653575389761,
      updatedAt: 1653575389761
    },
    {
      id: '0f87c7d0-82c6-4d98-9b3a-ea1bca666afa',
      description: 'my task todo list 2',
      completed: true,
      createdAt: 1653575394579,
      updatedAt: 1653575578311
    }
  ]
})