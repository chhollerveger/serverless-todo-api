import AWS from "aws-sdk";
import { DynamoDbRepository } from "@/infra";
import { IClientRepository } from "@/protocols";

export const makeClientRepository = (): IClientRepository => {
  const client = new AWS.DynamoDB.DocumentClient();
  return new DynamoDbRepository(client);
}