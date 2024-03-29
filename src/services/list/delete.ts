import { NotFoundError, StatusMessage } from "@presentation";
import { ClientTypesAdapter, IClientRepository, IDeleteListService, ListRequestDto } from "@protocols";

export class DeleteListService implements IDeleteListService {
  private readonly listTableName = process.env.LIST_TABLE;
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listIndexName = 'list_index';
  private readonly chunkSize = 25;

  constructor(private clientRepository: IClientRepository) { }

  public async delete(request: ListRequestDto): Promise<void> {
    const data = await this.clientRepository.get(this.params(request));
    if (!data.Item) {
      throw new NotFoundError(StatusMessage.ToDoListNotFound);
    }
    await this.clientRepository.delete(this.params(request));
    const tasks = await this.clientRepository.query(this.queryTasksParams(request));
    await this.deleteTasks(tasks);
  }

  private params(request: ListRequestDto): ClientTypesAdapter.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private queryTasksParams(request: ListRequestDto): ClientTypesAdapter.QueryItem {
    return {
      TableName: this.taskTableName,
      IndexName: this.listIndexName,
      KeyConditionExpression: 'listId = :listIdVal',
      ExpressionAttributeValues: {
        ':listIdVal': request.listId
      }
    };
  }

  private async deleteTasks(tasks: ClientTypesAdapter.QueryItemOutput): Promise<void> {
    if (tasks?.Items?.length > 0) {
      const taskEntities = tasks.Items.map((item) => this.batchWriteRequestParams(item));
      if (taskEntities.length > this.chunkSize) {
        const taskChunks = this.createChunks(taskEntities, this.chunkSize);
        Promise.all(taskChunks.map((chunks) => this.clientRepository.batchCreate(this.batchWriteItemInputParams(chunks))));
      } else {
        await this.clientRepository.batchCreate(this.batchWriteItemInputParams(taskEntities))
      }
    }
  }

  private batchWriteRequestParams(item: ClientTypesAdapter.AttributeMap): ClientTypesAdapter.BatchWriteRequest {
    return {
      DeleteRequest: {
        Key: {
          "id": item.id,
          "listId": item.listId
        }
      }
    };
  }

  private createChunks(data: ClientTypesAdapter.BatchWriteRequests, chunkSize: number): ClientTypesAdapter.BatchWriteRequests[] {
    const chunks: ClientTypesAdapter.BatchWriteRequests[] = [];
    let batchIterator = 0;
    while (batchIterator < data.length) {
      chunks.push(data.slice(batchIterator, (batchIterator += chunkSize)));
    }
    return chunks;
  }

  private batchWriteItemInputParams(items: ClientTypesAdapter.BatchWriteRequests): ClientTypesAdapter.BatchWrite {
    return {
      RequestItems: {
        [this.taskTableName]: items,
      }
    };
  }
}