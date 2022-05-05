import 'source-map-support/register';
import { ListRequestDto } from '@protocols';
import { createListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class CreateListController {
    constructor(validator, createListService) {
        this.validator = validator;
        this.createListService = createListService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, createListConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, ListRequestDto);
            const listId = await this.createListService.create(request);
            return HttpResponseCreator.success('To-do list successfully created', { listId });
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=create.js.map