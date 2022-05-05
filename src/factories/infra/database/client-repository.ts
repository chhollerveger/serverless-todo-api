import AWS from "aws-sdk";
import { DynamoDbRepository, makeAwsConfig } from "@infra";
import { IClientRepository } from "@protocols";

export const makeClientRepository = (): IClientRepository => {
  const client = new AWS.DynamoDB.DocumentClient(makeAwsConfig());
  return new DynamoDbRepository(client);
}