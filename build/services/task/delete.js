export class DeleteTaskService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.taskTableName = process.env.TASKS_TABLE;
    }
    async delete(request) {
        await this.clientRepository.get(this.params(request));
        await this.clientRepository.delete(this.params(request));
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
}
//# sourceMappingURL=delete.js.map