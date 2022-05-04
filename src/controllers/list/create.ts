
import 'source-map-support/register';
import { IController, ICreateListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { createListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { badRequest, ok, serverError, SuccessData } from '@presentation';

export class CreateListController implements IController {
  constructor(
    private validator: IValidator,
    private createListService: ICreateListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, createListConstraint());
      if (error) {
        return badRequest(error);
      }
      const request = converterToType(data, ListDto);
      const listId = await this.createListService.create(request);
      return ok(new SuccessData('To-do list successfully created', { listId }));
    } catch (error) {
      return serverError(error);
    }
  }
}