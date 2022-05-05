import { DeleteListController } from "@controllers";
import { DeleteListService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeDeleteListController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new DeleteListService(clientRepository);
    return new DeleteListController(validator, service);
};
//# sourceMappingURL=delete.js.map