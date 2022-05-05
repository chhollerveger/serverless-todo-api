export class GetListService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.listTableName = process.env.LIST_TABLE;
        this.taskTableName = process.env.TASKS_TABLE;
        this.listIndexName = 'list_index';
    }
    async get(request) {
        const listData = await this.clientRepository.get(this.getParams(request));
        const tasksData = await this.clientRepository.query(this.queryParams(request));
        return this.formatData(listData, tasksData);
    }
    getParams(request) {
        return {
            TableName: this.listTableName,
            Key: { id: request.listId },
        };
    }
    queryParams(request) {
        return {
            TableName: this.taskTableName,
            IndexName: this.listIndexName,
            KeyConditionExpression: 'listId = :listIdVal',
            ExpressionAttributeValues: {
                ':listIdVal': request.listId
            }
        };
    }
    formatData(listData, tasksData) {
        var _a;
        return {
            id: listData.Item.id,
            name: listData.Item.name,
            createdAt: listData.Item.createdAt,
            updatedAt: listData.Item.updatedAt,
            taskCount: tasksData.Count,
            tasks: ((_a = tasksData === null || tasksData === void 0 ? void 0 : tasksData.Items) === null || _a === void 0 ? void 0 : _a.length) > 0 ? tasksData.Items.map((task) => ({
                id: task.id,
                description: task.description,
                completed: task.completed,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            })) : []
        };
    }
}
//# sourceMappingURL=get.js.map