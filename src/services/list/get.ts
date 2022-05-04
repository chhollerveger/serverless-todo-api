import { ClientTypes, IClientRepository, IGetListService, ITodoDto, ListRequestDto } from "@protocols";

export class GetListService implements IGetListService {
  private readonly listTableName = process.env.LIST_TABLE;
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listIndexName = 'list_index';

  constructor(private clientRepository: IClientRepository) { }

  public async get(request: ListRequestDto): Promise<ITodoDto> {
    const list = await this.clientRepository.get(this.getParams(request));
    const tasks = await this.clientRepository.query(this.queryParams(request));
    return this.formatData(list, tasks);
  }

  private getParams(request: ListRequestDto): ClientTypes.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private queryParams(request: ListRequestDto): ClientTypes.QueryItem {
    return {
      TableName: this.taskTableName,
      IndexName: this.listIndexName,
      KeyConditionExpression: 'listId = :listIdVal',
      ExpressionAttributeValues: {
        ':listIdVal': request.listId
      }
    };
  }

  private formatData(list: ClientTypes.GetItemOutput, tasks: ClientTypes.QueryItemOutput): ITodoDto {
    return {
      id: list.Item.id,
      name: list.Item.name,
      createdAt: list.Item.createdAt,
      updatedAt: list.Item.updatedAt,
      taskCount: tasks.Count,
      tasks: tasks?.Items?.length > 0 ? tasks.Items.map((task) => ({
        id: task.id,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })) : []
    }
  }
}