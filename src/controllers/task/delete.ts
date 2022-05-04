
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, IDeleteTaskService, HttpResponse, IValidator, TaskDto } from '@protocols';
import { deleteTaskConstraint } from '@constraints';
import { converterToType } from '@utils';

export class DeleteTaskController implements IController {
  constructor(
    private validator: IValidator,
    private deleteTaskService: IDeleteTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, deleteTaskConstraint());
      const request = converterToType(data, TaskDto);
      await this.deleteTaskService.delete(request);
      const response = new ResponseModel({}, 200, 'Task successfully deleted');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be deleted');
      return response.generate();
    }
  }
}