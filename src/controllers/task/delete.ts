
import 'source-map-support/register';
import { IController, IDeleteTaskService, IValidator, TaskRequestDto } from '@protocols';
import { deleteTaskConstraint } from '@constraints';
import { HttpResponse, HttpResponseCreator, StatusMessage } from '@presentation';

export class DeleteTaskController implements IController {
  constructor(
    private validator: IValidator,
    private deleteTaskService: IDeleteTaskService,
  ) { }

  public async handle(params: TaskRequestDto): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(params, deleteTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      await this.deleteTaskService.delete(params);
      return HttpResponseCreator.ok(StatusMessage.TaskDeleted);
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}