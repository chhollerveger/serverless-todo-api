import { ClientTypes, IClientRepository, IDeleteTaskService, TaskRequestDto } from "@protocols";

export class DeleteTaskService implements IDeleteTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async delete(request: TaskRequestDto): Promise<void> {
    await this.clientRepository.get(this.params(request));
    await this.clientRepository.delete(this.params(request));
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