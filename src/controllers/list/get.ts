import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IGetListService, HttpResponse, IValidator } from '@protocols';
import { getListConstraint } from '@constraints';

export class GetListController implements IController {
  constructor(
    private validator: IValidator,
    private getListService: IGetListService,
  ) { }

  public async handle(body: string): Promise<HttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, getListConstraint());
      const data = await this.getListService.get(request);
      const response = new ResponseModel(data, 200, 'To-do list successfully retrieved');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list not found');
      return response.generate();
    }
  }
}