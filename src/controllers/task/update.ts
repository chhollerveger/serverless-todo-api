
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, HttpResponse, IUpdateTaskService, IValidator } from '@protocols';
import { updateTaskConstraint } from '@constraints';

export class UpdateTaskController implements IController {
  constructor(
    private validator: IValidator,
    private updateTaskService: IUpdateTaskService,
  ) { }

  public async handle(body: string): Promise<HttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, updateTaskConstraint());
      const results = await this.updateTaskService.update(request);
      const response = new ResponseModel({ ...results.Attributes }, 200, 'Task successfully updated');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'Task could not be updated');
      return response.generate();
    }
  }
}