import { ClientTypes, IClientRepository, IUpdateListService } from "@protocols";

export class UpdateListService implements IUpdateListService {
  private readonly tableName = process.env.LIST_TABLE;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async update(request: any): Promise<any> {
    await this.clientRepository.get({ Key: request.listId, TableName: this.tableName });
    return await this.clientRepository.update(this.params(request));
  }

  private params(request: any): ClientTypes.UpdateItem {
    return {
      TableName: this.tableName,
      Key: {
        "id": request.listId
      },
      UpdateExpression: "set #name = :name, updatedAt = :timestamp",
      ExpressionAttributeNames: {
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":name": request.name,
        ":timestamp": new Date().getTime(),
      },
      ReturnValues: "UPDATED_NEW"
    }
  };
}