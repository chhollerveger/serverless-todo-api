import { CreateTaskController } from "@controllers";
import { CreateTaskService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeCreateTaskController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new CreateTaskService(clientRepository);
    return new CreateTaskController(validator, service);
};
//# sourceMappingURL=create.js.map