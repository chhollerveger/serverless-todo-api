
import 'source-map-support/register';
import { IController, IUpdateListService, IValidator, ListRequestDto } from '@protocols';
import { updateListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponse, HttpResponseCreator } from '@presentation';

export class UpdateListController implements IController {
  constructor(
    private validator: IValidator,
    private updateListService: IUpdateListService,
  ) { }

  public async handle(body: string, params: ListRequestDto): Promise<HttpResponse> {
    try {
      const request = converterToType(body, ListRequestDto, params);
      const error = this.validator.validateAgainstConstraints(request, updateListConstraint());
      if (error) {
        return HttpResponseCreator.badRequest(error);
      }
      await this.updateListService.update(request);
      return HttpResponseCreator.success('To-do list successfully updated');
    } catch (error) {
      return HttpResponseCreator.serverError(error);
    }
  }
}