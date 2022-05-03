import { ListModel } from "@models";
import { ClientTypes, ICreateListService, IClientRepository } from "@protocols";

export class CreateListService implements ICreateListService {
  private readonly tableName = process.env.LIST_TABLE;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async create(request: any): Promise<string> {
    const data = new ListModel(request);
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