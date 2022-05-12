
import 'source-map-support/register';
import { IController, ICreateTaskService, IValidator, TaskRequestDto } from '@protocols';
import { createTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator, StatusMessage } from '@presentation';

export class CreateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private createTaskService: ICreateTaskService,
  ) { }

  public async handle(body: string): Promise<HttpResponse> {
    try {
      const request = converterToType(body, TaskRequestDto);
      const error = this.validator.validateAgainstConstraints(request, createTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const taskId = await this.createTaskService.create(request);
      return HttpResponseCreator.created(StatusMessage.TaskAdded, { taskId });
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}