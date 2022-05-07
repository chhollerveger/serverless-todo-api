
import 'source-map-support/register';
import { IController, IUpdateTaskService, IValidator, TaskRequestDto } from '@protocols';
import { updateTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { BadRequestError, HttpResponse, HttpResponseCreator } from '@presentation';

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
        throw new BadRequestError('Invalid request: at least one of them must be present.', { present });
      }
      await this.updateTaskService.update(request);
      return HttpResponseCreator.success('Task successfully updated');
    } catch (error) {
      return HttpResponseCreator.handleException(error);
    }
  }
}