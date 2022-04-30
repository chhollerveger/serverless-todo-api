import * as AWS from 'aws-sdk';
import { ResponseModel } from '@models';
import { makeAwsConfig } from './config/aws-config';
import { ClientTypes, IDynamoDbRepository } from '@protocols';

export class DynamoDbRepository implements IDynamoDbRepository {
  constructor(private documentClient: AWS.DynamoDB.DocumentClient) {
    makeAwsConfig();
  }

  public async create(params: ClientTypes.PutItem): Promise<ClientTypes.PutItemOutput> {
    try {
      return await this.documentClient.put(params).promise();
    } catch (error) {
      throw new ResponseModel({}, 500, `create-error: ${error}`);
    }
  }

  public async batchCreate(params: ClientTypes.BatchWrite): Promise<ClientTypes.BatchWriteOutPut> {
    try {
      return await this.documentClient.batchWrite(params).promise();
    } catch (error) {
      throw new ResponseModel({}, 500, `batch-write-error: ${error}`);
    }
  }

  public async update(params: ClientTypes.UpdateItem): Promise<ClientTypes.UpdateItemOutPut> {
    try {
      return await this.documentClient.update(params).promise();
    } catch (error) {
      throw new ResponseModel({}, 500, `update-error: ${error}`);
    }
  }

  public async query(params: ClientTypes.QueryItem): Promise<ClientTypes.QueryItemOutput> {
    try {
      return await this.documentClient.query(params).promise();
    } catch (error) {
      throw new ResponseModel({}, 500, `query-error: ${error}`);
    }
  }

  public async get(params: ClientTypes.GetItem): Promise<ClientTypes.GetItemOutput> {
    try {
      return await this.documentClient.get(params).promise();
    } catch (error) {
      throw new ResponseModel({}, 500, `get-error: ${error}`);
    }
  }

  public async delete(params: ClientTypes.DeleteItem): Promise<ClientTypes.DeleteItemOutput> {
    try {
      return await this.documentClient.delete(params).promise();
    } catch (error) {
      throw new ResponseModel({}, 500, `delete-error: ${error}`);
    }
  }
}