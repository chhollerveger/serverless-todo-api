import { GetTaskController } from "@controllers";
import { GetTaskService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeGetTaskController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new GetTaskService(clientRepository);
    return new GetTaskController(validator, service);
};
//# sourceMappingURL=get.js.map