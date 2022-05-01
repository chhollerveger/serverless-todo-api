import { ITask, ResponseModel } from "@models";
import { ClientTypes, IClientRepository, IUpdateTaskService } from "@protocols";

export class UpdateTaskService implements IUpdateTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listTableName = process.env.LIST_TABLE;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async update(request: any): Promise<ClientTypes.UpdateItemOutPut> {
    await this.clientRepository.get({ Key: request.listId, TableName: this.listTableName });
    return await this.clientRepository.update(this.params(request));
  }

  private params(data: ITask): ClientTypes.UpdateItem {
    const { listId, id, completed, description } = data;
    const isCompletedPresent = typeof completed !== 'undefined';

    if (!description && !isCompletedPresent) {
      throw new ResponseModel({}, 400, 'Invalid Request!');
    }

    return {
      TableName: this.taskTableName,
      Key: {
        "id": id,
        "listId": listId
      },
      UpdateExpression: this.setUpdateExpression(description, completed),
      ExpressionAttributeValues: this.setExpressionAttributeValues(description, isCompletedPresent, completed),
      ReturnValues: "UPDATED_NEW"
    };
  }

  private setUpdateExpression(description: string, completed: boolean): string {
    return `
      set ${description ? 'description = :description,' : ''}
      ${typeof completed !== 'undefined' ? 'completed = :completed,' : ''} updatedAt = :timestamp
    `;
  }

  private setExpressionAttributeValues(description: string, isCompletedPresent: boolean, completed: boolean) {
    const expressionAttributeValues: ClientTypes.ExpressionAttributeValue = { ":timestamp": new Date().getTime() };
    if (description) {
      expressionAttributeValues[':description'] = description
    }
    if (isCompletedPresent) {
      expressionAttributeValues[':completed'] = completed
    }
    return expressionAttributeValues;

  }
}