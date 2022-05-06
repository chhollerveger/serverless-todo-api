import AWS from "aws-sdk";
import { DynamoDbRepositoryAdapter, makeAwsConfigure } from "@infra";
import { IClientRepository } from "@protocols";

export const makeClientRepository = (): IClientRepository => {
  const client = new AWS.DynamoDB.DocumentClient(makeAwsConfigure());
  return new DynamoDbRepositoryAdapter(client);
}