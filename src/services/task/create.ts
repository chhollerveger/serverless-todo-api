import { TaskModel } from "@models";
import { ClientTypes, IClientRepository, ICreateTaskService, TaskRequestDto } from "@protocols";

export class CreateTaskService implements ICreateTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listTableName = process.env.LIST_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async create(request: TaskRequestDto): Promise<string> {
    await this.clientRepository.get(this.getParams(request));
    const data = new TaskModel(request.listId, request.description, request.completed);
    await this.clientRepository.create(this.createParams(data));
    return data.id;
  }

  private getParams(request: TaskRequestDto): ClientTypes.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private createParams(data: TaskModel): ClientTypes.PutItem {
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