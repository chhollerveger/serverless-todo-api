import * as AWS from 'aws-sdk';
import { ClientTypesAdapter, IClientRepository } from '@protocols';
import { ServerError } from '@presentation';

export class DynamoDbRepositoryAdapter implements IClientRepository {
  constructor(private documentClient: AWS.DynamoDB.DocumentClient) { }

  public async create(params: ClientTypesAdapter.PutItem): Promise<ClientTypesAdapter.PutItemOutput> {
    try {
      return await this.documentClient.put(params).promise();
    } catch (error) {
      throw new ServerError(`create-error: ${error}`);
    }
  }

  public async batchCreate(params: ClientTypesAdapter.BatchWrite): Promise<ClientTypesAdapter.BatchWriteOutPut> {
    try {
      return await this.documentClient.batchWrite(params).promise();
    } catch (error) {
      throw new ServerError(`batch-write-error: ${error}`);
    }
  }

  public async update(params: ClientTypesAdapter.UpdateItem): Promise<ClientTypesAdapter.UpdateItemOutPut> {
    try {
      return await this.documentClient.update(params).promise();
    } catch (error) {
      throw new ServerError(`update-error: ${error}`);
    }
  }

  public async query(params: ClientTypesAdapter.QueryItem): Promise<ClientTypesAdapter.QueryItemOutput> {
    try {
      return await this.documentClient.query(params).promise();
    } catch (error) {
      throw new ServerError(`query-error: ${error}`);
    }
  }

  public async get(params: ClientTypesAdapter.GetItem): Promise<ClientTypesAdapter.GetItemOutput> {
    try {
      return await this.documentClient.get(params).promise();
    } catch (error) {
      throw new ServerError(`get-error: ${error}`);
    }
  }

  public async delete(params: ClientTypesAdapter.DeleteItem): Promise<ClientTypesAdapter.DeleteItemOutput> {
    try {
      return await this.documentClient.delete(params).promise();
    } catch (error) {
      throw new ServerError(`delete-error: ${error}`);
    }
  }
}