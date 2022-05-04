
import 'source-map-support/register';
import { IController, IGetTaskService, IValidator, TaskDto } from '@protocols';
import { getTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class GetTaskController implements IController {
  constructor(
    private validator: IValidator,
    private getTaskService: IGetTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, getTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, TaskDto);
      const results = await this.getTaskService.get(request);
      return HttpResponseCreator.success('Task successfully retrieved', { ...results.Item })
    } catch (error) {
      return HttpResponseCreator.serverError(error)
    }
  }
}