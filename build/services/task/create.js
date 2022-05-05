import { TaskModel } from "@models";
export class CreateTaskService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.taskTableName = process.env.TASKS_TABLE;
        this.listTableName = process.env.LIST_TABLE;
    }
    async create(request) {
        await this.clientRepository.get(this.getParams(request));
        const data = new TaskModel(request.listId, request.description, request.completed);
        await this.clientRepository.create(this.createParams(data));
        return data.id;
    }
    getParams(request) {
        return {
            TableName: this.listTableName,
            Key: { id: request.listId },
        };
    }
    createParams(data) {
        return {
            TableName: this.taskTableName,
            Item: {
                id: data.id,
                listId: data.listId,
                description: data.description,
                completed: data.completed,
                createdAt: data.timestamp,
                updatedAt: data.timestamp,
            }
        };
    }
}
//# sourceMappingURL=create.js.map