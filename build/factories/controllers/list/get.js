import { GetListController } from "@controllers";
import { GetListService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "@factories";
export const makeGetListController = () => {
    const validator = new Validator();
    const clientRepository = makeClientRepository();
    const service = new GetListService(clientRepository);
    return new GetListController(validator, service);
};
//# sourceMappingURL=get.js.map