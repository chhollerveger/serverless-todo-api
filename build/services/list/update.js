export class UpdateListService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
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
        return {
            TableName: this.listTableName,
            Key: {
                "id": request.listId
            },
            UpdateExpression: "set #name = :name, updatedAt = :timestamp",
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ExpressionAttributeValues: {
                ":name": request.name,
                ":timestamp": new Date().getTime(),
            },
            ReturnValues: "UPDATED_NEW"
        };
    }
    ;
}
//# sourceMappingURL=update.js.map