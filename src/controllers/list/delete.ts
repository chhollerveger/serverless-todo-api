import 'source-map-support/register';
import { IController, IDeleteListService, IValidator, ListRequestDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(params: string): Promise<HttpResponse> {
    try {
      const request = converterToType(params, ListRequestDto);
      const error = this.validator.validateAgainstConstraints(request, getListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      await this.deleteListService.delete(request);
      return HttpResponseCreator.success('To-do list successfully deleted');
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}