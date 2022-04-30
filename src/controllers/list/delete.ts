import 'source-map-support/register';
import { ResponseModel } from '@/models';
import { IController, IDeleteListService, IHttpResponse, IValidator } from '@/protocols';
import { getListConstraint } from '@/constraints';

export class DeleteListController implements IController {
  constructor(
    private validator: IValidator,
    private deleteListService: IDeleteListService,
  ) { }

  public async handle(body: string): Promise<IHttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, getListConstraint());
      await this.deleteListService.delete(request);
      const response = new ResponseModel({}, 200, 'To-do list successfully deleted');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list cannot be deleted');
      return response.generate();
    }
  }
}