import * as Types from '../client-types';

export interface IDynamoDbRepository {
  create(params: Types.PutItem): Promise<Types.PutItemOutput>;
  batchCreate(params: Types.BatchWrite): Promise<Types.BatchWriteOutPut>;
  update(params: Types.UpdateItem): Promise<Types.UpdateItemOutPut>;
  query(params: Types.QueryItem): Promise<Types.QueryItemOutput>;
  get(params: Types.GetItem): Promise<Types.GetItemOutput>;
  delete(params: Types.DeleteItem): Promise<Types.DeleteItemOutput>;
}