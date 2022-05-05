export class GetTaskService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.taskTableName = process.env.TASKS_TABLE;
    }
    async get(request) {
        const data = await this.clientRepository.get(this.params(request));
        return this.formatData(data);
    }
    params(request) {
        return {
            TableName: this.taskTableName,
            Key: {
                "id": request.taskId,
                "listId": request.listId
            },
        };
    }
    formatData(data) {
        return {
            id: data.Item.id,
            listId: data.Item.listId,
            description: data.Item.description,
            completed: data.Item.completed,
            createdAt: data.Item.createdAt,
            updatedAt: data.Item.updatedAt,
        };
    }
}
//# sourceMappingURL=get.js.map