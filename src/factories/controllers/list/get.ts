import { GetListController } from "@/controllers";
import { IController } from "@/protocols";
import { GetListService } from "@/services";
import { Validator } from "@/utils";
import { makeClientRepository } from "@/factories";

export const makeGetListController = (): IController => {
  const validator = new Validator();
  const clientRepository = makeClientRepository();
  const service = new GetListService(clientRepository);
  return new GetListController(
    validator,
    service
  );
}