import { ITaskModel, TaskModel } from "@models";
import { ClientTypes, IClientRepository, ICreateTaskService } from "@protocols";

export class CreateTaskService implements ICreateTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listTableName = process.env.LIST_TABLE;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async create(request: any): Promise<string> {
    await this.clientRepository.get({ Key: request.listId, TableName: this.listTableName });
    const data = new TaskModel(request.listId, request.description, request.completed);
    await this.clientRepository.create(this.params(data));
    return data.id;
  }

  private params(data: TaskModel): ClientTypes.PutItem {
    return {
      TableName: this.taskTableName,
      Item: {
        id: data.id,
        listId: data.listId,
        description: data.description,
        completed: data.completed,
        createdAt: data.timestamp,
        updatedAt: data.timestamp,
      }
    };
  }
}