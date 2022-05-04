import { ClientTypes, IClientRepository, IGetTaskService } from "@protocols";

export class GetTaskService implements IGetTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async get(request: any): Promise<ClientTypes.GetItemOutput> {
    return await this.clientRepository.get(this.params(request));
  }

  private params(request: any): ClientTypes.GetItem | ClientTypes.DeleteItem {
    return {
      TableName: this.taskTableName,
      Key: {
        "id": request.taskId,
        "listId": request.listId
      },
    };
  }
}