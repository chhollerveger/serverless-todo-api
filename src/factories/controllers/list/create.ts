import { CreateListController } from "@controllers";
import { IController } from "@protocols";
import { CreateListService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "../../infra/database/client-repository";

export const makeCreateListController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new CreateListService(clientRepository);
  return new CreateListController(
    validator,
    service
  );
}