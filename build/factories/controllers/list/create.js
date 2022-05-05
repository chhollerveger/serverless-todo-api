import { CreateListController } from "@controllers";
import { CreateListService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeCreateListController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new CreateListService(clientRepository);
    return new CreateListController(validator, service);
};
//# sourceMappingURL=create.js.map