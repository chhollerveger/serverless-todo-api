import { TaskModel } from "@models";
import { BadRequestError } from "@presentation";
import { ClientTypesAdapter, IClientRepository, ICreateTaskService, TaskRequestDto } from "@protocols";

export class CreateTaskService implements ICreateTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listTableName = process.env.LIST_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async create(request: TaskRequestDto): Promise<string> {
    const listData = await this.clientRepository.get(this.getListParams(request));
    if (!listData.Item) {
      throw new BadRequestError('To-do list not found with given identifier');
    }
    const data = new TaskModel(request.listId, request.description);
    await this.clientRepository.create(this.createParams(data));
    return data.id;
  }

  private getListParams(request: TaskRequestDto): ClientTypesAdapter.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private createParams(data: TaskModel): ClientTypesAdapter.PutItem {
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