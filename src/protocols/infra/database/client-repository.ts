import * as ClientTypesAdapter from './adapters/client-types-adapter';

export interface IClientRepository {
  create(params: ClientTypesAdapter.PutItem): Promise<ClientTypesAdapter.PutItemOutput>;
  batchCreate(params: ClientTypesAdapter.BatchWrite): Promise<ClientTypesAdapter.BatchWriteOutPut>;
  update(params: ClientTypesAdapter.UpdateItem): Promise<ClientTypesAdapter.UpdateItemOutPut>;
  query(params: ClientTypesAdapter.QueryItem): Promise<ClientTypesAdapter.QueryItemOutput>;
  get(params: ClientTypesAdapter.GetItem): Promise<ClientTypesAdapter.GetItemOutput>;
  delete(params: ClientTypesAdapter.DeleteItem): Promise<ClientTypesAdapter.DeleteItemOutput>;
}