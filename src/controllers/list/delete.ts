import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IDeleteListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, getListConstraint());
      const request = converterToType(data, ListDto);
      await this.deleteListService.delete(request);
      const response = new ResponseModel({}, 200, 'To-do list successfully deleted');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list cannot be deleted');
      return response.generate();
    }
  }
}