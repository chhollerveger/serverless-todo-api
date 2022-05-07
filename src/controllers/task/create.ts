
import 'source-map-support/register';
import { IController, ICreateTaskService, IValidator, TaskRequestDto } from '@protocols';
import { createTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class CreateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private createTaskService: ICreateTaskService,
  ) { }

  public async handle(data: string): Promise<HttpResponse> {
    try {
      const request = converterToType(data, TaskRequestDto);
      const error = this.validator.validateAgainstConstraints(request, createTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const taskId = await this.createTaskService.create(request);
      return HttpResponseCreator.success('Task successfully added', { taskId });
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}