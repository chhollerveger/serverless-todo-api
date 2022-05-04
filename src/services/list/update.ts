import { ClientTypes, IClientRepository, IUpdateListService, ListDto } from "@protocols";

export class UpdateListService implements IUpdateListService {
  private readonly listTableName = process.env.LIST_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async update(request: ListDto): Promise<any> {
    await this.clientRepository.get(this.getParams(request));
    return await this.clientRepository.update(this.updateParams(request));
  }

  private getParams(request: ListDto): ClientTypes.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private updateParams(request: ListDto): ClientTypes.UpdateItem {
    return {
      TableName: this.listTableName,
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