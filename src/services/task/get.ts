import { ClientTypes, IClientRepository, IGetTaskService, ITaskResponseDto, TaskRequestDto } from "@protocols";

export class GetTaskService implements IGetTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async get(request: TaskRequestDto): Promise<ITaskResponseDto> {
    const data = await this.clientRepository.get(this.params(request));
    return this.formatData(data);
  }

  private params(request: TaskRequestDto): ClientTypes.GetItem | ClientTypes.DeleteItem {
    return {
      TableName: this.taskTableName,
      Key: {
        "id": request.taskId,
        "listId": request.listId
      },
    };
  }

  private formatData(data: ClientTypes.GetItemOutput): ITaskResponseDto {
    return {
      id: data.Item.id,
      listId: data.Item.listId,
      description: data.Item.description,
      completed: data.Item.completed,
      createdAt: data.Item.createdAt,
      updatedAt: data.Item.updatedAt,
    }
  }
}