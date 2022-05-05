import 'source-map-support/register';
import { TaskRequestDto } from '@protocols';
import { getTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class GetTaskController {
    constructor(validator, getTaskService) {
        this.validator = validator;
        this.getTaskService = getTaskService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, getTaskConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, TaskRequestDto);
            const result = await this.getTaskService.get(request);
            return HttpResponseCreator.success('Task successfully retrieved', { result });
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=get.js.map