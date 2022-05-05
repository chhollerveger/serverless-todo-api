export class DeleteListService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.listTableName = process.env.LIST_TABLE;
        this.taskTableName = process.env.TASKS_TABLE;
        this.listIndexName = 'list_index';
        this.chunkSize = 25;
    }
    async delete(request) {
        await this.clientRepository.get(this.params(request));
        await this.clientRepository.delete(this.params(request));
        const tasks = await this.clientRepository.query(this.queryTasksParams(request));
        await this.deleteTasks(tasks);
    }
    params(request) {
        return {
            TableName: this.listTableName,
            Key: { id: request.listId },
        };
    }
    queryTasksParams(request) {
        return {
            TableName: this.taskTableName,
            IndexName: this.listIndexName,
            KeyConditionExpression: 'listId = :listIdVal',
            ExpressionAttributeValues: {
                ':listIdVal': request.listId
            }
        };
    }
    async deleteTasks(tasks) {
        var _a;
        if (((_a = tasks === null || tasks === void 0 ? void 0 : tasks.Items) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const taskEntities = tasks.Items.map((item) => this.batchWriteRequestParams(item));
            if (taskEntities.length > this.chunkSize) {
                const taskChunks = this.createChunks(taskEntities, this.chunkSize);
                Promise.all(taskChunks.map((tasks) => {
                    return this.clientRepository.batchCreate(this.batchWriteItemInputParams(tasks));
                }));
            }
            await this.clientRepository.batchCreate(this.batchWriteItemInputParams(taskEntities));
        }
    }
    batchWriteRequestParams(item) {
        return {
            DeleteRequest: {
                Key: {
                    id: item.id
                }
            }
        };
    }
    createChunks(data, chunkSize) {
        const chunks = [];
        let batchIterator = 0;
        while (batchIterator < data.length) {
            chunks.push(data.slice(batchIterator, (batchIterator += chunkSize)));
        }
        return chunks;
    }
    batchWriteItemInputParams(items) {
        return {
            RequestItems: {
                [this.taskTableName]: items,
            }
        };
    }
}
//# sourceMappingURL=delete.js.map