
import 'source-map-support/register';
import { ResponseModel } from '@/models';
import { IController, ICreateListService, IHttpResponse, IValidator } from '@/protocols';
import { createListConstraint } from '@/constraints';

export class CreateListController implements IController {
  constructor(
    private validator: IValidator,
    private createListService: ICreateListService,
  ) { }

  public async handle(body: string): Promise<IHttpResponse> {
    try {
      const request = JSON.parse(body);
      this.validator.validateAgainstConstraints(request, createListConstraint());
      const listId = await this.createListService.create(request);
      const response = new ResponseModel({ listId }, 200, 'To-do list successfully created');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list cannot be created');
      return response.generate();
    }
  }
}