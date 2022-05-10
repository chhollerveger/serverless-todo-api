
import 'source-map-support/register';
import { IController, IUpdateTaskService, IValidator, TaskRequestDto } from '@protocols';
import { updateTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { BadRequestError, HttpResponse, HttpResponseCreator, StatusMessage } from '@presentation';

export class UpdateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private updateTaskService: IUpdateTaskService,
  ) { }

  public async handle(body: string, params: TaskRequestDto): Promise<HttpResponse> {
    try {
      const request = converterToType(body, TaskRequestDto, params);
      const error = this.validator.validateAgainstConstraints(request, updateTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const isCompletedPresent = typeof request.completed !== 'undefined';
      if (!request.description && !isCompletedPresent) {
        const present = `description or completed`;
        return HttpResponseCreator.badRequest(new BadRequestError(StatusMessage.TaskInvalidRequest, { present }));
      }
      await this.updateTaskService.update(request);
      return HttpResponseCreator.success(StatusMessage.TaskUpdated);
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}