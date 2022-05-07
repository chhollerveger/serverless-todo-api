import { DeleteListController } from "@controllers";
import { IController } from "@protocols";
import { DeleteListService } from "@services";
import { Validator } from "@utils";
import { makeClientRepository } from "../../infra/database/client-repository";

export const makeDeleteListController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new DeleteListService(clientRepository);
  return new DeleteListController(validator, service);
}