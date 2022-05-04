import 'source-map-support/register';
import { IController, IGetListService, IValidator, ListRequestDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class GetListController implements IController {
  constructor(
    private validator: IValidator,
    private getListService: IGetListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, getListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, ListRequestDto);
      const result = await this.getListService.get(request);
      return HttpResponseCreator.success('To-do list successfully retrieved', { result });
    } catch (error) {
      return HttpResponseCreator.serverError(error)
    }
  }
}