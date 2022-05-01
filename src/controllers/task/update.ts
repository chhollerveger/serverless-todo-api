
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IHttpResponse, IUpdateTaskService, IValidator } from '@protocols';
import { createTaskConstraint } from '@constraints';

export class UpdateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private updateTaskService: IUpdateTaskService,
  ) { }

  public async handle(body: string): Promise<IHttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, createTaskConstraint());
      const results = await this.updateTaskService.update(request);
      const response = new ResponseModel({ ...results.Attributes }, 200, 'Task successfully updated');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be updated');
      return response.generate();
    }
  }
}