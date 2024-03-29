import 'source-map-support/register';
import { IController, IDeleteListService, IValidator, ListRequestDto } from '@protocols';
import { deleteListConstraint } from '@constraints';
import { HttpResponse, HttpResponseCreator, StatusMessage } from '@presentation';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(params: ListRequestDto): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(params, deleteListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      await this.deleteListService.delete(params);
      return HttpResponseCreator.ok(StatusMessage.ToDoListDeleted);
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}