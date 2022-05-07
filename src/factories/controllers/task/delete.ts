import { DeleteTaskController } from "@controllers";
import { IController } from "@protocols";
import { DeleteTaskService } from "@services";
import { Validator } from "@utils"
import { makeClientRepository } from "../../infra/database/client-repository";

export const makeDeleteTaskController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new DeleteTaskService(clientRepository);
  return new DeleteTaskController(validator, service);
}