
import 'source-map-support/register';
import { IController, ICreateListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { createListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';

export class CreateListController implements IController {
  constructor(
    private validator: IValidator,
    private createListService: ICreateListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, createListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, ListDto);
      const listId = await this.createListService.create(request);
      return HttpResponseCreator.success('To-do list successfully created', { listId });
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}