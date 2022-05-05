import 'source-map-support/register';
import { ListRequestDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class DeleteListController {
    constructor(validator, deleteListService) {
        this.validator = validator;
        this.deleteListService = deleteListService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, getListConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, ListRequestDto);
            await this.deleteListService.delete(request);
            return HttpResponseCreator.success('To-do list successfully deleted');
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=delete.js.map