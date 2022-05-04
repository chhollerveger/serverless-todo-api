
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, ICreateTaskService, HttpResponse, IValidator, TaskDto } from '@protocols';
import { createTaskConstraint } from '@constraints';
import { converterToType } from '@utils';

export class CreateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private createTaskService: ICreateTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, createTaskConstraint());
      const request = converterToType(data, TaskDto);
      const taskId = await this.createTaskService.create(request);
      const response = new ResponseModel({ taskId }, 200, 'Task successfully added');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be added');
      return response.generate();
    }
  }
}