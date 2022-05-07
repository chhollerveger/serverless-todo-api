import { GetTaskController } from "@controllers";
import { IController } from "@protocols";
import { GetTaskService } from "@services";
import { Validator } from "@utils"
import { makeClientRepository } from "../../infra/database/client-repository";

export const makeGetTaskController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new GetTaskService(clientRepository);
  return new GetTaskController(
    validator,
    service
  );
}