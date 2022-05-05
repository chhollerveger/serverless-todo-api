import { UpdateTaskController } from "@controllers";
import { UpdateTaskService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeUpdateTaskController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new UpdateTaskService(clientRepository);
    return new UpdateTaskController(validator, service);
};
//# sourceMappingURL=update.js.map