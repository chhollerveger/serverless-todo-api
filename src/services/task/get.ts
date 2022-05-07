import { NotFoundError } from "@presentation";
import { ClientTypesAdapter, IClientRepository, IGetTaskService, ITaskResponseDto, TaskRequestDto } from "@protocols";

export class GetTaskService implements IGetTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async get(request: TaskRequestDto): Promise<ITaskResponseDto> {
    const data = await this.clientRepository.get(this.params(request));
    if (!data.Item) {
      throw new NotFoundError('Task not found with given identifiers');
    }
    return this.formatData(data);
  }

  private params(request: TaskRequestDto): ClientTypesAdapter.GetItem | ClientTypesAdapter.DeleteItem {
    return {
      TableName: this.taskTableName,
      Key: {
        "id": request.taskId,
        "listId": request.listId
      },
    };
  }

  private formatData(data: ClientTypesAdapter.GetItemOutput): ITaskResponseDto {
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