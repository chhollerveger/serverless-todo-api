import 'source-map-support/register';
import { IController, IDeleteListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { badRequest, ok, serverError, SuccessData } from '@presentation';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, getListConstraint());
      if (error) {
        return badRequest(error);
      }
      const request = converterToType(data, ListDto);
      await this.deleteListService.delete(request);
      return ok(new SuccessData('To-do list successfully deleted'))
    } catch (error) {
      return serverError(error);
    }
  }
}