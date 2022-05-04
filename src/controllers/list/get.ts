import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IGetListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';

export class GetListController implements IController {
  constructor(
    private validator: IValidator,
    private getListService: IGetListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, getListConstraint());
      const request = converterToType(data, ListDto);
      const result = await this.getListService.get(request);
      const response = new ResponseModel(result, 200, 'To-do list successfully retrieved');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list not found');
      return response.generate();
    }
  }
}