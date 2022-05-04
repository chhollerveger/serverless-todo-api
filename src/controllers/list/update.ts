
import 'source-map-support/register';
import { IController, IUpdateListService, IValidator, ListDto } from '@protocols';
import { updateListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class UpdateListController implements IController {
  constructor(
    private validator: IValidator,
    private updateListService: IUpdateListService,
  ) { }

  public async handle(data: any): Promise<HttpResponse> {
    try {
      const error = this.validator.validateAgainstConstraints(data, updateListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      const request = converterToType(data, ListDto);
      await this.updateListService.update(request);
      return HttpResponseCreator.success('To-do list successfully updated');
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}