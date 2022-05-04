
import 'source-map-support/register';
import { IController, IUpdateTaskService, IValidator, TaskDto } from '@protocols';
import { updateTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

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
      const request = converterToType(data, TaskDto);
      const results = await this.updateTaskService.update(request);
      return HttpResponseCreator.success('Task successfully updated', { ...results.Attributes })
    } catch (error) {
      return HttpResponseCreator.serverError(error)
    }
  }
}