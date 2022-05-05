import { StatusName } from "../http/status";
export class BadRequestError extends Error {
    constructor(message, data) {
        super(message);
        this.name = StatusName.BadRequest;
        this.data = data;
    }
}
//# sourceMappingURL=bad-request-error.js.map