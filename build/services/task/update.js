export class UpdateTaskService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.taskTableName = process.env.TASKS_TABLE;
        this.listTableName = process.env.LIST_TABLE;
    }
    async update(request) {
        await this.clientRepository.get(this.getParams(request));
        await this.clientRepository.update(this.updateParams(request));
    }
    getParams(request) {
        return {
            TableName: this.listTableName,
            Key: { id: request.listId },
        };
    }
    updateParams(request) {
        const { listId, taskId, completed, description } = request;
        const isCompletedPresent = typeof completed !== 'undefined';
        return {
            TableName: this.taskTableName,
            Key: {
                "id": taskId,
                "listId": listId
            },
            UpdateExpression: this.setUpdateExpression(description, completed),
            ExpressionAttributeValues: this.setExpressionAttributeValues(description, isCompletedPresent, completed),
            ReturnValues: "UPDATED_NEW"
        };
    }
    setUpdateExpression(description, completed) {
        return `
      set ${description ? 'description = :description,' : ''}
      ${typeof completed !== 'undefined' ? 'completed = :completed,' : ''} updatedAt = :timestamp
    `;
    }
    setExpressionAttributeValues(description, isCompletedPresent, completed) {
        const expressionAttributeValues = { ":timestamp": new Date().getTime() };
        if (description) {
            expressionAttributeValues[':description'] = description;
        }
        if (isCompletedPresent) {
            expressionAttributeValues[':completed'] = completed;
        }
        return expressionAttributeValues;
    }
}
//# sourceMappingURL=update.js.map