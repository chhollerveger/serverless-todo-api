import 'source-map-support/register';
import { IController, IGetListService, IValidator, ListRequestDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class GetListController implements IController {
  constructor(
    private validator: IValidator,
    private getListService: IGetListService,
  ) { }

  public async handle(params: ListRequestDto): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(params, getListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const data = await this.getListService.get(params);
      return HttpResponseCreator.success('To-do list successfully retrieved', { ...data });
    } catch (error) {
      return HttpResponseCreator.handleException(error)
    }
  }
}