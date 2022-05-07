
import 'source-map-support/register';
import { IController, ICreateListService, IValidator, ListRequestDto } from '@protocols';
import { createListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator, StatusMessage } from '@presentation';

export class CreateListController implements IController {
  constructor(
    private validator: IValidator,
    private createListService: ICreateListService,
  ) { }

  public async handle(body: string): Promise<HttpResponse> {
    try {
      const request = converterToType(body, ListRequestDto);
      const error = this.validator.validateAgainstConstraints(request, createListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const listId = await this.createListService.create(request);
      return HttpResponseCreator.success(StatusMessage.ToDoListCreated, { listId });
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}