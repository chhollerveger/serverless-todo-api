import { UpdateTaskController } from "@controllers";
import { IController } from "@protocols";
import { UpdateTaskService } from "@services";
import { Validator } from "@utils"
import { makeClientRepository } from "../../infra/database/client-repository";

export const makeUpdateTaskController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new UpdateTaskService(clientRepository);
  return new UpdateTaskController(
    validator,
    service
  );
}