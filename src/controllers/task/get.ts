
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IGetTaskService, HttpResponse, IValidator, TaskDto } from '@protocols';
import { getTaskConstraint } from '@constraints';
import { converterToType } from '@utils';

export class GetTaskController implements IController {
  constructor(
    private validator: IValidator,
    private getTaskService: IGetTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, getTaskConstraint());
      const request = converterToType(data, TaskDto);
      const results = await this.getTaskService.get(request);
      const response = new ResponseModel({ ...results.Item }, 200, 'Task successfully retrieved');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task not found');
      return response.generate();
    }
  }
}