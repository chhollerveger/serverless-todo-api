
import 'source-map-support/register';
import { IController, IDeleteTaskService, IValidator, TaskRequestDto } from '@protocols';
import { deleteTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class DeleteTaskController implements IController {
  constructor(
    private validator: IValidator,
    private deleteTaskService: IDeleteTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, deleteTaskConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, TaskRequestDto);
      await this.deleteTaskService.delete(request);
      return HttpResponseCreator.success('Task successfully deleted');
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}