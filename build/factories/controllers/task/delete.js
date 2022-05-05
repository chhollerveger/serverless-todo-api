import { DeleteTaskController } from "@controllers";
import { DeleteTaskService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeDeleteTaskController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new DeleteTaskService(clientRepository);
    return new DeleteTaskController(validator, service);
};
//# sourceMappingURL=delete.js.map