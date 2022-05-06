import 'source-map-support/register';
import { IController, IDeleteListService, IValidator, ListRequestDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(params: ListRequestDto): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(params, getListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      await this.deleteListService.delete(params);
      return HttpResponseCreator.success('To-do list successfully deleted');
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}