import { StatusName } from "../http/status";
export class ServerError extends Error {
    constructor(message, stack = undefined) {
        super(message);
        this.name = StatusName.ServerError;
        this.stack = stack;
    }
}
//# sourceMappingURL=server-error.js.map