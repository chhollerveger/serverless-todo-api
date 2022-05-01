
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IDeleteTaskService, IHttpResponse, IValidator } from '@protocols';
import { deleteTaskConstraint } from '@constraints';

export class DeleteTaskController implements IController {
  constructor(
    private validator: IValidator,
    private deleteTaskService: IDeleteTaskService,
  ) { }

  public async handle(body: string): Promise<IHttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, deleteTaskConstraint());
      await this.deleteTaskService.delete(request);
      const response = new ResponseModel({}, 200, 'Task successfully deleted');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be deleted');
      return response.generate();
    }
  }
}