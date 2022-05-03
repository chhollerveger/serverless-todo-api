
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, ICreateTaskService, HttpResponse, IValidator } from '@protocols';
import { createTaskConstraint } from '@constraints';

export class CreateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private createTaskService: ICreateTaskService,
  ) { }

  public async handle(body: string): Promise<HttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, createTaskConstraint());
      const taskId = await this.createTaskService.create(request);
      const response = new ResponseModel({ taskId }, 200, 'Task successfully added');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be added');
      return response.generate();
    }
  }
}