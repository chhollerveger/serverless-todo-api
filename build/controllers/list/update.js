import 'source-map-support/register';
import { ListRequestDto } from '@protocols';
import { updateListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class UpdateListController {
    constructor(validator, updateListService) {
        this.validator = validator;
        this.updateListService = updateListService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, updateListConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, ListRequestDto);
            await this.updateListService.update(request);
            return HttpResponseCreator.success('To-do list successfully updated');
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=update.js.map