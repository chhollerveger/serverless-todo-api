
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, HttpResponse, IUpdateTaskService, IValidator, TaskDto } from '@protocols';
import { updateTaskConstraint } from '@constraints';
import { converterToType } from '@utils';

export class UpdateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private updateTaskService: IUpdateTaskService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, updateTaskConstraint());
      const request = converterToType(data, TaskDto);
      const results = await this.updateTaskService.update(request);
      const response = new ResponseModel({ ...results.Attributes }, 200, 'Task successfully updated');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be updated');
      return response.generate();
    }
  }
}