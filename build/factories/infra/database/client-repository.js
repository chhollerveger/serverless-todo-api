import AWS from "aws-sdk";
import { DynamoDbRepository } from "@infra";
export const makeClientRepository = () => {
    const client = new AWS.DynamoDB.DocumentClient();
    return new DynamoDbRepository(client);
};
//# sourceMappingURL=client-repository.js.map