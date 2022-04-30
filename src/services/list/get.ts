import { ClientTypes, IClientRepository, IGetListService } from "@/protocols";

export class GetListService implements IGetListService {
  private readonly listTableName = process.env.LIST_TABLE;
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listIndexName = 'list_index';

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async get(request: any): Promise<any> {
    const list = await this.clientRepository.get({ Key: request.listId, TableName: this.listTableName });
    const tasks = await this.clientRepository.query(this.params(request));
    return this.formatData(list, tasks);
  }

  private params(request: any): ClientTypes.QueryItem {
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