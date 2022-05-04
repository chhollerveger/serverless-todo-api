
import 'source-map-support/register';
import { IController, ICreateTaskService, IValidator, TaskDto } from '@protocols';
import { createTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class CreateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private createTaskService: ICreateTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, createTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, TaskDto);
      const taskId = await this.createTaskService.create(request);
      return HttpResponseCreator.success('Task successfully added', { taskId });
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}