import { ClientTypes, IClientRepository, IGetListService, ListDto } from "@protocols";

export class GetListService implements IGetListService {
  private readonly listTableName = process.env.LIST_TABLE;
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listIndexName = 'list_index';

  constructor(private clientRepository: IClientRepository) { }

  public async get(request: ListDto): Promise<any> {
    const list = await this.clientRepository.get(this.getParams(request));
    const tasks = await this.clientRepository.query(this.queryParams(request));
    return this.formatData(list, tasks);
  }

  private getParams(request: ListDto): ClientTypes.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private queryParams(request: ListDto): ClientTypes.QueryItem {
    return {
      TableName: this.taskTableName,
      IndexName: this.listIndexName,
      KeyConditionExpression: 'listId = :listIdVal',
      ExpressionAttributeValues: {
        ':listIdVal': request.listId
      }
    };
  }

  private formatData(list: ClientTypes.GetItemOutput, tasks: ClientTypes.QueryItemOutput): any {
    return {
      ...list.Item,
      taskCount: tasks.Count,
      tasks: tasks.Items.map((task) => { task })
    }
  }
}