
import 'source-map-support/register';
import { ResponseModel } from '@models';
import { IController, ICreateListService, HttpResponse, IValidator, ListDto } from '@protocols';
import { createListConstraint } from '@constraints';
import { converterToType } from '@utils';

export class CreateListController implements IController {
  constructor(
    private validator: IValidator,
    private createListService: ICreateListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      this.validator.validateAgainstConstraints(data, createListConstraint());
      const request = converterToType(data, ListDto);
      const listId = await this.createListService.create(request);
      const response = new ResponseModel({ listId }, 200, 'To-do list successfully created');
      return response.generate();
    } catch (error) {
      const response = (error instanceof ResponseModel) ? error : new ResponseModel({}, 500, 'To-do list cannot be created');
      return response.generate();
    }
  }
}