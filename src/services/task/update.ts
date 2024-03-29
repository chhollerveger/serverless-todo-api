import { NotFoundError, StatusMessage } from "@presentation";
import { ClientTypesAdapter, IClientRepository, IUpdateTaskService, TaskRequestDto } from "@protocols";

export class UpdateTaskService implements IUpdateTaskService {
  private readonly taskTableName = process.env.TASKS_TABLE;

  constructor(private clientRepository: IClientRepository) { }

  public async update(request: TaskRequestDto): Promise<void> {
    const data = await this.clientRepository.get(this.getParams(request));
    if (!data.Item) {
      throw new NotFoundError(StatusMessage.TaskNotFound);
    }
    await this.clientRepository.update(this.updateParams(request));
  }

  private getParams(request: TaskRequestDto): ClientTypesAdapter.DeleteItem {
    return {
      TableName: this.taskTableName,
      Key: {
        "id": request.taskId,
        "listId": request.listId
      },
    };
  }

  private updateParams(request: TaskRequestDto): ClientTypesAdapter.UpdateItem {
    const { listId, taskId, completed, description } = request;
    const isCompletedPresent = typeof completed !== 'undefined';

    return {
      TableName: this.taskTableName,
      Key: {
        "id": taskId,
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
    const expressionAttributeValues: ClientTypesAdapter.ExpressionAttributeValue = { ":timestamp": new Date().getTime() };
    if (description) {
      expressionAttributeValues[':description'] = description
    }
    if (isCompletedPresent) {
      expressionAttributeValues[':completed'] = completed
    }
    return expressionAttributeValues;

  }
}