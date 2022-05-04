import 'source-map-support/register';
import { IController, IDeleteListService, IValidator, ListDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, getListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, ListDto);
      await this.deleteListService.delete(request);
      return HttpResponseCreator.success('To-do list successfully deleted')
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}