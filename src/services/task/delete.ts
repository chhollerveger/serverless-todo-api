import { NotFoundError } from "@presentation";
import { ClientTypesAdapter, IClientRepository, IDeleteTaskService, TaskRequestDto } from "@protocols";

export class DeleteTaskService implements IDeleteTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async delete(request: TaskRequestDto): Promise<void> {
    const data = await this.clientRepository.get(this.params(request));
    if (!data.Item) {
      throw new NotFoundError('Task not found with given identifiers');
    }
    await this.clientRepository.delete(this.params(request));
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
}