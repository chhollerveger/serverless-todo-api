import { ListModel } from "@models";
export class CreateListService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.tableName = process.env.LIST_TABLE;
    }
    async create(request) {
        const data = new ListModel(request.name);
        await this.clientRepository.create(this.params(data));
        return data.id;
    }
    params(data) {
        return {
            TableName: this.tableName,
            Item: {
                id: data.id,
                name: data.name,
                createdAt: data.timestamp,
                updatedAt: data.timestamp,
            }
        };
    }
}
//# sourceMappingURL=create.js.map