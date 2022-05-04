
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, HttpResponse, IUpdateListService, IValidator, ListDto } from '@protocols';
import { updateListConstraint } from '@constraints';
import { converterToType } from '@utils';

export class UpdateListController implements IController {
  constructor(
    private validator: IValidator,
    private updateListService: IUpdateListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, updateListConstraint());
      const request = converterToType(data, ListDto);
      const results = await this.updateListService.update(request);
      const response = new ResponseModel({ ...results.Attributes }, 200, 'To-do list successfully updated');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list cannot be updated');
      return response.generate();
    }
  }
}