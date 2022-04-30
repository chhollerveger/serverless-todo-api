
import 'source-map-support/register';
import { ResponseModel } from '@/models';
import { IController, IHttpResponse, IUpdateListService, IValidator } from '@/protocols';
import { updateListConstraint } from '@/constraints';

export class UpdateListController implements IController {
  constructor(
    private validator: IValidator,
    private updateListService: IUpdateListService,
  ) { }

  public async handle(body: string): Promise<IHttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, updateListConstraint());
      const results = await this.updateListService.update(request);
      const response = new ResponseModel({ ...results.Attributes }, 200, 'To-do list successfully updated');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list cannot be updated');
      return response.generate();
    }
  }
}