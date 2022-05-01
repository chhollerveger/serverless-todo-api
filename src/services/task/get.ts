import { ClientTypes, IClientRepository } from "@protocols";
import { IGetTaskService } from "src/protocols/services/task/get";

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