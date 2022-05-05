import 'source-map-support/register';
import { ListRequestDto } from '@protocols';
import { getListConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class GetListController {
    constructor(validator, getListService) {
        this.validator = validator;
        this.getListService = getListService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, getListConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, ListRequestDto);
            const result = await this.getListService.get(request);
            return HttpResponseCreator.success('To-do list successfully retrieved', { result });
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=get.js.map