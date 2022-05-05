import { makeAwsConfig } from './config/aws-config';
import { ServerError } from '@presentation';
export class DynamoDbRepository {
    constructor(documentClient) {
        this.documentClient = documentClient;
        makeAwsConfig();
    }
    async create(params) {
        try {
            return await this.documentClient.put(params).promise();
        }
        catch (error) {
            throw new ServerError(`create-error: ${error}`);
        }
    }
    async batchCreate(params) {
        try {
            return await this.documentClient.batchWrite(params).promise();
        }
        catch (error) {
            throw new ServerError(`batch-write-error: ${error}`);
        }
    }
    async update(params) {
        try {
            return await this.documentClient.update(params).promise();
        }
        catch (error) {
            throw new ServerError(`update-error: ${error}`);
        }
    }
    async query(params) {
        try {
            return await this.documentClient.query(params).promise();
        }
        catch (error) {
            throw new ServerError(`query-error: ${error}`);
        }
    }
    async get(params) {
        try {
            return await this.documentClient.get(params).promise();
        }
        catch (error) {
            throw new ServerError(`get-error: ${error}`);
        }
    }
    async delete(params) {
        try {
            return await this.documentClient.delete(params).promise();
        }
        catch (error) {
            throw new ServerError(`delete-error: ${error}`);
        }
    }
}
//# sourceMappingURL=dynamodb-repository.js.map