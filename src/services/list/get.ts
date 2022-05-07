import { NotFoundError } from "@presentation";
import { ClientTypesAdapter, IClientRepository, IGetListService, IListResponseDto, ListRequestDto } from "@protocols";

export class GetListService implements IGetListService {
  private readonly listTableName = process.env.LIST_TABLE;
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listIndexName = 'list_index';

  constructor(private clientRepository: IClientRepository) { }

  public async get(request: ListRequestDto): Promise<IListResponseDto> {
    const listData = await this.clientRepository.get(this.getParams(request));
    if (!listData.Item) {
      throw new NotFoundError('To-do list not found with given identifier');
    }
    const tasksData = await this.clientRepository.query(this.queryParams(request));
    return this.formatData(listData, tasksData);
  }

  private getParams(request: ListRequestDto): ClientTypesAdapter.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private queryParams(request: ListRequestDto): ClientTypesAdapter.QueryItem {
    return {
      TableName: this.taskTableName,
      IndexName: this.listIndexName,
      KeyConditionExpression: 'listId = :listIdVal',
      ExpressionAttributeValues: {
        ':listIdVal': request.listId
      }
    };
  }

  private formatData(listData: ClientTypesAdapter.GetItemOutput, tasksData: ClientTypesAdapter.QueryItemOutput): IListResponseDto {
    return {
      id: listData.Item.id,
      name: listData.Item.name,
      createdAt: listData.Item.createdAt,
      updatedAt: listData.Item.updatedAt,
      taskCount: tasksData.Count,
      tasks: tasksData?.Items?.length > 0 ? tasksData.Items.map((task) => ({
        id: task.id,
        description: task.description,
        completed: task.completed,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      })) : []
    }
  }
}