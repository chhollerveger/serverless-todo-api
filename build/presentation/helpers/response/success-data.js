import { StatusName } from "../http/status";
export class SuccessData {
    constructor(message, data) {
        this.message = message;
        this.name = StatusName.Success;
        this.data = data;
    }
}
//# sourceMappingURL=success-data.js.map