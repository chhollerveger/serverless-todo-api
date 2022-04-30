import { UpdateListController } from "@/controllers";
import { IController } from "@/protocols";
import { UpdateListService } from "@/services";
import { Validator } from "@/utils";
import { makeClientRepository } from "@/factories";

export const makeUpdateListController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new UpdateListService(clientRepository);
  return new UpdateListController(
    validator,
    service
  );
}