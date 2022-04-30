import { ListModel } from "@models";
import { ClientTypes, ICreateListService, IClientRepository } from "@protocols";
import { IList } from "@models";

export class CreateListService implements ICreateListService {
  private readonly tableName = process.env.LIST_TABLE;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async create(request: any): Promise<string> {
    const listModel = new ListModel(request);
    const data = listModel.getEntityMappings();
    await this.clientRepository.create(this.params(data));
    return data.id;
  }

  private params(data: IList): ClientTypes.PutItem {
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