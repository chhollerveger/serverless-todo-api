import { ClientTypes, IClientRepository, IGetTaskService, TaskRequestDto } from "@protocols";

export class GetTaskService implements IGetTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async get(request: TaskRequestDto): Promise<ClientTypes.GetItemOutput> {
    return await this.clientRepository.get(this.params(request));
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
}