import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IGetListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { badRequest, ok, serverError, SuccessData } from '@presentation';


export class GetListController implements IController {
  constructor(
    private validator: IValidator,
    private getListService: IGetListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, getListConstraint());
      if (error) {
        return badRequest(error);
      }
      const request = converterToType(data, ListDto);
      const results = await this.getListService.get(request);
      return ok(new SuccessData('To-do list successfully retrieved', { results }))
    } catch (error) {
      return serverError(error)
    }
  }
}