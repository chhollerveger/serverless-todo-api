
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IGetTaskService, IHttpResponse, IValidator } from '@protocols';
import { getTaskConstraint } from '@constraints';

export class GetTaskController implements IController {
  constructor(
    private validator: IValidator,
    private getTaskService: IGetTaskService,
  ) { }

  public async handle(body: string): Promise<IHttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, getTaskConstraint());
      const data = await this.getTaskService.get(request);
      const response = new ResponseModel({ ...data.Item }, 200, 'Task successfully retrieved');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task not found');
      return response.generate();
    }
  }
}