
import 'source-map-support/register';
import { IController, IGetTaskService, IValidator, TaskRequestDto } from '@protocols';
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
      const request = converterToType(data, TaskRequestDto);
      const result = await this.getTaskService.get(request);
      return HttpResponseCreator.success('Task successfully retrieved', { result });
    } catch (error) {
      return HttpResponseCreator.serverError(error)
    }
  }
}