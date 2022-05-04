
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

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, updateTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, TaskRequestDto);
      const isCompletedPresent = typeof request.completed !== 'undefined';
      if (!request.description && !isCompletedPresent) {
        const present = ['description', 'completed'];
        return HttpResponseCreator.badRequest(new BadRequestError('Invalid request: at least one of them must be present.', { present }));
      }
      await this.updateTaskService.update(request);
      return HttpResponseCreator.success('Task successfully updated');
    } catch (error) {
      return HttpResponseCreator.serverError(error)
    }
  }
}