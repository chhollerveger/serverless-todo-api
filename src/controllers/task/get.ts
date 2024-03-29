
import 'source-map-support/register';
import { IController, IGetTaskService, IValidator, TaskRequestDto } from '@protocols';
import { getTaskConstraint } from '@constraints';
import { HttpResponse, HttpResponseCreator, StatusMessage } from '@presentation';

export class GetTaskController implements IController {
  constructor(
    private validator: IValidator,
    private getTaskService: IGetTaskService,
  ) { }

  public async handle(params: TaskRequestDto): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(params, getTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const data = await this.getTaskService.get(params);
      return HttpResponseCreator.ok(StatusMessage.TaskFound, { ...data });
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}