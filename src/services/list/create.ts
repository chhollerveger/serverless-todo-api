import { ListModel } from "@models";
import { ClientTypes, ICreateListService, IClientRepository, ListDto } from "@protocols";

export class CreateListService implements ICreateListService {
  private readonly tableName = process.env.LIST_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async create(request: ListDto): Promise<string> {
    const data = new ListModel(request.name);
    await this.clientRepository.create(this.params(data));
    return data.id;
  }

  private params(data: ListModel): ClientTypes.PutItem {
    return {
      TableName: this.tableName,
      Item: {
        id: data.id,
        name: data.name,
        createdAt: data.timestamp,
        updatedAt: data.timestamp,
      }
    };
  }
}