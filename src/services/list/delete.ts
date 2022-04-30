import { ClientTypes, IClientRepository, IDeleteListService } from "@/protocols";

export class DeleteListService implements IDeleteListService {
  private readonly listTableName = process.env.LIST_TABLE;
  private readonly taskTableName = process.env.TASKS_TABLE;
  private readonly listIndexName = 'list_index';
  private readonly chunkSize = 25;

  constructor(
    private clientRepository: IClientRepository
  ) { }

  public async delete(request: any): Promise<void> {
    await this.clientRepository.get({ Key: request.listId, TableName: this.listTableName });
    await this.clientRepository.delete(this.deleteListParams(request));
    const tasks = await this.clientRepository.query(this.queryTasksParams(request));
    await this.deleteTasks(tasks);
  }

  private deleteListParams(request: any): ClientTypes.DeleteItem {
    return {
      TableName: this.listTableName,
      Key: { id: request.listId },
    };
  }

  private queryTasksParams(request: any): ClientTypes.QueryItem {
    return {
      TableName: this.taskTableName,
      IndexName: this.listIndexName,
      KeyConditionExpression: 'listId = :listIdVal',
      ExpressionAttributeValues: {
        ':listIdVal': request.listId
      }
    };
  }

  private async deleteTasks(tasks: ClientTypes.QueryItemOutput): Promise<void> {
    if (tasks?.Items?.length > 0) {
      const taskEntities = tasks.Items.map((item) => this.batchWriteRequestParams(item));
      if (taskEntities.length > this.chunkSize) {
        const taskChunks = this.createChunks(taskEntities, this.chunkSize);
        Promise.all(taskChunks.map((tasks) => {
          return this.clientRepository.batchCreate(this.batchWriteItemInputParams(tasks));
        }))
      }
      await this.clientRepository.batchCreate(this.batchWriteItemInputParams(taskEntities))
    }
  }

  private batchWriteRequestParams(item: ClientTypes.AttributeMap): ClientTypes.BatchWriteRequest {
    return {
      DeleteRequest: {
        Key: {
          id: item.id
        }
      }
    };
  }

  private createChunks(data: ClientTypes.BatchWriteRequests, chunkSize: number): ClientTypes.BatchWriteRequests[] {
    const chunks: ClientTypes.BatchWriteRequests[] = [];
    let batchIterator = 0;
    while (batchIterator < data.length) {
      chunks.push(data.slice(batchIterator, (batchIterator += chunkSize)));
    }
    return chunks;
  }

  private batchWriteItemInputParams(items: ClientTypes.BatchWriteRequests): ClientTypes.BatchWrite {
    return {
      RequestItems: {
        [this.taskTableName]: items,
      }
    };
  }
}